import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import ActionReturnXS from '@semcore/ui/icon/Return/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <Text tag="label" htmlFor="submit-example">
        Input with submit button
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            placeholder="Focus right here"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            id="submit-example"
          />
          {focus && (
            <Input.Addon interactive tag={ActionReturnXS} aria-label="Submit field value" />
          )}
        </Input>
      </Box>
    </>
  );
};

export default Demo;
