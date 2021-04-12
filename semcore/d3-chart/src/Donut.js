import React from 'react';
import { arc, pie } from 'd3-shape';
import { Component, styled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import { CONSTANT } from './utils';
import createElement from './createElement';

import style from './style/donut.shadow.css';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');

class DonutRoot extends Component {
  static displayName = 'Donut';
  static style = style;

  static defaultProps = ({ innerRadius = 0, half = false, $rootProps: { size } }) => {
    const [width, height] = size;
    const minORmax = half ? Math.max : Math.min;
    const d3Arc = arc()
      .outerRadius(minORmax(width, height) / 2)
      .innerRadius(innerRadius);
    let d3Pie = pie()
      .sort(null)
      .value(([, value]) => value);
    d3Pie[DEFAULT_INSTANCE] = true;

    if (half) {
      d3Pie = d3Pie.startAngle(-Math.PI / 2).endAngle(Math.PI / 2);
    }
    return {
      d3Pie,
      d3Arc,
    };
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    });
  }

  getArcs() {
    let { Children, data, d3Pie } = this.asProps;
    let pieData = Object.entries(data);

    if (d3Pie[DEFAULT_INSTANCE]) {
      const keys = React.Children.toArray(getOriginChildren(Children)).reduce((acc, child) => {
        if (React.isValidElement(child) && child.type === Donut.Pie) {
          acc.push(child.props.dataKey);
        }
        return acc;
      }, []);
      pieData = Object.entries(data)
        .filter(([key]) => keys.includes(key))
        .sort(([a], [b]) => (keys.indexOf(a) > keys.indexOf(b) ? 1 : -1));
    }
    return d3Pie(pieData);
  }

  bindHandlerTooltip = (visible, props) => ({ clientX: x, clientY: y }) => {
    const { eventEmitter } = this.asProps;
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(x, y);
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;
    eventEmitter.emit('onTooltipVisible', visible, props, this.virtualElement);
  };

  getPieProps(props) {
    const { d3Arc } = this.asProps;
    return {
      data: this.arcs.find((arc) => arc.data[0] == props.dataKey),
      d3Arc,
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
    };
  }

  getNotDataProps() {
    const { d3Arc } = this.asProps;
    return {
      data: {
        endAngle: Math.PI * 2,
        startAngle: 0,
      },
      d3Arc,
      color: '#E4ECF1',
    };
  }

  render() {
    const { half, size } = this.asProps;
    const [width, height] = size;
    const Element = this.Element;
    const k = half ? 1 : 2;
    this.arcs = this.getArcs();
    return (
      <Element
        render="g"
        childrenPosition="inside"
        transform={`translate(${width / 2},${height / k})`}
      />
    );
  }
}

function Pie({ Element: SPie, styles, d3Arc, data, color = '#50aef4' }) {
  return styled(styles)(<SPie render="path" fill={color} d={d3Arc(data)} />);
}

function Label({ Element: SLabel, styles, Children }) {
  return styled(styles)(
    <SLabel render="text" x="0" y="0">
      <Children />
    </SLabel>,
  );
}

const Donut = createElement(DonutRoot, { Pie, Label, NotData: Pie });

export default Donut;
