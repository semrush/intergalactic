import path from 'path';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('Animation Dependency imports', () => {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const componentPath = path.resolve(__dirname, '../src/Animation.jsx');

  runDependencyCheckTests(packageJsonPath, [componentPath]); 
});
