import React from 'react';
import ColorPicker from '@semcore/color-picker';

const Demo = () => {
  const [value, setValue] = React.useState('#FF8C43');

  return <ColorPicker value={value} onChange={setValue} />;
};

export default Demo;
