// TODO: add a11y

import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import WidgetEmpty, { NoData, Error, getIconPath } from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';

describe('WidgetEmpty', () => {
  beforeEach(cleanup);

  test('Renders correctly', async () => {
    const component = (
      <WidgetEmpty>
        <WidgetEmpty.Title>Title</WidgetEmpty.Title>
        <WidgetEmpty.Description>Description</WidgetEmpty.Description>
      </WidgetEmpty>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support icon', async () => {
    const component = <WidgetEmpty icon={getIconPath('line-chart')}>WidgetEmpty</WidgetEmpty>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom node icon', async () => {
    const component = <WidgetEmpty icon={<b>ICON</b>}>WidgetEmpty</WidgetEmpty>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('NoData', () => {
  beforeEach(cleanup);

  test('Renders correctly', async () => {
    const component = <NoData />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support content', async () => {
    const component = <NoData>NoData</NoData>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom description', async () => {
    const component = <NoData description={'description'} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom type', async () => {
    const component = <NoData type="line-chart" />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Error', () => {
  beforeEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Error />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support content', async () => {
    const component = <Error>NoData</Error>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom description', async () => {
    const component = <Error description={'description'} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
