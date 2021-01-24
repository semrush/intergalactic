import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import createComponent, { Component } from '@semcore/core';
import NeighborLocation, { neighborLocationEnhance } from '../src';

class TestRoot extends Component {
  static enhance = [neighborLocationEnhance()];

  render() {
    const { neighborLocation } = this.asProps;

    return (
      <div data-testid={this.asProps['data-testid']} data-neighborlocation={neighborLocation} />
    );
  }
}

const Test = createComponent(TestRoot);

describe('Ui', () => {
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
});
