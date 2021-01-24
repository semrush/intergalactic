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
        Я управляю видимостью тултипа
      </Button>
      <Tooltip title="Работаю в обычном режиме 👨‍🔧" visible={visible}>
        <Link>Trigger</Link>
      </Tooltip>
    </Flex>
  );
};

export default Demo;
