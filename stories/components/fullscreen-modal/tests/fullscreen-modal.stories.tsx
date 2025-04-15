import type { Meta, StoryObj } from '@storybook/react';

import DisablePortalVisibleExample from './examples/disable-portal-visible';
import ModalPropsExample from './examples/modal-props';
import WithSpinContainerExample from './examples/with-spin-container';

import CloseTitleDescriptionExample from './examples/header/close-title-description';
import CloseBackTitleDescriptionExample from './examples/header/close-back-title-description';
import TitleDescriptionExample from './examples/header/title-description';
import BackWithoutTextClose1bthFooterExample from './examples/header/back-no-text-close-no-header-1bth-footer';
import BackAndTitleBody400Example from './examples/header/back-and-title-bodyh400-2btn-footer';
import CloseInHeaderExample from './examples/header/close-in-header';


const meta: Meta = {
  title: 'Components/FullscreenModal/Tests',
};

export const DisablePortalVisible: StoryObj = {
  render: DisablePortalVisibleExample,
};

export const WithSpinContainer: StoryObj = {
    render: WithSpinContainerExample,
  };
  
export const ModalProps: StoryObj = {
    render: ModalPropsExample,
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
