import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import SpinContainer from '../src';

describe('spin-container Dependency imports', () => {
  runDependencyCheckTests('spin-container');
});

describe('SpinContainer', () => {
  test('Verify data-ui-name', () => {
    const spinContainer = (
      <SpinContainer loading>
        <SpinContainer.Content>Content</SpinContainer.Content>
        <SpinContainer.Overlay />
      </SpinContainer>
    );

    const { container } = render(spinContainer);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});
