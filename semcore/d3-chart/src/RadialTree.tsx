import React from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { transition } from 'd3-transition';
import style from './style/radial-tree.shadow.css';
import { shade } from '@semcore/utils/lib/color';

const memoize = <T extends (...args: (string | number)[]) => any>(func: T): T => {
  const results: { [cacheKey: string]: ReturnType<T> } = {};
  return ((...args) => {
    const argsKey = args.join(',');
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  }) as T;
};

const measureText = memoize((text: string, fontSize: number) => {
  const span = document.createElement('span');
  span.style.fontSize = `${fontSize}px`;
  for (const line of text.split('\n')) {
    span.append(document.createTextNode(line));
    span.append(document.createElement('br'));
  }
  span.style.display = 'inline-block';
  document.body.append(span);
  const textWidth = span.offsetWidth;
  span.remove();
  return textWidth;
});

// The top vertical line
const initAngle = -Math.PI / 2;

export interface IRadialTreeProps {
  /**
   * List of radians. `{ label: string; key: string; capSize?: number; icon?: React.FC; color?: string; iconColor?: string; iconSize?: number; }`
   */
  data: {
    /**
     * Text label on the end of radian.
     */
    label: string;
    /**
     * Radian key. Radian, which `key` is equal to `activeKey` is displayed as active.
     */
    key: string;
    /**
     * Size of the cap (filled circle on the end of the radian).
     * @default 16
     */
    capSize?: number;
    /**
     * Icon, that displayed in the cap of the active radian (usage example `icon: UserM`).
     */
    icon?: React.FC;
    /**
     * Color of radian's line, cap and label.
     * @default #000
     */
    color?: string;
    /**
     * Color of icon.
     * @default #fff
     */
    iconColor?: string;
    /**
     * Size of icon.
     * @default 16
     */
    iconSize?: number;
  }[];
  /**
   * Angel (in rads) that rotates chart. 0 means that first radian is exactly on top vertical line.
   * @default Math.PI / 5
   */
  angleOffset?: number;
  /**
   * Duration of appear and update animation.
   * @default 500
   */
  duration?: number;
  /**
   * Gap between the chart center and radians start point.
   * @default 50
   */
  centralMargin?: number;
  /**
   * Gap around text label.
   * @default 2
   */
  labelMargin?: number;
  /**
   * Color of all radian's line, cap and label.
   * @default #000
   */
  color?: string;
  /**
   * Size of the cap (filled circle on the end of the radian).
   * @default 16
   */
  capSize: number;
  /**
   * Icon, that displayed in the cap of the active radian (usage example `icon: UserM`).
   */
  icon: React.FC;
  /**
   * Color of icon.
   * @default #fff
   */
  iconColor: string;
  /**
   * Size of icon.
   * @default 16
   */
  iconSize: number;
  /**
   * Text size in radians' labels. 1.5x is used as default text size of center text.
   * @default 14
   */
  textSize?: number;
  /**
   * Used to define the active radian in controlled way. Active radian is highligted with inreased cap size.
   */
  activeKey?: string | null;
  /**
   * Default value for `activeKey` property.
   */
  defaultActiveKey?: string | null;
}

type AsProps = IRadialTreeProps & {
  uid: string;
  styles: React.CSSProperties;
  activeKey: string | null;
  Children: React.FC;
  size: [width: number, height: number];
};

class RadialTree extends Component {
  static displayName = 'Radial';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps: Partial<IRadialTreeProps> = {
    angleOffset: Math.PI / 5,
    duration: 500,
    centralMargin: 50,
    labelMargin: 2,
    color: '#000',
    iconColor: '#fff',
    capSize: 16,
    iconSize: 16,
    textSize: 14,
    defaultActiveKey: null,
  };

  constructor(props) {
    super(props);
    this.handleRadianClick = this.handleRadianClick.bind(this);
    this.renderRadian = this.renderRadian.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
  }

  uncontrolledProps() {
    return {
      activeKey: null,
    };
  }

