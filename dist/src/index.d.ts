/**
 * Jobs Data Contracts
 * TypeScript types generated from OpenAPI schemas
 *
 * @packageDocumentation
 */
export { paths as JobsPaths, webhooks as JobsWebhooks, components as JobsComponents, operations as JobsOperations, $defs as Jobs$defs } from '../jobs';
export { paths as SearchPaths, webhooks as SearchWebhooks, components as SearchComponents, operations as SearchOperations, $defs as Search$defs } from '../search';
import type { components as JobsSchemas } from '../jobs';
import type { components as SearchSchemas } from '../search';
export type JobSummary = JobsSchemas['schemas']['JobSummary'];
export type Job = JobsSchemas['schemas']['Job'];
export type JobCreate = JobsSchemas['schemas']['JobCreate'];
export type JobUpdate = JobsSchemas['schemas']['JobUpdate'];
export type JobAttachment = JobsSchemas['schemas']['JobAttachment'];
export type FixedLocations = JobsSchemas['schemas']['FixedLocations'];
export type OverseasLocations = JobsSchemas['schemas']['OverseasLocations'];
export type Salary = JobsSchemas['schemas']['Salary'];
export type Contacts = JobsSchemas['schemas']['Contacts'];
export type Approach = JobsSchemas['schemas']['Approach'];
export type Assignments = JobsSchemas['schemas']['Assignments'];
export type WorkLocation = JobsSchemas['schemas']['WorkLocation'];
export type WorkingPattern = JobsSchemas['schemas']['WorkingPattern'];
export type Grade = JobsSchemas['schemas']['Grade'];
export type Profession = JobsSchemas['schemas']['Profession'];
export type DCStatus = JobsSchemas['schemas']['DCStatus'];
export type JobSearchRequest = SearchSchemas['schemas']['JobSearchRequest'];
export type JobResultItem = SearchSchemas['schemas']['JobResultItem'];
export type JobSearchResponse = SearchSchemas['schemas']['JobSearchResponse'];
export type FixedLocation = SearchSchemas['schemas']['FixedLocation'];
export type OverseasLocation = SearchSchemas['schemas']['OverseasLocation'];
export type ApiError = SearchSchemas['schemas']['Error'];
//# sourceMappingURL=index.d.ts.map