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
import type { components as SearchSchemas } from '../search';

export type Job = SearchSchemas['schemas']['Job'];
export type JobResultItem = SearchSchemas['schemas']['JobResultItem'];
export type JobSearchResponse = SearchSchemas['schemas']['JobSearchResponse'];
export type FixedLocation = SearchSchemas['schemas']['FixedLocation'];
export type OverseasLocation = SearchSchemas['schemas']['OverseasLocation'];
export type Salary = SearchSchemas['schemas']['Salary'];
export type Contacts = SearchSchemas['schemas']['Contacts'];
export type Approach = SearchSchemas['schemas']['Approach'];
export type Assignments = SearchSchemas['schemas']['Assignments'];
export type Grade = SearchSchemas['schemas']['Grade'];
export type Profession = SearchSchemas['schemas']['Profession'];
export type ApiError = SearchSchemas['schemas']['Error'];
