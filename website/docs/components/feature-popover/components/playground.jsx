import React from 'react';

import Button from '@semcore/ui/button';
import FeaturePopover from '@semcore/ui/feature-popover';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

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
    label: 'Show Close icon',
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
        With this new feature, users can now enjoy improved user experience, or expanded
        capabilities.
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
});
