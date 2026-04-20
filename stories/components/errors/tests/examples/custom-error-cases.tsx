import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Error, { getIconPath } from '@semcore/ui/errors';
import React from 'react';
const Icon = () => (
  <svg height='100' width='100'>
    <circle cx='50' cy='50' r='40' stroke='black' strokeWidth='3' fill='red' />
  </svg>
);
const Demo = () => (
  <Flex direction='column' gap={2}>
    <Error icon={getIconPath('confirmation')} data-testid='icon-title-description-controls'>
      <Error.Title>Confirm you are a real person</Error.Title>
      <Error.Description wMax={510}>
        We need to make sure you're not a robot. Please complete the security check, and we'll be out
        of your way.
      </Error.Description>
      <Error.Controls>
        <Button size='l' use='primary' theme='info'>
          Submit
        </Button>
      </Error.Controls>
    </Error>

    <Error data-testid='title-description-controls'>
      <Error.Title>Horrible error</Error.Title>
      <Error.Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
        dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
        recusandae repellat sit, ut vero voluptates voluptatibus!
      </Error.Description>
      <Error.Controls>
        <Button>Home</Button>
        <Button size='l'>Submit</Button>
      </Error.Controls>
    </Error>

    <Error icon={<Icon />} data-testid='icon-title-description'>
      <Error.Title>Horrible error</Error.Title>
      <Error.Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
        dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
        recusandae repellat sit, ut vero voluptates voluptatibus!
      </Error.Description>
    </Error>

    <Error w={500} data-testid='description-controls'>
      <Error.Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
        dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
        recusandae repellat sit, ut vero voluptates voluptatibus!
      </Error.Description>
      <Error.Controls>
        <Button>Home</Button>
        <Button size='l'>Submit</Button>
      </Error.Controls>
    </Error>

    <Error icon={getIconPath('confirmation')} data-testid='icon-title-controls'>
      <Error.Title>Confirm you are a real person</Error.Title>
      <Error.Controls>
        <Button size='l' use='primary' theme='info'>
          Submit
        </Button>
      </Error.Controls>
    </Error>

    <Error data-testid='title-description'>
      <Error.Title>Horrible error</Error.Title>
      <Error.Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Error.Description>
    </Error>
    ,

  </Flex>
);

export default Demo;
