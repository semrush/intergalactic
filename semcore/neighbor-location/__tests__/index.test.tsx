import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
import NeighborLocation from '../src';

const { cleanup, render } = testing;

const NeighborLocationItem: any = function ({ neighborlocation, ...other }) {
  return (
    <NeighborLocation.Detect neighborlocation={neighborlocation}>
      {(neighborLocation) => <CustomComponent {...other} neighborLocation={neighborLocation} />}
    </NeighborLocation.Detect>
  );
};

const CustomComponent: any = function ({ neighborLocation, ...other }) {
  return <div {...other} data-neighborlocation={neighborLocation} />;
};

describe('neighbor-location', () => {
  afterEach(cleanup);

  test('should must work', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        <NeighborLocationItem data-testid="1" />
        <NeighborLocationItem data-testid="2" />
        <NeighborLocationItem data-testid="3" />
      </NeighborLocation>,
    );
    expect(getByTestId('1').attributes['data-neighborlocation'].value).toBe('right');
    expect(getByTestId('2').attributes['data-neighborlocation'].value).toBe('both');
    expect(getByTestId('3').attributes['data-neighborlocation'].value).toBe('left');
  });

  test('should must work with component', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        <NeighborLocation.Detect>
          <CustomComponent data-testid="1" />
        </NeighborLocation.Detect>
        <NeighborLocation.Detect>
          <CustomComponent data-testid="2" />
        </NeighborLocation.Detect>
        <NeighborLocation.Detect>
          <CustomComponent data-testid="3" />
        </NeighborLocation.Detect>
      </NeighborLocation>,
    );

    expect(getByTestId('1').attributes['data-neighborlocation'].value).toBe('right');
    expect(getByTestId('2').attributes['data-neighborlocation'].value).toBe('both');
    expect(getByTestId('3').attributes['data-neighborlocation'].value).toBe('left');
  });

  test('should must props "controlsLength"', () => {
    const { getByTestId } = render(
      <NeighborLocation controlsLength={3}>
        <div />
        <NeighborLocationItem data-testid="1" />
        <NeighborLocationItem data-testid="2" />
        <div />
        <NeighborLocationItem data-testid="3" />
      </NeighborLocation>,
    );
    expect(getByTestId('1').attributes['data-neighborlocation'].value).toBe('right');
    expect(getByTestId('2').attributes['data-neighborlocation'].value).toBe('both');
    expect(getByTestId('3').attributes['data-neighborlocation'].value).toBe('left');
  });

  test('should must work without NeighborLocation', () => {
    const { getByTestId } = render(<NeighborLocationItem data-testid="test" />);
    expect(getByTestId('test').attributes['data-neighborlocation']).toBe(undefined);
  });

  test('should correct work with other empty childrens', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        {[]}
        {true}
        {false}
        {''}
        <NeighborLocationItem data-testid="1" />
        <NeighborLocationItem />
      </NeighborLocation>,
    );
    expect(getByTestId('1').attributes['data-neighborlocation'].value).toBe('right');
  });
});
