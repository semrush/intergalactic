import React from 'react';
import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { axe, cleanup, fireEvent, render } = testing;
import { Box, Flex } from '@semcore/flex-box';

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Carousel from '../src';

const Container = (props) => (
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
        {items.map((item, ind) => (
          <Box {...item} key={ind} data-testid={`indicator-${ind}`} />
        ))}
      </>
    )}
  </Carousel.Indicators>
);

describe('Carousel', () => {
  afterEach(cleanup);

  shouldSupportClassName(Carousel);
  shouldSupportRef(Carousel);

  test('Should support control mode', () => {
    const spy = jest.fn();

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

  test('Should support work with keyboard', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container data-testid="container" />
      </Carousel>,
    );

    const container = getByTestId('container');
    fireEvent.keyDown(container, { key: 'ArrowLeft' });
    expect(spy).toHaveBeenCalledWith(1);
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(spy).toHaveBeenCalledWith(0);
  });

  test('Should support work control mod with keyboard', () => {
    const spy = jest.fn();

    const { rerender, getByTestId } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Container data-testid="container" />
      </Carousel>,
    );

    const container = getByTestId('container');
    fireEvent.keyDown(container, { key: 'ArrowLeft' });
    expect(spy).toHaveBeenCalledWith(1);

    rerender(
      <Carousel index={1} onIndexChange={spy}>
        <Container data-testid="container" />
      </Carousel>,
    );
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(spy).toHaveBeenCalledWith(0);
  });
});

describe('Carousel.Container', () => {
  afterEach(cleanup);

  shouldSupportClassName(Carousel.Container, Carousel);
  shouldSupportRef(Carousel.Container, Carousel);
});

describe('Carousel.Item', () => {
  afterEach(cleanup);

  shouldSupportClassName(Carousel.Item, Carousel);
  shouldSupportRef(Carousel.Item, Carousel);
});

describe('Carousel.Indicators', () => {
  afterEach(cleanup);

  shouldSupportClassName(Carousel.Indicators, Carousel);
  shouldSupportRef(Carousel.Indicators, Carousel);

  test('Should support call onIndexChange after click', () => {
    const spy = jest.fn();
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

  test('Should not support call onIndexChange after click in same control', () => {
    const spy = jest.fn();
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

  test('Should support right change index with Prev button', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Indicators />
        <Carousel.Prev data-testid="prev" />
      </Carousel>,
    );
    const prev = getByTestId('prev');
    const next = getByTestId('indicator-0');
    fireEvent.click(prev);
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledWith(0);
  });

  test('Should support right change index with Next button', () => {
    const spy = jest.fn();
    const { rerender, getByTestId } = render(
      <Carousel index={1} onIndexChange={spy}>
        <Container />
        <Indicators />
        <Carousel.Next data-testid="next" />
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
        <Carousel.Next data-testid="next" />
      </Carousel>,
    );
    fireEvent.click(prev);

    expect(spy).toHaveBeenCalledWith(1);
  });
});

describe('Carousel.Prev', () => {
  afterEach(cleanup);

  shouldSupportClassName(Carousel.Prev, Carousel);
  shouldSupportRef(Carousel.Prev, Carousel);

  test('Should support call onIndexChange after click', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid="prev" />
      </Carousel>,
    );
    const prev = getByTestId('prev');
    fireEvent.click(prev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should not support call onIndexChange for bounded property', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Carousel bounded onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid="prev" />
      </Carousel>,
    );
    const prev = getByTestId('prev');
    fireEvent.click(prev);

    expect(spy).not.toHaveBeenCalled();
  });

  test('Should support control mode and click', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <Carousel index={0} onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid="prev" />
      </Carousel>,
    );

    const prev = getByTestId('prev');
    fireEvent.click(prev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});

describe('Carousel.Next', () => {
  afterEach(cleanup);

  shouldSupportClassName(Carousel.Next, Carousel);
  shouldSupportRef(Carousel.Next, Carousel);

  test('Should support call onIndexChange after click', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Carousel onIndexChange={spy}>
        <Container />
        <Carousel.Next data-testid="next" />
      </Carousel>,
    );
    const next = getByTestId('next');
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should not support call onIndexChange for bounded property', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Carousel bounded onIndexChange={spy}>
        <Container />
        <Carousel.Prev data-testid="next" />
      </Carousel>,
    );
    const next = getByTestId('next');
    fireEvent.click(next);

    expect(spy).not.toHaveBeenCalled();
  });

  test('Should support control mode and click', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <Carousel index={1} onIndexChange={spy}>
        <Container />
        <Carousel.Next data-testid="next" />
      </Carousel>,
    );

    const next = getByTestId('next');
    fireEvent.click(next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
  });

  test('a11y', async () => {
    const { getByTestId, container } = render(
      <Carousel>
        <Container />
        <Indicators />
        <Carousel.Prev data-testid="prev" />
        <Carousel.Next data-testid="next" />
      </Carousel>,
    );

    const next = getByTestId('next');
    const prev = getByTestId('prev');
    fireEvent.click(prev);
    fireEvent.click(next);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe('Carousel visual regression', () => {
  test('image indicators', async () => {
    const images = [
      `https://picsum.photos/id/1023/600/400`,
      `https://picsum.photos/id/1024/600/400`,
      `https://picsum.photos/id/1025/600/400`,
    ];
    const width = 600;
    const imageWidth = width - 75;

    const component = (
      <Carousel w={width} defaultIndex={1}>
        <Flex alignItems="center">
          <Carousel.Prev />
          <Box style={{ overflow: 'hidden' }}>
            <Carousel.Container>
              {images.map((url) => (
                <Carousel.Item tag="img" key={url} src={url} w={imageWidth} />
              ))}
            </Carousel.Container>
          </Box>
          <Carousel.Next />
        </Flex>
        <Carousel.Indicators>
          {({ items }) =>
            items.map((indicatorProps, index) => (
              <Carousel.Indicator
                {...indicatorProps}
                tag="img"
                key={images[index]}
                src={images[index]}
                w={100}
                h={100}
              />
            ))
          }
        </Carousel.Indicators>
      </Carousel>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('dot indicators', async () => {
    const images = [
      `https://picsum.photos/id/1023/600/400`,
      `https://picsum.photos/id/1024/600/400`,
      `https://picsum.photos/id/1025/600/400`,
    ];
    const width = 600;
    const imageWidth = width - 75;

    const component = (
      <Carousel w={width}>
        <Flex alignItems="center">
          <Carousel.Prev />
          <Box style={{ overflow: 'hidden' }}>
            <Carousel.Container>
              {images.map((url) => (
                <Carousel.Item tag="img" key={url} src={url} w={imageWidth} />
              ))}
            </Carousel.Container>
          </Box>
          <Carousel.Next />
        </Flex>
        <Carousel.Indicators />
      </Carousel>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
