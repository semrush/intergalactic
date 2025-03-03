import type { Meta, StoryObj } from '@storybook/react';

import CursorAnchoringExample from './examples/cursor-anchoring';
import DisablePortalExample from './examples/dropdown-disable-portal';
import DropdownExample from './examples/dropdown-no-disable-portal';
import FocusInteractionExample from './examples/interaction-focus';
import HoverInteractionExample from './examples/interaction-hover';
import ClickInteractionExample from './examples/interaction-click';
import NoneInteractionExample from './examples/interaction-none';
import LabelReferencedExample from './examples/label-referenced';
import LabelWrappedExample from './examples/label-wrapped';
import LabelWrappedDisablePortalExample from './examples/label-wrapped-disable-portal';
import MultipleFocusabledInTriggerExample from './examples/multiple-focusables-in-trigger';
import PageResizingExample from './examples/page-resizing';
import offSetExample from './examples/offSet';
import disableEnforceFocusExample from './examples/disableEnforceFocus';
import SomeMorePropsExample from './examples/some-more-props-test';

const meta: Meta = {
  title: 'Components/Popper/Tests',
};
export default meta;

export const offSet: StoryObj = {
  render: offSetExample,
}; 

export const disableEnforceFocus: StoryObj = {
  render: disableEnforceFocusExample,
}; 

export const SomeMoreProps: StoryObj = {
  render: SomeMorePropsExample,
}; 

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

  export const ClickInteraction: StoryObj = {
    render: ClickInteractionExample,
  };

  export const NoneInteraction: StoryObj = {
    render: NoneInteractionExample,
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