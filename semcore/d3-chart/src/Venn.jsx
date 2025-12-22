import { FadeInOut } from '@semcore/base-components';
import { Component, Root, sstyled } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { venn, normalizeSolution, scaleSolution, intersectionAreaPath } from '@upsetjs/venn.js';
import React from 'react';

import createElement from './createElement';
import { PatternFill } from './Pattern';
import style from './style/venn.shadow.css';
import Tooltip from './Tooltip';
import { getChartDefaultColorName } from './utils';

class VennRoot extends Component {
  static displayName = 'Venn';
  static style = style;

  static defaultProps = {
    orientation: Math.PI / 2,
    orientationOrder: (c1, c2) => c2.radius - c1.radius,
    duration: 500,
    minRadius: 6,
  };

  static enhance = [uniqueIDEnhancement()];

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  bindHandlerTooltip = (visible, props, tooltipProps) => ({ clientX, clientY }) => {
    const { eventEmitter, plotId } = this.asProps;

    eventEmitter.emit(`setTooltipPosition_${plotId}`, clientX, clientY);
    eventEmitter.emit(`setTooltipRenderingProps_${plotId}`, props, tooltipProps);
    eventEmitter.emit(`setTooltipVisible_${plotId}`, visible);
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

  getTooltipProps() {
    return {
      uniqId: this.asProps.uid,
    };
  }

  getCircleProps(props, index) {
    const colorBackwardCapabilityOffset = 1;
    const color = props.color || getChartDefaultColorName(index + colorBackwardCapabilityOffset);
    const tooltipProps = {
      dataKey: props.dataKey,
      name: props.name,
      color,
      patterns: this.asProps.patterns,
    };

    return {
      duration: this.asProps.duration,
      data: this.vennData[props.dataKey],
      originalData: this.asProps.data[props.dataKey],
      onMouseMove: this.bindHandlerTooltip(true, props, tooltipProps),
      onMouseLeave: this.bindHandlerTooltip(false, props, tooltipProps),
      transparent: this.asProps.transparent,
      resolveColor: this.asProps.resolveColor,
      color,
      uid: `${this.asProps.uid}-${index}`,
      patterns: this.asProps.patterns,
      minRadius: this.asProps.minRadius,
      onClickCircleRoot: this.handlerOnClick(props.dataKey).bind(this),
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
      resolveColor: this.asProps.resolveColor,
      onClickIntersectionRoot: this.handlerOnClick(props.dataKey).bind(this),
    };
  }

  renderElement = React.forwardRef((props, ref) => {
    return <FadeInOut aria-hidden ref={ref} tag='g' visible {...props} />;
  });

  handlerOnClick(dataKey) {
    return (e) => {
      e.stopPropagation();

      const { onClick } = this.asProps;

      if (!onClick) return;

      onClick(dataKey, e);
    };
  }

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
  resolveColor,
  data,
  duration,
  name,
  dataKey,
  dataHintsHandler,
  transparent,
  uid,
  patterns,
  minRadius,
  onClick,
  onClickCircleRoot,
}) {
  dataHintsHandler.describeValueEntity(dataKey, name);

  const radius = data.radius < minRadius ? minRadius : data.radius;
  if (data.radius === 0) return null;

  return (
    <>
      {sstyled(styles)(
        <SCircle
          aria-hidden
          render='circle'
          color={resolveColor(color)}
          pattern={patterns ? `url(#${uid}-pattern)` : undefined}
          cx={data.x}
          cy={data.y}
          r={radius}
          transparent={transparent}
          use:duration={`${duration}ms`}
          onClickCapture={callAllEventHandlers(onClickCircleRoot, onClick)}
        />,
      )}
      {patterns && (
        <PatternFill
          id={`${uid}-pattern`}
          patternKey={color}
          color={resolveColor(color)}
          patterns={patterns}
        />
      )}
    </>
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
    onClick,
    onClickIntersectionRoot,
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
      onClickCapture={callAllEventHandlers(onClickIntersectionRoot, onClick)}
    />,
  );
}

function VennTooltip(props) {
  const SVennTooltip = Root;
  return sstyled(props.styles)(<SVennTooltip render={Tooltip} excludeAnchorProps />);
};

const Venn = createElement(VennRoot, {
  Circle,
  Intersection,
  Tooltip: [VennTooltip, Tooltip._______childrenComponents],
});

export default Venn;
