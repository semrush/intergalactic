import WidgetEmpty, { getIconPath } from '@semcore/ui/widget-empty';
import type { NSWidgetEmpty, iconNamesWidgetEmpty } from '@semcore/ui/widget-empty';
import React from 'react';

export type BasicWidgetEmptyProps = NSWidgetEmpty.Props & {
  iconName?: iconNamesWidgetEmpty;
  showTitle?: boolean;
  showDescription?: boolean;
  title?: string;
  description?: string;
};

const Demo = ({
  iconName,
  showTitle,
  showDescription,
  title,
  description,
  ...rest
}: BasicWidgetEmptyProps) => {
  const icon = iconName ? getIconPath(iconName) : undefined;

  return (
    <WidgetEmpty icon={icon} {...rest}>
      {showTitle && <WidgetEmpty.Title>{title}</WidgetEmpty.Title>}
      {showDescription && <WidgetEmpty.Description>{description}</WidgetEmpty.Description>}
    </WidgetEmpty>
  );
};

export const defaultProps: BasicWidgetEmptyProps = {
  iconName: 'good',
  showTitle: true,
  showDescription: true,
  title: 'Good results',
  description: 'Wow! You are doing great!',
};

Demo.defaultProps = defaultProps;

export default Demo;
