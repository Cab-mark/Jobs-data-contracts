"""
Jobs Data Contracts - Python Pydantic Models

This package provides Pydantic models generated from OpenAPI schemas
for use in FastAPI applications.
"""

__version__ = "1.0.1"

# Import job-related types from jobs module
from jobs_data_contracts.jobs.models import (
    Contacts,
    Job,
)

# Import search-related types from search module
from jobs_data_contracts.search.models import (
    Approach,
    Assignments,
    Error,
    FixedLocation,
    Grade,
    JobResultItem,
    JobSearchResponse,
    OverseasLocation,
    Profession,
    Salary,
)

__all__ = [
    # Jobs module exports
    "Contacts",
    "Job",
    # Search module exports
    "JobResultItem",
    "JobSearchResponse",
    "FixedLocation",
    "OverseasLocation",
    "Salary",
    "Approach",
    "Assignments",
    "Grade",
    "Profession",
    "Error",
]
