import Button from '@semcore/button';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import FeaturePopover from '../src';

describe('feature-popover Dependency imports', () => {
  runDependencyCheckTests('feature-popover');
});

describe('FeaturePopover.Popper', () => {
  beforeEach(cleanup);

  test('Verify supports custom tag', () => {
    const { getByTestId } = render(
      <FeaturePopover visible>
        <FeaturePopover.Trigger>Trigger</FeaturePopover.Trigger>
        <FeaturePopover.Popper tag='section' data-testid='popper' />
      </FeaturePopover>,
    );

    expect(getByTestId('popper').tagName).toBe('SECTION');
  });
});
