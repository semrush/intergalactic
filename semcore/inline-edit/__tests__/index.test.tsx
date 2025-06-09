import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import InlineEdit from '../src';

describe('inline-edit Dependency imports', () => {
  runDependencyCheckTests('inline-edit');
});

describe('InlineEdit', () => {
  test('Verify throws error when rendered without children', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<InlineEdit />)).toThrow(
      '<InlineEdit /> component cannot be rendered without children',
    );
    errorSpy.mockRestore();
  });
});
