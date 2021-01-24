import React from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import Popper from '../src';

jest.mock('@popperjs/core', () => {
  const PopperJS = jest.requireActual('@popperjs/core');

  return {
    ...PopperJS,
    destroy: () => {},
    scheduleUpdate: () => {},
  };
});

describe('Popper', () => {
  afterEach(cleanup);
  jest.useFakeTimers();
  test('should render popper to outside container', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    expect(getByTestId('reference')).toBeTruthy();
    expect(getByTestId('popper')).toBeTruthy();
  });

  test('should support a custom handler a reference', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} interaction="hover">
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    fireEvent.mouseEnter(getByTestId('reference'));
    jest.runAllTimers();
    expect(spy).toBeCalledWith(true, expect.anything());

    fireEvent.mouseLeave(getByTestId('reference'));
    jest.runAllTimers();
    expect(spy).toBeCalledWith(false, expect.anything());
  });

  test('should support timeout for change visible', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} timeout={100} interaction="hover">
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    fireEvent.mouseEnter(getByTestId('reference'));
    expect(spy).not.toBeCalledWith(true, expect.anything());
    jest.runAllTimers();
    expect(spy).toBeCalledWith(true, expect.anything());

    fireEvent.mouseLeave(getByTestId('reference'));
    expect(spy).not.toBeCalledWith(false, expect.anything());
    jest.runAllTimers();
    expect(spy).toBeCalledWith(false, expect.anything());

    jest.useRealTimers();
  });

  test('should proxy style', async () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    expect(getByTestId('popper').style.position).toEqual('absolute');
  });

  test('should nested popper', async () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger children="trigger 1" />
        <Popper.Popper>
          content 1
          <Popper visible>
            <Popper.Trigger children="trigger 2" />
            <Popper.Popper data-testid="popper">content 2</Popper.Popper>
          </Popper>
        </Popper.Popper>
      </Popper>,
    );

    expect(getByTestId('popper').style.position).toEqual('absolute');
  });
});

describe('Popper.Trigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(Popper.Trigger, (props) => <Popper visible {...props} />);
  shouldSupportRef(Popper.Trigger, (props) => <Popper visible {...props} />);

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Popper>
        <Popper.Trigger data-testid="trigger" name="trigger" />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support children', async () => {
    const component = (
      <Popper>
        <Popper.Trigger>
          <p data-testid="child">Test</p>
        </Popper.Trigger>
      </Popper>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('Popper.Popper', () => {
  afterEach(cleanup);

  shouldSupportClassName(Popper.Popper, (props) => <Popper visible {...props} />);
  shouldSupportRef(Popper.Popper, (props) => <Popper visible {...props} />);

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Popper data-testid="trigger" name="trigger" />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support children', async () => {
    const component = (
      <Popper visible>
        <Popper.Popper>
          <p data-testid="child">Test</p>
        </Popper.Popper>
      </Popper>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});
