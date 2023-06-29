import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';

import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Error, {
  AccessDenied,
  getIconPath,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '../src';
import Button from '@semcore/button';

describe('Error', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
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
          <Button size='l'>Submit</Button>
        </Error.Controls>
      </Error>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly with icon', async ({ task }) => {
    const iconUrl = getIconPath('PageNotFound');
    const component = (
      <Error icon={iconUrl}>
        <Error.Title>Horrible error</Error.Title>
        <Error.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dignissimos
          dolor error explicabo facilis illum in laboriosam maiores officia quia quibusdam quisquam,
          recusandae repellat sit, ut vero voluptates voluptatibus!
        </Error.Description>
      </Error>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with icon as react component', async ({ task }) => {
    const Icon = () => (
      <svg height='100' width='100'>
        <circle cx='50' cy='50' r='40' stroke='black' strokeWidth='3' fill='red' />
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly on small screen', async ({ task }) => {
    const iconUrl = getIconPath('PageNotFound');
    const component = (
      <Error icon={iconUrl}>
        <Error.Title>Horrible error</Error.Title>
        <Error.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Error.Description>
      </Error>
    );
    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 320,
        height: 100,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly AccessDenied', async ({ task }) => {
    const component = <AccessDenied />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly Maintenance', async ({ task }) => {
    const component = <Maintenance toolName='Intergalactic' />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly PageError', async ({ task }) => {
    const component = <PageError />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly PageNotFound', async ({ task }) => {
    const component = <PageNotFound />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly ProjectNotFound', async ({ task }) => {
    const component = <ProjectNotFound />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly on small screen', async () => {
    const { container } = render(
      <Error icon='https://static.semrush.com/ui-kit/illustration/1.1.0/PageNotFound.svg'>
        <Error.Title>Horrible error</Error.Title>
        <Error.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Error.Description>
      </Error>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
