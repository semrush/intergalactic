import type { Meta, StoryObj } from '@storybook/react';

import AccessToInternalHtmlNodesExample from './examples/access_to_internal_html_nodes';
import BasicModalWindowExample from './examples/basic_modal_window_usage';
import ChangingAlignmentExample from './examples/changing_the_alignment';
import ModalWindowHeightBiggerThanBrowserExample from './examples/modal_window_height_is_bigger_than_the_browser_page';
import ModalInsideModalExample from './examples/modal_window_inside_a_modal_window';

const meta: Meta = {
  title: 'Components/Modal/Documentation',
};

export default meta;

export const AccessToInternalHtmlNodes: StoryObj = {
  render: AccessToInternalHtmlNodesExample,
};

export const BasicModalWindow: StoryObj = {
  render: BasicModalWindowExample,
};

export const ChangingAlignment: StoryObj = {
  render: ChangingAlignmentExample,
};

export const ModalWindowHeightBiggerThanBrowser: StoryObj = {
  render: ModalWindowHeightBiggerThanBrowserExample,
};

export const ModalInsideModal: StoryObj = {
  render: ModalInsideModalExample,
};

