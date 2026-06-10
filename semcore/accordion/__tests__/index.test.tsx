import type { Intergalactic } from '@semcore/core';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import React from 'react';

import Accordion from '../src';

describe('Accordion Dependency imports', () => {
  runDependencyCheckTests('accordion');
});

describe('Accordion', () => {
  describe('Types', () => {
    const any: any = null;
    test('Verify props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<Accordion tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<Accordion href='https://google.com' />);
    });
    test('Verify value&onChange relation', () => {
      assertType<JSX.Element>(<Accordion value={1} onChange={(value: number) => { }} />);
      // @ts-expect-error
      assertType<JSX.Element>(<Accordion value={1} onChange={(value: string) => { }} />);
    });
    test('Verify value&onChange relation with useState', () => {
      const value: number[] = any;
      const setValue: React.Dispatch<React.SetStateAction<number[]>> = any;

      assertType<JSX.Element>(<Accordion value={value} onChange={setValue} />);
    });
    test('Verify value&children relation', () => {
      assertType<JSX.Element>(<Accordion value={1}>{(props, handlers) => any}</Accordion>);
      assertType<JSX.Element>(
        <Accordion value={1}>{({ value }: { value: number }) => any}</Accordion>,
      );
      assertType<JSX.Element>(
        // @ts-expect-error
        <Accordion value={1}>{({ value }: { value: string }) => any}</Accordion>,
      );
    });
  });

  beforeEach(cleanup);

  test.concurrent('Verify supports uncontrolled mode with single expandable item', async () => {
    const spy = vi.fn();
    const { getByText } = render(
      <Accordion onChange={spy} defaultValue={null}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );

    await userEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith(1);

    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(2);

    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(null);
  });

  test('Verify supports controlled mode with single expandable item', async () => {
    const spy = vi.fn();

    const { getByText, rerender } = render(
      <Accordion onChange={spy} value={null}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );

    await userEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith(1);

    rerender(
      <Accordion onChange={spy} value={1}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(2);

    rerender(
      <Accordion onChange={spy} value={2}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(null);
  });

  test('Verify supports uncontrolled mode with multiple expandable items', async () => {
    const spy = vi.fn();
    const { getByText } = render(
      <Accordion onChange={spy}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );

    await userEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith([1]);

    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([1, 2]);

    await userEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith([2]);

    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([]);
  });

  test('Verify supports controlled mode with multiple expandable items', async () => {
    const spy = vi.fn();

    const { getByText, rerender } = render(
      <Accordion onChange={spy} value={[]}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith([1]);

    rerender(
      <Accordion onChange={spy} value={[1]}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([1, 2]);

    rerender(
      <Accordion onChange={spy} value={[1, 2]}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith([2]);

    rerender(
      <Accordion onChange={spy} value={[2]}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
        </Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([]);
  });
});
