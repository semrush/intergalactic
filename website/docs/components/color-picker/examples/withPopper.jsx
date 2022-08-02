import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');

  return (
    <ColorPicker value={value} onChange={setValue}>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors
          colors={[
            '#FF5733',
            '#8E3B29',
            '#B0E727',
            '#27D3E7',
            '#2D747C',
            '#6ad0de',
            '#6E2D7C',
            '#E199F1',
            '#98848D',
            '#E4E868',
          ]}
        />
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
