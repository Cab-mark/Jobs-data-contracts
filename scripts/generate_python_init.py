#!/usr/bin/env python3
"""
Generate __init__.py files for jobs and search Python modules.

This script parses the generated models.py files and creates __init__.py files
with proper imports and __all__ declarations to ensure all public symbols are exported.

It also enforces module boundaries by filtering out Jobs-only types from search exports.
"""

import ast
from pathlib import Path
from typing import List, Set, Tuple


def parse_public_symbols(models_file: Path) -> Tuple[List[str], Set[str]]:
    """
    Parse a models.py file and extract all public BaseModel and Enum classes.
    
    Args:
        models_file: Path to the models.py file
        
    Returns:
        Tuple of (list of symbol names in order, set of symbol names)
    """
    with open(models_file, 'r') as f:
        tree = ast.parse(f.read(), filename=str(models_file))
    
    symbols = []
    symbols_set = set()
    
    for node in ast.walk(tree):
        if isinstance(node, ast.ClassDef):
            # Check if this is a public class (not starting with _)
            if not node.name.startswith('_'):
                # Check if it's a BaseModel, Enum, or RootModel subclass
                for base in node.bases:
                    base_name = None
                    if isinstance(base, ast.Name):
                        base_name = base.id
                    elif isinstance(base, ast.Attribute):
                        base_name = base.attr
                    elif isinstance(base, ast.Subscript):
                        # Handle subscripted types like RootModel[...]
                        if isinstance(base.value, ast.Name):
                            base_name = base.value.id
                        elif isinstance(base.value, ast.Attribute):
                            base_name = base.value.attr
                    
                    # Include BaseModel, Enum, and RootModel classes
                    if base_name in ('BaseModel', 'Enum', 'RootModel'):
                        if node.name not in symbols_set:
                            symbols.append(node.name)
                            symbols_set.add(node.name)
                        break
    
    return symbols, symbols_set


def filter_jobs_only_symbols(symbols: List[str]) -> List[str]:
    """
    Filter out Jobs-only types that should not be exported from search module.
    
    Jobs-only types are:
    - Job, JobCreate, JobUpdate, JobSummary (Job-specific models)
    - Contacts (Job-specific model)
    - JobAttachment (Job-specific model)
    - DCStatus (Job-specific enum)
    - FixedLocations, OverseasLocations (note the plural - Jobs versions)
    - Location, Location1-5 (Job-specific location root models)
    
    Search module should export:
    - FixedLocation, OverseasLocation (note singular - Search versions)
    - All other search-specific types
    """
    jobs_only_types = {
        'Job',
        'JobCreate', 
        'JobUpdate',
        'JobSummary',
        'Contacts',
        'JobAttachment',
        'DCStatus',
        'FixedLocations',  # plural - Jobs version
        'OverseasLocations',  # plural - Jobs version
        'Location',  # RootModel in Jobs
        'Location1',
        'Location2',
        'Location3',
        'Location4',
        'Location5',
    }
    
    return [s for s in symbols if s not in jobs_only_types]


def generate_init_file(module_name: str, symbols: List[str], output_file: Path):
    """
    Generate an __init__.py file for a module.
    
    Args:
        module_name: Name of the module (e.g., "search" or "jobs")
        symbols: List of symbol names to export
        output_file: Path to write the __init__.py file
    """
    # Generate imports
    imports = [f"    {symbol}," for symbol in symbols]
    imports_str = "\n".join(imports)
    
    # Generate __all__
    all_exports = [f'    "{symbol}",' for symbol in symbols]
    all_exports_str = "\n".join(all_exports)
    
    # Capitalize module name for docstring
    module_title = module_name.capitalize()
    
    content = f'''"""
{module_title} API module - Pydantic models for {module_title} API

Generated from schemas/{module_name}/openapi.yaml
"""

from jobs_data_contracts.{module_name}.models import (
{imports_str}
)

__all__ = [
{all_exports_str}
]
'''
    
    with open(output_file, 'w') as f:
        f.write(content)
    
    print(f"✓ Generated {output_file} with {len(symbols)} symbols")


def main():
    """Main entry point for the script."""
    # Get the repository root
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    python_dir = repo_root / "generated" / "python"
    
    # Process search module
    search_models = python_dir / "search" / "models.py"
    search_init = python_dir / "search" / "__init__.py"
    
    if search_models.exists():
        print("Processing search module...")
        symbols, _ = parse_public_symbols(search_models)
        # Filter out Jobs-only types
        symbols = filter_jobs_only_symbols(symbols)
        generate_init_file("search", symbols, search_init)
    else:
        print(f"Warning: {search_models} not found")
    
    # Process jobs module
    jobs_models = python_dir / "jobs" / "models.py"
    jobs_init = python_dir / "jobs" / "__init__.py"
    
    if jobs_models.exists():
        print("Processing jobs module...")
        symbols, _ = parse_public_symbols(jobs_models)
        generate_init_file("jobs", symbols, jobs_init)
    else:
        print(f"Warning: {jobs_models} not found")
    
    print("\n✓ Successfully generated __init__.py files!")


if __name__ == "__main__":
    main()
