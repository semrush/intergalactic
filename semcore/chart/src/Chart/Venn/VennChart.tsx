import React from 'react';
import { Surface } from 'recharts';
import {
  findAllByType,
  findChildByType,
  getPresentationAttributes,
  isChildrenEqual,
  validateWidthHeight,
} from 'recharts/lib/util/ReactUtils';
import {
  intersectionArea,
  intersectionAreaPath,
  normalizeSolution,
  scaleSolution,
  venn,
} from '@upsetjs/venn.js';
import { Tooltip } from '../../Tooltip';
import VennArea from './VennArea';
import VennIntersection from './VennIntersection';
import {
  ICirclesObj,
  IVennChartProps,
  IVennChartState,
  IVennDataItem,
  IVennPayloadItem,
  ICirclesObjItem,
} from './interface/VennChart';
import fire from '@semcore/utils/lib/fire';
import assignProps from '@semcore/utils/lib/assignProps';
import { sstyled } from '@semcore/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import styles from './style/venn-tooltip-label.shadow.css';
import chartStyles from '../../style/chart.shadow.css';

export default class VennChart extends React.PureComponent<IVennChartProps, IVennChartState> {
  static displayName = 'VennChart';
  static defaultProps = {
    padding: 2,
    orientation: Math.PI / 2,
    orientationOrder: (c1, c2) => c2.radius - c1.radius,
    minAreaRadius: 6,
    tooltipLabelIntersectionSizeFormatter: (v) => v,
  };

  static getActualData(props) {
    const { data, children } = props;
    const circleItems = findAllByType(children, VennArea);
    // Mapping data to children to define actual sets
    const actualSets = circleItems.reduce((acc, circle) => {
      if (circle.props.hidden) {
        return acc;
      }
      const { name } = circle.props;
      const circleDataItem = data.find((item) => item.name === name);
      if (!circleDataItem || circleDataItem.sets.length > 1) {
        return acc;
      }
      return [...acc, ...circleDataItem.sets];
    }, []);
    // filtering data by actual sets
    return data.filter((item) => item.sets.every((set) => actualSets.includes(set)));
  }

  static getDerivedStateFromProps(props: IVennChartProps, state: IVennChartState) {
    const { children, data } = props;
    const { activeNode, isTooltipActive } = state;
    if (data !== state.data || !isChildrenEqual(children, state.children)) {
      const actualData = VennChart.getActualData(props);
      return {
        data,
        children,
        actualData,
        activeNode,
        isTooltipActive,
      };
    }
    return null;
  }

  private circles: ICirclesObj;
  private circlesLayout: ICirclesObjItem[];

  constructor(props) {
    super(props);
    const { data, children } = props;
    this.state = {
      data,
      children,
      actualData: VennChart.getActualData(props),
      activeNode: null,
      isTooltipActive: false,
    };
  }

  handleMouseEnter = (nodeProps) => (e) => {
    const { children } = this.state;
    const tooltip = findChildByType(children, Tooltip);
    this.setState({ activeNode: nodeProps, isTooltipActive: !!tooltip }, () =>
      fire(this, 'onMouseEnter', e, this.generatePayload()),
    );
  };

  handleMouseLeave = (e) => {
    this.setState({ activeNode: null, isTooltipActive: false }, () => {
      fire(this, 'onMouseLeave', e, this.generatePayload());
    });
  };

  handleClick = (e) => {
    fire(this, 'onClick', e, this.generatePayload());
  };

  dataToCirclesLayoutObj = (): ICirclesObj => {
    const { actualData } = this.state;
    const { width, height, padding, orientation, orientationOrder, minAreaRadius } = this.props;
    if (actualData.length === 0) {
      this.circles = {};
      return null;
    }
    const circles = venn(actualData);
    const normalisedCircles = normalizeSolution(circles, orientation, orientationOrder);
    const scaledCircles = scaleSolution(normalisedCircles, width, height, padding);
    Object.keys(scaledCircles).forEach((key) => {
      const circleRadius = scaledCircles[key].radius;
      scaledCircles[key].radius = Math.max(minAreaRadius, circleRadius);
      //@ts-ignore
      scaledCircles[key].data = getElementDataByKey(actualData, key);
    });
    //@ts-ignore
    this.circles = scaledCircles;
  };

  getCirclesLayout() {
    const { children } = this.state;
    // tslint:disable-next-line:no-this-assignment
    const { circles } = this;
    const circleItems = findAllByType(children, VennArea);
    this.circlesLayout = Object.keys(circles).map((circle) => {
      const circleName = circles[circle].data.name;
      const circleNode = circleItems.find(({ props }) => circleName === props.name);
      return {
        name: circleName,
        node: circleNode,
        ...circles[circle],
      };
    });
  }

  renderCircle = (circleProps) => {
    const { activeNode } = this.state;

    const { x, y, radius, data, name, node } = circleProps;
    const isNodeActive = activeNode && name === activeNode.name;
    const nodeProps = {
      ...node.props,
      cx: x,
      cy: y,
      r: radius,
      key: `venn-area-${name}`,
      size: data.size,
      active: isNodeActive,
      data,
    };
    const nodeHandlers = {
      onMouseEnter: this.handleMouseEnter(nodeProps),
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleClick,
    };

    return React.cloneElement(node, assignProps(nodeProps, nodeHandlers));
  };

  renderCircles() {
    return this.circlesLayout.map(this.renderCircle);
  }

