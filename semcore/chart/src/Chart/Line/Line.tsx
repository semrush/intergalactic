import React from 'react';
import {
  Line,
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
import { computeDefinedSegments, normalizeCurvePoints, filterDotPoints } from '../../utils';
import { isNumber, interpolateNumber } from 'recharts/lib/util/DataUtils';
// eslint-disable-next-line import/no-extraneous-dependencies
import Animate from 'react-smooth';

// @ts-ignore
Line.prototype.renderCurveStatically = function (points, needClip, clipPathId, props) {
  const { type, layout, connectNulls, dataKey, height, top, bottom } = this.props;
  const curveProps = {
    ...getPresentationAttributes(this.props),
    ...filterEventAttributes(this.props),
    fill: 'none',
    className: 'recharts-line-curve',
    points,
    ...props,
    type,
    layout,
    connectNulls,
  };

  const patchedClipPathId = `${this.id}-null-points`;

  return (
    <Layer clipPath={needClip ? `url(#clipPath-${clipPathId})` : null}>
      <defs>
        <clipPath id={patchedClipPathId}>
          {computeDefinedSegments(points, dataKey).map((segment, i) => {
            const x = segment[0].x;
            const width = segment[segment.length - 1].x - segment[0].x;
            const cpHeight = height + top + bottom;
            return <Rectangle key={i} width={width} height={cpHeight} x={x} y={0} />;
          })}
        </clipPath>
      </defs>
      {connectNulls && (
        <Curve
          {...curveProps}
          points={normalizeCurvePoints(points)}
          stroke={colors['gray-blue']}
          strokeWidth={3}
          strokeDasharray="6"
        />
      )}
      <Curve
        {...curveProps}
        clipPath={`url(#${patchedClipPathId})`}
        points={normalizeCurvePoints(points)}
        connectNulls
        pathRef={this.pathRef}
      />
    </Layer>
  );
};

// @ts-ignore
Line.prototype.renderCurveWithAnimation = function (needClip, clipPathId) {
  const {
    points,
    baseLine,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    animationId,
  } = this.props;
  const { prevPoints, prevBaseLine } = this.state;
  // const clipPathId = _.isNil(id) ? this.id : id;

  return (
    <Animate
      begin={animationBegin}
      duration={animationDuration}
      isActive={isAnimationActive}
      easing={animationEasing}
      from={{ t: 0 }}
      to={{ t: 1 }}
      key={`area-${animationId}`}
      onAnimationEnd={this.handleAnimationEnd}
      onAnimationStart={this.handleAnimationStart}
    >
      {({ t }) => {
        if (prevPoints) {
          const prevPointsDiffFactor = prevPoints.length / points.length;
          // update animtaion
          const stepPoints = points.map((entry, index) => {
            const prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              const prev = prevPoints[prevPointIndex];
              const interpolatorX = interpolateNumber(prev.x, entry.x);
              const interpolatorY = interpolateNumber(prev.y, entry.y);

              return { ...entry, x: interpolatorX(t), y: interpolatorY(t) };
            }

            return entry;
          });
          let stepBaseLine;

          if (isNumber(baseLine)) {
            const interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (isNil(baseLine) || Number.isNaN(baseLine)) {
            const interpolator = interpolateNumber(prevBaseLine, 0);
            stepBaseLine = interpolator(t);
          } else {
            stepBaseLine = baseLine.map((entry, index) => {
              const prevPointIndex = Math.floor(index * prevPointsDiffFactor);
              if (prevBaseLine[prevPointIndex]) {
                const prev = prevBaseLine[prevPointIndex];
                const interpolatorX = interpolateNumber(prev.x, entry.x);
                const interpolatorY = interpolateNumber(prev.y, entry.y);

                return { ...entry, x: interpolatorX(t), y: interpolatorY(t) };
              }

              return entry;
            });
          }

          return this.renderCurveStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }

        return (
          <Layer>
            <defs>
              <clipPath id={`animationClipPath-${clipPathId}`}>{this.renderClipRect(t)}</clipPath>
            </defs>
            <Layer clipPath={`url(#animationClipPath-${clipPathId})`}>
              {this.renderCurveStatically(points, baseLine, needClip, clipPathId)}
            </Layer>
          </Layer>
        );
      }}
    </Animate>
  );
};

// @ts-ignore
Line.prototype.renderClipRect = function (alpha) {
  const { layout } = this.props;

  if (layout === 'vertical') {
    return this.renderVerticalRect(alpha);
  }

  return this.renderHorizontalRect(alpha);
};

// @ts-ignore
Line.prototype.renderVerticalRect = function (alpha) {
  const { baseLine, points, strokeWidth } = this.props;
  const startY = points[0].y;
  const endY = points[points.length - 1].y;
  const height = alpha * Math.abs(startY - endY);
  let maxX = Math.max.apply(
    null,
    points.map((entry) => entry.x || 0),
  );

  if (isNumber(baseLine)) {
    maxX = Math.max(baseLine, maxX);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxX = Math.max(
      Math.max.apply(
        null,
        baseLine.map((entry) => entry.x || 0),
      ),
      maxX,
    );
  }

  if (isNumber(maxX)) {
    return (
      <rect
        x={0}
        y={startY < endY ? startY : startY - height}
        width={maxX + (strokeWidth || 1)}
        // @ts-ignore
        height={parseInt(height, 10)}
      />
    );
  }

  return null;
};

// @ts-ignore
Line.prototype.renderHorizontalRect = function (alpha) {
  const { baseLine, points, strokeWidth } = this.props;
  const startX = points[0].x;
  const endX = points[points.length - 1].x;
  const width = alpha * Math.abs(startX - endX);
  let maxY = Math.max.apply(
    null,
    points.map((entry) => entry.y || 0),
  );

  if (isNumber(baseLine)) {
    maxY = Math.max(baseLine, maxY);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxY = Math.max(
      Math.max.apply(
        null,
        baseLine.map((entry) => entry.y || 0),
      ),
      maxY,
    );
  }

  if (isNumber(maxY)) {
    return (
      <rect
        x={startX < endX ? startX : startX - width}
        y={0}
        width={width}
        height={parseInt(maxY + (strokeWidth || 1), 10)}
      />
    );
  }

  return null;
};

// @ts-ignore
Line.prototype.renderDots = function (needClip, clipPathId) {
  const { isAnimationActive } = this.props;

  if (isAnimationActive && !this.state.isAnimationFinished) {
    return null;
  }
  let { dot, points, dataKey } = this.props;
  const lineProps = getPresentationAttributes(this.props);
  const customDotProps = getPresentationAttributes(dot);
  const dotEvents = filterEventAttributes(dot);

  if (!dot) {
    points = points.length > 1 ? points.filter(filterDotPoints(dataKey)) : points;
  }

  const dots = points.map((entry, i) => {
    const dotProps = {
      key: `dot-${i}`,
      r: 6,
      ...lineProps,
      stroke: colors['white'],
      strokeWidth: 2,
      ...customDotProps,
      ...dotEvents,
      value: entry.value,
      dataKey,
      cx: entry.x,
      cy: entry.y,
      index: i,
      payload: entry.payload,
    };

    return this.constructor.renderDotItem(dot, dotProps);
  });
  const dotsProps = {
    clipPath: needClip ? `url(#clipPath-${clipPathId})` : null,
  };

  return (
    <Layer className="recharts-line-dots" key="dots" {...dotsProps}>
      {dots}
    </Layer>
  );
};

// @ts-ignore
Line.prototype.render = function () {
  const {
    hide,
    points,
    className,
    xAxis,
    yAxis,
    top,
    left,
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
  const layerClass = classNames('recharts-line', className);
  const needClip = (xAxis && xAxis.allowDataOverflow) || (yAxis && yAxis.allowDataOverflow);
  const clipPathId = isNil(id) ? this.id : id;

  return (
    <Layer className={layerClass}>
      {needClip ? (
        <defs>
          <clipPath id={`clipPath-${clipPathId}`}>
            <rect x={left} y={top} width={width} height={height} />
          </clipPath>
        </defs>
      ) : null}
      {!hasSinglePoint && this.renderCurve(needClip, clipPathId)}
      {this.renderErrorBar()}
      {this.renderDots(needClip, clipPathId)}
      {(!isAnimationActive || isAnimationFinished) &&
        //@ts-ignore
        LabelList.renderCallByParent(this.props, points)}
    </Layer>
  );
};

// @ts-ignore
Line.defaultProps.stroke = colors['blue-01'];
// @ts-ignore
Line.defaultProps.fill = colors['blue-01'];
// @ts-ignore
Line.defaultProps.strokeWidth = 3;
// @ts-ignore
Line.defaultProps.dot = false;
// @ts-ignore
Line.defaultProps.activeDot = { r: 8, strokeWidth: 2, stroke: colors['white'] };
// @ts-ignore
Line.defaultProps.type = 'monotone';

export default Line;
