import React from 'react';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag="label" htmlFor="permanent-placeholder-l-example" size="300">
        Input with L size and permanent placeholder text
      </Text>
      <Box mt={2}>
        <Input size="l" w={300}>
          <Input.Addon pr="3px" id="permanent-placeholder-l-addon">
            <Text color="gray70">Permanent text:</Text>
          </Input.Addon>
          <Input.Value
            placeholder="Placeholder"
            id="permanent-placeholder-l-example"
            aria-labelledby="permanent-placeholder-l-addon"
          />
        </Input>
      </Box>
      <br />
      <br />
      <Text tag="label" htmlFor="permanent-placeholder-m-example" size="200">
        Input with M size and permanent placeholder text
      </Text>
      <Box mt={2}>
        <Input size="m" w={300}>
          <Input.Addon pr="2px" id="permanent-placeholder-m-addon">
            <Text color="gray70">Permanent text:</Text>
          </Input.Addon>
          <Input.Value
            placeholder="Placeholder"
            id="permanent-placeholder-m-example"
            aria-labelledby="permanent-placeholder-m-addon"
          />
        </Input>
      </Box>
    </>
  );
};

export default Demo;
