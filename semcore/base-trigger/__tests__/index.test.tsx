import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import Spin from '@semcore/spin';
import NeighborLocation from '@semcore/neighbor-location';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('BaseTrigger Dependency imports', () => {
  runDependencyCheckTests('base-trigger');
});

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';
// @ts-ignore
import Tooltip from '@semcore/tooltip';

describe('ButtonTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(ButtonTrigger);
  shouldSupportRef(ButtonTrigger);

  test.concurrent('Renders correctly with Addon', async ({ task }) => {
    const component = (
      <>
        <ButtonTrigger>Button</ButtonTrigger>
        <ButtonTrigger loading>Button</ButtonTrigger>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly without chevron', async ({ task }) => {
    const component = (
      <>
        <ButtonTrigger chevron={false}>Button</ButtonTrigger>
        <ButtonTrigger chevron={false}>
          <Spin size='xs' mx={4} />
        </ButtonTrigger>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

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

  test.concurrent('Should support disabled', async ({ task }) => {
    const component = <FilterTrigger disabled>Disabled</FilterTrigger>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should renders correctly with counter', async ({ task }) => {
    const component = (
      <FilterTrigger>
        <FilterTrigger.Counter aria-labelledby='filter-problems'>99</FilterTrigger.Counter>
        <FilterTrigger.Text id='filter-problems'>Problems</FilterTrigger.Text>
      </FilterTrigger>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = <FilterTrigger id='filter-trigger'>Filter</FilterTrigger>;

    await expect(
      await snapshot(component, {
        actions: {
          active: '#filter-trigger',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active with counter', async ({ task }) => {
    const component = (
      <FilterTrigger id='filter-trigger'>
        <FilterTrigger.Counter aria-labelledby='filter-problems2'>99</FilterTrigger.Counter>
        <FilterTrigger.Text id='filter-problems2'>Problems</FilterTrigger.Text>
      </FilterTrigger>
    );

    await expect(
      await snapshot(component, {
        actions: {
          active: '#filter-trigger',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support clearHint', async ({ task }) => {
    const component = (
      <FilterTrigger empty={false}>
        <FilterTrigger.TriggerButton>Some button content</FilterTrigger.TriggerButton>
        <Tooltip title={'clear trigger hint text'}>
          <FilterTrigger.ClearButton data-testid={'test'} />
        </Tooltip>
      </FilterTrigger>
    );

    const { getByText, getByTestId } = render(component);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');

    expect(getByTestId('test')).toHaveFocus();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(getByText('clear trigger hint text')).toBeTruthy();
  });
});

describe('LinkTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(LinkTrigger);
  shouldSupportRef(LinkTrigger);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <LinkTrigger>LinkTrigger</LinkTrigger>
        <LinkTrigger active>LinkTrigger</LinkTrigger>
        <LinkTrigger loading>LinkTrigger</LinkTrigger>
        <LinkTrigger color='gray20'>LinkTrigger</LinkTrigger>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  // test.skip('Renders correctly with empty', async ({ task }) => {
  //   const component = (
  //     <>
  //       <LinkTrigger>
  //         <LinkTrigger.Text empty>LinkTrigger</LinkTrigger.Text>
  //         <LinkTrigger.Text>LinkTrigger</LinkTrigger.Text>
  //       </LinkTrigger>
  //     </>
  //   );

  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });

  test.concurrent('Should support active', async ({ task }) => {
    const component = <LinkTrigger id='link-trigger'>Filter</LinkTrigger>;

    await expect(
      await snapshot(component, {
        actions: {
          active: '#link-trigger',
        },
      }),
    ).toMatchImageSnapshot(task);
  });
});
