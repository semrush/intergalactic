import React from 'react';
import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';
import Button from '@semcore/button';

const Demo = () => {
  return (
    <Flex>
      <Tooltip
        theme="warning"
        title="Oh no, it's an error text. Don't forget to write some user-friendly words for your users ☝🏻"
        interaction="focus"
      >
        <Input state="invalid">
          <Input.Value />
        </Input>
      </Tooltip>
      <Tooltip
        title="Oh no, it's an error text. Don't forget to write some user-friendly words for your users ☝🏻"
        interaction="click"
      >
        <Button ml={4}>Click me</Button>
      </Tooltip>
    </Flex>
  );
};

export default Demo;
