import React from 'react';
import { venn, normalizeSolution, scaleSolution, intersectionAreaPath } from '@upsetjs/venn.js';
import { Component, Root, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { FadeInOut } from '@semcore/animation';
import createElement from './createElement';
import { CONSTANT } from './utils';
import Tooltip from './Tooltip';

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

  bindHandlerTooltip = (visible, props, tooltipProps) => ({ clientX: x, clientY: y }) => {
    const { eventEmitter } = this.asProps;
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(x, y);
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;
    eventEmitter.emit('onTooltipVisible', visible, props, tooltipProps, this.virtualElement);
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
    const tooltipProps = {
      dataKey: props.dataKey,
      name: props.name,
      color: props.color,
    };

    return {
      duration: this.asProps.duration,
      data: this.vennData[props.dataKey],
      originalData: this.asProps.data[props.dataKey],
      onMouseMove: this.bindHandlerTooltip(true, props, tooltipProps),
      onMouseLeave: this.bindHandlerTooltip(false, props, tooltipProps),
      transparent: this.asProps.transparent,
    };
  }

  getIntersectionProps(props) {
    const { duration, transparent } = this.asProps;
    const dataKeys = props.dataKey.split('/');
    const tooltipProps = {
      dataKey: props.dataKey,
      name: props.name,
      color: props.color,
      duration: props.duration,
      transparent: props.transparent,
    };

    return {
      duration,
      delay: duration,
      data: Object.values(this.vennData).filter((d) => dataKeys.includes(d.setid)),
      originalData: this.asProps.data[props.dataKey],
      onMouseMove: this.bindHandlerTooltip(true, props, tooltipProps),
      onMouseLeave: this.bindHandlerTooltip(false, props, tooltipProps),
      transparent,
    };
  }

  renderElement = React.forwardRef((props, ref) => {
    return <FadeInOut aria-hidden ref={ref} tag='g' visible {...props} />;
  });

  render() {
    const Element = this.Element;
    this.asProps.dataHintsHandler.establishDataType('values-set');
    this.vennData = this.getVennData();
    return (
      <Element
        aria-hidden
        render={this.renderElement}
        childrenPosition='inside'
        vennData={this.vennData}
      />
    );
  }
}

function Circle({
  Element: SCircle,
  styles,
  color,
  data,
  duration,
  name,
  dataKey,
  dataHintsHandler,
  transparent,
}) {
  dataHintsHandler.describeValueEntity(dataKey, name);

  return sstyled(styles)(
    <SCircle
      aria-hidden
      render='circle'
      color={color}
      cx={data.x}
      cy={data.y}
      r={data.radius}
      transparent={transparent}
      use:duration={`${duration}ms`}
    />,
  );
}

function Intersection(props) {
  const {
    Element: SIntersection,
    styles,
    data,
    name,
    dataKey,
    dataHintsHandler,
    transparent,
  } = props;
  dataHintsHandler.describeValueEntity(dataKey, name);

  const renderIntersection = React.useCallback(
    React.forwardRef((props, ref) => {
      return <FadeInOut aria-hidden ref={ref} tag='path' visible {...props} />;
    }),
    [props],
  );
  return sstyled(styles)(
    <SIntersection
      aria-hidden
      render={renderIntersection}
      d={intersectionAreaPath(data)}
      transparent={transparent}
    />,
  );
}

const VennTooltip = (props) => {
  const SVennTooltip = Root;
  return sstyled(props.styles)(<SVennTooltip render={Tooltip} excludeAnchorProps />);
};

const Venn = createElement(VennRoot, {
  Circle,
  Intersection,
  Tooltip: [VennTooltip, Tooltip._______childrenComponents],
});

export default Venn;
