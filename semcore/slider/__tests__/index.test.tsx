import * as React from 'react';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Slider from '../src';

import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('slider Dependency imports', () => {
  runDependencyCheckTests('slider');
});

describe('Slider', () => {
  beforeEach(cleanup);

  test('Verify supports onChange callback with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<Slider value={10} data-testid='slider' onChange={spy} />);
    // up
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowUp' });
    expect(spy).lastCalledWith(11, expect.any(Object));
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowRight' });
    expect(spy).lastCalledWith(11, expect.any(Object));
    // down
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowLeft' });
    expect(spy).lastCalledWith(9, expect.any(Object));
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowDown' });
    expect(spy).lastCalledWith(9, expect.any(Object));
  });

  test('Verify supports min value change with keyboard', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Slider min={0} max={1} defaultValue={1} data-testid='slider' onChange={spy} />,
    );
    // down
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowLeft' });
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowLeft' });
    expect(spy).lastCalledWith(0, expect.any(Object));
  });

  test('Verify supports max value change with keyboard', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Slider min={0} max={1} defaultValue={0} data-testid='slider' onChange={spy} />,
    );
    // up
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowUp' });
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowUp' });
    expect(spy).lastCalledWith(1, expect.any(Object));
  });

  test('Verify dragging/mouse move sets value to min when moved before start', () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Slider min={0} max={100} defaultValue={50} data-testid='slider' onChange={onChange} />,
    );
    const slider = getByRole('slider');
    Object.defineProperty(slider, 'offsetWidth', { value: 200 });
    slider.getBoundingClientRect = () => ({ left: 100, width: 200 }) as DOMRect;

    // simulate mouse move far to left
    fireEvent.mouseDown(slider, { clientX: 50 });
    fireEvent.mouseMove(document, { clientX: 50 });
    fireEvent.mouseUp(document);
    expect(onChange).lastCalledWith(0, expect.any(Object));
  });

  test('Verify dragging/mouse move sets value to max when moved past end', () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Slider min={0} max={100} defaultValue={50} data-testid='slider' onChange={onChange} />,
    );
    const slider = getByRole('slider');
    Object.defineProperty(slider, 'offsetWidth', { value: 200 });
    slider.getBoundingClientRect = () => ({ left: 100, width: 200 }) as DOMRect;

    fireEvent.mouseDown(slider, { clientX: 400 });
    fireEvent.mouseMove(document, { clientX: 400 });
    fireEvent.mouseUp(document);
    expect(onChange).lastCalledWith(100, expect.any(Object));
  });

  test('Verify dragging/mouse move calculates intermediate value correctly', () => {
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
    fireEvent.mouseDown(slider, { clientX: 30 });
    fireEvent.mouseMove(document, { clientX: 30 });
    fireEvent.mouseUp(document);
    expect(onChange).lastCalledWith(30, expect.any(Object));
  });
});
