import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { afterEach, beforeEach, describe, expect, test, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { getRegion, ignoreMissingTranslations, noticeProps } from './helpers';
import { LimitsDemoReportNotice } from '../src';

describe('LimitsDemoReportNotice', () => {
  beforeEach(ignoreMissingTranslations);
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('Verify data-ui-name', () => {
    const { container } = render(<LimitsDemoReportNotice {...noticeProps} trustLine />);

    expect(extractUIName(container)).toMatchSnapshot();
  });

  test('Verify ref, className, style, id and data-testid reach the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <LimitsDemoReportNotice
        {...noticeProps}
        ref={ref}
        className='custom-class'
        style={{ marginTop: '10px' }}
        id='custom-id'
        data-testid='demo-notice'
      />,
    );
    const root = getRegion(container);

    expect(ref.current).toBe(root);
    expect(root.classList.contains('custom-class')).toBe(true);
    expect(root).toHaveStyle({ marginTop: '10px' });
    expect(root).toHaveAttribute('id', 'custom-id');
    expect(root).toHaveAttribute('data-testid', 'demo-notice');
    expect(root).toHaveAttribute('role', 'region');
  });

  test('Verify back button name, backLabel and onBack', () => {
    const onBack = vi.fn();
    const { getByRole } = render(<LimitsDemoReportNotice {...noticeProps} onBack={onBack} />);
    const { getByRole: getCustom } = render(<LimitsDemoReportNotice {...noticeProps} backLabel='Back to projects' />);

    fireEvent.click(getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(getCustom('button', { name: 'Back to projects' })).toBeInTheDocument();
  });

  test('Verify beforeActions is rendered', () => {
    const { getByRole } = render(
      <LimitsDemoReportNotice {...noticeProps} beforeActions={<input aria-label='Domain' />} />,
    );

    expect(getByRole('textbox', { name: 'Domain' })).toBeInTheDocument();
  });

  test.fails('Verify theme prop does not override the accent theme', () => {
    const { container: accent } = render(<LimitsDemoReportNotice {...noticeProps} />);
    const { container: overridden } = render(<LimitsDemoReportNotice {...noticeProps} theme='default' />);

    expect(getRegion(overridden).className).toBe(getRegion(accent).className);
  });
});
