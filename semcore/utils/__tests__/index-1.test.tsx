import { describe, it, expect } from 'vitest';

// Функция для извлечения AriaProps
type AriaProps = {
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

type ExtractorAriaPropsReturn = {
  __excludeProps: ['title', 'aria-label', 'aria-labelledby', 'aria-describedby'];
  extractedAriaProps: AriaProps;
};

export function extractAriaProps(props: any): ExtractorAriaPropsReturn {
  const {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
    ['aria-describedby']: ariaDescribedby,
  } = props;

  return {
    __excludeProps: ['title', 'aria-label', 'aria-labelledby', 'aria-describedby'],
    extractedAriaProps: {
      title,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    },
  };
}

// Тесты
describe('extractAriaProps', () => {
  it('should correctly extract aria props', () => {
    const input = {
      title: 'Test Title',
      'aria-label': 'Test Label',
      'aria-labelledby': 'Test Labelledby',
      'aria-describedby': 'Test Describedby',
    };

    const result = extractAriaProps(input);

    expect(result.__excludeProps).toEqual([
      'title',
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
    ]);
    expect(result.extractedAriaProps).toEqual({
      title: 'Test Title',
      'aria-label': 'Test Label',
      'aria-labelledby': 'Test Labelledby',
      'aria-describedby': 'Test Describedby',
    });
  });

  it('should return undefined for missing aria props', () => {
    const input = {
      title: 'Test Title',
    };

    const result = extractAriaProps(input);

    expect(result.extractedAriaProps).toEqual({
      title: 'Test Title',
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  it('should handle empty input gracefully', () => {
    const input = {};

    const result = extractAriaProps(input);

    expect(result.extractedAriaProps).toEqual({
      title: undefined,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  it('should correctly handle partial props', () => {
    const input = {
      'aria-label': 'Test Label',
    };

    const result = extractAriaProps(input);

    expect(result.extractedAriaProps).toEqual({
      title: undefined,
      'aria-label': 'Test Label',
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });
});
