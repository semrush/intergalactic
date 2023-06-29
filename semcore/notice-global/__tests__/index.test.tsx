import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';

import NoticeGlobal from '../src';

describe('NoticeGlobal', () => {
  beforeEach(cleanup);

  shouldSupportClassName(NoticeGlobal);
  shouldSupportRef(NoticeGlobal);

  test.concurrent('Should support custom close icon', () => {
    const component = (
      <NoticeGlobal>
        <NoticeGlobal.CloseIcon data-testid='close'>Close Icon</NoticeGlobal.CloseIcon>
      </NoticeGlobal>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test.concurrent('Should support handler for close', () => {
    const spy = vi.fn();
    const component = <NoticeGlobal closable onClose={spy} />;
    const { getByLabelText } = render(component);
    fireEvent.click(getByLabelText(/Close/i));
    expect(spy).toBeCalled();
  });

  test.concurrent('Should support custom content', () => {
    const component = (
      <NoticeGlobal>
        <NoticeGlobal.Content data-testid='content'>Test</NoticeGlobal.Content>
      </NoticeGlobal>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('content')).toBeTruthy();
  });

  test.concurrent('Should support correctly render', async ({ task }) => {
    await expect(
      await snapshot(
        <NoticeGlobal closable>
          <NoticeGlobal.Content>Global notice text</NoticeGlobal.Content>
        </NoticeGlobal>,
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support theme for use primary', async ({ task }) => {
    const component = (
      <>
        <NoticeGlobal>Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme='info'>Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme='success'>Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme='danger'>Text NoticeGlobal</NoticeGlobal>
        <br />
        <NoticeGlobal theme='warning'>Text NoticeGlobal</NoticeGlobal>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
