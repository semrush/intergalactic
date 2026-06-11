import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { OutsideClick } from '../src';

describe('OutsideClick', () => {
  beforeEach(cleanup);

  const clickPointer = async (target: Element) => {
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target },
      { keys: '[/MouseLeft]', target },
    ]);
  };

  test.sequential('Verify call onOutsideClick if event outside', async () => {
    const onOutsideClick = vi.fn();
    render(<OutsideClick onOutsideClick={onOutsideClick} />);

    await clickPointer(document.body);

    expect(onOutsideClick).toBeCalled();
  });

  test.sequential('Verify excludeRefs with single and multiple elements', async () => {
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
          excludeRefs={[outsideRef1, outsideRef2, { current: document.body }]}
        >
          <div data-testid='child'>test</div>
        </OutsideClick>
      </>,
    );

    await clickPointer(getByTestId('outside1'));
    await clickPointer(getByTestId('outside2'));
    await clickPointer(document.body);

    expect(onOutsideClick).not.toBeCalled();
  });

  test.sequential('Verify excludeRefs', async () => {
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

    await clickPointer(getByTestId('outside'));

    expect(onOutsideClick).not.toBeCalled();
  });

  test.sequential('Verify excludeRefs node', async () => {
    const onOutsideClick = vi.fn();
    render(
      <>
        <OutsideClick onOutsideClick={onOutsideClick} excludeRefs={[{ current: document.body }]} />
      </>,
    );

    await clickPointer(document.body);

    expect(onOutsideClick).not.toBeCalled();
  });

  test.sequential('Verify calls onOutsideClick by click outside with excludeRefs', async () => {
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

    await clickPointer(document.body);

    expect(onOutsideClick).toBeCalled();
  });

  test.sequential(
    'Verify does not call onOutsideClick if mousedown inside and mouseup outside',
    async () => {
      const onOutsideClick = vi.fn();
      const { getByTestId } = render(
        <OutsideClick onOutsideClick={onOutsideClick}>
          <div data-testid='child'>test</div>
        </OutsideClick>,
      );

      await userEvent.pointer([
        { keys: '[MouseLeft>]', target: getByTestId('child') },
        { keys: '[/MouseLeft]', target: document.body },
      ]);

      expect(onOutsideClick).not.toBeCalled();
    },
  );

  test.sequential(
    'Verify does not call onOutsideClick if mousedown outside and mouseup inside',
    async () => {
      const onOutsideClick = vi.fn();
      const { getByTestId } = render(
        <OutsideClick onOutsideClick={onOutsideClick}>
          <div data-testid='child2'>test</div>
        </OutsideClick>,
      );

      await userEvent.pointer([
        { keys: '[MouseLeft>]', target: document.body },
        { keys: '[/MouseLeft]', target: getByTestId('child2') },
      ]);

      expect(onOutsideClick).not.toBeCalled();
    },
  );
});
