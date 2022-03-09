import React, { useState } from 'react';
import Tooltip from '@semcore/tooltip';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Link from '@semcore/link';

const Demo = () => {
  const [visible, changeVisible] = useState(false);

  const toggleVisibleChange = () => changeVisible(!visible);

  return (
    <Flex justifyContent="space-around" alignItems="center" p={5}>
      <Button onClick={toggleVisibleChange} mr={2}>
        I control the visibility of the tooltip
      </Button>
      <Tooltip title="РI work as usual 👨‍🔧" visible={visible}>
        <Link>Trigger</Link>
      </Tooltip>
    </Flex>
  );
};

export default Demo;
