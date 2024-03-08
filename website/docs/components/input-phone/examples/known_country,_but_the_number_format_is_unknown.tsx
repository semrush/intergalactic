import React from 'react';
import Input from 'intergalactic/input';
import Flag from 'intergalactic/flags';
import CloseM from 'intergalactic/icon/Close/m';

const Demo = () => {
  const [value, setValue] = React.useState('+1');
  return (
    <Input w={180}>
      <Input.Addon>
        <Flag iso2='US' />
      </Input.Addon>
      <Input.Value value={value} onChange={(v) => setValue(v)} />
      {Number.parseInt(value, 10) > 2 && (
        <Input.Addon
          tag={CloseM}
          interactive
          aria-label='Clear field'
          onClick={() => setValue('+1')}
        />
      )}
    </Input>
  );
};

export default Demo;
