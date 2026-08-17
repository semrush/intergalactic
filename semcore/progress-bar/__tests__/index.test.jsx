import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import ProgressBar from '../src';

describe('progress-bar Dependency imports', () => {
  runDependencyCheckTests('progress-bar');
});

describe('ProgressBar', () => {
  test('Verify data-ui-name', () => {
    const progressBar = (
      <ProgressBar value={50}>
        <ProgressBar.Value />
      </ProgressBar>
    );

    const { container } = render(progressBar);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
