import Link from '@semcore/link';
import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, expect, test, describe, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Button, { ButtonLink } from '../src';

describe('Button Dependency imports', () => {
  runDependencyCheckTests('button');
});

describe('Button', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Button,
    props: { children: 'Button' },
    expectedDataUiName: 'Button',
  });

  shouldHaveDataUiName({
    Component: Button.Text,
    props: { children: 'Button text' },
    expectedDataUiName: 'Button.Text',
  });

  shouldHaveDataUiName({
    Component: Button.Addon,
    props: { children: <span>Addon</span> },
    expectedDataUiName: 'Button.Addon',
  });

  shouldHaveDataUiName({
    Component: ButtonLink,
    props: { children: 'ButtonLink' },
    expectedDataUiName: 'ButtonLink',
  });

  test('Verify supports user click handler', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Button data-testid='button' onClick={spy}>
        Button
      </Button>,
    );

    fireEvent.click(getByTestId('button'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Verify supports disabled state', () => {
    const { getByTestId } = render(
      <Button data-testid='button' disabled>
        Button
      </Button>,
    );

    expect((getByTestId('button') as HTMLButtonElement).disabled).toBe(true);
  });

  test('Verify supports custom tag', () => {
    const { getByTestId } = render(
      <>
        <Button tag='a' href='#' data-testid='link-button'>
          Button
        </Button>
        <Button tag={Link} href='#' data-testid='semcore-link-button'>
          Button
        </Button>
      </>,
    );

    expect(getByTestId('link-button').tagName).toBe('A');
    expect(getByTestId('semcore-link-button').tagName).toBe('A');
  });

  test('Verify loading attributes', () => {
    const { queryByTestId } = render(
      <Button data-testid='button' loading>
        Text
      </Button>,
    );
    expect((queryByTestId('button')?.attributes as any)['disabled']).toBeTruthy();
    expect(queryByTestId('button')?.querySelectorAll('[data-ui-name="Spin"]')).toHaveLength(1);
  });

  test('Verify aria-busy when loading', () => {
    const { queryByTestId } = render(
      <Button data-testid='busy-button' loading>
        Text
      </Button>,
    );

    const buttonElement = queryByTestId('busy-button');

    expect((buttonElement?.attributes as any)['aria-busy'].value).toBe('true');
  });
});
