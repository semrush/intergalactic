import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
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

  test('Verify data-ui-name', () => {
    const carousel = (
      <Carousel>
        <Carousel.Item />
        <Carousel.Item />
      </Carousel>
    );

    const { container } = render(carousel);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
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

  test('Verify keyboard support', async () => {
    const spy = vi.fn();

    const { getByRole } = render(
      <Carousel data-testid='carousel' onIndexChange={spy}>
        <Items />
      </Carousel>,
    );

    const tablist = getByRole('tablist');
    tablist.focus();
    await userEvent.keyboard('[ArrowLeft]');
    expect(spy).toHaveBeenCalledWith(1);
    await userEvent.keyboard('[ArrowRight]');
    expect(spy).toHaveBeenCalledWith(0);
  });

  test('Verify control mode with keyboard', async () => {
    const spy = vi.fn();

    const { rerender, getByRole } = render(
      <Carousel data-testid='carousel' index={0} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );

    const tablist = getByRole('tablist');
    tablist.focus();
    await userEvent.keyboard('[ArrowLeft]');
    expect(spy).toHaveBeenCalledWith(1);

    rerender(
      <Carousel data-testid='carousel' index={1} onIndexChange={spy}>
        <Items />
      </Carousel>,
    );
    getByRole('tablist').focus();
    await userEvent.keyboard('[ArrowRight]');
    expect(spy).toHaveBeenCalledWith(0);
  });
});

describe('Carousel.Indicators', () => {
  beforeEach(cleanup);

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
