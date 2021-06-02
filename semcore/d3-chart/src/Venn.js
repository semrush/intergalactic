import React, { useState } from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import { venn, normalizeSolution, scaleSolution, intersectionAreaPath } from 'venn.js';
import style from './style/venn.shadow.css';
import { CONSTANT } from './utils';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import propsForElement from '@semcore/utils/lib/propsForElement';

class VennRoot extends Component {
  static displayName = 'Venn';
  static style = style;
  virtualElement = canUseDOM() ? document.createElement('div') : {};
  vennData = null;

  static defaultProps = () => {
    return {
      color: '#3AB011',
      orientation: Math.PI / 2,
      orientationOrder: (c1, c2) => c2.radius - c1.radius,
    };
  };

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

  bindHandlerTooltip = (visible, props) => ({ clientX: x, clientY: y }) => {
    const { eventEmitter } = this.asProps;
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(x, y);
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;
    eventEmitter.emit(
      'onTooltipVisible',
      visible,
      { name: null, sets: null, ...props },
      this.virtualElement,
    );
  };

  getVennData(data, cache) {
    const { orientation, orientationOrder } = this.asProps;
    if (!cache || !this.vennData) {
      this.vennData = normalizeSolution(venn(data), orientation, orientationOrder);
    }
    return this.vennData;
  }

  getCircleProps(props) {
    const { x, y, color, data, chart, size } = this.asProps;

    return {
      x,
      y,
      color,
      data,
      $vennData: this.getVennData(data),
      size: data.find((d) => d.name === props.name)?.size,
      chart,
      svgSize: size,
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
    };
  }

  getIntersectionProps(props) {
    const { data } = this.asProps;
    return {
      data,
      $vennData: this.getVennData(data, true),
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
    };
  }

  render() {
    const { Children } = this.asProps;
    const Element = this.Element;
    return (
      <>
        <Element render="g" childrenPosition="inside">
          {/*<Children/>*/}
        </Element>
      </>
    );
  }
}

function Circle({ Element: SCircle, styles, data, $vennData, color, name, svgSize }) {
  const [active, setActive] = useState(false);
  const onMouseOverHandler = () => setActive(true);
  const onMouseOutHandler = () => setActive(false);

  const setName = data.find((d) => d.name === name).sets[0];
  const [width, height] = svgSize;

  const scaledCircles = scaleSolution($vennData, width, height, 10);
  const newData = Object.entries(scaledCircles);
  const curData = newData.find((d) => d[0] === setName);

  return sstyled(styles)(
    <SCircle
      render="circle"
      stroke="#fff"
      strokeWidth="2px"
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      cx={curData[1].x}
      cy={curData[1].y}
      r={curData[1].radius}
      fill={color}
      fillOpacity={active ? 0.7 : 0.5}
    />,
  );
}

function Intersection(props) {
  const { Element: SIntersection, styles, data, $vennData, size } = props;
  const [active, setActive] = useState(false);
  const onMouseOverHandler = () => setActive(true);
  const onMouseOutHandler = () => setActive(false);

  const [width, height] = size;

  const scaledCircles = scaleSolution($vennData, width, height, 10);
  Object.keys(scaledCircles).map((key) => {
    scaledCircles[key].data = data.find((el) => {
      return el.sets.length === 1 && el.sets[0] === key;
    });
  });
  const circleLayout = Object.keys(scaledCircles).map((circle) => {
    const circleName = scaledCircles[circle].data.name;
    return {
      name: circleName,
      key: circleName,
      ...scaledCircles[circle],
    };
  });

  const renderInterSection = ({ sets, ...other }) => {
    const name = JSON.stringify(sets);
    const circleNodes = sets.map((set) =>
      circleLayout.find((circle) => circle.data.sets[0] === set),
    );
    const path = intersectionAreaPath(circleNodes);

    return sstyled(styles)(
      <SIntersection
        render="path"
        d={path}
        stroke="#fff"
        strokeWidth="2px"
        key={name}
        name={name}
        onMouseOut={onMouseOutHandler}
        onMouseOver={onMouseOverHandler}
        fillOpacity={active ? 0.1 : 0}
        {...propsForElement(other)}
      />,
    );
  };

  return renderInterSection(props);
}

const Venn = createElement(VennRoot, { Circle, Intersection });

export default Venn;
