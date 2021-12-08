import {
  Area as AreaRecharts,
  Curve,
  // @ts-ignore
  // eslint-disable-next-line import/named
  Layer,
  LabelList,
  Rectangle,
} from 'recharts';
// eslint-disable-next-line import/no-extraneous-dependencies
import isNil from 'lodash/isNil';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import { getPresentationAttributes, filterEventAttributes } from 'recharts/lib/util/ReactUtils';
import { colors } from '../../utils/colors';
import {
  computeDefinedSegments,
  normalizeCurvePoints,
  deleteNullCurvePoints,
  filterDotPoints,
} from '../../utils';

import React from 'react';

// @ts-ignore
AreaRecharts.prototype.renderAreaStatically = function (points, baseLine, needClip, clipPathId) {
  const {
    layout,
    type,
    stroke,
    connectNulls,
    isRange,
    height,
    top,
    bottom,
    dataKey,
    stackId,
  } = this.props;

  let drawClipPath = true;
  let normalizedPoints = normalizeCurvePoints(points, dataKey);
  const patchedClipPathId = `${this.id}-null-points`;

  if (stackId) {
    normalizedPoints = connectNulls ? deleteNullCurvePoints(normalizedPoints, dataKey) : points;
    drawClipPath = connectNulls;
  }

  return (
    <Layer clipPath={needClip ? `url(#clipPath-${clipPathId})` : null}>
      {drawClipPath && (
        <defs>
          <clipPath id={patchedClipPathId}>
            {computeDefinedSegments(points, dataKey).map((segment, idx) => {
              const x = segment[0].x;
              const width = segment[segment.length - 1].x - segment[0].x;
              const cpHeight = height + top + bottom;
              return <Rectangle width={width} height={cpHeight} x={x} y={0} key={idx} />;
            })}
          </clipPath>
        </defs>
      )}
      <Curve
        {...this.props}
        connectNulls={true}
        points={points}
        baseLine={baseLine}
        stroke="none"
        className="recharts-area-area"
        clipPath={`url(#${patchedClipPathId})`}
      />
      {stroke !== 'none' && (
        <>
          {connectNulls && (
            <Curve
              {...getPresentationAttributes(this.props)}
              className="recharts-area-curve"
              layout={layout}
              type={type}
              connectNulls
              fill="none"
              stroke={colors['gray-02']}
              strokeWidth={3}
              strokeDasharray="6"
              points={normalizedPoints}
            />
          )}
          <Curve
            {...getPresentationAttributes(this.props)}
            className="recharts-area-curve"
            layout={layout}
            type={type}
            connectNulls
            fill="none"
            points={normalizedPoints}
            clipPath={`url(#${patchedClipPathId})`}
          />
        </>
      )}
      {stroke !== 'none' && isRange && (
        <Curve
          {...getPresentationAttributes(this.props)}
          className="recharts-area-curve"
          layout={layout}
          type={type}
          connectNulls={connectNulls}
          fill="none"
          points={baseLine}
        />
      )}
    </Layer>
  );
};

// @ts-ignore
AreaRecharts.prototype.renderDots = function (needClip, clipPathId) {
  const { isAnimationActive } = this.props;
  const { isAnimationFinished } = this.state;

  if (isAnimationActive && !isAnimationFinished) {
    return null;
  }

  let { dot, points, dataKey } = this.props;
  const areaProps = getPresentationAttributes(this.props);
  const customDotProps = getPresentationAttributes(dot);
  const dotEvents = filterEventAttributes(dot);

  if (!dot) {
    points = points.length > 1 ? points.filter(filterDotPoints(dataKey)) : points;
  }

  const dots = points.map((entry, i) => {
    const dotProps = {
      key: `dot-${i}`,
      r: 6,
      ...areaProps,
      stroke: colors['white-01'],
      strokeWidth: 2,
      ...customDotProps,
      ...dotEvents,
      dataKey,
      cx: entry.x,
      cy: entry.y,
      index: i,
      value: entry.value,
      payload: entry.payload,
    };

    return this.constructor.renderDotItem(dot, dotProps);
  });

  const dotsProps = {
    clipPath: needClip ? `url(#clipPath-${clipPathId})` : null,
  };
  return (
    <Layer className="recharts-area-dots" {...dotsProps}>
      {dots}
    </Layer>
  );
};

// @ts-ignore
AreaRecharts.prototype.render = function () {
  const {
    hide,
    points,
    className,
    top,
    left,
    xAxis,
    yAxis,
    width,
    height,
    isAnimationActive,
    id,
  } = this.props;

  if (hide || !points || !points.length) {
    return null;
  }

  const { isAnimationFinished } = this.state;
  const hasSinglePoint = points.length === 1;
  const layerClass = classNames('recharts-area', className);
  const needClip = (xAxis && xAxis.allowDataOverflow) || (yAxis && yAxis.allowDataOverflow);
  const clipPathId = isNil(id) ? this.id : id;

  return (
    <Layer className={layerClass}>
      {needClip ? (
        <defs>
          <clipPath id={`clipPath-${clipPathId}`}>
            <rect x={left} y={top} width={width} height={parseInt(height, 10)} />
          </clipPath>
        </defs>
      ) : null}
      {!hasSinglePoint ? this.renderArea(needClip, clipPathId) : null}
      {this.renderDots(needClip, clipPathId)}
      {(!isAnimationActive || isAnimationFinished) &&
        // @ts-ignore
        LabelList.renderCallByParent(this.props, points)}
    </Layer>
  );
};

// @ts-ignore
AreaRecharts.defaultProps.stroke = colors['blue-01'];
// @ts-ignore
AreaRecharts.defaultProps.fill = colors['blue-01'];
// @ts-ignore
AreaRecharts.defaultProps.strokeWidth = 3;
// @ts-ignore
AreaRecharts.defaultProps.fillOpacity = '0.2';
// @ts-ignore
AreaRecharts.defaultProps.dot = false;
// @ts-ignore
AreaRecharts.defaultProps.activeDot = { r: 8, strokeWidth: 2, stroke: colors['white-01'] };

export default AreaRecharts;
