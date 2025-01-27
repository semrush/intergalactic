import React from 'react';
import { Component, type Intergalactic } from '@semcore/core';
import type { LegendItemKey, LegendItemProps } from './LegendItem/LegendItem.type';
import type { LegendProps } from './BaseLegend.type';
import { makeDataHintsHandlers } from '../../a11y/hints';

export abstract class BaseLegend<T extends LegendProps> extends Component<T> {
  componentDidMount() {
    this.setHints();
  }

  componentDidUpdate(prevProps: T) {
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
      onChangeLegendItem: this.onChangeLegendItem,
      onMouseEnter: this.bindOnMouseEnterItem(line.id),
      onMouseLeave: this.bindOnMouseLeaveItem(line.id),
      style: { gridRowStart: `${index + 1}`, gridRowEnd: `${index + 2}` },
      patterns,
    };
  }

  onChangeLegendItem = (id: LegendItemKey, checked: boolean) => {
    this.props.onChangeVisibleItem?.(id, checked);
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
