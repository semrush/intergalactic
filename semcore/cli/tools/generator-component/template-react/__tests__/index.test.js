import React from 'react';
import { snapshot, shared, testing } from 'disable-jest-mapper:@semcore/cli/tools/jest-preset-ui';
import {{ properCase name }} from '../src';

const  { render, fireEvent, cleanup } = testing
const { shouldSupportClassName, shouldSupportRef } = shared;

describe('{{ properCase name }}', () => {
  afterEach(cleanup);

  shouldSupportClassName({{ properCase name }});
  shouldSupportRef({{ properCase name }});
});
