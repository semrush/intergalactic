import React, { useState } from 'react';
import Input from '@semcore/input';
import Link from '@semcore/link';
import CloseXS from '@semcore/icon/lib/Close/m';
import ShowYesXS from '@semcore/icon/lib/ShowYes/m';
import ShowNoXS from '@semcore/icon/lib/ShowNo/m';

const MAP_ICON = {
  password: ShowYesXS,
  text: ShowNoXS,
};

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
        <Input.Addon pl={2} pr={1} tag={CloseXS} interactive onClick={() => setValue('')} />
      )}
      <Input.Addon px={1}>
        <Link>Forget?</Link>
      </Input.Addon>
      <Input.Addon
        pl={1}
        pr={2}
        tag={MAP_ICON[type]}
        interactive
        onClick={() => setType(MAP_TYPES[type])}
      />
    </Input>
  );
};

export default Demo;
