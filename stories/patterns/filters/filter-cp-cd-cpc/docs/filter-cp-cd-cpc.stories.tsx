import type { Meta, StoryObj } from '@storybook/react-vite';

import { ClickPotentialCompetitiveDensityCPCTest } from './__tests__/filter-cp-cd-cpc.test';
import ClickPotentialCompetitiveDensityCPCExample from './examples/basic-example';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/ClickPotentialCompetitiveDensityCPC',
};

export default meta;

export const ClickPotentialCompetitiveDensityCPC: StoryObj = {
  render: ClickPotentialCompetitiveDensityCPCExample,
  play: playWrapper(ClickPotentialCompetitiveDensityCPCTest),
};
