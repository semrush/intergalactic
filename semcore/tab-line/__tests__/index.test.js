import React from 'react';
import { sstyled } from '@semcore/core';
import { render, fireEvent, cleanup } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import TabLine from '../src';

describe('TabLine', () => {
  afterEach(cleanup);

  test('Should support onChange callback', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <TabLine value={1} onChange={spy}>
        <TabLine.Item value={1}>1</TabLine.Item>
        <TabLine.Item value={2}>1</TabLine.Item>
        <TabLine.Item value={3}>1</TabLine.Item>
        <TabLine.Item value={4} data-testid={'tab-4'}>
          1
        </TabLine.Item>
      </TabLine>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toBeCalledWith(4, expect.any(Object));
  });

  test('Should support onClick on Tab', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <TabLine value={1}>
        <TabLine.Item value={1}>1</TabLine.Item>
        <TabLine.Item value={2}>1</TabLine.Item>
        <TabLine.Item value={3}>1</TabLine.Item>
        <TabLine.Item value={4} onClick={spy} data-testid={'tab-4'}>
          1
        </TabLine.Item>
      </TabLine>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Should not call TabPanel onChange after falsy onClick on Tab', () => {
    const spy = jest.fn();
    const spyClick = jest.fn(() => false);
    const { getByTestId } = render(
      <TabLine value={1} onChange={spy}>
        <TabLine.Item value={1}>1</TabLine.Item>
        <TabLine.Item value={2}>1</TabLine.Item>
        <TabLine.Item value={3}>1</TabLine.Item>
        <TabLine.Item value={4} data-testid={'tab-4'} onClick={spyClick}>
          1
        </TabLine.Item>
      </TabLine>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should not support clicks on disabled tab', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <TabLine value={1} onChange={spy}>
        <TabLine.Item value={1}>1</TabLine.Item>
        <TabLine.Item value={2}>1</TabLine.Item>
        <TabLine.Item value={3}>1</TabLine.Item>
        <TabLine.Item value={3} data-testid={'tab-4'} disabled>
          1
        </TabLine.Item>
      </TabLine>,
    );

    fireEvent.click(getByTestId('tab-4'));

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should add styles to under children', async () => {
    const component = (
      <TabLine
        styles={sstyled.css`
          SText {
            color: green;
          }
          SAddon {
            color: orange;
          }
        `}
      >
        <TabLine.Item value={1}>
          <TabLine.Item.Text>Text</TabLine.Item.Text>
          <TabLine.Item.Addon>Addon</TabLine.Item.Addon>
        </TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render correctly', async () => {
    const component = (
      <TabLine value={1}>
        <TabLine.Item value={1}>1</TabLine.Item>
        <TabLine.Item value={2}>1</TabLine.Item>
        <TabLine.Item value={3}>1</TabLine.Item>
        <TabLine.Item value={3} disabled>
          1
        </TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size property', async () => {
    const component = (
      <>
        <TabLine value={1} size="m">
          <TabLine.Item value={1}>1</TabLine.Item>
          <TabLine.Item value={2}>1</TabLine.Item>
          <TabLine.Item value={3}>1</TabLine.Item>
        </TabLine>
        <br />
        <TabLine value={2} size="l">
          <TabLine.Item value={1}>1</TabLine.Item>
          <TabLine.Item value={2}>1</TabLine.Item>
          <TabLine.Item value={3}>1</TabLine.Item>
        </TabLine>
        <br />
        <TabLine value={3} size="xl">
          <TabLine.Item value={1}>1</TabLine.Item>
          <TabLine.Item value={2}>1</TabLine.Item>
          <TabLine.Item value={3}>1</TabLine.Item>
        </TabLine>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support underlined property', async () => {
    const component = (
      <TabLine value={1} underlined={false}>
        <TabLine.Item value={1}>1</TabLine.Item>
        <TabLine.Item value={2}>2</TabLine.Item>
        <TabLine.Item value={3}>3</TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support addons', async () => {
    const Addon = React.forwardRef(function ({ forwardRef, Children, Root, ...p }, ref) {
      return (
        <span ref={ref} {...p}>
          Addon prop
        </span>
      );
    });
    const component = (
      <TabLine value={1}>
        <TabLine.Item value={1} addonLeft={Addon} addonRight={Addon}>
          TEXT 1
        </TabLine.Item>
        <TabLine.Item value={2}>
          <TabLine.Item.Addon tag={Addon} />
          <TabLine.Item.Text>TEXT 2</TabLine.Item.Text>
          <TabLine.Item.Addon tag={Addon} />
        </TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
