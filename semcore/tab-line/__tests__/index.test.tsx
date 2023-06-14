import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
import propsForElement from '@semcore/utils/lib/propsForElement';
import TabLine from '../src';

const { render, fireEvent, cleanup, axe } = testing;

describe('TabLine', () => {
  afterEach(cleanup);

  test('Render correctly', async () => {
    const component = (
      <TabLine value={2}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
        <TabLine.Item value={4}>Item 4</TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Render correctly with min width', async () => {
    const component = (
      <>
        <TabLine value={2} w={150}>
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3} disabled>
            Item 3
          </TabLine.Item>
          <TabLine.Item value={4}>Item 4</TabLine.Item>
        </TabLine>
        <br />
        <TabLine value={2} w={200} size="l">
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3} disabled>
            Item 3
          </TabLine.Item>
          <TabLine.Item value={4}>Item 4</TabLine.Item>
        </TabLine>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hover item', async () => {
    const component = (
      <TabLine value={2}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3} id="tab-line">
          Item 3
        </TabLine.Item>
        <TabLine.Item value={4}>Item 4</TabLine.Item>
      </TabLine>
    );

    expect(
      await snapshot(component, {
        actions: {
          hover: '#tab-line',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support keyboardFocused/disabled/selected', async () => {
    const component = (
      <TabLine>
        <TabLine.Item selected>Item 2</TabLine.Item>
        <TabLine.Item disabled>Item 3</TabLine.Item>
        <TabLine.Item keyboardFocused>Item 4</TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support Addon', async () => {
    const Addon = React.forwardRef<HTMLSpanElement>(function (props, ref) {
      return (
        <span ref={ref} {...propsForElement(props)}>
          Addon prop
        </span>
      );
    });
    const component = (
      <TabLine value={1}>
        <TabLine.Item value={1} addonLeft={Addon} addonRight={Addon}>
          Item 1
        </TabLine.Item>
        <TabLine.Item value={2}>
          <TabLine.Item.Addon>Addon</TabLine.Item.Addon>
          <TabLine.Item.Text>Item 2</TabLine.Item.Text>
          <TabLine.Item.Addon>Addon</TabLine.Item.Addon>
        </TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support onChange callback', () => {
    const spyChange = jest.fn();
    const spyClick = jest.fn();
    const { getByTestId } = render(
      <TabLine value={1 as Number} onChange={spyChange}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
        <TabLine.Item value={4} onClick={spyClick} data-testid={'tab-4'}>
          Item 4
        </TabLine.Item>
      </TabLine>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spyClick).lastCalledWith(expect.any(Object));
    expect(spyChange).lastCalledWith(4, expect.any(Object));
  });

  test('Should not support clicks on disabled tab', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <TabLine value={1 as Number} onChange={spy}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
        <TabLine.Item value={4} data-testid={'tab-4'} disabled>
          Item 4
        </TabLine.Item>
      </TabLine>,
    );

    fireEvent.click(getByTestId('tab-4'));

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should support size', async () => {
    const component = (
      <>
        <TabLine value={1} size="m">
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3}>Item 3</TabLine.Item>
        </TabLine>
        <br />
        <TabLine value={2} size="l">
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3}>Item 3</TabLine.Item>
        </TabLine>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support underlined=false', async () => {
    const component = (
      <TabLine value={1} underlined={false}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Letters must not be cut off', async () => {
    const component = (
      <TabLine value={1}>
        <TabLine.Item value={1} selected>
          [g I j q]
        </TabLine.Item>
        <TabLine.Item value={2}>[g I j q]</TabLine.Item>
      </TabLine>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  // js-dom not supported element.click
  xtest('Should support navigation with keyboard', async () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <TabLine value={1 as Number} onChange={spy} data-testid={'tab-root'}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
      </TabLine>,
    );

    fireEvent.keyDown(getByTestId('tab-root'), { keyCode: 39 });

    expect(spy).lastCalledWith(2, expect.any(Object));
  });

  test('a11y', async () => {
    const { container } = render(
      <TabLine value={1}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2} disabled>
          Item 2
        </TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
      </TabLine>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
