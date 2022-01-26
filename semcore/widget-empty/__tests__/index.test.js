import React from 'react';
import { cleanup } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import WidgetEmpty, { NoData, Error } from '../src';
import snapshot from '@semcore/jest-preset-ui/snapshot';

describe('WidgetEmpty', () => {
  afterEach(cleanup);

  shouldSupportClassName(WidgetEmpty);
  shouldSupportRef(WidgetEmpty);

  test('Renders correctly WidgetEmpty', async () => {
    const component = (
      <WidgetEmpty icon="line-chart">
        <WidgetEmpty.Title>Title</WidgetEmpty.Title>
        <WidgetEmpty.Description>Description</WidgetEmpty.Description>
      </WidgetEmpty>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly NoData', async () => {
    const component = (
      <NoData description="Description" type="line-chart">
        No Data
      </NoData>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly Error', async () => {
    const component = <Error description="Description">Error</Error>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('WidgetEmpty.Title', () => {
  afterEach(cleanup);
  shouldSupportClassName(WidgetEmpty.Title, WidgetEmpty);
  shouldSupportRef(WidgetEmpty.Title, WidgetEmpty);
});

describe('WidgetEmpty.Description', () => {
  afterEach(cleanup);
  shouldSupportClassName(WidgetEmpty.Description, WidgetEmpty);
  shouldSupportRef(WidgetEmpty.Description, WidgetEmpty);
});
