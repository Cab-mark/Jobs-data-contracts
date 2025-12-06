# Jobs Data Contracts

Canonical data contracts and schemas for the CS Jobs Board solution. This repository serves as the single source of truth for all data structures used across the Jobs Board ecosystem.

## Overview

This repository contains OpenAPI/JSON Schema definitions that are used to generate:
- **TypeScript types** for Next.js and Node.js applications
- **Python Pydantic models** for FastAPI applications

The generated exports ensure consistency across all applications in the Jobs Board platform.

## Repository Structure

```
.
├── schemas/                    # OpenAPI and JSON Schema definitions
│   ├── jobs/                  # Jobs API service schemas
│   │   └── openapi.yaml
│   └── search/                # Search API service schemas
│       └── openapi.yaml
├── generated/                 # Auto-generated TypeScript (do not edit manually)
│   ├── jobs.ts               # Generated from jobs/openapi.yaml
│   └── search.ts             # Generated from search/openapi.yaml
├── python/                    # Python package with generated Pydantic models
│   └── jobs_data_contracts/  # Main Python package
│       ├── jobs/             # Jobs API models
│       └── search/           # Search API models
├── src/                       # TypeScript source entry points
│   ├── index.ts              # Main entry point with type aliases
│   ├── jobs.ts               # Jobs API exports
│   └── search.ts             # Search API exports
├── examples/                  # Usage examples
│   └── fastapi_example.py    # FastAPI application example
├── scripts/                   # Generation scripts
│   └── generate_pydantic.sh  # Generate Pydantic models
└── dist/                      # Compiled TypeScript output (excluded from git)
```

---

## TypeScript/JavaScript Usage

### Installation

Install the package from npm:

```bash
npm install jobs-data-contracts
```

Or with yarn:

```bash
yarn add jobs-data-contracts
```

## Usage

### Importing Types

Import commonly used types directly:

```typescript
import { 
  Job, 
  JobResultItem, 
  JobSearchResponse, 
  Approach, 
  Grade, 
  Profession,
  Salary,
  FixedLocation,
  OverseasLocation 
} from 'jobs-data-contracts';
```

### Using Types in Your Application

```typescript
import { Job, JobSearchResponse } from 'jobs-data-contracts';

// Type-safe job object
const job: Job = {
  externalId: 'ext-123',
  approach: 'External',
  title: 'Software Engineer',
  description: 'Join our team...',
  organisation: 'Tech Corp',
  location: [{ countryName: 'United Kingdom', countryCode: 'GB' }],
  grade: 'Grade 7 Equivalent',
  assignmentType: 'Permanent',
  personalSpec: 'Requirements...',
  applyDetail: 'How to apply...',
  closingDate: '2024-12-31T23:59:59Z',
  profession: 'Digital and Data',
  recruitmentEmail: 'jobs@example.com'
};

// Type-safe API response
const searchResponse: JobSearchResponse = {
  results: [],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0
};
```

### Importing from Specific Modules

For more granular imports:

```typescript
// Search API types
import { SearchComponents, SearchPaths, SearchOperations } from 'jobs-data-contracts/search';

// Jobs API types
import { JobsComponents, JobsPaths, JobsOperations } from 'jobs-data-contracts/jobs';
```

### Available Type Exports

| Export | Description |
|--------|-------------|
| `Job` | Full job object for indexing |
| `JobResultItem` | Compact job result in search responses |
| `JobSearchResponse` | Search API response with pagination |
| `FixedLocation` | UK location with address details |
| `OverseasLocation` | International location |
| `Salary` | Salary range and currency |
| `Contacts` | Contact information |
| `Approach` | Enum: Internal, Across Government, External |
| `Assignments` | Enum: Apprentice, FTA, Loan, Secondment, Permanent |
| `Grade` | Enum: Civil Service grades |
| `Profession` | Enum: Civil Service professions |
| `ApiError` | Error response type |

