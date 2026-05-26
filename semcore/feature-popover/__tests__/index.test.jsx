import Button from '@semcore/button';
import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import FeaturePopover from '../src';

const FeaturePopoverWrapper = ({ children }) => <FeaturePopover>{children}</FeaturePopover>;
const VisibleFeaturePopoverWrapper = ({ children }) => <FeaturePopover visible>{children}</FeaturePopover>;

describe('feature-popover Dependency imports', () => {
  runDependencyCheckTests('feature-popover');
});

describe('FeaturePopover.Trigger', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: FeaturePopover.Trigger,
    Wrapper: FeaturePopoverWrapper,
    props: { children: 'Trigger' },
    expectedDataUiName: 'FeaturePopover.Trigger',
  });

  test('Verify supports custom tag', () => {
    const { getByTestId } = render(
      <FeaturePopover>
        <FeaturePopover.Trigger tag='button' type='button' data-testid='button-trigger'>
          Trigger
        </FeaturePopover.Trigger>
        <FeaturePopover.Trigger tag={Button} data-testid='semcore-button-trigger'>
          Trigger
        </FeaturePopover.Trigger>
      </FeaturePopover>,
    );

    expect(getByTestId('button-trigger').tagName).toBe('BUTTON');
    expect(getByTestId('semcore-button-trigger').tagName).toBe('BUTTON');
  });
});

describe('FeaturePopover.Popper', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: FeaturePopover.Popper,
    Wrapper: VisibleFeaturePopoverWrapper,
    expectedDataUiName: 'FeaturePopover.Popper',
  });

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
