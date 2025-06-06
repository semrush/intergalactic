import type { Meta, StoryObj } from '@storybook/react-vite';

import { iconPay } from './__tests__/icon_pay.test';
import { iconPlatform } from './__tests__/icon_platform.test';
import { iconSize } from './__tests__/icon_size.test';
import AllIconsGeneratedExample from './examples/all-icons-generated';
import IconsCustomExample from './examples/icon_with_custom_size_color';
import IconColorExample from './examples/icons_color';
import IconOtherElementsExample from './examples/icons_in_other_elements_example';
import IconPayExample from './examples/icons_pay';
import IconPlatformExample from './examples/icons_platform';
import IconTypesExample from './examples/icons_regular';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/Icon/Tests',
};

export default meta;

export const AllIconsGenerated: StoryObj = {
  render: AllIconsGeneratedExample,
};

export const IconRegular: StoryObj = {
  render: IconTypesExample,
  play: playWrapper(iconSize),
};

export const IconColorType: StoryObj = {
  render: IconColorExample,
  play: playWrapper(iconSize),
};

export const IconPay: StoryObj = {
  render: IconPayExample,
  play: playWrapper(iconPay),
};

export const IconsCustom: StoryObj = {
  render: IconsCustomExample,
};

export const IconOtherElements: StoryObj = {
  render: IconOtherElementsExample,
};

export const IconPlatform: StoryObj = {
  render: IconPlatformExample,
  play: playWrapper(iconPlatform),
};
