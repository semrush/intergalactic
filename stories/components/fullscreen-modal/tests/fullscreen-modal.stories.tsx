import type { Meta, StoryObj } from '@storybook/react-vite';

import DisablePortalVisibleExample from './examples/disable-portal-visible';
import BackAndTitleBody400Example from './examples/header/back-and-title-bodyh400-2btn-footer';
import BackWithoutTextClose1bthFooterExample from './examples/header/back-no-text-close-no-header-1bth-footer';
import CloseBackTitleDescriptionExample from './examples/header/close-back-title-description';
import CloseInHeaderExample from './examples/header/close-in-header';
import CloseTitleDescriptionExample from './examples/header/close-title-description';
import TitleDescriptionExample from './examples/header/title-description';
import ModalPropsExample, { defaultProps } from './examples/modal-props';
import ScrollTestExample from './examples/scroll-test';
import WithSpinContainerExample from './examples/with-spin-container';

const meta: Meta = {
  title: 'Components/FullscreenModal/Tests',
};

export const DisablePortalVisible: StoryObj = {
  render: DisablePortalVisibleExample,
};

export const ScrollTest: StoryObj = {
  render: ScrollTestExample,
};

export const WithSpinContainer: StoryObj = {
  render: WithSpinContainerExample,
};

export const ModalProps: StoryObj = {
  render: ModalPropsExample,
  argTypes: {
    closable: {
      control: { type: 'boolean' },
    },
  },
  args: defaultProps,
};

export const CloseTitleDescription: StoryObj = {
  render: CloseTitleDescriptionExample,
};

export const CloseBackTitleDescription: StoryObj = {
  render: CloseBackTitleDescriptionExample,
};

export const TitleDescription: StoryObj = {
  render: TitleDescriptionExample,
};

export const BackWithoutTextClose1bthFooter: StoryObj = {
  render: BackWithoutTextClose1bthFooterExample,
};

export const BackAndTitleBody400: StoryObj = {
  render: BackAndTitleBody400Example,
};

export const CloseInHeader: StoryObj = {
  render: CloseInHeaderExample,
};

export default meta;
