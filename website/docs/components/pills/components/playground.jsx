import React from 'react';
import Pills from '@semcore/pills';
import PlaygroundGeneration from 'components/PlaygroundGeneration';
import LikeM from '@semcore/icon/Like/m';
import LikeL from '@semcore/icon/Like/l';

// LikeOutlineM.displayName = LikeOutlineS.displayName = LikeOutlineXS.displayName =
//   'LikeOutline';

const SIZE_ADDON = {
  s: <LikeM />,
  m: <LikeM />,
  l: <LikeL />,
  xl: <LikeL />,
};

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, empty, onChange } = createGroupWidgets('Pill');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['s', 'm', 'l', 'xl'],
    });

    const selected = empty({
      key: 'selected',
      defaultValue: 1,
    });
    const before = bool({
      key: 'addon left',
      defaultValue: false,
      label: 'Addon Left',
    });
    const after = bool({
      key: 'addon right',
      defaultValue: false,
      label: 'Addon Right',
    });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    return (
      <Pills size={size} onChange={(v) => onChange('selected', v)} value={selected}>
        <Pills.Item value={1}>
          {before && <Pills.Item.Addon>{SIZE_ADDON[size]}</Pills.Item.Addon>}
          <Pills.Item.Text>Pill 1</Pills.Item.Text>
          {after && <Pills.Item.Addon>{SIZE_ADDON[size]}</Pills.Item.Addon>}
        </Pills.Item>
        <Pills.Item value={2} disabled={disabled}>
          Pill 2
        </Pills.Item>
        <Pills.Item value={3}>Pill 3</Pills.Item>
      </Pills>
    );
  },
  {
    filterProps: ['onChange'],
  },
);
