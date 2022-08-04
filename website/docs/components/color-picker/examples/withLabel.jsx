import React from 'react';
import ColorPicker from '@semcore/color-picker';

const Demo = () => {
  const [value, setValue] = React.useState(null);

  return <ColorPicker value={value} onValueChange={setValue} displayLabel />;
};

export default Demo;
