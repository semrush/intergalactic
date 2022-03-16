import React from 'react';
import { testing } from '@semcore/cli/tools/jest-preset-ui';
const { cleanup, render } = testing;
import { shared as testsShared } from '@semcore/cli/tools/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import ScrollArea from '../src';

describe('ScrollArea', () => {
  afterEach(cleanup);

  shouldSupportClassName(ScrollArea);
  shouldSupportRef(ScrollArea);

  test('should support render function for children', () => {
    const component = <ScrollArea>{() => <ScrollArea.Container />}</ScrollArea>;
    render(component);

    expect(document.querySelectorAll('[data-ui-name="ScrollArea.Container"]').length).toBe(1);
  });
});

describe('ScrollArea.Container', () => {
  afterEach(cleanup);

  shouldSupportClassName(ScrollArea.Container, ScrollArea);
  shouldSupportRef(ScrollArea.Container, ScrollArea);
});
