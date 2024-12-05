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
