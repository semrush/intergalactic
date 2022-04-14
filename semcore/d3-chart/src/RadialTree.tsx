import React from 'react';
import { Component, sstyled, CProps, ReturnEl } from '@semcore/core';
// @ts-ignore
import createElement from './createElement';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { transition } from 'd3-transition';
import style from './style/radial-tree.shadow.css';
import { shade } from '@semcore/utils/lib/color';
import { measureText } from './utils';
import assignProps from '@semcore/utils/lib/assignProps';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

const baseAngle = -Math.PI / 2; // The top vertical line

type RadianData = {
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
   * @default #008FF8
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
};

export interface IRadialTreeProps {
  /**
   * List of radians. `{ label: string; key: string; capSize?: number; icon?: React.FC; color?: string; iconColor?: string; iconSize?: number; }`
   */
  data: RadianData[];
  /**
   * Angel (in rads) that rotates chart. 0 means that first radian is exactly on top vertical line.
   * @default 0
   */
  angleOffset?: number;
  /**
   * Duration of appear and update animation.
   * @default 300
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
   * @default #008FF8
   */
  color?: string;
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
   * Color of icon.
   * @default #fff
   */
  iconColor?: string;
  /**
   * Size of icon.
   * @default 16
   */
  iconSize?: number;
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

type RootAsProps = IRadialTreeProps & {
  uid: string;
  styles: React.CSSProperties;
  activeKey: string | null;
  Children: React.FC;
  size: [width: number, height: number];
  data: RadianData[];
  duration: number;
  textSize: number;
  capSize: number;
  centralMargin: number;
  angleOffset: number;
  $rootProps: RootAsProps;
};

class RadialTreeBase extends Component<RootAsProps> {
  static displayName = 'RadialTree';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps: Partial<IRadialTreeProps> = {
    angleOffset: 0,
    duration: 300,
    centralMargin: 50,
    labelMargin: 2,
    color: '#008FF8',
    iconColor: '#fff',
    capSize: 8,
    iconSize: 8,
    textSize: 14,
    defaultActiveKey: null,
  };

  Element!: React.FC<{ render: string }>;

  constructor(props: any) {
    super(props);
    this.handleRadianClick = this.handleRadianClick.bind(this);
  }

  uncontrolledProps() {
    return {
      activeKey: null,
    };
  }

