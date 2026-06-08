import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Carousel from '../src';

describe('Carousel Dependency imports', () => {
  runDependencyCheckTests('carousel');
});

const Items = () => (
  <>
    {[...new Array(2)].map((_, ind) => (
      <Carousel.Item key={ind} />
    ))}
  </>
);

describe('Carousel', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Carousel,
    expectedDataUiName: 'Carousel',
  });

  test('Verify control mode', () => {
    const spy = vi.fn();

    const { rerender } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    rerender(
      <Carousel index={1} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  test('Verify keyboard support', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Carousel data-testid='carousel' onIndexChange={spy}>
        <Items />
      </Carousel>,
    );

    const carousel = getByTestId('carousel');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(spy).toHaveBeenCalledWith(1);
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(spy).toHaveBeenCalledWith(0);
  });

  test('Verify control mode with keyboard', () => {
    const spy = vi.fn();

    const { rerender, getByTestId } = render(
      <Carousel data-testid='carousel' index={0} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );

    const carousel = getByTestId('carousel');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(spy).toHaveBeenCalledWith(1);

    rerender(
      <Carousel data-testid='carousel' index={1} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(spy).toHaveBeenCalledWith(0);
  });
});

describe('Carousel.Container', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Carousel.Container,
    Wrapper: Carousel,
    expectedDataUiName: 'Carousel.Container',
  });
});

describe('Carousel.Item', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Carousel.Item,
    Wrapper: Carousel,
    expectedDataUiName: 'Carousel.Item',
  });
});

describe('Carousel.Indicators', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Carousel.Indicators,
    expectedDataUiName: 'Carousel.Indicators',
  });

  test('Verify call onIndexChange after click', async () => {
    const spy = vi.fn();
    const { getByRole } = render(
      <Carousel onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const next = getByRole('tab', { name: 'Slide 2' });
    await userEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Verify not call onIndexChange after click in same control', async () => {
    const spy = vi.fn();
    const { getByRole } = render(
      <Carousel onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const next = getByRole('tab', { name: 'Slide 2' });
    await userEvent.click(next);
    await userEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Veerify right change index with Prev button', async () => {
    const spy = vi.fn();
    const { getByLabelText, getByRole } = render(
      <Carousel onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const prev = getByLabelText('Previous slide');
    const next = getByRole('tab', { name: 'Slide 1' });
    await userEvent.click(prev);
    await userEvent.click(next);

    expect(spy).toHaveBeenCalledWith(0);
  });

  test.concurrent('Verify right change index with Next button', async () => {
    const spy = vi.fn();
    const { rerender, getByLabelText, getByRole } = render(
      <Carousel index={1} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const next = getByLabelText('Next slide');
    await userEvent.click(next);

    expect(spy).toHaveBeenCalledWith(0);
    rerender(
      <Carousel index={0} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const prev = getByRole('tab', { name: 'Slide 2' });
    await userEvent.click(prev);

    expect(spy).toHaveBeenCalledWith(1);
  });
});

describe('Carousel.Prev', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Carousel.Prev,
    props: { label: 'Previous slide' },
    expectedDataUiName: 'Carousel.Prev',
  });

  test('Verify call onIndexChange after click', async () => {
    const spy = vi.fn();
    const { getByLabelText } = render(
      <Carousel onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const prev = getByLabelText('Previous slide');
    await userEvent.click(prev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Verify not call onIndexChange for bounded property', async () => {
    const spy = vi.fn();
    const { getByLabelText } = render(
      <Carousel bounded onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const prev = getByLabelText('Previous slide');
    await expect(userEvent.click(prev)).rejects.toThrow('pointer-events: none');

    expect(spy).not.toHaveBeenCalled();
  });

  test('Verify control mode and click', async () => {
    const spy = vi.fn();

    const { getByLabelText } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );

    const prev = getByLabelText('Previous slide');
    await userEvent.click(prev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});

describe('Carousel.Next', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Carousel.Next,
    props: { label: 'Next slide' },
    expectedDataUiName: 'Carousel.Next',
  });

  test('Verify call onIndexChange after click', async () => {
    const spy = vi.fn();
    const { getByLabelText } = render(
      <Carousel onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const next = getByLabelText('Next slide');
    await userEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Verify not call onIndexChange for bounded property', async () => {
    const spy = vi.fn();
    const { getByLabelText } = render(
      <Carousel bounded defaultIndex={1} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    const next = getByLabelText('Next slide');
    await expect(userEvent.click(next)).rejects.toThrow('pointer-events: none');

    expect(spy).not.toHaveBeenCalled();
  });

  test('Verify control mode and click', async () => {
    const spy = vi.fn();

    const { getByLabelText } = render(
      <Carousel index={1} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );

    const next = getByLabelText('Next slide');
    await userEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
  });
});
