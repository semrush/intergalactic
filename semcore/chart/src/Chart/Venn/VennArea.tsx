import React from 'react';
import propsForElement from '@semcore/utils/lib/propsForElement';
import { colors } from '../../utils/colors';
import { IVennChildProps } from './interface/VennChart';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
export default class VennArea extends React.PureComponent<IVennChildProps<SVGCircleElement>> {
  static displayName = 'VennArea';
  static defaultProps = {
    fill: colors['blue-01'],
    fillOpacity: 0.5,
    activeFillOpacity: 0.7,
    stroke: colors['white'],
    strokeWidth: 2,
  };

  render() {
    const { fillOpacity, activeFillOpacity, active, ...other } = this.props;
    return (
      <circle fillOpacity={active ? activeFillOpacity : fillOpacity} {...propsForElement(other)} />
    );
  }
}
