import type { Meta, StoryObj } from '@storybook/react';

import KnownCountryAndNumberFormatExample from './examples/known_country_and_number_format';
import KnownCountryButNumberFormatUnknownExample from './examples/known_country_but_the_number_format_is_unknown';
import UnknownCountryAndNumberFormatExample from './examples/unknown_country_and_number_format';

const meta: Meta = {
  title: 'Components/InputPhone/Documentation',
};

export default meta;

export const KnownCountryAndNumberFormat: StoryObj = {
  render: KnownCountryAndNumberFormatExample,
};

export const KnownCountryButNumberFormatUnknown: StoryObj = {
  render: KnownCountryButNumberFormatUnknownExample,
};

export const UnknownCountryAndNumberFormat: StoryObj = {
  render: UnknownCountryAndNumberFormatExample,
};
