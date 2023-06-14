// TODO: add a11y

import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import WidgetEmpty, { NoData, Error, getIconPath } from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';

describe('WidgetEmpty', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <WidgetEmpty>
        <WidgetEmpty.Title>Title</WidgetEmpty.Title>
        <WidgetEmpty.Description>Description</WidgetEmpty.Description>
      </WidgetEmpty>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support icon', async ({ task }) => {
    const component = <WidgetEmpty icon={getIconPath('line-chart')}>WidgetEmpty</WidgetEmpty>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom node icon', async ({ task }) => {
    const component = <WidgetEmpty icon={<b>ICON</b>}>WidgetEmpty</WidgetEmpty>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('NoData', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <NoData />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support content', async ({ task }) => {
    const component = <NoData>NoData</NoData>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom description', async ({ task }) => {
    const component = <NoData description={'description'} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom type', async ({ task }) => {
    const component = <NoData type="line-chart" />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('Error', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Error />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support content', async ({ task }) => {
    const component = <Error>NoData</Error>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom description', async ({ task }) => {
    const component = <Error description={'description'} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
