import type { Meta } from '@storybook/react';

import IconsExample from './examples/icons_in_links';
import inButtonsExample from './examples/icon_in_buttons';
import inButtonsLinkExample from './examples/icon_in_buttonLink';
import inTriggersHintsExample from './examples/icons_triggers_hints_inputs';
import customSizeExample from './examples/icon_with_custom_size';

import { iconSize } from './__tests__/icon_size.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/Icon/Tests',
};

export default meta;

export const Icons = {
  render: IconsExample,
  play: playWrapper(iconSize),
};

export const inButtons = {
  render: inButtonsExample,
  play: playWrapper(iconSize),
};

export const customSize = {
  render: customSizeExample,
};

export const inButtonsLink = {
  render: inButtonsLinkExample,
  play: playWrapper(iconSize),
};

export const inTriggersHints = {
  render: inTriggersHintsExample,
  play: playWrapper(iconSize),
};
