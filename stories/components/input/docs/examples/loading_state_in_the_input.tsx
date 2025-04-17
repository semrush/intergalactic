import React from 'react';
import Input from '@semcore/input';
import Spin from '@semcore/spin';
import { Text } from '@semcore/typography';
import { Box, ScreenReaderOnly } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loadingStatus, setLoadingStatus] = React.useState<React.ReactNode | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingStatus(<ScreenReaderOnly>Loaded</ScreenReaderOnly>);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [value]);

  React.useEffect(() => {
    if (loading) {
      setLoadingStatus(<Spin size='xs' />);
    } else {
      const timer = setTimeout(() => {
        setLoadingStatus(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  function handlerInput(v: string) {
    setValue(v);
    setLoading(true);
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
            placeholder='Type something to start loading'
            value={value}
            onChange={handlerInput}
          />
          <Input.Addon role='status' aria-live='polite'>
            {loadingStatus}
          </Input.Addon>
        </Input>
      </Box>
    </>
  );
};

export default Demo;
