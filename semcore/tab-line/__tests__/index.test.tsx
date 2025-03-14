import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import TabLine from '../src';

import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { Intergalactic } from '@semcore/core';
import { assertType } from 'vitest';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('tab-line Dependency imports', () => {
  runDependencyCheckTests('tab-line');
});

describe('TabLine', () => {
  describe('types', () => {
    const any: any = null;
    test('props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<TabLine tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabLine href='https://google.com' />);
    });
    test('value&onChange relation', () => {
      assertType<JSX.Element>(<TabLine value={1} onChange={(value: number) => {}} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabLine value={1} onChange={(value: string) => {}} />);
    });
  });

  beforeEach(cleanup);

  test.concurrent('Render correctly', async ({ task }) => {
    const component = (
      <TabLine value={2}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
        <TabLine.Item value={4}>Item 4</TabLine.Item>
      </TabLine>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly with min width', async ({ task }) => {
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
        <TabLine value={2} w={200} size='l'>
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3} disabled>
            Item 3
          </TabLine.Item>
          <TabLine.Item value={4}>Item 4</TabLine.Item>
        </TabLine>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover item', async ({ task }) => {
    const component = (
      <TabLine value={2}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3} id='tab-line'>
          Item 3
        </TabLine.Item>
        <TabLine.Item value={4}>Item 4</TabLine.Item>
      </TabLine>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#tab-line',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support keyboardFocused/disabled/selected', async ({ task }) => {
    const component = (
      <TabLine value={1}>
        <TabLine.Item selected value={1} id='focused'>
          Item 2
        </TabLine.Item>
        <TabLine.Item disabled>Item 3</TabLine.Item>
        <TabLine.Item>Item 4</TabLine.Item>
      </TabLine>
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support onChange callback', () => {
    const spyChange = vi.fn();
    const spyClick = vi.fn();
    const { getByTestId } = render(
      <TabLine value={1 as number} onChange={spyChange}>
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

  test.concurrent('Should not support clicks on disabled tab', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <TabLine value={1 as number} onChange={spy}>
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

  test.concurrent('Should support size', async ({ task }) => {
    const component = (
      <>
        <TabLine value={1} size='m'>
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3}>Item 3</TabLine.Item>
        </TabLine>
        <br />
        <TabLine value={2} size='l'>
          <TabLine.Item value={1}>Item 1</TabLine.Item>
          <TabLine.Item value={2}>Item 2</TabLine.Item>
          <TabLine.Item value={3}>Item 3</TabLine.Item>
        </TabLine>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support underlined=false', async ({ task }) => {
    const component = (
      <TabLine value={1} underlined={false}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
      </TabLine>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Letters must not be cut off', async ({ task }) => {
    const component = (
      <TabLine value={1}>
        <TabLine.Item value={1} selected>
          [g I j q]
        </TabLine.Item>
        <TabLine.Item value={2}>[g I j q]</TabLine.Item>
      </TabLine>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  // js-dom not supported element.click
  test.skip('Should support navigation with keyboard', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <TabLine value={1 as number} onChange={spy} data-testid={'tab-root'}>
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
