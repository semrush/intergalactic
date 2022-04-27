import React from 'react';
import InputMask from '../src';

import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;

describe('InputMask', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputMask);
  shouldSupportRef(InputMask);

  xtest('Should support placeholder', async () => {
    const component = (
      <InputMask size="l" mb={4}>
        <InputMask.Value mask="9999 9999 9999 9999" placeholder="____ ____ ____ ____" value={999} />
      </InputMask>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('InputMask.Value', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputMask.Value, InputMask);
  shouldSupportRef(InputMask.Value, InputMask);
});
