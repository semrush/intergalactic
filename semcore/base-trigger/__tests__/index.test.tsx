import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';
import NeighborLocation from '@semcore/neighbor-location';

describe('BaseTrigger', () => {
  beforeEach(cleanup);

  shouldSupportClassName(BaseTrigger);
  shouldSupportRef(BaseTrigger);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <BaseTrigger>Button</BaseTrigger>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support "state" prop', async ({ task }) => {
    const component = (
      <>
        <BaseTrigger state='valid'>Button</BaseTrigger>
        <BaseTrigger state='invalid'>Button</BaseTrigger>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support "size" prop', async ({ task }) => {
    const component = (
      <>
        <BaseTrigger size='m'>Button</BaseTrigger>
        <BaseTrigger size='l'>Button</BaseTrigger>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support disabled', async ({ task }) => {
    const component = <BaseTrigger disabled>Button</BaseTrigger>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support neighborLocation', async ({ task }) => {
    const component = (
      <>
        <NeighborLocation>
          <BaseTrigger>Button</BaseTrigger>
          <BaseTrigger>Button</BaseTrigger>
          <BaseTrigger>Button</BaseTrigger>
        </NeighborLocation>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support "placeholder" prop', async ({ task }) => {
    const component = (
      <BaseTrigger empty placeholder='placeholder'>
        Button
      </BaseTrigger>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover', async ({ task }) => {
    const component = <BaseTrigger id='base-trigger'>Button</BaseTrigger>;

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#base-trigger',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = <BaseTrigger id='base-trigger'>Button</BaseTrigger>;

    await expect(
      await snapshot(component, {
        actions: {
          active: '#base-trigger',
        },
      }),
    ).toMatchImageSnapshot(task);
  });
});

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

  test.concurrent('Renders correctly with empty', async ({ task }) => {
    const component = (
      <>
        <LinkTrigger>
          <LinkTrigger.Text empty>LinkTrigger</LinkTrigger.Text>
          <LinkTrigger.Text>LinkTrigger</LinkTrigger.Text>
        </LinkTrigger>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

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
