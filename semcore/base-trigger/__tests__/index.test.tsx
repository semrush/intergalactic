import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('BaseTrigger Dependency imports', () => {
  runDependencyCheckTests('base-trigger');
});

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';
// @ts-ignore
import Tooltip from '@semcore/tooltip';

describe('BaseTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(BaseTrigger);
  shouldSupportRef(BaseTrigger);
});

describe('ButtonTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(ButtonTrigger);
  shouldSupportRef(ButtonTrigger);

  test.concurrent('Should work as button with labels', async ({ expect }) => {
    const component = (
      <>
        <label htmlFor={'trigger'} id={'label'} data-testid={'label'}>
          Test for button
        </label>
        <ButtonTrigger id={'trigger'} data-testid={'buttonTrigger'}>
          Button
        </ButtonTrigger>
      </>
    );
    const { getByTestId } = render(component);
    await userEvent.click(getByTestId('label'));

    expect(getByTestId('buttonTrigger')).toHaveFocus();
  });
});

describe('FilterTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FilterTrigger);
  shouldSupportRef(FilterTrigger);
});

describe('LinkTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(LinkTrigger);
  shouldSupportRef(LinkTrigger);
});
