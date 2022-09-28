import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
import NeighborLocation from '../src';
const { cleanup, render } = testing;

const Test = function ({ neighborlocation, ...other }) {
  return (
    <NeighborLocation.Detect neighborlocation={neighborlocation}>
      {(neighborLocation) => <div {...other} data-neighborlocation={neighborLocation} />}
    </NeighborLocation.Detect>
  );
};

describe('neighbor-location', () => {
  afterEach(cleanup);

  test('should must work', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        <Test data-testid="1" />
        <Test data-testid="2" />
        <Test data-testid="3" />
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
        <Test data-testid="1" />
        <Test data-testid="2" />
        <div />
        <Test data-testid="3" />
      </NeighborLocation>,
    );
    expect(getByTestId('1').attributes['data-neighborlocation'].value).toBe('right');
    expect(getByTestId('2').attributes['data-neighborlocation'].value).toBe('both');
    expect(getByTestId('3').attributes['data-neighborlocation'].value).toBe('left');
  });

  test('should must work without NeighborLocation', () => {
    const { getByTestId } = render(<Test data-testid="test" />);
    expect(getByTestId('test').attributes['data-neighborlocation']).toBe(undefined);
  });

  test('should correct work with other empty childrens', () => {
    const { getByTestId } = render(
      <NeighborLocation>
        {[]}
        {true}
        {false}
        {''}
        <Test data-testid="1" />
        <Test />
      </NeighborLocation>,
    );
    expect(getByTestId('1').attributes['data-neighborlocation'].value).toBe('right');
  });
});