  getIntersectionsLayout() {
    const { actualData } = this.state;
    const circlesWithIntersections = actualData.filter((item) => item.sets.length > 1);
    return circlesWithIntersections.map((intersection) => {
      const { sets, name, size } = intersection;
      const circleNodes = sets.map((set) =>
        this.circlesLayout.find((circle) => circle.data.sets[0] === set),
      );
      const path: string = intersectionAreaPath(circleNodes);
      return {
        d: path,
        circles: circleNodes,
        name,
        size,
        sets,
      };
    });
  }

  renderIntersection = (intersectionProps) => {
    const { sets } = intersectionProps;
    const { activeNode } = this.state;
    const isNodeActive = activeNode && activeNode.sets && stringArrayIsEqual(sets, activeNode.sets);
    const nodeHandlers = {
      onMouseEnter: this.handleMouseEnter(intersectionProps),
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleClick,
    };

    const nodeProps = {
      active: isNodeActive,
      key: `venn-intersection-${sets.join('-')}`,
      ...assignProps(intersectionProps, nodeHandlers),
    };
    return <VennIntersection {...nodeProps} />;
  };

  renderIntersections() {
    const intersections = this.getIntersectionsLayout();
    return intersections.map(this.renderIntersection);
  }

  getAreaTooltipCoordinate(activeNode) {
    if (!activeNode || !activeNode.cx || !activeNode.cy) {
      return null;
    }
    return {
      x: (activeNode.cx as number) + (activeNode.r as number),
      y: (activeNode.cy as number) + (activeNode.r as number) / 2,
    };
  }

  getIntersectionTooltipCoordinate(activeNode) {
    if (!activeNode || !activeNode.circles) {
      return null;
    }

    const stats = {};
    intersectionArea(activeNode.circles, stats);

    // @ts-ignore
    const { innerPoints } = stats;
    return innerPoints.reduce(
      (acc, { x, y }) => {
        if (x > acc.x) {
          acc.x = x;
        }
        if (y > acc.y) {
          acc.y = y;
        }
        return acc;
      },
      { x: 0, y: 0 },
    );
  }

  generatePayload(): IVennPayloadItem[] {
    const { data } = this.props;
    const { activeNode } = this.state;
    if (!activeNode) {
      return [];
    }
    return activeNode.name
      ? [
          {
            payload: activeNode.data,
            name: activeNode.name,
            value: activeNode.size,
            fill: activeNode.fill,
            data,
          },
        ]
      : activeNode.circles.map((circle) => ({
          payload: circle.data,
          // @ts-ignore
          name: circle.name,
          value: circle.data.size,
          // @ts-ignore
          fill: circle.node.props.fill,
          data,
        }));
  }

  renderTooltip() {
    const { children } = this.props;
    const tooltipItem = findChildByType(children, Tooltip);

    if (!tooltipItem) {
      return null;
    }

    const { width, height } = this.props;

    const { isTooltipActive, activeNode } = this.state;
    const viewBox = { x: 0, y: 0, width, height };

    const coordinate =
      this.getAreaTooltipCoordinate(activeNode) ||
      this.getIntersectionTooltipCoordinate(activeNode);

    const payload = isTooltipActive ? this.generatePayload() : [];

    return React.cloneElement(tooltipItem, {
      label: 'Overlap',
      labelFormatter: this.formatTooltipLabel,
      ...tooltipItem.props,
      viewBox,
      active: isTooltipActive,
      coordinate,
      payload,
    });
  }

  formatTooltipLabel = (label, payload) => {
    const { tooltipLabelIntersectionSizeFormatter } = this.props;
    if (!payload || payload.length < 2) {
      return null;
    }
    const totalValue = payload.reduce((acc, item) => acc + item.payload.size, 0);
    const sets = payload.reduce((acc, item) => {
      return acc.concat(item.payload.sets);
    }, []);
    const { size } = payload[0].data.find((dataItem) =>
      sets.every((set) => dataItem.sets.includes(set)),
    );
    const percent = size / (totalValue / 100);
    const finalPercentage = percent < 1 ? '< 1' : percent.toFixed(0);

    const STooltipLabel = 'span';
    const STooltipLabelTitle = 'span';
    const STooltipLabelPercentage = 'span';
    const STooltipLabelValue = 'span';

    return sstyled(styles)(
      <STooltipLabel>
        <STooltipLabelTitle>{label}</STooltipLabelTitle>
        <STooltipLabelPercentage>{finalPercentage}%</STooltipLabelPercentage>
        <STooltipLabelValue>{tooltipLabelIntersectionSizeFormatter(size)}</STooltipLabelValue>
      </STooltipLabel>,
    );
  };

  render() {
    if (!validateWidthHeight(this)) {
      return null;
    }
    this.dataToCirclesLayoutObj(); // elegant crutch 🤷‍
    this.getCirclesLayout();
    const { className, width, height, style, ...other } = this.props;
    const attrs = getPresentationAttributes(other);
    const SChart = 'div';
    return sstyled(chartStyles)(
      <SChart
        className={cn('recharts-wrapper', className)}
        style={{ position: 'relative', cursor: 'default', width, height, ...style }}
      >
        <Surface {...attrs} width={width} height={height}>
          {this.renderCircles()}
          {this.renderIntersections()}
        </Surface>
        {this.renderTooltip()}
      </SChart>,
    );
  }
}

function stringArrayIsEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((item) => arr2.includes(item));
}

function getElementDataByKey(data: IVennDataItem[], key: string) {
  return data.find((el) => {
    return el.sets.length === 1 && el.sets[0] === key;
  });
}
