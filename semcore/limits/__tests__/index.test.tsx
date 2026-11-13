import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { afterEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import { UsageMeter } from '../src';

const getMeter = (container: HTMLElement) => {
  const meter = container.querySelector<HTMLElement>('[role="meter"]');
  expect(meter).not.toBeNull();

  return meter!;
};

const getRoot = (container: HTMLElement) => getMeter(container).parentElement!;
const getFill = (container: HTMLElement) => getMeter(container).firstElementChild as HTMLElement;
const getCounter = (container: HTMLElement) => getRoot(container).firstElementChild!.lastElementChild!;

const getFilledValue = (container: HTMLElement) => {
  const match = getFill(container).getAttribute('style')?.match(/--filled-value[\w-]*:\s*([^;]+)/);
  expect(match).not.toBeNull();

  return Number(match![1]);
};

describe('limits Dependency imports', () => {
  runDependencyCheckTests('limits');
});

describe('UsageMeter', () => {
  afterEach(cleanup);

  test('Verify data-ui-name', () => {
    const { container } = render(<UsageMeter value={10} feature='Audit' />);

    expect(extractUIName(container)).toMatchSnapshot();
  });

  describe('root props', () => {
    test('Verify ref points to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = render(<UsageMeter ref={ref} value={10} feature='Audit' />);

      expect(ref.current).toBe(getRoot(container));
    });

    test.fails('Verify className, style, id and data-testid reach the root element', () => {
      const { container } = render(
        <UsageMeter
          value={10}
          feature='Audit'
          className='custom-class'
          style={{ marginTop: '10px' }}
          id='custom-id'
          data-testid='usage-meter'
        />,
      );
      const root = getRoot(container);

      expect(root.classList.contains('custom-class')).toBe(true);
      expect(root).toHaveStyle({ marginTop: '10px' });
      expect(root).toHaveAttribute('id', 'custom-id');
      expect(root).toHaveAttribute('data-testid', 'usage-meter');
    });

    test.fails('Verify data-ui-name of the root is UsageMeter', () => {
      const { container } = render(<UsageMeter value={10} feature='Audit' />);

      expect(getRoot(container)).toHaveAttribute('data-ui-name', 'UsageMeter');
    });
  });

  describe('value range', () => {
    test.each([
      { min: undefined, max: undefined, value: -1, valueNow: 0, fill: 0 },
      { min: undefined, max: undefined, value: 0, valueNow: 0, fill: 0 },
      { min: undefined, max: undefined, value: 1, valueNow: 1, fill: 1 },
      { min: undefined, max: undefined, value: 99, valueNow: 99, fill: 99 },
      { min: undefined, max: undefined, value: 100, valueNow: 100, fill: 100 },
      { min: undefined, max: undefined, value: 101, valueNow: 100, fill: 100 },
      { min: 50, max: 100, value: 49, valueNow: 50, fill: 50 },
      { min: 50, max: 100, value: 75, valueNow: 75, fill: 75 },
      { min: 0, max: 500, value: 125, valueNow: 125, fill: 25 },
      { min: 0, max: 1, value: 0.5, valueNow: 0.5, fill: 50 },
    ])('Verify value=$value with min=$min and max=$max', ({ min, max, value, valueNow, fill }) => {
      const { container } = render(<UsageMeter min={min} max={max} value={value} feature='Audit' />);
      const meter = getMeter(container);

      expect(meter).toHaveAttribute('aria-valuemin', String(min ?? 0));
      expect(meter).toHaveAttribute('aria-valuemax', String(max ?? 100));
      expect(meter).toHaveAttribute('aria-valuenow', String(valueNow));
      expect(getFilledValue(container)).toBeCloseTo(fill);
    });

    test.each([
      { value: -1, text: '0 of 100 used' },
      { value: 101, text: '100 of 100 used' },
    ])('Verify counter text is clamped for value=$value', ({ value, text }) => {
      const { container } = render(<UsageMeter value={value} feature='Audit' />);

      expect(getCounter(container).textContent).toBe(text);
    });

    test.fails('Verify NaN value is not rendered as NaN', () => {
      const { container } = render(<UsageMeter value={Number.NaN} feature='Audit' />);

      expect(getCounter(container).textContent).not.toContain('NaN');
      expect(getMeter(container).getAttribute('aria-valuenow')).not.toBe('NaN');
    });
  });

  describe('accessibility', () => {
    test('Verify meter is labelled by the feature text', () => {
      const { container } = render(<UsageMeter value={10} feature='Audit' />);
      const labelId = getMeter(container).getAttribute('aria-labelledby');

      expect(labelId).toBeTruthy();
      expect(container.querySelector(`[id="${labelId}"]`)?.textContent).toBe('Audit');
    });

    test('Verify two meters on a page have different label ids', () => {
      const { container } = render(
        <>
          <UsageMeter value={10} feature='Audit' />
          <UsageMeter value={20} feature='Backlinks' />
        </>,
      );
      const meters = container.querySelectorAll('[role="meter"]');

      expect(meters).toHaveLength(2);
      expect(meters[0].getAttribute('aria-labelledby')).not.toBe(meters[1].getAttribute('aria-labelledby'));
    });
  });

  describe('state and theme', () => {
    test('Verify default state and theme match normal and default', () => {
      const { container: implicit } = render(<UsageMeter value={10} feature='Audit' />);
      const { container: explicit } = render(<UsageMeter value={10} feature='Audit' state='normal' theme='default' />);

      expect(getFill(implicit).className).toBe(getFill(explicit).className);
      expect(getRoot(implicit).className).toBe(getRoot(explicit).className);
    });

    test('Verify warning state and invert theme change the classes', () => {
      const { container: normal } = render(<UsageMeter value={10} feature='Audit' />);
      const { container: changed } = render(<UsageMeter value={10} feature='Audit' state='warning' theme='invert' />);

      expect(getFill(changed).className).not.toBe(getFill(normal).className);
      expect(getRoot(changed).className).not.toBe(getRoot(normal).className);
    });
  });

  describe('i18n', () => {
    test.fails.each([
      { locale: 'en', value: 732, max: 1000 },
      { locale: 'de', value: 732, max: 1000 },
      { locale: 'es', value: 732, max: 10000 },
      { locale: 'fr', value: 732, max: 1000 },
      { locale: 'ru', value: 33.5, max: 1000 },
      { locale: 'ja', value: 732, max: 1000 },
      { locale: 'tr', value: 732, max: 1000 },
    ])('Verify counter for locale=$locale with value=$value and max=$max', ({ locale, value, max }) => {
      const { container } = render(<UsageMeter value={value} max={max} locale={locale} feature='Audit' />);
      const text = getCounter(container).textContent!;
      const format = new Intl.NumberFormat(locale).format;

      expect(text).toContain(format(value));
      expect(text).toContain(format(max));
      if (locale !== 'en') {
        expect(text).not.toContain('used');
      }
    });

    test('Verify "of" is translated for locale=ru', () => {
      const { container } = render(<UsageMeter value={10} locale='ru' feature='Audit' />);

      expect(getCounter(container).textContent).toContain('10 из 100');
    });
  });

  describe('updates', () => {
    test('Verify value changes update the text and aria, label id stays the same', () => {
      const { container, rerender } = render(<UsageMeter value={10} feature='Audit' />);
      const labelId = getMeter(container).getAttribute('aria-labelledby');

      for (const [value, valueNow] of [[100, 100], [150, 100]]) {
        rerender(<UsageMeter value={value} feature='Audit' />);

        expect(getMeter(container)).toHaveAttribute('aria-valuenow', String(valueNow));
        expect(getCounter(container).textContent).toBe(`${valueNow} of 100 used`);
        expect(getMeter(container)).toHaveAttribute('aria-labelledby', labelId!);
      }
    });
  });
});
