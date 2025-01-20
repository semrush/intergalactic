import React from 'react';
import { Component } from '@semcore/core';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import createElement from './createElement';
import Bar from './Bar';
import HorizontalBar from './HorizontalBar';
import { scaleBand } from 'd3-scale';
import { getChartDefaultColorName, scaleToBand } from './utils';

class GroupBarRoot extends Component {
  static displayName = 'GroupBar';

  getScaleGroup() {
    const { Children, scale, scaleGroup, x } = this.asProps;
    // TODO: love that hack (by lsroman) ❤�
    const xyScale = x ? scale[0] : scale[1];

    if (scaleGroup) return scaleGroup;

    const domain = React.Children.toArray(getOriginChildren(Children)).reduce((acc, child) => {
      if (React.isValidElement(child) && child.type === GroupBar.Bar && !child.props.hide) {
        acc.push(child.props.y);
      }
      if (
        React.isValidElement(child) &&
        child.type === GroupBar.HorizontalBar &&
        !child.props.hide
      ) {
        acc.push(child.props.x);
      }
      return acc;
    }, []);

    return scaleBand()
      .range([0, scaleToBand(xyScale).bandwidth()])
      .domain(domain)
      .paddingInner(0.1)
      .paddingOuter(0.1);
  }

  getBarProps({ y }, index) {
    const { x, maxBarSize = Infinity, patterns } = this.asProps;

    const bandWidth = this.scaleGroup.bandwidth();
    const width = Math.min(bandWidth, maxBarSize);
    const offsetX = this.scaleGroup(y) + bandWidth / 2 - width / 2;

    return {
      offset: [offsetX, 0],
      width,
      color: getChartDefaultColorName(index),
      x,
      groupKey: x,
      patterns,
    };
  }

  getHorizontalBarProps({ x }, index) {
    const { y, maxBarSize = Infinity } = this.asProps;

    const bandWidth = this.scaleGroup.bandwidth();
    const height = Math.min(bandWidth, maxBarSize);
    const offsetY = this.scaleGroup(x) + bandWidth / 2 - height / 2;

    return {
      offset: [0, offsetY],
      height,
      color: getChartDefaultColorName(index),
      y,
      groupKey: y,
    };
  }

  render() {
    const Element = this.Element;
    this.scaleGroup = this.getScaleGroup();

    this.asProps.dataHintsHandler.establishDataType('grouped-values');

    return (
      <Element aria-hidden render='g' childrenPosition='inside' scaleGroup={this.scaleGroup} />
    );
  }
}

const GroupBar = createElement(GroupBarRoot, {
  Bar,
  HorizontalBar,
});

export default GroupBar;
