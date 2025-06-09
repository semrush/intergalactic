import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicUsageTest } from './__tests__/basic-usage.test';
import { ModalInModalTest } from './__tests__/modal_in_modal.test';
import AccessToInternalHtmlNodesExample from './examples/access_to_internal_html_nodes';
import BasicModalWindowExample from './examples/basic_modal_window_usage';
import ChangingAlignmentExample from './examples/changing_the_alignment';
import ModalWindowHeightBiggerThanBrowserExample from './examples/modal_window_height_is_bigger_than_the_browser_page';
import ModalInsideModalExample from './examples/modal_window_inside_a_modal_window';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/Modal/Documentation',
};

export default meta;

export const AccessToInternalHtmlNodes: StoryObj = {
  render: AccessToInternalHtmlNodesExample,
  play: playWrapper(BasicUsageTest),

};

export const BasicModalWindow: StoryObj = {
  render: BasicModalWindowExample,
  play: playWrapper(BasicUsageTest),

};

export const ChangingAlignment: StoryObj = {
  render: ChangingAlignmentExample,
  play: playWrapper(BasicUsageTest),

};

export const ModalWindowHeightBiggerThanBrowser: StoryObj = {
  render: ModalWindowHeightBiggerThanBrowserExample,
  play: playWrapper(BasicUsageTest),

};

export const ModalInsideModal: StoryObj = {
  render: ModalInsideModalExample,
  play: playWrapper(ModalInModalTest),

};
