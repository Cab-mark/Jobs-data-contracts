# Python Pydantic Usage Guide

This guide provides detailed information about using the `jobs-data-contracts` Python package with FastAPI.

## Installation

```bash
pip install jobs-data-contracts
```

## Quick Start

```python
from jobs_data_contracts import Job, Approach, Grade, Assignments, Profession
from datetime import datetime, timezone

# Create a job with validation
job = Job(
    externalId="job-001",
    approach=Approach.external,
    title="Software Engineer",
    description="Join our team...",
    organisation="Government Digital Service",
    location=[{"countryName": "UK", "countryCode": "GB"}],
    grade=Grade.grade_7_equivalent,
    assignmentType=Assignments.permanent,
    personalSpec="Requirements...",
    applyDetail="How to apply...",
    closingDate=datetime(2024, 12, 31, 23, 59, 59, tzinfo=timezone.utc),
    profession=Profession.digital_and_data,
    recruitmentEmail="jobs@example.com",
)
```

## Using with FastAPI

### Basic Example

```python
from fastapi import FastAPI
from jobs_data_contracts import Job, JobSearchResponse

app = FastAPI()

@app.post("/jobs", response_model=Job)
async def create_job(job: Job):
    # Automatic validation via Pydantic
    return job

@app.get("/jobs/search", response_model=JobSearchResponse)
async def search_jobs():
    return JobSearchResponse(
        results=[],
        total=0,
        page=1,
        pageSize=10,
        totalPages=0,
    )
```

### Complete Example

See [`examples/fastapi_example.py`](examples/fastapi_example.py) for a full working application.

## Model Features

### Automatic Validation

All models provide automatic validation based on the OpenAPI schema:

- Email validation for `recruitmentEmail` fields
- Date/time validation with timezone awareness
- Enum validation for `Approach`, `Grade`, `Profession`, etc.
- Required field validation

### Immutability

All models are immutable (frozen) to ensure data integrity:

```python
job.title = "New Title"  # Raises error - models are frozen
```

### Serialization

Convert models to dictionaries or JSON:

```python
# To dictionary (snake_case)
job_dict = job.model_dump()

# To dictionary (camelCase, matching OpenAPI)
job_dict = job.model_dump(by_alias=True)

# To JSON string
job_json = job.model_dump_json(by_alias=True)
```

## Available Models

### Core Models
- `Job` - Complete job posting with all fields
- `JobResultItem` - Compact job result for search responses
- `JobSearchResponse` - Paginated search results

### Supporting Models
- `FixedLocation` - UK address with geocoding
- `OverseasLocation` - International location
- `Salary` - Salary range and currency
- `Contacts` - Contact information

### Enums
- `Approach` - Internal, Across Government, External
- `Assignments` - Apprentice, FTA, Loan, Secondment, Permanent
- `Grade` - All Civil Service grades
- `Profession` - All Civil Service professions

## Field Naming

The models use camelCase aliases to match the OpenAPI specification:

```python
# Use camelCase when creating instances
job = Job(
    externalId="001",      # Not external_id
    assignmentType="...",  # Not assignment_type
    closingDate=datetime(...),  # Not closing_date
)

# Access via snake_case or camelCase
print(job.external_id)     # Works
print(job.externalId)      # Also works (via alias)
```

## Development

### Regenerating Models

When the OpenAPI schemas change:

```bash
npm run generate:python
# or
./scripts/generate_pydantic.sh
```

### Testing

```bash
# Install in editable mode
pip install -e .

# Test imports
python -c "from jobs_data_contracts import Job; print('OK')"
```

## Dependencies

- `pydantic>=2.0.0` - Model validation and serialization
- `email-validator>=2.0.0` - Email field validation

## License

MIT License - See [LICENSE](LICENSE) file for details.
