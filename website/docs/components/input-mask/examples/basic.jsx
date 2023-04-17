import React from 'react';
import InputMask from '@semcore/ui/input-mask';
import { Text } from '@semcore/ui/typography';

export default () => {
  return (
    <>
      <Text tag="label" htmlFor="basic-example" size="300">
        Card number
      </Text>
      <InputMask w={300}>
        <InputMask.Value
          mask="9999 9999 9999 9999"
          placeholder="____ ____ ____ ____"
          title="16-digit number"
          id="basic-example"
        />
      </InputMask>
    </>
  );
};
