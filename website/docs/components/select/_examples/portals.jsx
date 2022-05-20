import React from 'react';
import Select from '@semcore/select';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => (
  <Flex>
    <Box m="auto" p={5}>
      <Select disablePortal placeholder={'Select something'}>
        <Select.Trigger />
        <Select.Menu>
          <Select.Option value="😎">I got rendered 😎</Select.Option>
        </Select.Menu>
      </Select>
    </Box>
  </Flex>
);

export default Demo;
