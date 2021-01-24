import React from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import OutsideClick from '../src';

describe('OutsideClick', () => {
  afterEach(cleanup);

  test('should support call onOutsideClick if event outside', () => {
    const onOutsideClick = jest.fn();
    render(<OutsideClick onOutsideClick={onOutsideClick} />);

    fireEvent.mouseUp(document.body);

    expect(onOutsideClick).toBeCalled();
  });

  test('should not call onOutsideClick if event inside', () => {
    const onOutsideClick = jest.fn();
    const body = document.getElementsByTagName('body')[0];
    const { getByTestId } = render(
      <OutsideClick onOutsideClick={onOutsideClick}>
        <div data-testid="child">test</div>
      </OutsideClick>,
    );

    fireEvent.mouseUp(getByTestId('child'));

    expect(onOutsideClick).not.toBeCalled();
  });

  test('should support excludeRefs', () => {
    const onOutsideClick = jest.fn();
    const outsideRef = React.createRef<any>();
    const { getByTestId } = render(
      <>
        <div data-testid="outside" ref={outsideRef}>
          outside
        </div>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[outsideRef]} />
      </>,
    );

    fireEvent.mouseUp(getByTestId('outside'));

    expect(onOutsideClick).not.toBeCalled();
  });

  test('should support excludeRefs node', () => {
    const onOutsideClick = jest.fn();
    const { getByTestId } = render(
      <>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[document.body]} />
      </>,
    );

    fireEvent.mouseUp(document.body);

    expect(onOutsideClick).not.toBeCalled();
  });
});
