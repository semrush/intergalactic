import React from 'react';
import { cleanup } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import WidgetEmpty from '../src';

describe('WidgetEmpty', () => {
  afterEach(cleanup);

  shouldSupportClassName(WidgetEmpty);
  shouldSupportRef(WidgetEmpty);
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