  runAppearAnimation() {
    const { duration, uid } = this.asProps;
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
    const circlesNodes = circlesAnimation.nodes() as SVGCircleElement[];
    const iconsNodes = iconsAnimation.nodes() as SVGRectElement[];
    const linesNodes = linesAnimation.nodes() as SVGLineElement[];
    const labelsNodes = linesAnimation.nodes() as SVGTextElement[];

    if (circlesNodes.length > 0) {
      const attrs = circlesNodes.map((node) => {
        const cx = node.cx?.baseVal?.value;
        const cy = node.cy?.baseVal?.value;
        const radianIndex = parseInt(node.dataset.radianIndex!, 10);
        const lineNode = linesNodes[radianIndex];
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
        const radianIndex = parseInt(node.dataset.radianIndex!, 10);
        const lineNode = linesNodes[radianIndex];
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

  componentDidUpdate(prevProps: RootAsProps) {
    if (prevProps.$rootProps.data?.length !== this.asProps.data?.length) {
      this.runAppearAnimation();
    }
  }

  componentDidMount() {
    this.runAppearAnimation();
  }

  handleRadianClick(key: string) {
    return (event: React.MouseEvent) => {
      const newKey = key !== this.asProps.activeKey ? key : null;
      this.handlers.activeKey(newKey, event);
    };
  }

  computeTextWidth() {
    const { data, textSize } = this.asProps;
    const widths = data.map(({ label }) => measureText(label, textSize));

    return Math.max(...widths);
  }

  getTitleProps() {
    const { uid, size, textSize } = this.asProps;

    const [width, height] = size;
    const center = [width / 2, height / 2];
    const [x, y] = center;
    return {
      x,
      y,
      textSize: textSize * 1.5,
      ['data-radial-animation']: `${uid}-label`,
    } as IRadialTreeTitleProps;
  }

  getRadianProps() {
    const { data, ...restRootProps } = this.asProps;
    const textWidth = this.computeTextWidth();

    return {
      ...restRootProps,
      radiansCount: data.length,
      data,
      textWidth,
      onRadianClick: this.handleRadianClick,
    } as IRadialTreeRadianProps;
  }

  render() {
    const SRadialTree = this.Element;
    const { Children } = this.asProps;

    return sstyled(this.asProps.styles)(
      <SRadialTree render="g">
        <Children />
      </SRadialTree>,
    );
  }
}

export interface IRadialTreeRadianProps extends IRadialTreeProps {
  radiansCount?: number;
  textWidth?: number;
  onRadianClick?: (key: string) => (event: React.MouseEvent) => void;
}

type RadianAsProps = RootAsProps & {
  radiansCount: number;
  textWidth: number;
  onRadianClick: (key: string) => (event: React.MouseEvent) => void;
};

class RadialTreeRadian extends Component<RadianAsProps> {
  static displayName = 'RadialTreeRadian';
  static style = style;

  static defaultProps: Partial<IRadialTreeRadianProps> = {
    centralMargin: 50,
    labelMargin: 2,
    iconColor: '#fff',
    capSize: 16,
    iconSize: 16,
    textSize: 14,
  };
  Element!: React.FC<{ render: string }>;

  constructor(props: any) {
    super(props);
    this.renderRadian = this.renderRadian.bind(this);
  }

  getInteractiveAreaProps({ $rootProps }: { $rootProps: IRadialTreeProps }, index: number) {
    const data = $rootProps.data![index];
    const { xStart, yStart, xLabelCenter, yLabelCenter, capSize } = this.computeRadianPosition(
      data,
      index,
    );

    return {
      x1: xStart,
      y1: yStart,
      x2: xLabelCenter,
      y2: yLabelCenter,
      strokeWidth: capSize * 3,
    } as IRadialTreeRadianInteractiveAreaProps;
  }
  getLineProps({ $rootProps }: { $rootProps: IRadialTreeProps }, index: number) {
    const data = $rootProps.data![index];
    const { xStart, yStart, xEnd, yEnd } = this.computeRadianPosition(data, index);
    const { uid } = this.asProps;
    const color = data.color ?? this.asProps.color;

    return {
      x1: xStart,
      y1: yStart,
      x2: xEnd,
      y2: yEnd,
      stroke: color,
      ['data-radial-animation']: `${uid}-line`,
      ['data-radian-index']: index,
    } as IRadialTreeRadianLineProps;
  }
  getCapProps({ $rootProps }: { $rootProps: IRadialTreeProps }, index: number) {
    const data = $rootProps.data![index];
    const { xEnd, yEnd, capSize } = this.computeRadianPosition(data, index);
    const { uid } = this.asProps;
    const color = data.color ?? this.asProps.color;

    return {
      x: xEnd,
      y: yEnd,
      radius: capSize,
      color,
      ['data-radial-animation']: `${uid}-cap-circle`,
      ['data-radian-index']: index,
    } as IRadialTreeRadianCapProps;
  }
  getIconProps({ $rootProps }: { $rootProps: IRadialTreeProps }, index: number) {
    const data = $rootProps.data![index];
    const { xEnd, yEnd, isActive } = this.computeRadianPosition(data, index);
    const { uid } = this.asProps;
    const iconColor = data.iconColor ?? this.asProps.iconColor;
    const iconSize = data.iconSize ?? this.asProps.iconSize;
    const icon = data.icon ?? this.asProps.icon;

    return {
      x: xEnd - iconSize! / 2,
      y: yEnd - iconSize! / 2,
      iconSize,
      color: iconColor ?? '#fff',
      ['data-radial-animation']: `${uid}-cap-icon`,
      ['data-radian-index']: index,
      icon,
      isActive,
    } as IRadialTreeRadianIconProps;
  }
  getLabelProps({ $rootProps }: { $rootProps: IRadialTreeProps }, index: number) {
    const data = $rootProps.data![index];
    const { xLabelCenter, yLabelCenter, labelAngle, isHorizontal } = this.computeRadianPosition(
      data,
      index,
    );
    const { uid, textSize } = this.asProps;
    const { label } = data;
    const color = data.color ?? this.asProps.color;

    return {
      x: xLabelCenter,
      y: yLabelCenter,
      angle: labelAngle,
      ['data-radial-animation']: `${uid}-label`,
      ['data-radian-index']: index,
      label,
      color,
      isHorizontal,
      textSize,
    } as IRadialTreeRadianLabelProps;
  }

  getRadianKey(data: RadianData, index: number) {
    return data.key ?? `radian-${index}`;
  }

  computeRadianPosition(data: RadianData, index: number) {
    const { centralMargin, angleOffset, activeKey, size, radiansCount, textWidth } = this.asProps;
    const [width, height] = size;
    const key = this.getRadianKey(data, index);
    const isActive = activeKey === key;
    const baseCapSize = data.capSize ?? this.asProps.capSize;
    const capSize = baseCapSize * (isActive ? 1 : 0.5);

    const minDemSize = Math.min(width, height) / 2;
    const length = Math.max(minDemSize - textWidth - baseCapSize - centralMargin, 10);

    const angle = baseAngle + angleOffset + (index / radiansCount) * (Math.PI * 2);
    const isHorizontal =
      (angle - baseAngle > (1 / 6) * Math.PI && angle - baseAngle < (5 / 6) * Math.PI) ||
      (angle - baseAngle > (7 / 6) * Math.PI && angle - baseAngle < (11 / 6) * Math.PI);
    const topAngle = -Math.PI / 2;
    const labelAngle = ((angle - topAngle) % Math.PI) + topAngle;

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

    return {
      xStart,
      yStart,
      xEnd,
      yEnd,
      xLabelCenter,
      yLabelCenter,
      labelAngle,
      isHorizontal,
      capSize,
      isActive,
    };
  }

  renderRadian(data: RadianData, index: number) {
    const { styles, Children, onRadianClick } = this.asProps;
    const key = this.getRadianKey(data, index);
    const SRadian = 'g';

    let children = getOriginChildren(Children);

    if (typeof children === 'function') {
      const _child = this.asProps.children;
      const mergedProps = assignProps(children(this.asProps), this.asProps);
      children = mergedProps.children;
      mergedProps.children = _child;
    }

    // hidden from publicly typed export
    const InteractiveArea = (RadialTree.Radian as any).InteractiveArea;

    return sstyled(styles)(
      <SRadian key={key} onClick={onRadianClick(key)}>
        <InteractiveArea />
        {children}
      </SRadian>,
    );
  }

  render() {
    const { data } = this.asProps;
    const SRadianList = 'g';

    return sstyled(this.asProps.styles)(
      <SRadianList>{data.map((data, index) => this.renderRadian(data, index))}</SRadianList>,
    );
  }
}

export interface IRadialTreeRadianInteractiveAreaProps {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  strokeWidth?: number;
}
type RadialTreeRadianInteractiveAreaAsProps = IRadialTreeRadianInteractiveAreaProps & {
  Element: React.FC<{ render: string } & React.SVGProps<any>>;
  styles: React.CSSProperties;
};
const InteractiveArea: React.FC<RadialTreeRadianInteractiveAreaAsProps> = ({
  Element: SInteractiveArea,
  styles,
}) => {
  return sstyled(styles)(
    <SInteractiveArea stroke="transparent" render="line" />,
  ) as React.ReactElement;
};

export interface IRadialTreeRadianLineProps {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  stroke?: string;
  ['data-radial-animation']?: `${string}-line`;
  ['data-radian-index']?: number;
}
type RadialTreeRadianLineAsProps = IRadialTreeRadianLineProps & {
  Element: React.FC<{ render: string } & React.SVGProps<any>>;
  styles: React.CSSProperties;
};
const Line: React.FC<RadialTreeRadianLineAsProps> = ({ Element: SLine, styles }) => {
  return sstyled(styles)(<SLine render="line" />) as React.ReactElement;
};

export interface IRadialTreeRadianCapProps {
  x?: number;
  y?: number;
  radius?: number;
  color?: string;
  ['data-radial-animation']?: `${string}-cap-circle`;
  ['data-radian-index']?: number;
}
type RadialTreeRadianCapAsProps = IRadialTreeRadianCapProps & {
  Element: React.FC<{ render: string } & React.SVGProps<any>>;
  styles: React.CSSProperties;
};
const Cap: React.FC<RadialTreeRadianCapAsProps> = ({
  Element: SCap,
  styles,
  x,
  y,
  radius,
  color,
}) => {
  return sstyled(styles)(
    <SCap render="circle" cx={x} cy={y} r={radius} fill={color} />,
  ) as React.ReactElement;
};

export interface IRadialTreeRadianIconProps {
  x?: number;
  y?: number;
  iconSize?: number;
  color?: string;
  ['data-radial-animation']?: `${string}-cap-icon`;
  ['data-radian-index']?: number;
  tag?: React.FC;
  isActive?: boolean;
}
type RadialTreeRadianIconAsProps = IRadialTreeRadianIconProps & {
  Element: React.FC<{ render: string | React.FC } & React.SVGProps<any>>;
  x: number;
  y: number;
  iconSize: number;
  styles: React.CSSProperties;
};
const Icon: React.FC<RadialTreeRadianIconAsProps> = ({
  Element: SIcon,
  styles,
  isActive,
  tag,
  x,
  y,
  iconSize,
}) => {
  if (!(isActive && tag)) return null;
  const width = iconSize;
  const height = iconSize;
  return sstyled(styles)(
    <SIcon x={x} y={y} width={width} height={height} render={tag} />,
  ) as React.ReactElement;
};

export interface IRadialTreeRadianLabelProps {
  x?: number;
  y?: number;
  color?: string;
  textSize?: number;
  ['data-radial-animation']?: `${string}-label`;
  ['data-radian-index']?: number;
  label?: string;
  isHorizontal?: boolean;
  angle?: number;
}
type RadialTreeRadianLabelAsProps = IRadialTreeRadianLabelProps & {
  Element: React.FC<{ render: string } & React.SVGProps<any>>;
  Children: React.FC;
  styles: React.CSSProperties;
  x: number;
  y: number;
  angle: number;
  textSize: number;
};
const Label: React.FC<RadialTreeRadianLabelAsProps> = ({
  Element: SLabel,
  Children,
  styles,
  label,
  color,
  isHorizontal,
  x,
  y,
  textSize,
  angle,
}) => {
  const lines = String(label).split('\n');
  const linesCount = lines.length;
  const SLabelLine = 'tspan';

  const sstyles = sstyled(styles);
  const sLabelStyles = sstyles.cn('SLabel', {
    color,
    'color-hovered': shade(color, -0.12),
    'text-cursor': isHorizontal ? 'text' : 'vertical-text',
    'transform-origin': `${x.toFixed(2)}px ${y.toFixed(2)}px`,
  });

  return (
    <SLabel
      render="text"
      textAnchor="middle"
      dominantBaseline="central"
      className={sLabelStyles.className}
      style={sLabelStyles.style}
      x={x.toFixed(2)}
      y={y.toFixed(2)}
      transform={`rotate(${((angle / Math.PI) * 180).toFixed(2)})`}
    >
      {lines.map((lineText, lineIndex) => (
        <SLabelLine
          x={x}
          y={y + (lineIndex - (linesCount - 1) / 2) * textSize}
          key={`#${lineIndex}-${lineText}`}
        >
          {lineText}
        </SLabelLine>
      ))}
      <Children />
    </SLabel>
  ) as React.ReactElement;
};

const Radian = createElement(RadialTreeRadian, {
  InteractiveArea,
  Line,
  Cap,
  Icon,
  Label,
});

export interface IRadialTreeTitleProps {
  x?: number;
  y?: number;
  textSize?: number;
  ['data-radial-animation']?: `${string}-label`;
  color?: string;
}
type RadialTreeTitleAsProps = IRadialTreeTitleProps & {
  Element: React.FC<{ render: string } & React.SVGProps<any>>;
  Children: React.FC;
  styles: React.CSSProperties;
};
const Title: React.FC<RadialTreeTitleAsProps> = ({
  Element: STitle,
  Children,
  styles,
  textSize,
  color,
  x,
  y,
}) => {
  return sstyled(styles)(
    <STitle
      render="text"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={textSize}
      fill={color}
      x={x}
      y={y}
    >
      <Children />
    </STitle>,
  ) as React.ReactElement;
};

const RadialTree = createElement(RadialTreeBase, { Title, Radian }) as (<T>(
  props: CProps<IRadialTreeProps & T>,
) => ReturnEl) & {
  Title: <T>(props: CProps<IRadialTreeTitleProps & T>) => ReturnEl;
  Radian: (<T>(props: CProps<IRadialTreeRadianProps & T>) => ReturnEl) & {
    Line: <T>(props: CProps<IRadialTreeRadianLineProps & T>) => ReturnEl;
    Cap: <T>(props: CProps<IRadialTreeRadianCapProps & T>) => ReturnEl;
    Icon: <T>(props: CProps<IRadialTreeRadianIconProps & T>) => ReturnEl;
    Label: <T>(props: CProps<IRadialTreeRadianLabelProps & T>) => ReturnEl;
  };
};

export default RadialTree;
