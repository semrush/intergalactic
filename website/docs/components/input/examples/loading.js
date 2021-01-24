import React, { useEffect, useState } from 'react';
import Input from '@semcore/input';
import Spin from '@semcore/spin';

const Demo = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  function handlerInput(v) {
    setLoading(true);
    setValue(v);
  }

  return (
    <Input w={240}>
      <Input.Value
        placeholder="Type something to see world spinning..."
        value={value}
        onChange={handlerInput}
      />
      {loading && (
        <Input.Addon>
          <Spin size="xs" />
        </Input.Addon>
      )}
    </Input>
  );
};

export default Demo;
