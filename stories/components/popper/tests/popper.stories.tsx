import type { Meta, StoryObj } from '@storybook/react';

import CursorAnchoringExample from './examples/cursor-anchoring';
import DisablePortalExample from './examples/disable-portal';
import DropdownExample from './examples/dropdown';
import FocusInteractionExample from './examples/focus-interaction';
import HoverInteractionExample from './examples/hover-interaction';
import LabelReferencedExample from './examples/label-referenced';
import LabelWrappedExample from './examples/label-wrapped';
import LabelWrappedDisablePortalExample from './examples/label-wrapped-disable-portal';
import MultipleFocusabledInTriggerExample from './examples/multiple-focusables-in-trigger';
import PageResizingExample from './examples/page-resizing';

const meta: Meta = {
  title: 'Components/Popper/Tests',
};
export default meta;

export const CursorAnchoring: StoryObj = {
  render: CursorAnchoringExample,
};

export const DisablePortal: StoryObj = {
  render: DisablePortalExample,
};

export const Dropdown: StoryObj = {
  render: DropdownExample,
};

export const FocusInteraction: StoryObj = {
    render: FocusInteractionExample,
  };

  export const HoverInteraction: StoryObj = {
    render: HoverInteractionExample,
  };

  export const LabelReferenced: StoryObj = {
    render: LabelReferencedExample,
  };

  export const LabelWrapped: StoryObj = {
    render: LabelWrappedExample,
  };

  export const LabelWrappedDisablePortal: StoryObj = {
    render: LabelWrappedDisablePortalExample,
  };

  export const MultipleFocusabledInTrigger: StoryObj = {
    render: MultipleFocusabledInTriggerExample,
  };

  export const PageResizing: StoryObj = {
    render: PageResizingExample,
  };