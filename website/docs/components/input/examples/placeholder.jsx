import React from 'react';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <>
      <Input size="l" w={300}>
        <Input.Addon pr="3px">
          <Text color="gray70">Permanent text:</Text>
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <br />
      <br />
      <Input size="l" w={300}>
        <Input.Addon pr="3px">
          <Text color="gray70">Permanent text:</Text>
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <br />
      <br />
      <Input size="m" w={300}>
        <Input.Addon pr="2px">
          <Text color="gray70">Permanent text:</Text>
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <br />
      <br />
      <Input size="s" w={300}>
        <Input.Addon pr="1px">
          <Text color="gray70">Permanent text:</Text>
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
    </>
  );
};

export default Demo;
