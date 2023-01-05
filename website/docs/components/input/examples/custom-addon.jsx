import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import Badge from '@semcore/ui/badge';
import Tag from '@semcore/ui/tag';

const Demo = () => {
  const [value, setValue] = useState('heh');

  return (
    <div>
      <Input w={240}>
        <Input.Value
          placeholder="Count some words right here"
          value={value}
          onChange={(v) => setValue(v)}
          maxLength={10}
        />
        <Input.Addon>
          <Tag size="s">{value.length}/10</Tag>
        </Input.Addon>
      </Input>
      <br />
      <br />
      <Input w={240}>
        <Input.Value placeholder="Wow! Such input. So new." />
        <Input.Addon>
          <Badge bg="green">new</Badge>
        </Input.Addon>
      </Input>
    </div>
  );
};

export default Demo;
