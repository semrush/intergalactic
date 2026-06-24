import { Component, type Intergalactic } from '@semcore/core';
import type React from 'react';

import type { LegendProps } from './BaseLegend.type';
import { type LegendItemKey, type LegendItemProps, type ShapeType } from './LegendItem/LegendItem.type';
import { makeDataHintsHandlers } from '../../a11y/hints';

export abstract class BaseLegend<
  P extends LegendProps,
  E extends readonly ((...args: any[]) => any)[] = never[],
  DP extends Intergalactic.InternalTypings.ValidDefaultProps<DP, P> = never,
> extends Component<P, E, never, {}, {}, DP> {
  componentDidMount() {
    this.setHints();
  }

  componentDidUpdate(prevProps: P) {
    if (prevProps.items !== this.props.items || prevProps.dataHints !== this.props.dataHints) {
      this.setHints();
    }
  }

  setHints() {
    const { items, dataHints } = this.asProps;
    const dataHintsHandler = dataHints ? makeDataHintsHandlers(dataHints) : undefined;

    items.forEach((legendItem) => {
      dataHintsHandler?.labelKey('value', legendItem.id, legendItem.label);
    });
  }

  getItem(index: number) {
    const line = this.asProps.items[index];

    if (line === undefined) {
      throw new Error(`No index "${index}" in lines`);
    }

    return line;
  }

  getLegendItemProps(
    _: {},
    index: number,
  ): LegendItemProps & Intergalactic.InternalTypings.ComponentPropsNesting<'div'> {
    const { shape = 'Checkbox', size = 'm', patterns } = this.asProps;
    const line = this.getItem(index);

    return {
      ...line,
      shape,
      size,
      onFocusLegendItem: this.onFocusLegendItem(line.checked),
      onBlurLegendItem: this.onBlurLegendItem,
      onChangeLegendItem: this.onChangeLegendItem(shape),
      onMouseEnter: line.checked ? this.bindOnMouseEnterItem(line.id) : undefined,
      onMouseLeave: this.bindOnMouseLeaveItem(line.id),
      style: { gridRowStart: `${index + 1}`, gridRowEnd: `${index + 2}` },
      patterns,
    };
  }

  onChangeLegendItem = (shape: ShapeType) => (id: LegendItemKey, checked: boolean) => {
    if (shape !== 'Checkbox') return;

    this.props.onChangeVisibleItem?.(id, checked);

    if (checked) {
      this.props.onMouseEnterItem?.(id);
    } else {
      this.props.onMouseLeaveItem?.(id);
    }
  };

  onFocusLegendItem = (checked: boolean) => (id: LegendItemKey) => {
    if (!checked) {
      return this.props.onMouseLeaveItem?.(id);
    }

    this.props.onMouseEnterItem?.(id);
  };

  onBlurLegendItem = (id: LegendItemKey) => {
    this.props.onMouseLeaveItem?.(id);
  };

  bindOnMouseEnterItem = (id: LegendItemKey) => {
    return (e: React.SyntheticEvent) => {
      this.props.onMouseEnterItem?.(id, e);
    };
  };

  bindOnMouseLeaveItem = (id: LegendItemKey) => {
    return (e: React.SyntheticEvent) => {
      this.props.onMouseLeaveItem?.(id, e);
    };
  };
}
