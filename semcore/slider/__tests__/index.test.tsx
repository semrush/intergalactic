import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Slider from '../src';

const { render, fireEvent, cleanup, axe } = testing;

describe('Slider', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Slider value={50} m="10px" />;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with Bar/Knob', async () => {
    const component = (
      <Slider value={50}>
        <Slider.Bar />
        <Slider.Knob />
      </Slider>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support normal state', async () => {
    const component = (
      <snapshot.ProxyProps m="25px">
        <Slider value={50} keyboardFocused />
        <Slider value={50} disabled />
        <div style={{ background: 'black', padding: '1px' }}>
          <Slider value={50} disabled m="25px" />
        </div>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hover', async () => {
    expect(
      await snapshot(<Slider value={50} id="slider" m="10px" />, {
        actions: {
          hover: '#slider',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support active', async () => {
    expect(
      await snapshot(<Slider value={50} id="slider" m="10px" />, {
        actions: {
          active: '#slider',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support hover Knob', async () => {
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
    ).toMatchImageSnapshot();
  });

  test('Should support onChange callback with keyboard', async () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Slider value={10} data-testid="slider" onChange={spy} />);
    // up
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 38 });
    expect(spy).lastCalledWith(11, expect.any(Object));
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 39 });
    expect(spy).lastCalledWith(11, expect.any(Object));
    // down
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 37 });
    expect(spy).lastCalledWith(9, expect.any(Object));
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 40 });
    expect(spy).lastCalledWith(9, expect.any(Object));
  });

  test('Should support min/max value change with keyboard', async () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Slider min={0} max={1} data-testid="slider" onChange={spy} />);
    // up
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 38 });
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 38 });
    expect(spy).lastCalledWith(1, expect.any(Object));
    // down
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 37 });
    fireEvent.keyDown(getByTestId('slider'), { keyCode: 37 });
    expect(spy).lastCalledWith(0, expect.any(Object));
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
