import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import snapshot from 'jest-preset-ui/snapshot';
import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';

describe('BaseTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(BaseTrigger);
  shouldSupportRef(BaseTrigger);
  test('should support "state" prop', async () => {
    const component = (
      <>
        <BaseTrigger>Button</BaseTrigger>
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

  test('should support "placeholder" prop', async () => {
    const component = (
      <BaseTrigger empty placeholder="placeholder">
        Button
      </BaseTrigger>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support back ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<BaseTrigger ref={ref} />);
    expect(ref.current.tagName).toBeTruthy();
  });

  test('should support back ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<BaseTrigger ref={ref} />);
    expect(ref.current.tagName).toBeTruthy();
  });
});

describe('ButtonTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(ButtonTrigger);
  shouldSupportRef(ButtonTrigger);
});

describe('FilterTrigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(FilterTrigger);
  shouldSupportRef(FilterTrigger);

  test('Should have correct disabled state', async () => {
    const component = <FilterTrigger disabled>Disabled</FilterTrigger>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should have correct counter', async () => {
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

  test('should support correct render', async () => {
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
});
