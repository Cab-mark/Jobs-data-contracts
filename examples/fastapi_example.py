"""
Example FastAPI application using jobs-data-contracts

This demonstrates how to use the generated Pydantic models in a FastAPI application.
"""

# To run this example:
# 1. Install dependencies: pip install fastapi uvicorn jobs-data-contracts
# 2. Run the server: uvicorn examples.fastapi_example:app --reload
# 3. Visit http://localhost:8000/docs for the interactive API documentation

from datetime import datetime
from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import ValidationError

# Import models from jobs-data-contracts
from jobs_data_contracts import (
    Approach,
    Assignments,
    Grade,
    Job,
    JobResultItem,
    JobSearchResponse,
    OverseasLocation,
    Profession,
    Salary,
)

app = FastAPI(
    title="Jobs API Example",
    description="Example API using jobs-data-contracts Pydantic models",
    version="1.0.0",
)

# Mock database
jobs_db: List[Job] = []


@app.post("/jobs", response_model=Job, status_code=201)
async def create_job(job: Job):
    """
    Create a new job posting.

    The Job model is automatically validated by Pydantic based on the OpenAPI schema.
    """
    jobs_db.append(job)
    return job


@app.get("/jobs/search", response_model=JobSearchResponse)
async def search_jobs(q: str = "", page: int = 1, page_size: int = 10):
    """
    Search for jobs.

    Returns a paginated list of job results matching the search query.
    """
    # Simple filtering (in production, use proper search engine)
    filtered_jobs = [
        job for job in jobs_db if not q or q.lower() in job.title.lower()
    ]

    # Pagination
    start = (page - 1) * page_size
    end = start + page_size
    paginated_jobs = filtered_jobs[start:end]

    # Convert to JobResultItem
    results = [
        JobResultItem(
            id=job.id or job.external_id,
            external_id=job.external_id,
            title=job.title,
            organisation=job.organisation,
            location=job.location,
            assignment_type=job.assignment_type,
            salary=job.salary,
            closing_date=job.closing_date,
            profession=job.profession,
            approach=job.approach,
        )
        for job in paginated_jobs
    ]

    return JobSearchResponse(
        results=results,
        total=len(filtered_jobs),
        page=page,
        page_size=page_size,
        total_pages=(len(filtered_jobs) + page_size - 1) // page_size,
        query=q if q else None,
        applied_filters=None,
    )


@app.get("/jobs/{external_id}", response_model=Job)
async def get_job(external_id: str):
    """
    Get a specific job by its external ID.
    """
    for job in jobs_db:
        if job.external_id == external_id:
            return job
    raise HTTPException(status_code=404, detail="Job not found")


@app.get("/")
async def root():
    """
    Root endpoint with API information.
    """
    return {
        "message": "Jobs API - Using jobs-data-contracts",
        "docs": "/docs",
        "total_jobs": len(jobs_db),
    }


# Example: Create a sample job on startup
@app.on_event("startup")
async def create_sample_data():
    """
    Create sample job data on application startup.
    """
    sample_job = Job(
        external_id="sample-001",
        approach=Approach.external,
        title="Senior Software Engineer",
        description="We are looking for a talented Senior Software Engineer...",
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
        personal_spec="Strong Python and FastAPI experience required...",
        apply_detail="Apply through our careers portal",
        closing_date=datetime(2024, 12, 31, 23, 59, 59),
        profession=Profession.digital_and_data,
        recruitment_email="recruitment@example.gov.uk",
        salary=Salary(
            minimum=50000.0,
            maximum=65000.0,
            currency="GBP",
            currency_symbol="£",
            salary_details="Plus excellent benefits",
        ),
        summary="Join our team building digital services",
        benefits="25 days annual leave, pension, flexible working",
    )
    jobs_db.append(sample_job)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
