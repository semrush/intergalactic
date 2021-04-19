import React from 'react';
import { css } from '@semcore/core';
import { render, fireEvent, cleanup, axe } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import TabPanel from '../src';

describe('TabPanel', () => {
  afterEach(cleanup);

  test('Should support onChange callback', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <TabPanel value={1} onChange={spy}>
        <TabPanel.Item value={1}>1</TabPanel.Item>
        <TabPanel.Item value={2}>1</TabPanel.Item>
        <TabPanel.Item value={3}>1</TabPanel.Item>
        <TabPanel.Item value={4} data-testid={'tab-4'}>
          1
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toBeCalledWith(4, expect.any(Object));
  });

  test('Should support onClick on Tab', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <TabPanel value={1}>
        <TabPanel.Item value={1}>1</TabPanel.Item>
        <TabPanel.Item value={2}>1</TabPanel.Item>
        <TabPanel.Item value={3}>1</TabPanel.Item>
        <TabPanel.Item value={4} onClick={spy} data-testid={'tab-4'}>
          1
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Should not call TabPanel onChange after falsy onClick on Tab', () => {
    const spy = jest.fn();
    const spyClick = jest.fn(() => false);
    const { getByTestId } = render(
      <TabPanel value={1} onChange={spy}>
        <TabPanel.Item value={1}>1</TabPanel.Item>
        <TabPanel.Item value={2}>1</TabPanel.Item>
        <TabPanel.Item value={3}>1</TabPanel.Item>
        <TabPanel.Item value={4} data-testid={'tab-4'} onClick={spyClick}>
          1
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should not support clicks on disabled tab', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <TabPanel value={1} onChange={spy}>
        <TabPanel.Item value={1}>1</TabPanel.Item>
        <TabPanel.Item value={2}>1</TabPanel.Item>
        <TabPanel.Item value={3}>1</TabPanel.Item>
        <TabPanel.Item value={3} data-testid={'tab-4'} disabled>
          1
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should render correctly', async () => {
    const component = (
      <TabPanel value={2} wMax={200}>
        <TabPanel.Item value={1}>Test 1</TabPanel.Item>
        <TabPanel.Item value={2}>Test 2</TabPanel.Item>
        <TabPanel.Item value={3}>Test 3</TabPanel.Item>
        <TabPanel.Item value={4} disabled>
          Test 4
        </TabPanel.Item>
      </TabPanel>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should add styles to under children', async () => {
    const component = (
      <TabPanel
        defaultValue={1}
        styles={css`
          SText {
            color: green;
          }
          SAddon {
            color: orange;
          }
        `}
      >
        <TabPanel.Item value={1}>
          <TabPanel.Item.Text>Text</TabPanel.Item.Text>
          <TabPanel.Item.Addon>Addon</TabPanel.Item.Addon>
        </TabPanel.Item>
      </TabPanel>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support addons', async () => {
    const Addon = React.forwardRef<HTMLElement>(function (p, ref) {
      return (
        <span ref={ref} {...p}>
          Addon prop
        </span>
      );
    });
    const component = (
      <TabPanel value={1}>
        <TabPanel.Item value={1} addonLeft={Addon} addonRight={Addon}>
          TEXT 1
        </TabPanel.Item>
        <TabPanel.Item value={2}>
          <TabPanel.Item.Addon tag={Addon} />
          <TabPanel.Item.Text>TEXT 2</TabPanel.Item.Text>
          <TabPanel.Item.Addon tag={Addon} />
        </TabPanel.Item>
      </TabPanel>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <TabPanel value={1}>
        <TabPanel.Item value={1}>1</TabPanel.Item>
        <TabPanel.Item value={2}>2</TabPanel.Item>
      </TabPanel>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
