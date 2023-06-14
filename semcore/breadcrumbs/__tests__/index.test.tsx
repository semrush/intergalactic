import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Breadcrumbs from '../src';

describe('Breadcrumbs', () => {
  beforeEach(cleanup);
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item>first</Breadcrumbs.Item>
        <Breadcrumbs.Item>second</Breadcrumbs.Item>
        <Breadcrumbs.Item>third</Breadcrumbs.Item>
        <Breadcrumbs.Item style={{ opacity: 0.3 }}>four</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Item active renders correctly', async ({ task }) => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item active>first</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover item', async ({ task }) => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item id="breadcrumbs">Dashboard</Breadcrumbs.Item>
        <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item>semrush.com</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#breadcrumbs',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Correctly truncate big text', async ({ task }) => {
    const component = (
      <Breadcrumbs>
        <Breadcrumbs.Item style={{ maxWidth: '125px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
          officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
          nulla odio quis recusandae sed, sequi ut!
        </Breadcrumbs.Item>
      </Breadcrumbs>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
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
