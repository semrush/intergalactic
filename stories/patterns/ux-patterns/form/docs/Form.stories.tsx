import type { Meta, StoryObj } from '@storybook/react';
import CheckboxAndRadioExample from './examples/checkbox-and-radio';
import DatepickerAndTimepickerExample from './examples/datepicker-and-timepicker';
import DefaultLogInFormExample from './examples/default-log-in-form';
import InputTagsAndSelectExample from './examples/inputtags-and-select';

import { DefaultLogInFormTest } from './__tests__/DefaultLogInForm.test';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Form',
};

export const CheckboxAndRadio: StoryObj = {
  render: CheckboxAndRadioExample,
};

export const DatepickerAndTimepicker: StoryObj = {
  render: DatepickerAndTimepickerExample,
};

export const DefaultLogInForm: StoryObj = {
  render: DefaultLogInFormExample,
  play: playWrapper(DefaultLogInFormTest),
};

export const InputTagsAndSelect: StoryObj = {
  render: InputTagsAndSelectExample,
};

export default meta;
