import React from 'react';
import Input from '@semcore/input';
import Spin from '@semcore/spin';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  function handlerInput(v) {
    setLoading(true);
    setValue(v);
  }

  return (
    <>
      <Text tag='label' htmlFor='loading-example' size={200}>
        Input with loading state
      </Text>
      <Box mt={2}>
        <Input w={300}>
          <Input.Value
            id='loading-example'
            placeholder='Type something to see world spinning...'
            value={value}
            onChange={handlerInput}
          />
          {loading && (
            <Input.Addon>
              <Spin size='xs' />
            </Input.Addon>
          )}
        </Input>
      </Box>
    </>
  );
};

export default Demo;
