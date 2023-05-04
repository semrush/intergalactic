import React, { useEffect, useState } from 'react';
import Input from '@semcore/ui/input';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

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
    <>
      <Text tag="label" htmlFor="loading-example" size="200">
        Input with loading state
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            id="loading-example"
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
      </Box>
    </>
  );
};

export default Demo;
