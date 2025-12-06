"""
Jobs Data Contracts - Python Pydantic Models

This package provides Pydantic models generated from OpenAPI schemas
for use in FastAPI applications.
"""

__version__ = "1.0.0"

# Import all types from generated modules for convenient access
from jobs_data_contracts.search.models import (
    Approach,
    Assignments,
    Contacts,
    Error,
    FixedLocation,
    Grade,
    Job,
    JobResultItem,
    JobSearchResponse,
    OverseasLocation,
    Profession,
    Salary,
)

__all__ = [
    # Search module exports
    "Job",
    "JobResultItem",
    "JobSearchResponse",
    "FixedLocation",
    "OverseasLocation",
    "Salary",
    "Contacts",
    "Approach",
    "Assignments",
    "Grade",
    "Profession",
    "Error",
]
