import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import ShowYesXS from '@semcore/ui/icon/ShowYes/m';
import ShowNoXS from '@semcore/ui/icon/ShowNo/m';

const MAP_TYPES = {
  password: 'text',
  text: 'password',
};

const Demo = () => {
  const [type, setType] = useState('password');

  return (
    <Input w={240}>
      <Input.Value defaultValue="IlikeCATS" placeholder="Password" type={type} />
      <Input.Addon
        tag={type === 'password' ? ShowYesXS : ShowNoXS}
        aria-label={type === 'password' ? 'View password' : 'Hide password'}
        interactive
        onClick={() => setType(MAP_TYPES[type])}
      />
    </Input>
  );
};

export default Demo;
