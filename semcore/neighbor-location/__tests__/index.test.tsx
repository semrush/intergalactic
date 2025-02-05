import React from 'react';
import NeighborLocation from '../src';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';

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

  test.sequential('Verift props "controlsLength" fucntionality', () => {
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
});
