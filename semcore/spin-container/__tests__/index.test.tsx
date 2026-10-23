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

  test('Verify Overlay falls back to Spin when children are explicitly undefined', () => {
    const { container } = render(
      <SpinContainer loading>
        <SpinContainer.Content>Content</SpinContainer.Content>
        <SpinContainer.Overlay>{undefined}</SpinContainer.Overlay>
      </SpinContainer>,
    );

    const overlay = container.querySelector('[data-ui-name="SpinContainer.Overlay"]');

    expect(overlay?.querySelector('[data-ui-name="Spin"]')).not.toBeNull();
  });
});
