import { Box } from '@semcore/base-components';
import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Carousel from '../src';

describe('Carousel Dependency imports', () => {
  runDependencyCheckTests('carousel');
});

const Container = (props: any) => (
  <Carousel.Container {...props}>
    {[...new Array(2)].map((_, ind) => (
      <Carousel.Item key={ind} />
    ))}
  </Carousel.Container>
);

const Indicators = () => (
  <Carousel.Indicators>
    {({ items }) => (
      <>
        {items.map((item: any, ind) => (
          <Box {...item} key={ind} data-testid={`indicator-${ind}`} />
        ))}
      </>
    )}
  </Carousel.Indicators>
);

describe('Carousel', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Carousel,
    expectedDataUiName: 'Carousel',
    preset: 'root',
  });

  test('Verify control mode', () => {
    const spy = vi.fn();

    const { rerender } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Container />
      </Carousel>,
    );
    rerender(
      <Carousel index={1} onIndexChange={spy}>
        <Container />
      </Carousel>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  test('Verify keyboard support', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container data-testid='container' />
      </Carousel>,
    );

    const container = getByTestId('container');
    fireEvent.keyDown(container, { key: 'ArrowLeft' });
    expect(spy).toHaveBeenCalledWith(1);
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(spy).toHaveBeenCalledWith(0);
  });

  test('Verify control mode with keyboard', () => {
    const spy = vi.fn();

    const { rerender, getByTestId } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Container data-testid='container' />
      </Carousel>,
    );

    const container = getByTestId('container');
    fireEvent.keyDown(container, { key: 'ArrowLeft' });
    expect(spy).toHaveBeenCalledWith(1);

    rerender(
      <Carousel index={1} onIndexChange={spy}>
        <Container data-testid='container' />
      </Carousel>,
    );
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(spy).toHaveBeenCalledWith(0);
  });
});

describe('Carousel.Container', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Carousel.Container,
    Wrapper: Carousel,
    expectedDataUiName: 'Carousel.Container',
    preset: 'root',
  });
});

describe('Carousel.Item', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Carousel.Item,
    Wrapper: Carousel,
    expectedDataUiName: 'Carousel.Item',
    preset: 'leaf',
  });
});

describe('Carousel.Indicators', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Carousel.Indicators,
    expectedDataUiName: 'Carousel.Indicators',
    preset: 'leaf',
  });

  test('Verify call onIndexChange after click', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Indicators />
      </Carousel>,
    );
    const next = getByTestId('indicator-1');
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Verify not call onIndexChange after click in same control', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Indicators />
      </Carousel>,
    );
    const next = getByTestId('indicator-1');
    fireEvent.click(next);
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Veerify right change index with Prev button', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Indicators />
        <Carousel.Prev data-testid='prev' />
      </Carousel>,
    );
    const prev = getByTestId('prev');
    const next = getByTestId('indicator-0');
    fireEvent.click(prev);
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledWith(0);
  });

  test.concurrent('Verify right change index with Next button', () => {
    const spy = vi.fn();
    const { rerender, getByTestId } = render(
      <Carousel index={1} onIndexChange={spy}>
        <Container />
        <Indicators />
        <Carousel.Next data-testid='next' />
      </Carousel>,
    );
    const next = getByTestId('next');
    const prev = getByTestId('indicator-1');
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledWith(0);
    rerender(
      <Carousel index={0} onIndexChange={spy}>
        <Container />
        <Indicators />
        <Carousel.Next data-testid='next' />
      </Carousel>,
    );
    fireEvent.click(prev);

    expect(spy).toHaveBeenCalledWith(1);
  });
});

describe('Carousel.Prev', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Carousel.Prev,
    props: { label: 'Previous slide' },
    expectedDataUiName: 'Carousel.Prev',
    preset: 'root',
  });

  test('Verify call onIndexChange after click', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid='prev' />
      </Carousel>,
    );
    const prev = getByTestId('prev');
    fireEvent.click(prev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Verify not call onIndexChange for bounded property', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel bounded onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid='prev' />
      </Carousel>,
    );
    const prev = getByTestId('prev');
    fireEvent.click(prev);

    expect(spy).not.toHaveBeenCalled();
  });

  test('Verify control mode and click', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid='prev' />
      </Carousel>,
    );

    const prev = getByTestId('prev');
    fireEvent.click(prev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});

describe('Carousel.Next', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Carousel.Next,
    props: { label: 'Next slide' },
    expectedDataUiName: 'Carousel.Next',
    preset: 'root',
  });

  test('Verify call onIndexChange after click', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Carousel.Next data-testid='next' />
      </Carousel>,
    );
    const next = getByTestId('next');
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Verify not call onIndexChange for bounded property', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Carousel bounded onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid='next' />
      </Carousel>,
    );
    const next = getByTestId('next');
    fireEvent.click(next);

    expect(spy).not.toHaveBeenCalled();
  });

  test('Verify control mode and click', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Carousel index={1} onIndexChange={spy}>
        <Container />
        <Carousel.Next data-testid='next' />
      </Carousel>,
    );

    const next = getByTestId('next');
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
  });
});
