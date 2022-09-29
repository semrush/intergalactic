import React, { useState } from 'react';
import Input from '@semcore/input';
import ShowYesXS from '@semcore/icon/ShowYes/m';
import ShowNoXS from '@semcore/icon/ShowNo/m';

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
        tag={type === 'password' ? <ShowYesXS /> : <ShowNoXS />}
        aria-label={type === 'password' ? 'View password' : 'Hide password'}
        interactive
        onClick={() => setType(MAP_TYPES[type])}
      />
    </Input>
  );
};

export default Demo;
