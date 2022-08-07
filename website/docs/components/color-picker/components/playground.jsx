import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import ColorPicker from '@semcore/color-picker';

const Preview = () => {
  const [value, setValue] = React.useState('#FDC23C');
  return <ColorPicker value={value} onChange={setValue} />;
};

export default PlaygroundGeneration(Preview);
