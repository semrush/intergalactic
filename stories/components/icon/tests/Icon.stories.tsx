import type { Meta } from '@storybook/react';

import AllIconsGeneratedExample from './examples/all-icons-generated';

import IconTypesExample from './examples/icons_regular';
import IconsCustomExample from './examples/icon_with_custom_size_color';
import IconColorExample from './examples/icons_color';
import IconPayExample from './examples/icons_pay';
import IconOtherElementsExample from './examples/icons_in_other_elements_example';
import IconPlatformExample from './examples/icons_platform';

import { iconSize } from './__tests__/icon_size.test';
import { iconPlatform } from './__tests__/icon_platform.test';
import { iconPay } from './__tests__/icon_pay.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/Icon/Tests',
};

export default meta;

export const AllIconsGenerated = {
  render: AllIconsGeneratedExample,
};

export const IconRegular = {
  render: IconTypesExample,
  play: playWrapper(iconSize),
};

export const IconColorType = {
  render: IconColorExample,
  play: playWrapper(iconSize),
};

export const IconPay = {
  render: IconPayExample,
  play: playWrapper(iconPay),
};

export const IconsCustom = {
  render: IconsCustomExample,
};

export const IconOtherElements = {
  render: IconOtherElementsExample,
};

export const IconPlatform = {
  render: IconPlatformExample,
  play: playWrapper(iconPlatform),
};
