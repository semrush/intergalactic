import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';

describe('BaseTrigger Dependency imports', () => {
  runDependencyCheckTests('base-trigger');
});

describe('BaseTrigger', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const baseTrigger = (
      <BaseTrigger>
        <BaseTrigger.Addon />
        <BaseTrigger.Text />
      </BaseTrigger>
    );

    const { container } = render(baseTrigger);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});

describe('ButtonTrigger', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const buttonTrigger = (
      <ButtonTrigger>
        <ButtonTrigger.Addon />
        <ButtonTrigger.Text />
      </ButtonTrigger>
    );

    const { container } = render(buttonTrigger);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test.concurrent('Should work as button with labels', async () => {
    const component = (
      <>
        <label htmlFor='trigger' id='label' data-testid='label'>
          Test for button
        </label>
        <ButtonTrigger id='trigger' data-testid='buttonTrigger'>
          Button
        </ButtonTrigger>
      </>
    );
    const { getByTestId } = render(component);
    await userEvent.click(getByTestId('label'));

    expect(getByTestId('buttonTrigger')).toHaveFocus();
  });
});

describe('LinkTrigger', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const linkTrigger = (
      <LinkTrigger>
        <LinkTrigger.Addon />
        <LinkTrigger.Text />
      </LinkTrigger>
    );

    const { container } = render(linkTrigger);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});

describe('FilterTrigger', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const filterTrigger = (
      <FilterTrigger empty={false} onClear={() => {}}>
        <FilterTrigger.Text>Filter trigger</FilterTrigger.Text>
        <FilterTrigger.Counter count={2} />
      </FilterTrigger>
    );

    const { container } = render(filterTrigger);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
