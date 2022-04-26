import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup } = testing;

import {
  NoticeBubbleContainer,
  NoticeBubble as NoticeBubbleImport,
  NoticeBubbleWarning as NoticeBubbleWarningImport,
} from '../src';

const { shouldSupportClassName, shouldSupportRef } = testsShared;

const NoticeBubble = React.forwardRef((props, ref) => (
  <>
    <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal />
    <NoticeBubbleImport ref={ref} style={{ marginBottom: 0 }} {...props} />
  </>
));

const NoticeBubbleWarning = React.forwardRef((props, ref) => (
  <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal>
    <NoticeBubbleWarningImport ref={ref} style={{ marginBottom: 0 }} {...props} />
  </NoticeBubbleContainer>
));

jest.useFakeTimers();

describe('NoticeBubbleContainer', () => {
  afterEach(cleanup);

  shouldSupportClassName(NoticeBubble);
  shouldSupportRef(NoticeBubble);

  test('should support render outside dom', () => {
    const { queryByTestId } = render(
      <div data-testid="container">
        <NoticeBubbleContainer data-testid="notice" />
      </div>,
    );
    // Not render to container,
    expect(queryByTestId('container').children.length).toEqual(0);

    // but render to body
    expect(document.body.lastChild.dataset.testid).toEqual('notice');
  });
});

describe('NoticeBubble Timer', () => {
  afterEach(cleanup);
  test('should support pause timer at mouse enter', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<NoticeBubble data-testid="notice" onClose={spy} />);
    fireEvent.mouseEnter(getByTestId('notice'));
    jest.runAllTimers();

    expect(spy).not.toBeCalled();

    fireEvent.mouseLeave(getByTestId('notice'));
    jest.runAllTimers();

    expect(spy).toBeCalled();
  });
});

describe('NoticeBubble', () => {
  afterEach(cleanup);

  shouldSupportClassName(NoticeBubble);
  shouldSupportRef(NoticeBubble);

  test('should support handler for close', () => {
    const spy = jest.fn();
    const { getByTitle } = render(<NoticeBubble onClose={spy} />);
    fireEvent.click(getByTitle('Close'));
    expect(spy).toBeCalled();
  });

  test('should support closing after some time', () => {
    const spy = jest.fn();
    render(<NoticeBubble duration={300} onClose={spy} />);

    jest.runAllTimers();

    expect(spy).toBeCalled();
  });

  test('should support the possibility of not closing', () => {
    const spy = jest.fn();
    render(<NoticeBubble duration={0} onClose={spy} />);

    jest.runAllTimers();

    expect(spy).not.toBeCalled();
  });

  test('should support hover for icon close', async () => {
    const component = (
      <>
        <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal />
        <NoticeBubbleImport id="notice">Message</NoticeBubbleImport>
      </>
    );
    expect(
      await snapshot(component, { actions: { hover: '#notice [title="Close"]' } }),
    ).toMatchImageSnapshot();
  });

  test('should support show more one notice', () => {
    render(
      <React.Fragment>
        <NoticeBubbleContainer data-testid="container" />
        <NoticeBubbleImport data-testid="notice-1" visible />
        <NoticeBubbleImport data-testid="notice-2" visible />
      </React.Fragment>,
    );

    const container = document.body.querySelector('[data-testid="container"]');
    expect(container.querySelector('[data-testid="notice-1"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="notice-2"]')).toBeTruthy();
  });

  test('should support render outside dom', () => {
    render(
      <React.Fragment>
        <NoticeBubbleContainer data-testid="container" />
        <NoticeBubbleImport data-testid="notice" visible />
      </React.Fragment>,
    );

    const container = document.body.querySelector('[data-testid="container"]');
    expect(container.querySelector('[data-testid="notice"]')).toBeTruthy();
  });

  test('should render correctly', async () => {
    const component = (
      <>
        <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal />
        <NoticeBubbleWarningImport>Message</NoticeBubbleWarningImport>
        <NoticeBubbleImport>Message</NoticeBubbleImport>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support action node', async () => {
    const component = (
      <>
        <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal />
        <NoticeBubbleWarningImport action={<button data-testid="action">Action</button>}>
          Message
        </NoticeBubbleWarningImport>
        <NoticeBubbleImport action={<button data-testid="action">Action</button>}>
          Message
        </NoticeBubbleImport>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render correctly for screen size 760px', async () => {
    const component = (
      <>
        <NoticeBubbleContainer style={{ position: 'static', width: 'auto' }} disablePortal />
        <NoticeBubbleImport>Message</NoticeBubbleImport>
      </>
    );
    expect(
      await snapshot(component, {
        selector: 'body',
        width: 320,
        height: 100,
      }),
    ).toMatchImageSnapshot();
  });
});

describe('NoticeBubbleWarning', () => {
  afterEach(cleanup);

  shouldSupportClassName(NoticeBubbleWarning);
  shouldSupportRef(NoticeBubbleWarning);
});
