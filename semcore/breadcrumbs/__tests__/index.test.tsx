import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { axe, render, cleanup } = testing;

import Breadcrumbs from '../src';

describe('Breadcrumbs', () => {
  afterEach(cleanup);
  test('Renders correctly', async () => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item>first</Breadcrumbs.Item>
        <Breadcrumbs.Item>second</Breadcrumbs.Item>
        <Breadcrumbs.Item>third</Breadcrumbs.Item>
        <Breadcrumbs.Item style={{ opacity: 0.3 }}>four</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Item active renders correctly', async () => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item active>first</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hover item', async () => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item id="breadcrumbs">Dashboard</Breadcrumbs.Item>
        <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item>semrush.com</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    expect(
      await snapshot(component, {
        actions: {
          hover: '#breadcrumbs',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Correctly truncate big text', async () => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item style={{ maxWidth: '125px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
          officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
          nulla odio quis recusandae sed, sequi ut!
        </Breadcrumbs.Item>
      </Breadcrumbs>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Breadcrumbs>
        <Breadcrumbs.Item>first</Breadcrumbs.Item>
        <Breadcrumbs.Item>second</Breadcrumbs.Item>
        <Breadcrumbs.Item>third</Breadcrumbs.Item>
        <Breadcrumbs.Item style={{ opacity: 0.3 }}>four</Breadcrumbs.Item>
      </Breadcrumbs>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
