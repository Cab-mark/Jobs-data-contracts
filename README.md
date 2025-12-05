# Jobs Data Contracts

Canonical data contracts and schemas for the CS Jobs Board solution. This repository serves as the single source of truth for all data structures used across the Jobs Board ecosystem.

## Overview

This repository contains OpenAPI/JSON Schema definitions that are used to generate type-safe client libraries for multiple programming languages. The generated exports ensure consistency across all applications in the Jobs Board platform.

## Repository Structure

```
.
├── schemas/                    # OpenAPI and JSON Schema definitions
│   ├── jobs/                  # Jobs API service schemas
│   │   └── openapi.yaml
│   └── search/                # Search API service schemas
│       └── openapi.yaml
├── generated/                 # Auto-generated code (do not edit manually)
│   ├── typescript/           # TypeScript types and interfaces
│   └── python/               # Pydantic models
└── scripts/                   # Build and generation scripts
```

## Schemas

All canonical schemas are defined in the `schemas/` directory using OpenAPI 3.x specification format. These schemas define:

- **Job Postings**: Structure for job listings, requirements, and metadata
- **Applications**: Candidate application data and status tracking
- **Users**: User profiles (candidates, employers, admins)
- **Companies**: Company/employer information
- **Common Types**: Shared enumerations, validation patterns, and reusable components

## Generated Exports

### TypeScript

TypeScript types and interfaces are generated for use in frontend applications and Node.js services.

**Installation:**
```bash
npm install @your-org/jobs-data-contracts
```

**Usage:**
```typescript
import { JobPosting, Application } from '@your-org/jobs-data-contracts';
```

### Python (Pydantic)

Pydantic models are generated for use in Python backend services, providing runtime validation.

**Installation:**
```bash
pip install jobs-data-contracts
```

**Usage:**
```python
from jobs_data_contracts import JobPosting, Application
```

## Development

### Prerequisites

- Node.js >= 18
- Python >= 3.9
- OpenAPI Generator CLI or datamodel-code-generator

### Generating Code

Run the generation scripts to create type-safe exports:

```bash
# Generate TypeScript types
npm run generate:typescript

# Generate Python Pydantic models
npm run generate:python

# Generate all
npm run generate:all
```

### Validation

Validate schema files before committing:

```bash
npm run validate:schemas
```

## Versioning

This repository follows [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes to schemas
- **Minor**: New schemas or backward-compatible additions
- **Patch**: Documentation updates, bug fixes in generation scripts

Each release creates versioned packages for TypeScript and Python distributions.

## Contributing

1. **Schema Changes**: All schema modifications should be made in the `schemas/` directory
2. **Validation**: Ensure schemas pass validation before submitting PRs
3. **Generation**: Regenerate exports and commit the generated code
4. **Testing**: Test generated code in consuming applications
5. **Documentation**: Update this README and inline schema documentation

### Schema Guidelines

- Use clear, descriptive property names
- Include descriptions for all schemas and properties
- Define validation rules (min/max, patterns, required fields)
- Use appropriate data types and formats
- Leverage `$ref` for reusable components
- Follow OpenAPI 3.x best practices

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Repositories

- **Frontend Application**: [Link to frontend repo]
- **Backend API**: [Link to backend repo]
- **Mobile App**: [Link to mobile repo]

## Support

For questions or issues, please open a GitHub issue or contact the platform team.