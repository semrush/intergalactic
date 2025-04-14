import type { Meta, StoryObj } from '@storybook/react';

import BasicExample from './examples/test';


import ModalPropsExample from './examples/modal-props';

import CloseTitleDescriptionExample from './examples/header/close-title-description';
import CloseBackTitleDescriptionExample from './examples/header/close-back-title-description';
import TitleDescriptionExample from './examples/header/title-description';
import BackWithoutTextClose1bthFooterExample from './examples/header/back-no-text-close-no-header-1bth-footer';
import BackAndTitleBody400Example from './examples/header/back-and-title-bodyh400-2btn-footer';
import CloseInHeaderExample from './examples/header/close-in-header';


const meta: Meta = {
  title: 'Components/FullscreenModal/Header/Tests',
};

export const Basic: StoryObj = {
  render: BasicExample,
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
