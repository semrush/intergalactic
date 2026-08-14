import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import WidgetEmpty, { Error, NoData } from '../src';

describe('widget-empty Dependency imports', () => {
  runDependencyCheckTests('widget-empty');
});

describe('WidgetEmpty', () => {
  test('Verify data-ui-name', () => {
    const widgetEmpty = (
      <WidgetEmpty>
        <WidgetEmpty.Title>Title</WidgetEmpty.Title>
        <WidgetEmpty.Description>Description</WidgetEmpty.Description>
      </WidgetEmpty>
    );

    const { container } = render(widgetEmpty);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});

describe('WidgetNoData', () => {
  test('Verify data-ui-name', () => {
    const { container } = render(<NoData />);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});

describe('WidgetError', () => {
  test('Verify data-ui-name', () => {
    const { container } = render(<Error />);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});
