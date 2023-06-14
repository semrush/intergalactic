import React from 'react';
import { snapshot, testing } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
import Accordion from '../src';
const { axe, render, fireEvent, cleanup } = testing;

describe('Accordion', () => {
  afterEach(cleanup);

  test('Should render correctly', async () => {
    const component = (
      <Accordion defaultValue={[0, 2]}>
        {Array(4)
          .fill('')
          .map((_, index) => (
            <Accordion.Item value={index} disabled={index === 3} key={index}>
              <Accordion.Item.Toggle keyboardFocused={index === 1}>
                <Accordion.Item.Chevron />
                Item {index}
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse>Content of item {index}</Accordion.Item.Collapse>
            </Accordion.Item>
          ))}
      </Accordion>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support uncontrolled mode with single expandable item', () => {
    const spy = jest.fn();
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
    const spy = jest.fn();

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
    const spy = jest.fn();
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
    const spy = jest.fn();

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
