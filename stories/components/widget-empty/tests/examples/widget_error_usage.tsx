import { Error } from '@semcore/ui/widget-empty';
import type { NSWidgetEmptyError } from '@semcore/ui/widget-empty';
import React from 'react';

export type BasicWidgetErrorProps = NSWidgetEmptyError.Props & {
  showDescription?: boolean;
  customDescription?: string;
  showChildren?: boolean;
};

const Demo = ({
  showDescription,
  customDescription,
  showChildren,
  description,
  ...rest
}: BasicWidgetErrorProps) => {
  const finalDescription = showDescription && customDescription ? customDescription : description;

  return (
    <Error description={finalDescription} {...rest}>
      {showChildren && <div style={{ marginTop: 'var(--intergalactic-spacing-4x)' }}>Additional content</div>}
    </Error>
  );
};

export const defaultProps: BasicWidgetErrorProps = {
  showDescription: false,
  customDescription: undefined,
  showChildren: false,
  description: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
