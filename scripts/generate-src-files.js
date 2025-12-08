#!/usr/bin/env node
/**
 * Auto-generate the src/ TypeScript files from generated OpenAPI TypeScript files.
 * This script parses jobs.ts and search.ts to extract schema names and creates
 * appropriate re-export files.
 */

const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.join(__dirname, '../generated/typescript');
const SRC_DIR = path.join(GENERATED_DIR, 'src');

/**
 * Extract schema names from a generated TypeScript file
 * @param {string} filePath - Path to the generated TypeScript file
 * @returns {string[]} Array of schema names
 */
function extractSchemaNames(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const schemaNames = [];
  
  // Match schema definitions like: SchemaName: {
  const schemaRegex = /^\s+([A-Z][a-zA-Z0-9]*)\s*:/gm;
  let match;
  
  while ((match = schemaRegex.exec(content)) !== null) {
    const schemaName = match[1];
    schemaNames.push(schemaName);
  }
  
  return schemaNames;
}

/**
 * Generate the src/jobs.ts file
 */
function generateJobsFile() {
  const content = `/**
 * Jobs API TypeScript types
 */

export {
  paths as JobsPaths,
  webhooks as JobsWebhooks,
  components as JobsComponents,
  operations as JobsOperations,
  $defs as Jobs$defs
} from '../jobs';

export type { paths, webhooks, components, operations, $defs } from '../jobs';
`;

  fs.writeFileSync(path.join(SRC_DIR, 'jobs.ts'), content, 'utf-8');
  console.log('✓ Generated src/jobs.ts');
}

/**
 * Generate the src/search.ts file
 */
function generateSearchFile() {
  const searchSchemas = extractSchemaNames(path.join(GENERATED_DIR, 'search.ts'));
  
  const typeExports = searchSchemas
    .map(name => `export type ${name} = components['schemas']['${name}'];`)
    .join('\n');
  
  const content = `/**
 * Search API TypeScript types
 * Auto-generated from OpenAPI schema - do not edit manually
 */

export {
  paths as SearchPaths,
  webhooks as SearchWebhooks,
  components as SearchComponents,
  operations as SearchOperations,
  $defs as Search$defs
} from '../search';

export type { paths, webhooks, components, operations, $defs } from '../search';

// Re-export commonly used schema types for convenience
import type { components } from '../search';

${typeExports}
`;

  fs.writeFileSync(path.join(SRC_DIR, 'search.ts'), content, 'utf-8');
  console.log('✓ Generated src/search.ts');
}

/**
 * Generate the src/index.ts file
 */
function generateIndexFile() {
  const jobsSchemas = extractSchemaNames(path.join(GENERATED_DIR, 'jobs.ts'));
  const searchSchemas = extractSchemaNames(path.join(GENERATED_DIR, 'search.ts'));
  
  // Filter out search schemas that are already in jobs (avoid duplicates)
  // Jobs API is considered the canonical source for shared types
  const uniqueSearchSchemas = searchSchemas.filter(name => !jobsSchemas.includes(name));
  
  // Special handling for Error type from search API to avoid naming conflicts
  const searchTypeExports = uniqueSearchSchemas.map(name => {
    if (name === 'Error') {
      return `export type ApiError = SearchSchemas['schemas']['Error'];`;
    }
    return `export type ${name} = SearchSchemas['schemas']['${name}'];`;
  }).join('\n');
  
  // Generate type exports for jobs schemas
  const jobsTypeExports = jobsSchemas
    .map(name => `export type ${name} = JobsSchemas['schemas']['${name}'];`)
    .join('\n');
  
  const content = `/**
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
${jobsTypeExports}

// Search API types
${searchTypeExports}
`;

  fs.writeFileSync(path.join(SRC_DIR, 'index.ts'), content, 'utf-8');
  console.log('✓ Generated src/index.ts');
}

/**
 * Main function
 */
function main() {
  // Ensure src directory exists
  if (!fs.existsSync(SRC_DIR)) {
    fs.mkdirSync(SRC_DIR, { recursive: true });
  }
  
  console.log('🚀 Generating TypeScript src files...\n');
  
  generateJobsFile();
  generateSearchFile();
  generateIndexFile();
  
  console.log('\n✨ TypeScript src files generated successfully!');
}

main();
