/**
 * Search API TypeScript types
 * Auto-generated from OpenAPI schema - do not edit manually
 */

export {
  paths as SearchPaths,
  webhooks as SearchWebhooks,
  components as SearchComponents,
  operations as SearchOperations,
  $defs as Search$defs
} from '../generated/search';

export type { paths, webhooks, components, operations, $defs } from '../generated/search';

// Re-export commonly used schema types for convenience
import type { components } from '../generated/search';

export type Job = components['schemas']['Job'];
export type JobResultItem = components['schemas']['JobResultItem'];
export type JobSearchResponse = components['schemas']['JobSearchResponse'];
export type FixedLocation = components['schemas']['FixedLocation'];
export type OverseasLocation = components['schemas']['OverseasLocation'];
export type Salary = components['schemas']['Salary'];
export type Contacts = components['schemas']['Contacts'];
export type Approach = components['schemas']['Approach'];
export type Assignments = components['schemas']['Assignments'];
export type Grade = components['schemas']['Grade'];
export type Profession = components['schemas']['Profession'];
export type Error = components['schemas']['Error'];
