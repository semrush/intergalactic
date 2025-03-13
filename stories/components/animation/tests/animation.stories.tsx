import type { Meta, StoryObj } from '@storybook/react';

import AnimationExample from './examples/basic-usage';
import AccordionCollapseExample from './examples/in-accordion-collapse';
import FeaturePopoverExample from './examples/animation-feature-popover';
import ModalExample from './examples/in-modal-fadeinout-slide';

const meta: Meta = {
  title: 'Components/Animation/Documentation',
};

export const AnimationBase: StoryObj = {
  render: AnimationExample,
};

export const AccordionCollapse: StoryObj = {
  render: AccordionCollapseExample,
};

export const FeaturePopover: StoryObj = {
  render: FeaturePopoverExample,
};

export const Modal: StoryObj = {
  render: ModalExample,
};

export default meta;
