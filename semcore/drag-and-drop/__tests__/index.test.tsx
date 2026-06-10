import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('drag-and-drop Dependency imports', () => {
  runDependencyCheckTests('drag-and-drop');
});
