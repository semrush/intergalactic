import React from 'react';
import { venn, normalizeSolution, scaleSolution, intersectionAreaPath } from '@upsetjs/venn.js';
import { Component, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { FadeInOut } from '@semcore/animation';

import createElement from './createElement';
import { CONSTANT } from './utils';

import style from './style/venn.shadow.css';

class VennRoot extends Component {
  static displayName = 'Venn';
  static style = style;

  static defaultProps = {
    orientation: Math.PI / 2,
    orientationOrder: (c1, c2) => c2.radius - c1.radius,
    duration: 500,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  bindHandlerTooltip = (visible, props) => ({ clientX: x, clientY: y }) => {
    const { eventEmitter } = this.asProps;
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(x, y);
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;
    eventEmitter.emit('onTooltipVisible', visible, props, this.virtualElement);
  };

  getVennData() {
    const { data, orientation, orientationOrder, size } = this.asProps;
    const [width, height] = size;
    const vennData = Object.entries(data).map(([dataKey, size]) => ({
      sets: dataKey.split('/'),
      size,
    }));
    return scaleSolution(
      normalizeSolution(venn(vennData), orientation, orientationOrder),
      width,
      height,
      10,
    );
  }

  getCircleProps(props) {
    return {
      duration: this.asProps.duration,
      data: this.vennData[props.dataKey],
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
    };
  }

  getIntersectionProps(props) {
    const { duration } = this.asProps;
    const dataKeys = props.dataKey.split('/');
    return {
      duration,
      delay: duration,
      data: Object.values(this.vennData).filter((d) => dataKeys.includes(d.setid)),
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
    };
  }

  renderElement(props) {
    return <FadeInOut tag="g" visible {...props} />;
  }

  render() {
    const Element = this.Element;
    this.vennData = this.getVennData();
    return (
      <Element render={this.renderElement} childrenPosition="inside" vennData={this.vennData} />
    );
  }
}

function Circle({ Element: SCircle, styles, color = '#3AB011', data, duration }) {
  return sstyled(styles)(
    <SCircle
      render="circle"
      color={color}
      cx={data.x}
      cy={data.y}
      r={data.radius}
      use:duration={`${duration}ms`}
    />,
  );
}

function Intersection(props) {
  const { Element: SIntersection, styles, data } = props;
  const renderIntersection = React.useCallback(
    (props) => {
      return <FadeInOut tag="path" visible {...props} />;
    },
    [props],
  );
  return sstyled(styles)(
    <SIntersection render={renderIntersection} d={intersectionAreaPath(data)} />,
  );
}

const Venn = createElement(VennRoot, { Circle, Intersection });

export default Venn;
