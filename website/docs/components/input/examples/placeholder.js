import React from 'react';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <>
      <Input size="xl" w={300}>
        <Input.Addon tag={Text} color="gray70" pr="3px">
          Permanent text:
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <br />
      <br />
      <Input size="l" w={300}>
        <Input.Addon tag={Text} color="gray70" pr="3px">
          Permanent text:
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <br />
      <br />
      <Input size="m" w={300}>
        <Input.Addon tag={Text} color="gray70" pr="2px">
          Permanent text:
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <br />
      <br />
      <Input size="s" w={300}>
        <Input.Addon tag={Text} color="gray70" pr="1px">
          Permanent text:
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
    </>
  );
};

export default Demo;
