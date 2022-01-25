import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
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
