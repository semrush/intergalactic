import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Globe from '@semcore/icon/Globe/m';
import Badge from '@semcore/badge';

const { render, fireEvent, cleanup, axe } = testing;

import Pills from '../src';

describe('PillGroup', () => {
  afterEach(cleanup);

  test('Should support onChange callback', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Pills value={1 as Number} onChange={spy}>
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

  test('Should render correctly states', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Pills value={1}>
          <Pills.Item value={1}>1</Pills.Item>
          <Pills.Item value={2} keyboardFocused>
            2
          </Pills.Item>
        </Pills>
        <Pills value={1}>
          <Pills.Item value={1} keyboardFocused>
            1
          </Pills.Item>
          <Pills.Item value={2}>2</Pills.Item>
        </Pills>
        <Pills>
          <Pills.Item value={1}>1</Pills.Item>
          <Pills.Item value={2} disabled>
            2
          </Pills.Item>
        </Pills>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support additional elements as props', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const Addon = React.forwardRef(function ({ forwardRef, Children, Root, ...p }, ref) {
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

  test('Should support hover', async () => {
    expect(
      await snapshot(
        <Pills>
          <Pills.Item id="item">Item 1</Pills.Item>
          <Pills.Item>Item 2</Pills.Item>
        </Pills>,
        {
          actions: {
            hover: '#item',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Pills>
          <Pills.Item id="item" selected>
            Item 1
          </Pills.Item>
          <Pills.Item>Item 2</Pills.Item>
        </Pills>,
        {
          actions: {
            hover: '#item',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });

  test('Should support size with Addon', async () => {
    const PillsSize = ({ size }) => (
      <Pills size={size}>
        <Pills.Item>
          <Pills.Item.Addon>
            <Globe />
          </Pills.Item.Addon>
          <Pills.Item.Text>Item 1</Pills.Item.Text>
          <Pills.Item.Addon>
            <Badge bg="orange">beta</Badge>
          </Pills.Item.Addon>
        </Pills.Item>
        <Pills.Item>
          <Pills.Item.Addon>
            <Globe />
          </Pills.Item.Addon>
          <Pills.Item.Text>Item 2</Pills.Item.Text>
        </Pills.Item>
        <Pills.Item>
          <Pills.Item.Text>Item 3</Pills.Item.Text>
          <Pills.Item.Addon>
            <Badge bg="orange">beta</Badge>
          </Pills.Item.Addon>
        </Pills.Item>
        <Pills.Item>Item 4</Pills.Item>
        <Pills.Item>
          <Globe />
        </Pills.Item>
      </Pills>
    );

    expect(await snapshot(<PillsSize size="m" />)).toMatchImageSnapshot();
    expect(await snapshot(<PillsSize size="l" />)).toMatchImageSnapshot();
  });

  test('Should correct render for different number Items', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Pills>
          <Pills.Item value={1}>1</Pills.Item>
        </Pills>
        <Pills>
          <Pills.Item value={1}>1</Pills.Item>
          <Pills.Item value={2}>2</Pills.Item>
        </Pills>
        <Pills>
          <Pills.Item value={1}>1</Pills.Item>
          <Pills.Item value={2}>2</Pills.Item>
          <Pills.Item value={3}>3</Pills.Item>
        </Pills>
      </snapshot.ProxyProps>
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
