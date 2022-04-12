import React from 'react';
import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';
import NeighborLocation from '@semcore/neighbor-location';

describe('BaseTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(BaseTrigger);
  shouldSupportRef(BaseTrigger);

  test('Renders correctly', async () => {
    const component = <BaseTrigger>Button</BaseTrigger>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support "state" prop', async () => {
    const component = (
      <>
        <BaseTrigger state="valid">Button</BaseTrigger>
        <BaseTrigger state="invalid">Button</BaseTrigger>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support "size" prop', async () => {
    const component = (
      <>
        <BaseTrigger size="m">Button</BaseTrigger>
        <BaseTrigger size="l">Button</BaseTrigger>
        <BaseTrigger size="xl">Button</BaseTrigger>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support disabled', async () => {
    const component = <BaseTrigger disabled>Button</BaseTrigger>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support neighborLocation', async () => {
    const component = (
      <>
        <NeighborLocation>
          <BaseTrigger>Button</BaseTrigger>
          <BaseTrigger>Button</BaseTrigger>
          <BaseTrigger>Button</BaseTrigger>
        </NeighborLocation>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support "placeholder" prop', async () => {
    const component = (
      <BaseTrigger empty placeholder="placeholder">
        Button
      </BaseTrigger>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('ButtonTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(ButtonTrigger);
  shouldSupportRef(ButtonTrigger);

  test('Renders correctly with Addon', async () => {
    const component = (
      <>
        <ButtonTrigger>Button</ButtonTrigger>
        <ButtonTrigger loading>Button</ButtonTrigger>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('FilterTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(FilterTrigger);
  shouldSupportRef(FilterTrigger);

  test('Should support disabled', async () => {
    const component = <FilterTrigger disabled>Disabled</FilterTrigger>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should renders correctly with counter', async () => {
    const component = (
      <FilterTrigger>
        <FilterTrigger.Counter>99</FilterTrigger.Counter>
        <FilterTrigger.Text>Problems</FilterTrigger.Text>
      </FilterTrigger>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('LinkTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(LinkTrigger);
  shouldSupportRef(LinkTrigger);

  test('Renders correctly', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <LinkTrigger>LinkTrigger</LinkTrigger>
        <LinkTrigger active>LinkTrigger</LinkTrigger>
        <LinkTrigger loading>LinkTrigger</LinkTrigger>
        <LinkTrigger color="gray20">LinkTrigger</LinkTrigger>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with empty', async () => {
    const component = (
      <>
        <LinkTrigger>
          <LinkTrigger.Text empty>LinkTrigger</LinkTrigger.Text>
          <LinkTrigger.Text>LinkTrigger</LinkTrigger.Text>
        </LinkTrigger>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
