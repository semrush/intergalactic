import React, { HTMLAttributes, ComponentProps } from 'react';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';
import { Box, Flex, IFlexProps } from '@semcore/flex-box';
import isNode from '@semcore/utils/lib/isNode';

import style from './style/widget-empty.shadow.css';

// @ts-ignore
const version = preval`
  module.exports = require('../package.json').version
`;

export type iconNames =
  | 'area-chart'
  | 'choropleth-map-chart'
  | 'combined-chart'
  | 'congrats'
  | 'deleted-page'
  | 'donut-chart'
  | 'duplicates'
  | 'funnel-chart'
  | 'good'
  | 'horizontal-bar-chart'
  | 'line-chart'
  | 'lollipop-chart'
  | 'nexttime'
  | 'nothing-found'
  | 'other-data'
  | 'pie-chart'
  | 'processing'
  | 'radar-chart'
  | 'sankey-chart'
  | 'scatter-plot-chart'
  | 'stacked-area-chart'
  | 'suggestions'
  | 'table'
  | 'text-links-etc'
  | 'venn-chart'
  | 'vertical-bar-chart'
  | 'warning';

export const getIconPath = (name: iconNames) =>
  `//static.semrush.com/ui-kit/widget-empty/${version}/${name}.svg`;

export interface IWidgetEmptyProps extends IFlexProps {
  /**
   * URL before the icon or the whole component
   */
  icon?: iconNames | React.ReactNode;
}

class WidgetEmpty extends Component<IWidgetEmptyProps> {
  static displayName = 'WidgetEmpty';
  static style = style;

  render() {
    const SWidgetEmpty = Root;
    const { Children, icon, styles } = this.asProps;
    const SImage = 'div';

    return sstyled(styles)(
      <SWidgetEmpty render={Flex}>
        {isNode(icon) && (
          <SImage>
            {typeof icon === 'string' ? (
              <img src={icon} alt="widget empty icon" width={100} height={72} />
            ) : (
              icon
            )}
          </SImage>
        )}
        <Children />
      </SWidgetEmpty>,
    );
  }
}

const Title = (props) => {
  const STitle = Root;
  const { styles } = props;
  return sstyled(styles)(<STitle render={Box} />);
};

const Description = (props) => {
  const SDescription = Root;
  const { styles } = props;
  return sstyled(styles)(<SDescription render={Box} />);
};

export default createComponent<
  Merge<IWidgetEmptyProps, HTMLAttributes<HTMLDivElement>>,
  {
    Title: ComponentProps<typeof Box>;
    Description: ComponentProps<typeof Box>;
  }
>(WidgetEmpty, {
  Title,
  Description,
});