---

## Python/Pydantic Usage

### Installation

Install the package from PyPI:

```bash
pip install jobs-data-contracts
```

Or add to your `requirements.txt`:

```
jobs-data-contracts>=1.0.0
```

Or with Poetry:

```bash
poetry add jobs-data-contracts
```

### Using in FastAPI

Import and use the Pydantic models directly in your FastAPI application:

```python
from fastapi import FastAPI
from jobs_data_contracts import (
    Job,
    JobSearchResponse,
    JobResultItem,
    Approach,
    Grade,
    Profession,
)

app = FastAPI()

@app.post("/jobs", response_model=Job)
async def create_job(job: Job):
    """
    Create a new job posting.
    The Job model provides automatic validation based on the OpenAPI schema.
    """
    # Your logic here
    return job

@app.get("/jobs/search", response_model=JobSearchResponse)
async def search_jobs(q: str = "", page: int = 1):
    """
    Search for jobs with automatic response validation.
    """
    # Your search logic here
    return JobSearchResponse(
        results=[],
        total=0,
        page=page,
        page_size=10,
        total_pages=0,
    )
```

### Importing Types

Import commonly used types directly:

```python
from jobs_data_contracts import (
    Job,
    JobResultItem,
    JobSearchResponse,
    FixedLocation,
    OverseasLocation,
    Salary,
    Contacts,
    Approach,
    Assignments,
    Grade,
    Profession,
    Error,
)
```

### Importing from Specific Modules

For more granular imports:

```python
# Search API models
from jobs_data_contracts.search import (
    Job,
    JobResultItem,
    JobSearchResponse,
    Approach,
    Grade,
)

# Jobs API models (when defined)
from jobs_data_contracts.jobs import ...
```

### Creating Model Instances

```python
from datetime import datetime
from jobs_data_contracts import (
    Job,
    Approach,
    Grade,
    Assignments,
    Profession,
    OverseasLocation,
    Salary,
)

# Create a job instance
job = Job(
    external_id="job-001",
    approach=Approach.external,
    title="Senior Software Engineer",
    description="We are looking for a talented engineer...",
    organisation="Government Digital Service",
    location=[
        OverseasLocation(
            country_name="United Kingdom",
            country_code="GB",
            location_display="London",
        )
    ],
    grade=Grade.grade_7_equivalent,
    assignment_type=Assignments.permanent,
    personal_spec="Strong Python and FastAPI experience...",
    apply_detail="Apply through our portal",
    closing_date=datetime(2024, 12, 31, 23, 59, 59),
    profession=Profession.digital_and_data,
    recruitment_email="recruitment@example.gov.uk",
    salary=Salary(
        minimum=50000.0,
        maximum=65000.0,
        currency="GBP",
        currency_symbol="£",
    ),
)

# Pydantic provides automatic validation
print(job.model_dump())  # Convert to dict
print(job.model_dump_json())  # Convert to JSON string
```

### Available Model Exports

| Export | Description |
|--------|-------------|
| `Job` | Full job object for indexing with validation |
| `JobResultItem` | Compact job result in search responses |
| `JobSearchResponse` | Search API response with pagination |
| `FixedLocation` | UK location with address details |
| `OverseasLocation` | International location |
| `Salary` | Salary range and currency |
| `Contacts` | Contact information |
| `Approach` | Enum: Internal, Across Government, External |
| `Assignments` | Enum: Apprentice, FTA, Loan, Secondment, Permanent |
| `Grade` | Enum: Civil Service grades |
| `Profession` | Enum: Civil Service professions |
| `Error` | Error response type |

### FastAPI Example

See the complete example in [`examples/fastapi_example.py`](examples/fastapi_example.py) for a full working FastAPI application.

To run the example:

```bash
# Install dependencies
pip install fastapi uvicorn jobs-data-contracts

# Run the server
uvicorn examples.fastapi_example:app --reload

# Visit http://localhost:8000/docs for interactive API docs
```

