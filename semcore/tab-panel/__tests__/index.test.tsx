import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import CheckM from '@semcore/icon/Check/m';
import TabPanel from '../src';

import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { assertType } from 'vitest';
import { Intergalactic } from '@semcore/core';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('tab-panel Dependency imports', () => {
  runDependencyCheckTests('tab-panel');
});

describe('TabPanel', () => {
  describe('types', () => {
    const any: any = null;
    test('props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<TabPanel tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabPanel href='https://google.com' />);
    });
    test('value&onChange relation', () => {
      assertType<JSX.Element>(<TabPanel value={1} onChange={(value: number) => {}} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabPanel value={1} onChange={(value: string) => {}} />);
    });
  });

  beforeEach(cleanup);

  test.concurrent('Render correctly', async ({ task }) => {
    const component = (
      <TabPanel value={2}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
        <TabPanel.Item value={4}>Item 4</TabPanel.Item>
      </TabPanel>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly with min width', async ({ task }) => {
    const component = (
      <>
        <TabPanel value={2} w={200}>
          <TabPanel.Item value={1}>Item 1</TabPanel.Item>
          <TabPanel.Item value={2}>Item 2</TabPanel.Item>
          <TabPanel.Item value={3} disabled>
            Item 3
          </TabPanel.Item>
          <TabPanel.Item value={4}>Item 4</TabPanel.Item>
        </TabPanel>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should render correctly with one Addon', async ({ task }) => {
    const component = (
      <TabPanel value={1}>
        <TabPanel.Item value={1} addonLeft={CheckM} selected />
        <TabPanel.Item value={2}>
          <TabPanel.Item.Addon>Addon</TabPanel.Item.Addon>
          <TabPanel.Item.Text>Item 2</TabPanel.Item.Text>
          <TabPanel.Item.Addon>Addon</TabPanel.Item.Addon>
        </TabPanel.Item>
      </TabPanel>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover item', async ({ task }) => {
    const component = (
      <TabPanel value={2}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3} id='tab-panel'>
          Item 3
        </TabPanel.Item>
        <TabPanel.Item value={4}>Item 4</TabPanel.Item>
      </TabPanel>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#tab-panel',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support keyboardFocused/disabled/selected', async ({ task }) => {
    const component = (
      <TabPanel value={2}>
        <TabPanel.Item>Item 1</TabPanel.Item>
        <TabPanel.Item selected id='focused' value={2}>
          Item 2
        </TabPanel.Item>
        <TabPanel.Item disabled>Item 3</TabPanel.Item>
        <TabPanel.Item>Item 4</TabPanel.Item>
      </TabPanel>
    );

    await expect(
      await snapshot(component, {
        actions: {
          focus: '#focused',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support Addon', async ({ task }) => {
    const Addon = React.forwardRef<HTMLSpanElement>(function (props, ref) {
      return (
        <span ref={ref} {...propsForElement(props)}>
          Addon prop
        </span>
      );
    });
    const component = (
      <TabPanel value={1}>
        <TabPanel.Item value={1} addonLeft={Addon} addonRight={Addon}>
          Item 1
        </TabPanel.Item>
        <TabPanel.Item value={2}>
          <TabPanel.Item.Addon>Addon</TabPanel.Item.Addon>
          <TabPanel.Item.Text>Item 2</TabPanel.Item.Text>
          <TabPanel.Item.Addon>Addon</TabPanel.Item.Addon>
        </TabPanel.Item>
      </TabPanel>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support onChange callback', () => {
    const spyChange = vi.fn();
    const spyClick = vi.fn();
    const { getByTestId } = render(
      <TabPanel value={1 as number} onChange={spyChange}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
        <TabPanel.Item value={4} onClick={spyClick} data-testid={'tab-4'}>
          Item 4
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spyClick).lastCalledWith(expect.any(Object));
    expect(spyChange).lastCalledWith(4, expect.any(Object));
  });

  test.concurrent('Should not support clicks on disabled tab', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <TabPanel value={1 as number} onChange={spy}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
        <TabPanel.Item value={3} data-testid={'tab-4'} disabled>
          Item 4
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));

    expect(spy).toHaveBeenCalledTimes(0);
  });

  // js-dom not supported element.click
  test.skip('Should support navigation with keyboard', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <TabPanel value={1 as number} onChange={spy} data-testid={'tab-root'}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.keyDown(getByTestId('tab-root'), { keyCode: 39 });

    expect(spy).lastCalledWith(2, expect.any(Object));
  });

  test('a11y', async () => {
    const { container } = render(
      <TabPanel value={1}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2} disabled>
          Item 2
        </TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
      </TabPanel>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