  runAppearAnimation() {
    const { duration, uid } = this.asProps as any as AsProps;
    const preferReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;

    /** using `!(>)` instead of `<=` to get true on NaN and non numbers stuff  */
    if (!(duration > 0)) return;
    if (preferReduceMotion) return;

    const circlesAnimation = transition()
      .selection()
      .selectAll(`[data-radial-animation=${uid}-cap-circle]`);
    const iconsAnimation = transition()
      .selection()
      .selectAll(`[data-radial-animation=${uid}-cap-icon]`);
    const linesAnimation = transition()
      .selection()
      .selectAll(`[data-radial-animation=${uid}-line]`);
    const labelsAnimation = transition()
      .selection()
      .selectAll(`[data-radial-animation=${uid}-label]`);
    const circlesNodes = circlesAnimation.nodes();
    const iconsNodes = iconsAnimation.nodes();
    const linesNodes = linesAnimation.nodes();
    const labelsNodes = linesAnimation.nodes();

    if (circlesNodes.length > 0) {
      const attrs = circlesNodes.map((node) => {
        const cx = node.cx?.baseVal?.value;
        const cy = node.cy?.baseVal?.value;
        const lineNode = linesNodes[node.dataset.radianIndex];
        return {
          from: {
            cx: lineNode.x1?.baseVal?.value,
            cy: lineNode.y1?.baseVal?.value,
          },
          to: { cx, cy },
        };
      });

      circlesAnimation
        .attr('opacity', 0)
        .attr('cx', (_, index) => attrs[index].from?.cx)
        .attr('cy', (_, index) => attrs[index].from?.cy);
      circlesAnimation
        .transition()
        .duration(duration)
        .attr('opacity', 1)
        .attr('cx', (_, index) => attrs[index].to?.cx)
        .attr('cy', (_, index) => attrs[index].to?.cy);
    }
    if (iconsNodes.length > 0) {
      const attrs = iconsNodes.map((node) => {
        const x = node.x?.baseVal?.value;
        const y = node.y?.baseVal?.value;
        const width = node.width?.baseVal?.value;
        const height = node.height?.baseVal?.value;
        const lineNode = linesNodes[node.dataset.radianIndex];
        return {
          from: {
            x: lineNode.x1?.baseVal?.value - width / 2,
            y: lineNode.y1?.baseVal?.value - height / 2,
          },
          to: {
            x,
            y,
          },
        };
      });

      iconsAnimation
        .attr('opacity', 0)
        .attr('x', (_, index) => attrs[index].from?.x)
        .attr('y', (_, index) => attrs[index].from?.y);
      iconsAnimation
        .transition()
        .duration(duration)
        .attr('opacity', 1)
        .attr('x', (_, index) => attrs[index].to?.x)
        .attr('y', (_, index) => attrs[index].to?.y);
    }
    if (linesNodes.length > 0) {
      const attrs = linesNodes.map((node) => {
        const x2 = node.x2?.baseVal?.value;
        const y2 = node.y2?.baseVal?.value;
        return {
          from: {
            x2: node.x1?.baseVal?.value,
            y2: node.y1?.baseVal?.value,
          },
          to: {
            x2,
            y2,
          },
        };
      });

      linesAnimation
        .attr('opacity', 0)
        .attr('x2', (_, index) => attrs[index].from?.x2)
        .attr('y2', (_, index) => attrs[index].from?.y2);
      linesAnimation
        .transition()
        .duration(duration)
        .attr('opacity', 1)
        .attr('x2', (_, index) => attrs[index].to?.x2)
        .attr('y2', (_, index) => attrs[index].to?.y2);
    }
    if (labelsNodes.length > 0) {
      labelsAnimation.attr('opacity', 0);
      labelsAnimation.transition().duration(duration).attr('opacity', 1);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.$rootProps.data?.length !== this.asProps.data?.length) {
      this.runAppearAnimation();
    }
  }

  componentDidMount() {
    this.runAppearAnimation();
  }

  handleRadianClick(key: string) {
    return () => this.handlers.activeKey(key);
  }

  renderLabel(text: string, textSize: number, x: number, y: number) {
    const lines = text.split('\n');
    const linesCount = lines.length;
    const SLabelLine = 'tspan';

    return lines.map((lineText, lineIndex) => (
      <SLabelLine
        x={x}
        y={y + (lineIndex - (linesCount - 1) / 2) * textSize}
        key={`#${lineIndex}-${lineText}`}
      >
        {lineText}
      </SLabelLine>
    ));
  }

