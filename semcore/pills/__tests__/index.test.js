import React from 'react';
import { render, fireEvent, cleanup, axe } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import Pills from '../src';

describe('PillGroup', () => {
  afterEach(cleanup);

  test('Should support onChange callback', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Pills value={1} onChange={spy}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={4} data-testid={'tab-4'}>
          1
        </Pills.Item>
      </Pills>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Should support onClick on Pill', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Pills value={1}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={4} onClick={spy} data-testid={'tab-4'}>
          1
        </Pills.Item>
      </Pills>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Should not call PillGroup onChange after falsy onClick on Pill', () => {
    const spy = jest.fn();
    const spyClick = jest.fn(() => false);
    const { getByTestId } = render(
      <Pills value={1} onChange={spy}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={4} data-testid={'tab-4'} onClick={spyClick}>
          1
        </Pills.Item>
      </Pills>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(0);
    expect(spyClick).toHaveBeenCalledTimes(1);
  });

  test('Should not support clicks on disabled tab', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <Pills value={1} onChange={spy}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={3} data-testid={'tab-4'} disabled>
          1
        </Pills.Item>
      </Pills>,
    );

    fireEvent.click(getByTestId('tab-4'));

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should render correctly', async () => {
    const component = (
      <Pills value={1}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={3} disabled>
          1
        </Pills.Item>
      </Pills>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support additional elements as props', async () => {
    const Addon = React.forwardRef(function({ forwardRef, Children, Root, ...p }, ref) {
      return (
        <span ref={ref} {...p}>
          Addon prop
        </span>
      );
    });
    const component = (
      <Pills value={0}>
        <Pills.Item value={1} addonLeft={Addon} addonRight={Addon}>
          Text
        </Pills.Item>
        <Pills.Item value={2}>
          <Pills.Item.Addon tag={Addon} />
          <Pills.Item.Text>Text</Pills.Item.Text>
          <Pills.Item.Addon tag={Addon} />
        </Pills.Item>
      </Pills>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { getByTestId, container } = render(
      <Pills value={1}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>2</Pills.Item>
        <Pills.Item value={3}>3</Pills.Item>
        <Pills.Item value={4} data-testid="tab-4">
          4
        </Pills.Item>
      </Pills>,
    );

    fireEvent.click(getByTestId('tab-4'));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
