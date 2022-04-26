import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
const { render, fireEvent, cleanup } = testing;

import NoticeGlobal from '../src';

describe('NoticeGlobal', () => {
  afterEach(cleanup);

  shouldSupportClassName(NoticeGlobal);
  shouldSupportRef(NoticeGlobal);

  test('Should support custom close icon', () => {
    const component = (
      <NoticeGlobal>
        <NoticeGlobal.CloseIcon data-testid="close">Close Icon</NoticeGlobal.CloseIcon>
      </NoticeGlobal>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test('Should support handler for close', () => {
    const spy = jest.fn();
    const component = <NoticeGlobal closable onClose={spy} />;
    const { getByLabelText } = render(component);
    fireEvent.click(getByLabelText(/Close alert/i));
    expect(spy).toBeCalled();
  });

  test('Should support custom content', () => {
    const component = (
      <NoticeGlobal>
        <NoticeGlobal.Content data-testid="content">Test</NoticeGlobal.Content>
      </NoticeGlobal>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('content')).toBeTruthy();
  });

  test('Should support correctly render', async () => {
    expect(
      await snapshot(
        <NoticeGlobal closable>
          <NoticeGlobal.Content>Global notice text</NoticeGlobal.Content>
        </NoticeGlobal>,
      ),
    ).toMatchImageSnapshot();
  });

  test('Should support theme for use primary', async () => {
    const component = (
      <>
        <NoticeGlobal>Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme="info">Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme="success">Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme="danger">Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme="warning">Text NoticeGlobal</NoticeGlobal>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
