# Jobs Data Contracts

Canonical data contracts and schemas for the CS Jobs Board solution. This repository serves as the single source of truth for all data structures used across the Jobs Board ecosystem.

## Overview

This repository contains OpenAPI/JSON Schema definitions that are used to generate type-safe TypeScript types. The generated exports ensure consistency across all applications in the Jobs Board platform, including Next.js applications.

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
├── src/                       # Source entry points
│   ├── index.ts              # Main entry point with type aliases
│   ├── jobs.ts               # Jobs API exports
│   └── search.ts             # Search API exports
└── dist/                      # Compiled output (excluded from git)
```

## Installation

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

## Development

### Prerequisites

- Node.js >= 18

### Setup

```bash
npm install
```

### Generating TypeScript Types

To regenerate TypeScript types from the OpenAPI schemas:

```bash
# Generate all TypeScript types
npm run generate:typescript

# Or generate individually
npm run generate:jobs    # Generate from jobs/openapi.yaml
npm run generate:search  # Generate from search/openapi.yaml
```

### Building the Package

Build the package (generates types and compiles TypeScript):

```bash
npm run build
```

### Testing

Type-check without emitting files:

```bash
npm test
```

## Publishing

### Publishing to npm

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

### Publishing to GitHub Packages

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

### Local Development (without publishing)

Link the package locally for development:

```bash
# In this repository
npm link

# In your Next.js application
npm link jobs-data-contracts
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