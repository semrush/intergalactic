import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { afterEach, beforeEach, describe, expect, test, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { getCounter, getMeter, getRegion, ignoreMissingTranslations, noticeProps } from './helpers';
import { LimitsNotice } from '../src';

describe('LimitsNotice', () => {
  beforeEach(ignoreMissingTranslations);
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('Verify data-ui-name', () => {
    const { container } = render(
      <LimitsNotice {...noticeProps} theme='default' usage={{ value: 10, feature: 'Audit' }} trustLine={{ description: 'Details' }} closable />,
    );

    expect(extractUIName(container)).toMatchSnapshot();
  });

  test('Verify ref, className, style, id and data-testid reach the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <LimitsNotice
        {...noticeProps}
        ref={ref}
        className='custom-class'
        style={{ marginTop: '10px' }}
        id='custom-id'
        data-testid='notice'
      />,
    );
    const root = getRegion(container);

    expect(ref.current).toBe(root);
    expect(root.classList.contains('custom-class')).toBe(true);
    expect(root).toHaveStyle({ marginTop: '10px' });
    expect(root).toHaveAttribute('id', 'custom-id');
    expect(root).toHaveAttribute('data-testid', 'notice');
  });

  test('Verify notice is a region labelled by the title, with unique ids', () => {
    const { container } = render(
      <>
        <LimitsNotice {...noticeProps} title='First' />
        <LimitsNotice {...noticeProps} title='Second' />
      </>,
    );
    const regions = [...container.querySelectorAll('[role="region"]')];

    expect(regions).toHaveLength(2);
    expect(regions.map((region) => container.querySelector(`[id="${region.getAttribute('aria-labelledby')}"]`)?.textContent))
      .toEqual(['First', 'Second']);
  });

  test('Verify usage meter is rendered only with the usage prop', () => {
    const { container: without } = render(<LimitsNotice {...noticeProps} />);
    const { container: withUsage } = render(
      <LimitsNotice {...noticeProps} theme='default' usage={{ value: 732, max: 1000, feature: 'Audit', state: 'warning' }} />,
    );

    expect(without.querySelector('[role="meter"]')).toBeNull();
    expect(getMeter(withUsage)).toHaveAttribute('aria-valuenow', '732');
    expect(getMeter(withUsage)).toHaveAttribute('aria-valuemax', '1000');
    expect(getCounter(withUsage).textContent).toBe('732 of 1,000 used');
  });

  test('Verify usage meter is shown when the theme is not set', () => {
    const { container } = render(<LimitsNotice {...noticeProps} usage={{ value: 732, max: 1000, feature: 'Audit' }} />);

    expect(container.querySelector('[role="meter"]')).not.toBeNull();
  });

  test.each([
    { locale: 'de', usageLocale: undefined, counter: '1.000' },
    { locale: 'de', usageLocale: 'en', counter: '1,000' },
  ])('Verify usage meter locale for notice locale=$locale and usage locale=$usageLocale', ({ locale, usageLocale, counter }) => {
    const { container } = render(
      <LimitsNotice
        {...noticeProps}
        theme='default'
        locale={locale}
        usage={{ value: 732, max: 1000, feature: 'Audit', ...(usageLocale && { locale: usageLocale }) }}
      />,
    );

    expect(getCounter(container).textContent).toContain(counter);
  });

  test.fails('Verify usage locale=undefined does not override the notice locale', () => {
    const { container } = render(
      <LimitsNotice {...noticeProps} theme='default' locale='de' usage={{ value: 732, max: 1000, feature: 'Audit', locale: undefined }} />,
    );

    expect(getCounter(container).textContent).toContain('1.000');
  });

  test('Verify close button is rendered only when closable and calls onClose', () => {
    const onClose = vi.fn();
    const { container: notClosable } = render(<LimitsNotice {...noticeProps} onClose={onClose} />);
    const { getByRole } = render(<LimitsNotice {...noticeProps} closable onClose={onClose} />);

    expect(notClosable.querySelectorAll('button')).toHaveLength(1);
    fireEvent.click(getByRole('button', { name: 'Close notification' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  const secondaryCtas = {
    none: undefined,
    link: <a href='#pricing'>View pricing</a>,
    button: <button type='button'>View sample</button>,
  };

  test.each([
    { secondaryCta: 'none', trustLine: undefined, text: false, info: false, divider: false },
    { secondaryCta: 'none', trustLine: true, text: true, info: false, divider: false },
    { secondaryCta: 'link', trustLine: true, text: true, info: false, divider: true },
    { secondaryCta: 'button', trustLine: true, text: true, info: false, divider: true },
    { secondaryCta: 'link', trustLine: { description: 'Details' }, text: true, info: true, divider: true },
    { secondaryCta: 'button', trustLine: undefined, text: false, info: false, divider: false },
  ] as const)('Verify trust line with secondaryCta=$secondaryCta and trustLine=$trustLine', ({ secondaryCta, trustLine, text, info, divider }) => {
    const { container, queryByText, queryByRole } = render(
      <LimitsNotice {...noticeProps} secondaryCta={secondaryCtas[secondaryCta]} trustLine={trustLine} />,
    );

    expect(Boolean(queryByText('Cancel anytime'))).toBe(text);
    expect(Boolean(queryByRole('button', { name: 'Cancellation details' }))).toBe(info);
    expect(Boolean(container.querySelector('[data-ui-name="Divider"]'))).toBe(divider);
  });
});
