import React from 'react';
import { arc, pie } from 'd3-shape';
import { entries } from 'd3-collection';

import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import style from './style/donut.shadow.css';

class SemiDonutRoot extends Component {
  static displayName = 'SemiDonut';
  static style = style;

  static defaultProps = ({ innerRadius = 0, outerRadius }) => {
    return {
      d3: arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius),
      color: '#50aef4',
    };
  };

  getPieProps() {
    const { d3, data, color } = this.asProps;

    return {
      d3,
      data,
      color,
    };
  }

  render() {
    const Element = this.Element;
    return <Element render="g" childrenPosition="inside" />;
  }
}

function Pie({ Element: SPie, styles, dataKey, color, data, d3 }) {
  const pieData = pie()
    .sort(null)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .value((d) => d.value);

  const arcs = pieData(entries(data));
  const emptyArc = pieData([{ key: 'key', value: 100 }]);
  const sumVal = arcs.reduce((sum, cur) => sum + cur.value, 0);
  if (!sumVal) {
    return <SPie render="path" fill="#E4ECF1" d={d3(emptyArc[0])} />;
  }
  return arcs.map((arc, i) => {
    if (arc.data.key === dataKey) {
      return styled(styles)(<SPie key={i} render="path" fill={color} d={d3(arc)} />);
    }
    return null;
  });
}

function Label({ Element: SLabel, styles, Children }) {
  return styled(styles)(
    <SLabel render="text" x="0" y="0">
      <Children />
    </SLabel>,
  );
}

export default createXYElement(SemiDonutRoot, { Pie, Label });
