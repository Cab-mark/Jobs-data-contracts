/**
 * Jobs Data Contracts
 * TypeScript types generated from OpenAPI schemas
 * 
 * @packageDocumentation
 */

// Re-export Jobs API with namespaced exports
export {
  paths as JobsPaths,
  webhooks as JobsWebhooks,
  components as JobsComponents,
  operations as JobsOperations,
  $defs as Jobs$defs
} from '../jobs';

// Re-export Search API with namespaced exports
export {
  paths as SearchPaths,
  webhooks as SearchWebhooks,
  components as SearchComponents,
  operations as SearchOperations,
  $defs as Search$defs
} from '../search';

// Export commonly used types at the top level for convenience
import type { components as JobsSchemas } from '../jobs';
import type { components as SearchSchemas } from '../search';

// Jobs API types
export type Job = JobsSchemas['schemas']['Job'];
export type JobSummary = JobsSchemas['schemas']['JobSummary'];
export type JobCreate = JobsSchemas['schemas']['JobCreate'];
export type JobUpdate = JobsSchemas['schemas']['JobUpdate'];
export type JobAttachment = JobsSchemas['schemas']['JobAttachment'];
export type FixedLocations = JobsSchemas['schemas']['FixedLocations'];
export type OverseasLocations = JobsSchemas['schemas']['OverseasLocations'];
export type Salary = JobsSchemas['schemas']['Salary'];
export type Contacts = JobsSchemas['schemas']['Contacts'];
export type Approach = JobsSchemas['schemas']['Approach'];
export type Assignments = JobsSchemas['schemas']['Assignments'];
export type Grade = JobsSchemas['schemas']['Grade'];
export type Profession = JobsSchemas['schemas']['Profession'];
export type DCStatus = JobsSchemas['schemas']['DCStatus'];

// Search API types
export type JobResultItem = SearchSchemas['schemas']['JobResultItem'];
export type JobSearchResponse = SearchSchemas['schemas']['JobSearchResponse'];
export type ApiError = SearchSchemas['schemas']['Error'];
