import { NoData } from '@semcore/ui/widget-empty';
import type { WidgetNoDataProps } from '@semcore/ui/widget-empty';
import React from 'react';

export type BasicWidgetNoDataProps = WidgetNoDataProps & {
  showDescription?: boolean;
  customDescription?: string;
  showChildren?: boolean;
};

const Demo = ({
  type,
  showDescription,
  customDescription,
  showChildren,
  description,
  ...rest
}: BasicWidgetNoDataProps) => {
  const finalDescription = showDescription && customDescription ? customDescription : description;

  return (
    <NoData type={type} description={finalDescription} {...rest}>
      {showChildren && <div style={{ marginTop: 'var(--intergalactic-spacing-4x)' }}>Additional content</div>}
    </NoData>
  );
};

export const defaultProps: BasicWidgetNoDataProps = {
  type: 'nothing-found',
  showDescription: false,
  customDescription: undefined,
  showChildren: false,
  description: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
