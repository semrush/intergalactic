import { afterEach, expect, test, describe, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import { Animation } from '../src';

describe('Animation', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('Verify not renders when visible is false and preserveNode is false', () => {
    render(
      <Animation visible={false} preserveNode={false}>
        Content
      </Animation>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('Verify preserve node when preserveNode is true', () => {
    render(
      <Animation visible={false} preserveNode={true}>
        Content
      </Animation>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('Verify animationsDisabled fallback uses zero timeout', () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    setTimeoutSpy.mockClear();

    render(
      <Animation visible={false} preserveNode animationsDisabled>
        Content
      </Animation>,
    );

    expect(setTimeoutSpy).toHaveBeenCalled();
    const calls = setTimeoutSpy.mock.calls;
    expect(calls[calls.length - 1][1]).toBe(0);
  });

  test('Verify fallback timeout uses exit duration and delay', () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    setTimeoutSpy.mockClear();

    render(
      <Animation visible={false} preserveNode duration={[300, 200]} delay={[0, 50]}>
        Content
      </Animation>,
    );

    expect(setTimeoutSpy).toHaveBeenCalled();
    const calls = setTimeoutSpy.mock.calls;
    expect(calls[calls.length - 1][1]).toBe(350);
  });
});
