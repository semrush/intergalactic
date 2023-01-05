import React from 'react';
import Error, { getIconPath } from '@semcore/ui/errors';
import Button from '@semcore/ui/button';

export default () => (
  <Error icon={getIconPath('confirmation')}>
    <Error.Title>Confirm you are a real person</Error.Title>
    <Error.Description wMax={510}>
      We need to make sure you're not a robot. Please complete the security check, and we'll be out
      of your way.
    </Error.Description>
    <Error.Controls>
      <Button size="l" use="primary" theme="info">
        Submit
      </Button>
    </Error.Controls>
  </Error>
);
