import type { Meta } from '@storybook/react';

import IconsExample from './examples/icons_in_links';
import inButtonsExample from './examples/icon_in_buttons';
import inButtonsLinkExample from './examples/icon_in_buttonLink';
import inHintsLinkExample from './examples/icons_triggers_hints_inputs';


const meta: Meta = {
  title: 'Components/Icon/Tests',
};

export default meta;

export const Icons = {
  render: IconsExample,
};

export const inButtons = {
  render: inButtonsExample,
};

export const inButtonsLink = {
  render: inButtonsLinkExample,
};

export const inHintsLink = {
  render: inHintsLinkExample,
};
