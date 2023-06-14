import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Slider from '../src';

import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Slider', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Slider value={50} m="10px" />;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Bar/Knob', async ({ task }) => {
    const component = (
      <Slider value={50}>
        <Slider.Bar />
        <Slider.Knob />
      </Slider>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support normal state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m="25px">
        <Slider value={50} keyboardFocused />
        <Slider value={50} disabled />
        <div style={{ background: 'black', padding: '1px' }}>
          <Slider value={50} disabled m="25px" />
        </div>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover', async ({ task }) => {
    expect(
      await snapshot(<Slider value={50} id="slider" m="10px" />, {
        actions: {
          hover: '#slider',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    expect(
      await snapshot(<Slider value={50} id="slider" m="10px" />, {
        actions: {
          active: '#slider',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover Knob', async ({ task }) => {
    expect(
      await snapshot(
        <Slider value={50} m="10px">
          <Slider.Bar />
          <Slider.Knob id="knob" />
        </Slider>,
        {
          actions: {
            active: '#knob',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support onChange callback with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<Slider value={10} data-testid="slider" onChange={spy} />);
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

  test.concurrent('Should support min value change with keyboard', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Slider min={0} max={1} defaultValue={1} data-testid="slider" onChange={spy} />,
    );
    // down
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowLeft' });
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowLeft' });
    expect(spy).lastCalledWith(0, expect.any(Object));
  });

  test.concurrent('Should support max value change with keyboard', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Slider min={0} max={1} defaultValue={0} data-testid="slider" onChange={spy} />,
    );
    // up
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowUp' });
    fireEvent.keyDown(getByTestId('slider'), { key: 'ArrowUp' });
    expect(spy).lastCalledWith(1, expect.any(Object));
  });

  test('a11y', async () => {
    const { container } = render(
      <>
        <Slider aria-label="slider" />
        <Slider aria-label="slider disabled" disabled />
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
