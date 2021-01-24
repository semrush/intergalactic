import React from 'react';
// @ts-ignore
// eslint-disable-next-line import/named
import { Layer } from 'recharts';
import propsForElement from '@semcore/utils/lib/propsForElement';
import { IVennChildProps } from './interface/VennChart';

export default class VennIntersection extends React.PureComponent<IVennChildProps<SVGPathElement>> {
  static displayName = 'VennIntersection';
  static defaultProps = {
    fillOpacity: 0,
    activeFillOpacity: 0.1,
    strokeWidth: 2,
    stroke: '#ffffff',
  };

  render() {
    const { fillOpacity, activeFillOpacity, active, ...other } = this.props;
    return (
      <Layer className="venn-area-intersection">
        <path fillOpacity={active ? activeFillOpacity : fillOpacity} {...propsForElement(other)} />
      </Layer>
    );
  }
}
