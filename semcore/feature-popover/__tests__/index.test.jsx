import Button from '@semcore/button';
import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import React from 'react';

import FeaturePopover from '../src';

const FeaturePopoverWrapper = ({ children }) => <FeaturePopover>{children}</FeaturePopover>;
const VisibleFeaturePopoverWrapper = ({ children }) => <FeaturePopover visible>{children}</FeaturePopover>;

describe('feature-popover Dependency imports', () => {
  runDependencyCheckTests('feature-popover');
});

describe('FeaturePopover.Trigger', () => {
  runComponentContractTests({
    Component: FeaturePopover.Trigger,
    Wrapper: FeaturePopoverWrapper,
    props: { children: 'Trigger' },
    expectedDataUiName: 'FeaturePopover.Trigger',
    preset: 'root',
    include: ['tag'],
    tagCases: [
      { tag: 'button', expectedTagName: 'BUTTON', props: { type: 'button' } },
      { tag: Button, name: 'Button', expectedTagName: 'BUTTON' },
    ],
  });
});

describe('FeaturePopover.Popper', () => {
  runComponentContractTests({
    Component: FeaturePopover.Popper,
    Wrapper: VisibleFeaturePopoverWrapper,
    expectedDataUiName: 'FeaturePopover.Popper',
    preset: 'root',
    include: ['tag'],
    tagCases: [
      { tag: 'section', expectedTagName: 'SECTION' },
    ],
  });
});
