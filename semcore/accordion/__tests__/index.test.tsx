import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

import Accordion from '../src';
import { Intergalactic } from '@semcore/core';
import Button from '@semcore/button';

describe('Accordion Dependency imports', () => {
  runDependencyCheckTests('accordion');
});

describe('Accordion', () => {
  describe('types', () => {
    const any: any = null;
    test('props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<Accordion tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<Accordion href='https://google.com' />);
    });
    test('value&onChange relation', () => {
      assertType<JSX.Element>(<Accordion value={1} onChange={(value: number) => {}} />);
      // @ts-expect-error
      assertType<JSX.Element>(<Accordion value={1} onChange={(value: string) => {}} />);
    });
    test('value&onChange relation with useState', () => {
      const value: number[] = any;
      const setValue: React.Dispatch<React.SetStateAction<number[]>> = any;

      assertType<JSX.Element>(<Accordion value={value} onChange={setValue} />);
    });
    test('value&children relation', () => {
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

  test.concurrent('Should render correctly', async ({ task }) => {
    const component = (
      <Accordion defaultValue={[0, 2]}>
        {Array(4)
          .fill('')
          .map((_, index) => (
            <Accordion.Item value={index} disabled={index === 3} key={index}>
              <Accordion.Item.Toggle id={`item-${index}`} fontWeight={'normal'}>
                <Accordion.Item.Chevron />
                Item {index}
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse>Content of item {index}</Accordion.Item.Collapse>
            </Accordion.Item>
          ))}
      </Accordion>
    );

    await expect(await snapshot(component, { actions: { focus: '#item-1' } })).toMatchImageSnapshot(
      task,
    );
  });

  test.concurrent('Should render primary use correctly', async ({ task }) => {
    const component = (
      <Accordion defaultValue={[0, 2]} use='primary'>
        {Array(4)
          .fill('')
          .map((_, index) => (
            <Accordion.Item value={index} disabled={index === 3} key={index}>
              <Accordion.Item.Toggle id={`item-${index}`}>
                <Accordion.Item.Chevron />
                Item {index}
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse>Content of item {index}</Accordion.Item.Collapse>
            </Accordion.Item>
          ))}
      </Accordion>
    );

    await expect(await snapshot(component, { actions: { focus: '#item-1' } })).toMatchImageSnapshot(
      task,
    );
  });

  test.concurrent('Should support uncontrolled mode with single expandable item', () => {
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

    fireEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith(1);

    fireEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(2);

    fireEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(null);
  });

  test('Should support controlled mode with single expandable item', () => {
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

    fireEvent.click(getByText('Item 1'));
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
    fireEvent.click(getByText('Item 2'));
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
    fireEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith(null);
  });

  test('Should support uncontrolled mode with multiple expandable items', () => {
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

    fireEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith([1]);

    fireEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([1, 2]);

    fireEvent.click(getByText('Item 1'));
    expect(spy).toBeCalledWith([2]);

    fireEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([]);
  });

  test('Should support controlled mode with multiple expandable items', () => {
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
    fireEvent.click(getByText('Item 1'));
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
    fireEvent.click(getByText('Item 2'));
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
    fireEvent.click(getByText('Item 1'));
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
    fireEvent.click(getByText('Item 2'));
    expect(spy).toBeCalledWith([]);
  });

  test.concurrent(
    'Should not open/close Collapse item by keyboard click on some clickable element in Toggle',
    async ({ expect }) => {
      const spy = vi.fn();
      const spyInnerButton = vi.fn();
      const { getByTestId } = render(
        <Accordion onChange={spy}>
          {[...new Array(2)].map((_, index) => {
            return (
              <Accordion.Item value={index} key={index}>
                <Accordion.Item.Toggle>
                  <Accordion.Item.Chevron />
                  <div>{`Toggle ${index + 1}`}</div>
                  <Button
                    data-testid={`button_in_toggle_${index + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      spyInnerButton();
                    }}
                  >
                    Just button
                  </Button>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse>
                  <div>{`Accordion content ${index + 1}`}</div>
                </Accordion.Item.Collapse>
              </Accordion.Item>
            );
          })}
        </Accordion>,
      );

      await userEvent.keyboard('[Tab]');
      await userEvent.keyboard('[Tab]');

      expect(getByTestId('button_in_toggle_1')).toHaveFocus();

      await userEvent.keyboard('[Enter]');

      expect(spyInnerButton).toBeCalled();
      expect(spy).not.toBeCalled();
    },
  );

  test('a11y', async () => {
    const { getByText, container } = render(
      <Accordion>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>Item 1</Accordion.Item.Toggle>
          <Accordion.Item.Collapse>Collapse text</Accordion.Item.Collapse>
        </Accordion.Item>
        <Accordion.Item value={2}>
          <Accordion.Item.Toggle>Item 2</Accordion.Item.Toggle>
          <Accordion.Item.Collapse>Collapse text</Accordion.Item.Collapse>
        </Accordion.Item>
      </Accordion>,
    );
    fireEvent.click(getByText('Item 2'));
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
