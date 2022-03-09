import React from 'react';

import Button from '@semcore/button';
import FeaturePopover from '@semcore/feature-popover';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration((createGroupWidgets) => {
  const { bool, onChange } = createGroupWidgets('FeaturePopover');

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

  return (
    <FeaturePopover visible={visible} onVisibleChange={(v) => onChange('visible', v)}>
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
