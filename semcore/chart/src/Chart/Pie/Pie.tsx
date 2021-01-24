import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Animate from 'react-smooth';
// eslint-disable-next-line import/no-extraneous-dependencies
import isFunction from 'lodash/isFunction';
// eslint-disable-next-line import/no-extraneous-dependencies
import isPlainObject from 'lodash/isPlainObject';
import { Pie, Sector, PieProps, Animatable } from 'recharts';
import Layer from 'recharts/lib/container/Layer';
import { filterEventsOfChild } from 'recharts/lib/util/ReactUtils';
import { colors } from '../../utils/colors';
import copyComponent from '../../copy';

export interface IPieProps extends PieProps {
  shapeAnimationBegin?: Animatable['animationBegin'];
  shapeAnimationDuration?: Animatable['animationDuration'];
  shapeAnimationEasing?: Animatable['animationEasing'];
  shapeOuterRadius?: number | string;
}

let activeIndex = [];

function renderSectorItem(option, props, PieProps) {
  const { outerRadius, ...other } = props;
  const {
    isAnimationActive,
    shapeAnimationBegin,
    shapeAnimationDuration,
    shapeAnimationEasing,
    shapeOuterRadius = outerRadius + 8,
  } = PieProps;

  let fromOuterRadius = shapeOuterRadius;
  let toOuterRadius = outerRadius;
  let children = (outerRadius) => <Sector {...other} outerRadius={outerRadius} />;

  if (React.isValidElement(option)) {
    children = (outerRadius) => React.cloneElement(option, { ...other, outerRadius });
  }
  if (isFunction(option)) {
    children = (outerRadius) => option({ ...other, outerRadius });
  }
  if (isPlainObject(option)) {
    children = (outerRadius) => <Sector {...option} {...other} outerRadius={outerRadius} />;
  }

  if (option || activeIndex.includes(other.id)) {
    activeIndex = activeIndex.filter((index) => index !== other.id);
    if (option) {
      activeIndex.push(other.id);
      [fromOuterRadius, toOuterRadius] = [toOuterRadius, fromOuterRadius];
    }

    return (
      <Animate
        begin={shapeAnimationBegin}
        duration={shapeAnimationDuration}
        easing={shapeAnimationEasing}
        isActive={isAnimationActive}
        //@ts-ignore
        onAnimationStart={Pie.prototype.handleAnimationStart}
        //@ts-ignore
        onAnimationEnd={Pie.prototype.handleAnimationEnd}
        from={{ outerRadius: fromOuterRadius }}
        to={{ outerRadius: toOuterRadius }}
      >
        {({ outerRadius }) => {
          return children(outerRadius);
        }}
      </Animate>
    );
  }

  return children(outerRadius);
}

//@ts-ignore
Pie.prototype.renderSectorsStatically = function (sectors) {
  const { activeShape, blendStroke } = this.props;

  return sectors.map((entry, i) => {
    const sectorOptions = this.isActiveIndex(i) ? activeShape : null;
    const sectorProps = {
      ...entry,
      stroke: blendStroke ? entry.fill : entry.stroke,
    };

    return (
      <Layer
        className="recharts-pie-sector"
        {...filterEventsOfChild(this.props, entry, i)}
        key={`sector-${i}`}
      >
        {renderSectorItem(sectorOptions, sectorProps, this.props)}
      </Layer>
    );
  });
};

export default copyComponent(Pie, {
  defaultProps: {
    fill: colors['blue-01'],
    animationDuration: 350,
    animationEasing: 'ease-in-out',
    paddingAngle: 1,
    animationShapeBegin: 0,
    animationShapeDuration: 300,
    animationShapeEasing: 'ease-in',
  },
  render() {
    return <Pie {...this.props} />;
  },
}) as React.FC<IPieProps>;
