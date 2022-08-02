import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('#2BB3FF');

  return (
    <ColorPicker value={value} onChange={setValue}>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Item value="#8a8bff" />
        <ColorPicker.Item value="#dbdcff" />
        <ColorPicker.Item value="#265687" />
        <ColorPicker.Item value="#82b7ff" />
        <ColorPicker.Item value="#2BB3FF" />
        <ColorPicker.Item value="#978794" />
        <ColorPicker.Item value="#78debd" />
        <ColorPicker.Item value="#1b1b33" />
        <ColorPicker.Item value="#2BB3FF" />
        <ColorPicker.Item value="#a474cd" />
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