---

## Development

### Prerequisites

- **For TypeScript**: Node.js >= 18
- **For Python**: Python >= 3.8

### Setup

#### TypeScript Setup

```bash
npm install
```

#### Python Setup

```bash
# Install with development dependencies
pip install -e ".[dev]"

# Or install just the datamodel-code-generator
pip install "datamodel-code-generator[http]>=0.25.0"
```

### Generating Types

#### Generating TypeScript Types

To regenerate TypeScript types from the OpenAPI schemas:

```bash
# Generate all TypeScript types
npm run generate:typescript

# Or generate individually
npm run generate:jobs    # Generate from jobs/openapi.yaml
npm run generate:search  # Generate from search/openapi.yaml
```

#### Generating Python Pydantic Models

To regenerate Python Pydantic models from the OpenAPI schemas:

```bash
# Generate all Pydantic models
npm run generate:python
# Or run the script directly
./scripts/generate_pydantic.sh
```

The generated models will be placed in:
- `python/jobs_data_contracts/jobs/models.py`
- `python/jobs_data_contracts/search/models.py`

### Building the Package

#### TypeScript Package

Build the TypeScript package (generates types and compiles TypeScript):

```bash
npm run build
```

#### Python Package

Build the Python package:

```bash
# Generate Pydantic models first
npm run generate:python

# Build the package
python -m build
```

### Testing

#### TypeScript Testing

Type-check without emitting files:

```bash
npm test
```

#### Python Testing

Test the Python package:

```bash
# Install the package in editable mode
pip install -e .

# Test imports
python -c "from jobs_data_contracts import Job, JobSearchResponse; print('✓ Import successful')"
```

---

## Publishing

### Publishing TypeScript Package to npm

1. Update the version in `package.json`
2. Build and publish:

```bash
npm run build
npm publish
```

The `prepublishOnly` script automatically runs the build before publishing.

### Publishing a Scoped Package

To publish as a scoped package (e.g., `@your-org/jobs-data-contracts`):

1. Update the `name` in `package.json`:
   ```json
   "name": "@your-org/jobs-data-contracts"
   ```

2. Publish with public access:
   ```bash
   npm publish --access public
   ```

### Publishing to GitHub Packages (TypeScript)

Add to `package.json`:

```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

Then publish:

```bash
npm publish
```

### Publishing Python Package to PyPI

1. Update the version in `pyproject.toml`
2. Generate models and build:

```bash
# Generate Pydantic models
npm run generate:python

# Install build tools if needed
pip install build twine

# Build the package
python -m build

# Upload to PyPI
python -m twine upload dist/*
```

### Publishing to Test PyPI (Python)

```bash
python -m twine upload --repository testpypi dist/*
```

### Local Development (without publishing)

#### TypeScript Local Development

Link the package locally for development:

```bash
# In this repository
npm link

# In your Next.js application
npm link jobs-data-contracts
```

#### Python Local Development

Install the package in editable mode:

```bash
# In this repository
pip install -e .

# Now you can import it in any Python project
python -c "from jobs_data_contracts import Job"
```

## Versioning

This repository follows [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes to schemas or generated types
- **Minor**: New schemas or backward-compatible additions
- **Patch**: Documentation updates, bug fixes in generation scripts

## Contributing

1. **Schema Changes**: All schema modifications should be made in the `schemas/` directory
2. **Generation**: After schema changes, run `npm run generate:typescript` to regenerate types
3. **Testing**: Run `npm test` to verify types compile correctly
4. **Documentation**: Update this README if adding new types or changing usage

### Schema Guidelines

- Use clear, descriptive property names
- Include descriptions for all schemas and properties
- Define validation rules (min/max, patterns, required fields)
- Use appropriate data types and formats
- Leverage `$ref` for reusable components
- Follow OpenAPI 3.x best practices

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please open a GitHub issue.