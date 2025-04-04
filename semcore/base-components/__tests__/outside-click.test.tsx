import React from 'react';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';

import { OutsideClick } from '../src';

describe('OutsideClick', () => {
  beforeEach(cleanup);

  test.concurrent('Verify call onOutsideClick worsk if event outside', () => {
    const onOutsideClick = vi.fn();
    render(<OutsideClick onOutsideClick={onOutsideClick} />);

    fireEvent.mouseUp(document.body);

    expect(onOutsideClick).toBeCalled();
  });

  test.concurrent('Verify supports excludeRefs with single and multiple elements', () => {
    const onOutsideClick = vi.fn();
    const outsideRef1 = React.createRef<any>();
    const outsideRef2 = React.createRef<any>();

    const { getByTestId } = render(
      <>
        <div data-testid='outside1' ref={outsideRef1}>
          outside1
        </div>
        <div data-testid='outside2' ref={outsideRef2}>
          outside2
        </div>
        <OutsideClick
          onOutsideClick={onOutsideClick}
          excludeRefs={[outsideRef1, outsideRef2, document.body]}
        >
          <div data-testid='child'>test</div>
        </OutsideClick>
      </>,
    );

    fireEvent.mouseUp(getByTestId('outside1').childNodes[0]);
    fireEvent.mouseUp(getByTestId('outside2').childNodes[0]);
    fireEvent.mouseUp(document.body.childNodes[0]);

    expect(onOutsideClick).not.toBeCalled();
  });

  test.concurrent('Verify supports excludeRefs', () => {
    const onOutsideClick = vi.fn();
    const outsideRef = React.createRef<any>();
    const { getByTestId } = render(
      <>
        <div data-testid='outside' ref={outsideRef}>
          outside
        </div>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[outsideRef]} />
      </>,
    );

    fireEvent.mouseUp(getByTestId('outside').childNodes[0]);

    expect(onOutsideClick).not.toBeCalled();
  });

  test.concurrent('Verify supports excludeRefs node', () => {
    const onOutsideClick = vi.fn();
    render(
      <>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[document.body]} />
      </>,
    );

    fireEvent.mouseUp(document.body.childNodes[0]);

    expect(onOutsideClick).not.toBeCalled();
  });

  test.concurrent('Verify calls onOutsideClick by click outside with excludeRefs', () => {
    const onOutsideClick = vi.fn();
    const outsideRef = React.createRef<any>();
    render(
      <>
        <div data-testid='outside' ref={outsideRef}>
          outside
        </div>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[outsideRef]}>
          <div data-testid='child'>test</div>
        </OutsideClick>
      </>,
    );

    fireEvent.mouseUp(document.body);

    expect(onOutsideClick).toBeCalled();
  });

  test.concurrent(
    'Verify does not call onOutsideClick if mousedown inside and mouseup outside',
    () => {
      const onOutsideClick = vi.fn();
      const { getByTestId } = render(
        <OutsideClick onOutsideClick={onOutsideClick}>
          <div data-testid='child'>test</div>
        </OutsideClick>,
      );

      fireEvent.mouseDown(getByTestId('child'));
      fireEvent.mouseUp(document.body);

      expect(onOutsideClick).not.toBeCalled();
    },
  );

  test.concurrent(
    'Verify does not call onOutsideClick if mousedown outside and mouseup inside',
    () => {
      const onOutsideClick = vi.fn();
      const { getByTestId } = render(
        <OutsideClick onOutsideClick={onOutsideClick}>
          <div data-testid='child2'>test</div>
        </OutsideClick>,
      );

      fireEvent.mouseDown(document.body);
      fireEvent.mouseUp(getByTestId('child2'));

      expect(onOutsideClick).not.toBeCalled();
    },
  );
});
