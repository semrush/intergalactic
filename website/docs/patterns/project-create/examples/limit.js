import React from 'react';
import Button from '@semcore/button';
import MathPlusXS from '@semcore/icon/lib/MathPlus/xs';
import Dropdown from '@semcore/dropdown';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button use="primary">
          <Button.Addon tag={MathPlusXS} />
          <Button.Text>Add new Tool Name</Button.Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popper wMax="335px" p={4}>
        <Text tag="p" size={300} bold mb={1}>
          You have reached the limit of projects available on your subscription plan.
        </Text>
        <Text tag="p" size={100} mb={4}>
          Upgrade your plan to get more projects.
        </Text>
        <Button use="primary" theme="success">
          <Button.Text>See plans and pricing</Button.Text>
        </Button>
      </Dropdown.Popper>
    </Dropdown>
  );
};

export default Demo;
