import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
// import * as sharedTests from '@semcore/testing-utils/shared-tests';

import { render, fireEvent, cleanup, act } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

import {
  NoticeBubbleContainer,
  NoticeBubbleManager,
  NoticeBubble as NoticeBubbleImport,
  NoticeBubbleWarning as NoticeBubbleWarningImport,
} from '../src';

// const { shouldSupportClassName, shouldSupportRef } = sharedTests;

const NoticeBubble = React.forwardRef((props: any, ref: React.Ref<HTMLElement>) => (
  <>
    <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal />
    <NoticeBubbleImport ref={ref} style={{ marginBottom: 0 }} {...props} />
  </>
));

// const NoticeBubbleWarning = React.forwardRef((props, ref) => (
//   <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal>
//     <NoticeBubbleWarningImport ref={ref} style={{ marginBottom: 0 }} {...props} />
//   </NoticeBubbleContainer>
// ));

describe('NoticeBubbleContainer', () => {
  beforeEach(cleanup);

  // shouldSupportClassName(NoticeBubble);
  // shouldSupportRef(NoticeBubble);

  test('should support render outside dom', () => {
    const { queryByTestId } = render(
      <div data-testid='container'>
        <NoticeBubbleContainer data-testid='notice' />
      </div>,
    );
    // Not render to container,
    expect(queryByTestId('container')?.children.length).toEqual(0);

    // but render to body
    expect((document.body.lastChild as HTMLElement)?.dataset['testid']).toEqual('notice');
  });
});

describe('NoticeBubble Timer', () => {
  beforeEach(cleanup);
  test.skip('should support pause timer at mouse enter', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(<NoticeBubble data-testid='notice' onClose={spy} />);
    fireEvent.mouseEnter(getByTestId('notice'));
    act(() => {
      vi.runAllTimers();
    });

    expect(spy).not.toBeCalled();

    fireEvent.mouseLeave(getByTestId('notice'));
    act(() => {
      vi.runAllTimers();
    });

    expect(spy).toBeCalled();
    vi.useRealTimers();
  });
});

describe('NoticeBubble', () => {
  beforeEach(cleanup);

  // shouldSupportClassName(NoticeBubble);
  // shouldSupportRef(NoticeBubble);

  test.skip('should support handler for close', () => {
    const spy = vi.fn();
    const { getByTitle } = render(<NoticeBubble onClose={spy} />);
    fireEvent.click(getByTitle('Close'));
    expect(spy).toBeCalled();
  });

  test.skip('should support closing after some time', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    render(<NoticeBubble duration={300} onClose={spy} />);

    act(() => {
      vi.runAllTimers();
    });

    expect(spy).toBeCalled();
    vi.useRealTimers();
  });

  test('should support the possibility of not closing', () => {
    const manager = new NoticeBubbleManager();
    vi.useFakeTimers();
    const spy = vi.fn();
    render(<NoticeBubble duration={0} onClose={spy} manager={manager} />);

    act(() => {
      vi.runAllTimers();
    });

    expect(spy).not.toBeCalled();
    vi.useRealTimers();
  });

  test.concurrent('should support hover for icon close', async ({ task }) => {
    const manager = new NoticeBubbleManager();
    const component = (
      <>
        <NoticeBubbleContainer
          style={{ position: 'static', width: 'auto', height: 'auto' }}
          disablePortal
          manager={manager}
        />
        <NoticeBubbleImport id='notice' manager={manager}>
          Message
        </NoticeBubbleImport>
      </>
    );
    await expect(
      await snapshot(component, { actions: { hover: '#notice [title="Close"]' } }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('should support show more one notice', () => {
    const manager = new NoticeBubbleManager();
    render(
      <React.Fragment>
        <NoticeBubbleContainer data-testid='container' manager={manager} />
        <NoticeBubbleImport data-testid='notice-1' visible manager={manager} />
        <NoticeBubbleImport data-testid='notice-2' visible manager={manager} />
      </React.Fragment>,
    );

    const container = document.body.querySelector('[data-testid="container"]');
    expect(container?.querySelector('[data-testid="notice-1"]')).toBeTruthy();
    expect(container?.querySelector('[data-testid="notice-2"]')).toBeTruthy();
  });

  test('should support render outside dom', () => {
    const manager = new NoticeBubbleManager();
    render(
      <React.Fragment>
        <NoticeBubbleContainer data-testid='container' manager={manager} />
        <NoticeBubbleImport data-testid='notice' visible manager={manager} />
      </React.Fragment>,
    );

    const container = document.body.querySelector('[data-testid="container"]');
    expect(container?.querySelector('[data-testid="notice"]')).toBeTruthy();
  });

  test.concurrent('should render correctly', async ({ task }) => {
    const manager = new NoticeBubbleManager();
    const component = (
      <>
        <NoticeBubbleContainer
          style={{ position: 'static', width: 'auto', height: 'auto' }}
          disablePortal
          manager={manager}
        />
        <NoticeBubbleWarningImport manager={manager}>Message</NoticeBubbleWarningImport>
        <NoticeBubbleImport manager={manager}>Message</NoticeBubbleImport>
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support action node', async ({ task }) => {
    const manager = new NoticeBubbleManager();
    const component = (
      <>
        <NoticeBubbleContainer
          style={{ position: 'static', width: 'auto', height: 'auto' }}
          disablePortal
          manager={manager}
        />
        <NoticeBubbleWarningImport
          action={
            <button type='button' data-testid='action'>
              Action
            </button>
          }
          manager={manager}
        >
          Message
        </NoticeBubbleWarningImport>
        <NoticeBubbleImport
          action={
            <button type='button' data-testid='action'>
              Action
            </button>
          }
          manager={manager}
        >
          Message
        </NoticeBubbleImport>
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should render correctly for screen size 760px', async ({ task }) => {
    const manager = new NoticeBubbleManager();
    const component = (
      <div style={{ width: '320px', height: '90px', position: 'relative' }}>
        <NoticeBubbleContainer disablePortal manager={manager} />
        <NoticeBubbleImport manager={manager}>Message</NoticeBubbleImport>
      </div>
    );
    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 320,
        height: 100,
      }),
    ).toMatchImageSnapshot(task);
  });
});
