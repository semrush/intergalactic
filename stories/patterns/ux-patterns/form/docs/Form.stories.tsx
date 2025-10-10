import type { Meta, StoryObj } from '@storybook/react-vite';

import { DefaultLogInFormTest } from './__tests__/DefaultLogInForm.test';
import DatepickerAndTimepickerExample from './examples/datepicker-and-timepicker';
import DefaultLogInFormExample from './examples/default-log-in-form';
import InputTagsAndSelectExample from './examples/inputtags-and-select';
import RadioAndSelectExample from './examples/radio-and-select';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Form',
};

export const RadioAndSelect: StoryObj = {
  render: RadioAndSelectExample,
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
