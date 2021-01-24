import React, { useState } from 'react';
import Input from '@semcore/input';
import ShowYesXS from '@semcore/icon/lib/ShowYes/xs';
import ShowNoXS from '@semcore/icon/lib/ShowNo/xs';

const MAP_ICON = {
  password: ShowYesXS,
  text: ShowNoXS,
};

const MAP_TYPES = {
  password: 'text',
  text: 'password',
};

const Demo = () => {
  const [type, setType] = useState('password');

  return (
    <Input w={240}>
      <Input.Value defaultValue="IlikeCATS" placeholder="Password" type={type} />
      <Input.Addon tag={MAP_ICON[type]} interactive onClick={() => setType(MAP_TYPES[type])} />
    </Input>
  );
};

export default Demo;
