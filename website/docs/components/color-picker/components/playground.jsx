import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import ColorPicker from '@semcore/color-picker';

const Preview = (preview) => {
  const { bool } = preview('ColorPicker');

  const displayLabel = bool({
    key: 'displayLabel',
    defaultValue: false,
    label: 'Show label',
  });

  return (
    <React.Fragment>
      <ColorPicker displayLabel={displayLabel} />
    </React.Fragment>
  );
};

export default PlaygroundGeneration(Preview);
