import type { Meta, StoryObj } from '@storybook/react';

import ClickPotentialCompetitiveDensityCPCExample from './examples/basic-example';

import { ClickPotentialCompetitiveDensityCPCTest } from './__tests__/filter-cp-cd-cpc.test';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/ClickPotentialCompetitiveDensityCPC',
};

export default meta;

export const ClickPotentialCompetitiveDensityCPC: StoryObj = {
  render: ClickPotentialCompetitiveDensityCPCExample,
  play: playWrapper(ClickPotentialCompetitiveDensityCPCTest),
};