  renderRadian(data, index) {
    const asProps = this.asProps as any as AsProps;
    const {
      data: allRadians,
      centralMargin,
      angleOffset,
      styles,
      activeKey,
      textSize,
      uid,
      size,
    } = asProps;
    const [width, height] = size;
    const key = data.key ?? `radian-${index}`;
    const isActive = activeKey === key;
    const labelMargin = data.labelMargin ?? asProps.labelMargin;
    const color = data.color ?? asProps.color;
    const iconColor = data.iconColor ?? asProps.iconColor;
    const baseCapSize = data.capSize ?? asProps.capSize;
    const capSize = baseCapSize * (isActive ? 1 : 0.5);
    const iconSize = data.iconSize ?? asProps.iconSize;
    const icon = data.icon ?? asProps.icon;

    const textWidth = this.computeTextWidth() + labelMargin * 2;
    const minDemSize = Math.min(width, height) / 2;
    const length = Math.max(minDemSize - textWidth - baseCapSize - centralMargin, 10);

    const angle = initAngle + angleOffset + (index / allRadians.length) * (Math.PI * 2);
    const isHorizontal =
      (angle - initAngle > (1 / 6) * Math.PI && angle - initAngle < (5 / 6) * Math.PI) ||
      (angle - initAngle > (7 / 6) * Math.PI && angle - initAngle < (11 / 6) * Math.PI);
    const topAngle = -Math.PI / 2;
    const labelAngle = ((angle - topAngle) % Math.PI) + topAngle;
    const degLabelAngle = ((labelAngle / Math.PI) * 180).toFixed(2);

    const center = [width / 2, height / 2];
    const [xCenter, yCenter] = center;
    const start = [
      xCenter + Math.cos(angle) * centralMargin,
      yCenter + Math.sin(angle) * centralMargin,
    ];
    const end = [
      xCenter + Math.cos(angle) * (centralMargin + length),
      yCenter + Math.sin(angle) * (centralMargin + length),
    ];
    const [xStart, yStart] = start;
    const [xEnd, yEnd] = end;

    const labelCenter = [
      xCenter + Math.cos(angle) * (centralMargin + length + baseCapSize + textWidth / 2),
      yCenter + Math.sin(angle) * (centralMargin + length + baseCapSize + textWidth / 2),
    ];
    const [xLabelCenter, yLabelCenter] = labelCenter;

    const SRadian = 'g';
    const SPlaceholder = 'line';
    const SLine = 'line';
    const SLineCup = 'circle';
    const SCapIcon = icon;
    const SLabel = 'text';

    const sstyles = sstyled(styles);
    const sLabelStyles = sstyles.cn('SLabel', {
      'color-hovered': shade(color, -0.12),
      'text-cursor': isHorizontal ? 'text' : 'vertical-text',
    });

    return (
      <React.Fragment key={key}>
        {sstyled(styles)(
          <SRadian onClick={this.handleRadianClick(key)}>
            <SPlaceholder
              x1={xStart}
              y1={yStart}
              x2={xLabelCenter}
              y2={yLabelCenter}
              strokeWidth={capSize * 3}
              stroke="transparent"
            />
            <SLine
              id={key}
              x1={xStart}
              y1={yStart}
              x2={xEnd}
              y2={yEnd}
              stroke={color}
              data-radial-animation={`${uid}-line`}
              data-radian-index={index}
            />
            <SLineCup
              cx={xEnd}
              cy={yEnd}
              r={capSize}
              fill={color}
              data-radial-animation={`${uid}-cap-circle`}
              data-radian-index={index}
            />
            {isActive && icon && (
              <SCapIcon
                x={xEnd - iconSize / 2}
                y={yEnd - iconSize / 2}
                width={iconSize}
                height={iconSize}
                color={iconColor ?? '#fff'}
                data-radial-animation={`${uid}-cap-icon`}
                data-radian-index={index}
              />
            )}
            <SLabel
              x={xLabelCenter}
              y={yLabelCenter}
              transform={`rotate(${degLabelAngle})`}
              transform-origin={`${xLabelCenter} ${yLabelCenter}`}
              textAnchor="middle"
              dominantBaseline="central"
              fill={color}
              fontSize={textSize}
              className={sLabelStyles.className}
              style={sLabelStyles.style}
              data-radial-animation={`${uid}-label`}
              data-radian-index={index}
            >
              {this.renderLabel(data.label, textSize, xLabelCenter, yLabelCenter)}
            </SLabel>
          </SRadian>,
        )}
      </React.Fragment>
    );
  }

  computeTextWidth() {
    const { data, textSize } = this.asProps as any as AsProps;
    const widths = data.map(({ label }) => measureText(label, textSize));

    return Math.max(...widths);
  }

  getTitleProps() {
    const { uid, size, textSize, color } = this.asProps as any as AsProps;

    const [width, height] = size;
    const center = [width / 2, height / 2];
    const [x, y] = center;
    return {
      x,
      y,
      textAnchor: `middle`,
      dominantBaseline: `central`,
      fontSize: textSize * 1.5,
      ['data-radial-animation']: `${uid}-label`,
      fill: color,
    };
  }

  render() {
    const { data, Children } = this.asProps as any as AsProps;

    return (
      <>
        {data.map(this.renderRadian)}
        <Children />
      </>
    );
  }
}

const Title: React.FC = ({ Element: SLabel, styles, ...restProps }) => {
  return <>{sstyled(styles)(<SLabel render="text" {...restProps} />)}</>;
};

export default createElement(RadialTree, { Title });
