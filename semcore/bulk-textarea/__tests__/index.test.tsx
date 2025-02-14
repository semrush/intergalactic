import path from 'path';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('Dependency imports', () => {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const componentPath = path.resolve(__dirname, '../src/BulkTextarea.tsx');
  const typesPath = path.resolve(__dirname, '../src/BulkTextarea.types.ts');

  runDependencyCheckTests(packageJsonPath, [componentPath, typesPath]);
});
