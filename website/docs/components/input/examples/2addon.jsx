import React, { useState } from 'react';
import Input from '@semcore/input';
import Link from '@semcore/link';
import CloseXS from '@semcore/icon/Close/m';
import ShowYesXS from '@semcore/icon/ShowYes/m';
import ShowNoXS from '@semcore/icon/ShowNo/m';

const MAP_TYPES = {
  password: 'text',
  text: 'password',
};

const Demo = () => {
  const [value, setValue] = useState('');
  const [type, setType] = useState('password');

  return (
    <Input w={360}>
      <Input.Value
        placeholder="Baby, don't forget to take your PASSWORD"
        defaultValue="IlikeCATS"
        type={type}
        value={value}
        onChange={(v) => setValue(v)}
      />
      {value && (
        <Input.Addon pl={2} pr={1} interactive onClick={() => setValue('')}>
          <CloseXS />
        </Input.Addon>
      )}
      <Input.Addon px={1}>
        <Link>Forget?</Link>
      </Input.Addon>
      <Input.Addon pl={1} pr={2} interactive onClick={() => setType(MAP_TYPES[type])}>
        {type === 'password' ? <ShowYesXS /> : <ShowNoXS />}
      </Input.Addon>
    </Input>
  );
};

export default Demo;
