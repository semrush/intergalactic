import React from 'react';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';

import OutsideClick from '../src';

describe('OutsideClick', () => {
  beforeEach(cleanup);

  test('should support call onOutsideClick if event outside', () => {
    const onOutsideClick = vi.fn();
    render(<OutsideClick onOutsideClick={onOutsideClick} />);

    fireEvent.mouseUp(document.body);

    expect(onOutsideClick).toBeCalled();
  });

  test('should not call onOutsideClick if event inside', () => {
    const onOutsideClick = vi.fn();
    const { getByTestId } = render(
      <OutsideClick onOutsideClick={onOutsideClick}>
        <div data-testid="child">test</div>
      </OutsideClick>,
    );

    fireEvent.mouseUp(getByTestId('child').childNodes[0]);

    expect(onOutsideClick).not.toBeCalled();
  });

  test('should support excludeRefs', () => {
    const onOutsideClick = vi.fn();
    const outsideRef = React.createRef<any>();
    const { getByTestId } = render(
      <>
        <div data-testid="outside" ref={outsideRef}>
          outside
        </div>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[outsideRef]} />
      </>,
    );

    fireEvent.mouseUp(getByTestId('outside').childNodes[0]);

    expect(onOutsideClick).not.toBeCalled();
  });

  test('should support excludeRefs node', () => {
    const onOutsideClick = vi.fn();
    render(
      <>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[document.body]} />
      </>,
    );

    fireEvent.mouseUp(document.body.childNodes[0]);

    expect(onOutsideClick).not.toBeCalled();
  });
});
