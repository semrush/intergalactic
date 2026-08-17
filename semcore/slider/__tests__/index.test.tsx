import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import Slider from '../src';

describe('slider Dependency imports', () => {
  runDependencyCheckTests('slider');
});

describe('Slider', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const slider = (
      <Slider value='medium' options={[{ value: 'medium', label: 'Medium' }]}>
        <Slider.Bar />
        <Slider.Knob />
        <Slider.Options>
          <Slider.Item />
        </Slider.Options>
      </Slider>
    );

    const { container } = render(slider);
    expect(extractUIName(container)).toMatchSnapshot();
  });

  const focusSlider = async (slider: HTMLElement) => {
    await userEvent.tab();
    expect(slider).toHaveFocus();
  };

  const dragSlider = async (slider: HTMLElement, clientX: number) => {
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: slider, coords: { clientX } },
      { target: document.body, coords: { clientX } },
      { keys: '[/MouseLeft]', target: document.body, coords: { clientX } },
    ]);
  };

  test('Verify supports onChange callback with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<Slider value={10} data-testid='slider' onChange={spy} />);
    const slider = getByTestId('slider');
    await focusSlider(slider);
    // up
    await userEvent.keyboard('[ArrowUp]');
    expect(spy).lastCalledWith(11, expect.any(Object));
    await userEvent.keyboard('[ArrowRight]');
    expect(spy).lastCalledWith(11, expect.any(Object));
    // down
    await userEvent.keyboard('[ArrowLeft]');
    expect(spy).lastCalledWith(9, expect.any(Object));
    await userEvent.keyboard('[ArrowDown]');
    expect(spy).lastCalledWith(9, expect.any(Object));
  });

  test('Verify supports min value change with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Slider min={0} max={1} defaultValue={1} data-testid='slider' onChange={spy} />,
    );
    await focusSlider(getByTestId('slider'));
    // down
    await userEvent.keyboard('[ArrowLeft]');
    await userEvent.keyboard('[ArrowLeft]');
    expect(spy).lastCalledWith(0, expect.any(Object));
  });

  test('Verify supports max value change with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Slider min={0} max={1} defaultValue={0} data-testid='slider' onChange={spy} />,
    );
    await focusSlider(getByTestId('slider'));
    // up
    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[ArrowUp]');
    expect(spy).lastCalledWith(1, expect.any(Object));
  });

  test('Verify dragging/mouse move sets value to min when moved before start', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Slider min={0} max={100} defaultValue={50} data-testid='slider' onChange={onChange} />,
    );
    const slider = getByRole('slider');
    Object.defineProperty(slider, 'offsetWidth', { value: 200 });
    slider.getBoundingClientRect = () => ({ left: 100, width: 200 }) as DOMRect;

    // simulate mouse move far to left
    await dragSlider(slider, 50);
    expect(onChange).lastCalledWith(0, expect.any(Object));
  });

  test('Verify dragging/mouse move sets value to max when moved past end', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Slider min={0} max={100} defaultValue={50} data-testid='slider' onChange={onChange} />,
    );
    const slider = getByRole('slider');
    Object.defineProperty(slider, 'offsetWidth', { value: 200 });
    slider.getBoundingClientRect = () => ({ left: 100, width: 200 }) as DOMRect;

    await dragSlider(slider, 400);
    expect(onChange).lastCalledWith(100, expect.any(Object));
  });

  test('Verify dragging/mouse move calculates intermediate value correctly', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={0}
        step={10}
        data-testid='slider'
        onChange={onChange}
      />,
    );
    const slider = getByRole('slider');
    Object.defineProperty(slider, 'offsetWidth', { value: 100 });
    slider.getBoundingClientRect = () => ({ left: 0, width: 100 }) as DOMRect;

    // move to clientX=30 => 30% along => nearest step is 3*10=30
    await dragSlider(slider, 30);
    expect(onChange).lastCalledWith(30, expect.any(Object));
  });
});
