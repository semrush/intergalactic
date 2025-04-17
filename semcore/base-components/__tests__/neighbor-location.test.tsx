import React from 'react';
import { NeighborLocation, NeighborLocationRoot, useNeighborLocationDetect } from '../src';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render, renderHook } from '@semcore/testing-utils/testing-library';

const NeighborLocationItem: any = function ({ neighborlocation, ...other }: any) {
  return (
    <NeighborLocation.Detect neighborLocation={neighborlocation}>
      {(neighborLocation) => <CustomComponent {...other} neighborLocation={neighborLocation} />}
    </NeighborLocation.Detect>
  );
};

const CustomComponent: any = function ({ neighborLocation, ...other }: any) {
  return <div {...other} data-neighborlocation={neighborLocation} />;
};

describe('neighbor-location', () => {
  beforeEach(cleanup);

  test.concurrent('Verify base functionality', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        <NeighborLocationItem data-testid='1' />
        <NeighborLocationItem data-testid='2' />
        <NeighborLocationItem data-testid='3' />
      </NeighborLocation>,
    );
    expect((getByTestId('1').attributes as any)['data-neighborlocation'].value).toBe('right');
    expect((getByTestId('2').attributes as any)['data-neighborlocation'].value).toBe('both');
    expect((getByTestId('3').attributes as any)['data-neighborlocation'].value).toBe('left');
  });

  test.sequential('Verify workds with components inside', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        <NeighborLocation.Detect>
          <CustomComponent data-testid='1' />
        </NeighborLocation.Detect>
        <NeighborLocation.Detect>
          <CustomComponent data-testid='2' />
        </NeighborLocation.Detect>
        <NeighborLocation.Detect>
          <CustomComponent data-testid='3' />
        </NeighborLocation.Detect>
      </NeighborLocation>,
    );

    expect((getByTestId('1').attributes as any)['data-neighborlocation'].value).toBe('right');
    expect((getByTestId('2').attributes as any)['data-neighborlocation'].value).toBe('both');
    expect((getByTestId('3').attributes as any)['data-neighborlocation'].value).toBe('left');
  });

  test.sequential('Verify props "controlsLength" fucntionality', () => {
    const { getByTestId } = render(
      <NeighborLocation controlsLength={3}>
        <div />
        <NeighborLocationItem data-testid='1' />
        <NeighborLocationItem data-testid='2' />
        <div />
        <NeighborLocationItem data-testid='3' />
      </NeighborLocation>,
    );
    expect((getByTestId('1').attributes as any)['data-neighborlocation'].value).toBe('right');
    expect((getByTestId('2').attributes as any)['data-neighborlocation'].value).toBe('both');
    expect((getByTestId('3').attributes as any)['data-neighborlocation'].value).toBe('left');
  });

  test.concurrent('Verify without NeighborLocation all works correctly', () => {
    const { getByTestId } = render(<NeighborLocationItem data-testid='test' />);
    expect((getByTestId('test').attributes as any)['data-neighborlocation']).toBe(undefined);
  });

  test.sequential('Verify works with other empty childrens', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        {[]}
        {true}
        {false}
        {''}
        <NeighborLocationItem data-testid='1' />
        <NeighborLocationItem />
      </NeighborLocation>,
    );
    expect((getByTestId('1').attributes as any)['data-neighborlocation'].value).toBe('right');
  });

  test.concurrent('Verify works correctly with React.Fragment', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        <React.Fragment>
          <NeighborLocationItem data-testid='1' />
          <NeighborLocationItem data-testid='2' />
        </React.Fragment>
        <NeighborLocationItem data-testid='3' />
      </NeighborLocation>,
    );

    expect(getByTestId('1').getAttribute('data-neighborlocation')).toBe('right');
    expect(getByTestId('2').getAttribute('data-neighborlocation')).toBe('both');
    expect(getByTestId('3').getAttribute('data-neighborlocation')).toBe('left');
  });

  test.concurrent('Verify useNeighborLocationDetect works correctly', () => {
    const wrapper = ({ children }: any) => (
      <NeighborLocation>
        <div />
        {children}
        <div />
      </NeighborLocation>
    );

    const { result } = renderHook(() => useNeighborLocationDetect(1), { wrapper });

    expect(result.current).toBe('both');
  });

  test.concurrent('Verify neighborLocation caching works correctly', () => {
    const neighborLocation = new NeighborLocationRoot({});

    expect(neighborLocation.cacheChild.size).toEqual(0);

    neighborLocation.calculateNeighborLocation();

    expect(neighborLocation.cacheChild.size).toEqual(1);
  });
});
