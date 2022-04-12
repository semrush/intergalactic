import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import Error from '../src';
import Button from '@semcore/button';

describe('Error', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = (
      <Error>
        <Error.Title>Horrible error</Error.Title>
        <Error.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
          dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
          recusandae repellat sit, ut vero voluptates voluptatibus!
        </Error.Description>
        <Error.Controls>
          <Button>Home</Button>
          <Button size="l">Submit</Button>
        </Error.Controls>
      </Error>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Render correctly with icon', async () => {
    const component = (
      <Error icon="https://static.semrush.com/ui-kit/errors/1.3.0/page_not_found.svg">
        <Error.Title>Horrible error</Error.Title>
        <Error.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
          dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
          recusandae repellat sit, ut vero voluptates voluptatibus!
        </Error.Description>
      </Error>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with icon as react component', async () => {
    const Icon = () => (
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
      </svg>
    );
    const component = (
      <Error icon={<Icon />}>
        <Error.Title>Horrible error</Error.Title>
        <Error.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
          dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
          recusandae repellat sit, ut vero voluptates voluptatibus!
        </Error.Description>
      </Error>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
