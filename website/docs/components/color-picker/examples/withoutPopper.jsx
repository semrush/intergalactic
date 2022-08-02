import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState(null);

  return <ColorPicker value={value} onValueChange={setValue} displayLabel />;
};

export default Demo;
