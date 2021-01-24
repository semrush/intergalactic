import React from 'react';
import { render, cleanup } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import Skeleton, {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  PieChartSkeleton,
  HistogramChartSkeleton,
} from '../src';

describe('Skeleton', () => {
  afterEach(cleanup);

  shouldSupportClassName(Skeleton);
  shouldSupportRef(Skeleton);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Skeleton data-testid="test" name="svg" />);

    expect(getByTestId('test').attributes['name'].value).toBe('svg');
  });

  test('should support children', async () => {
    const component = (
      <Skeleton>
        <text data-testid="child">Test</text>
      </Skeleton>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test('should support render null', () => {
    const { queryByText } = render(<Skeleton hidden>Test</Skeleton>);
    expect(queryByText(/Test/)).toBeNull();
  });

  test('should support theme', async () => {
    const component = (
      <>
        <Skeleton height={48}>
          <Skeleton.Text amount={2} />
          <Skeleton.Text y="40" width="60%" />
        </Skeleton>
        <div style={{ background: 'blue' }}>
          <Skeleton height={48} theme="dark">
            <Skeleton.Text amount={2} />
            <Skeleton.Text y="40" width="60%" />
          </Skeleton>
        </div>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Skeleton.Text', () => {
  afterEach(cleanup);

  shouldSupportClassName(Skeleton.Text, Skeleton);
  shouldSupportRef(Skeleton.Text, Skeleton);

  test('should support amount', () => {
    const { queryAllByText, rerender } = render(
      <svg>
        <Skeleton.Text>Test</Skeleton.Text>
      </svg>,
    );

    expect(queryAllByText(/Test/)).toHaveLength(1);

    rerender(
      <svg>
        <Skeleton.Text amount={2}>Test</Skeleton.Text>
      </svg>,
    );
    expect(queryAllByText(/Test/)).toHaveLength(2);
  });
});

describe('LineChartSkeleton', () => {
  test('should support render', async () => {
    const component = (
      <>
        <LineChartSkeleton type="monotone" />
        <LineChartSkeleton />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('AreaChartSkeleton', () => {
  test('should support render', async () => {
    const component = (
      <>
        <AreaChartSkeleton type="monotone" />
        <AreaChartSkeleton />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('BarChartSkeleton', () => {
  test('should support render', async () => {
    const component = (
      <>
        <BarChartSkeleton layout="vertical" />
        <BarChartSkeleton />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('PieChartSkeleton', () => {
  test('should support render', async () => {
    const component = <PieChartSkeleton />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('HistogramChartSkeleton', () => {
  test('should support render', async () => {
    const component = (
      <>
        <HistogramChartSkeleton layout="vertical" />
        <HistogramChartSkeleton />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
