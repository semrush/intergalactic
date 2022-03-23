import React from 'react';

import Button from '@semcore/button';
import FeaturePopover from '@semcore/feature-popover';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const PLACEMENT = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
];

export default PlaygroundGeneration((createGroupWidgets) => {
  const { bool, select, onChange } = createGroupWidgets('FeaturePopover');

  const closeIcon = bool({
    key: 'icon',
    defaultValue: true,
    label: 'Show icon close',
  });

  const visible = bool({
    key: 'visible',
    defaultValue: true,
    label: 'Visible',
  });

  const placement = select({
    key: 'placement',
    defaultValue: 'bottom-start',
    label: 'Placement',
    options: PLACEMENT.map((value) => ({
      name: value,
      value,
    })),
  });

  return (
    <FeaturePopover
      visible={visible}
      placement={placement}
      onVisibleChange={(v) => onChange('visible', v)}
    >
      <FeaturePopover.Trigger>
        <Button>
          Open Popover
          {visible && <FeaturePopover.Spot />}
        </Button>
      </FeaturePopover.Trigger>
      <FeaturePopover.Popper closeIcon={closeIcon} wMax={350}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, atque eveniet
        excepturi fugit illum perspiciatis praesentium sequi totam vel. Consequatur delectus dolorem
        eos itaque numquam officia reprehenderit temporibus ut!
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
});
