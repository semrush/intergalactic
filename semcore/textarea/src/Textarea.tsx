import React, { SyntheticEvent, TextareaHTMLAttributes } from 'react';
import { ResizeProperty } from 'csstype';
import { Box, IBoxProps } from '@semcore/flex-box';
import autoFocusEnhance, {
  IWithAutoFocusEnhanceProps,
} from '@semcore/utils/lib/enhances/autoFocusEnhance';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import cssToIntDefault from '@semcore/utils/lib/cssToIntDefault';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';

import style from './style/textarea.shadow.css';

export interface ITextareaProps extends IBoxProps, IWithAutoFocusEnhanceProps {
  /** Textarea size
   * @default m
   */
  size?: 'm' | 'l' | 'xl' | false;
  /** The value responsible for the component state
   * @default normal
   */
  state?: 'normal' | 'invalid' | 'valid' | false;
  /** Value responsible for resizing textarea
   * @default none
   */
  resize?: ResizeProperty | 'auto';
  /** Value responsible for the minimum number of rows in recalculation
   * @default 2
   * */
  minRows?: number;
  /** Value responsible for the maximum number of rows in recalculation */
  maxRows?: number;
  /**
   * Handler to change the value
   */
  onChange?: (value: string, event?: SyntheticEvent<HTMLTextAreaElement>) => void;
}

class Textarea extends Component<ITextareaProps> {
  static displayName = 'Textarea';
  static defaultProps = {
    size: 'm',
    state: 'normal',
    resize: 'none',
    minRows: 2,
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance()];
  static style = style;

  node: HTMLTextAreaElement;

  componentDidMount() {
    this.calculateRows();
    this.addGlobalHandlers();
  }

  componentWillUnmount() {
    this.removeGlobalHandlers();
  }

  componentDidUpdate(prevProps) {
    const { minRows, maxRows, value } = this.asProps;
    if (
      prevProps.minRows !== minRows ||
      prevProps.maxRows !== maxRows ||
      prevProps.value !== value
    ) {
      this.calculateRows();
    }
  }

  uncontrolledProps() {
    return {
      value: (e) => e.target.value,
    };
  }

  setRef = (node) => {
    if (!node) return;
    this.node = node;
  };

  handleChange = () => {
    const { value } = this.asProps;
    if (value === undefined) {
      this.calculateRows();
    }
  };

  addGlobalHandlers = () => {
    const { maxRows } = this.asProps;
    if (!canUseDOM() || !maxRows) return;
    window.addEventListener('resize', this.calculateRows);
  };

  removeGlobalHandlers = () => {
    const { maxRows } = this.asProps;
    if (!canUseDOM() || !maxRows) return;
    window.removeEventListener('resize', this.calculateRows);
  };

  calculateRows = () => {
    const { node } = this;
    const { rows } = this.asProps;
    const maxRows = this.asProps.maxRows as number;
    const minRows = this.asProps.minRows as number;
    if (!node || !canUseDOM() || rows || !maxRows) return;

    const lh = cssToIntDefault(getComputedStyle(node).getPropertyValue('line-height'));
    const previousRows = node.rows;

    node.rows = minRows;

    const computed = Math.floor(node.scrollHeight / lh);

    if (computed === previousRows) {
      node.rows = computed;
      return;
    }
    if (computed <= minRows) {
      node.rows = minRows;
    }
    if (computed >= maxRows) {
      node.rows = maxRows;
    }
    if (computed >= minRows && computed <= maxRows) {
      node.rows = computed;
    }

    node.scrollTop = node.scrollHeight;
  };

  render() {
    const STextarea = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(
      <STextarea render={Box} tag="textarea" ref={this.setRef} onChange={this.handleChange} />,
    );
  }
}

export default createComponent<Merge<ITextareaProps, TextareaHTMLAttributes<HTMLTextAreaElement>>>(
  Textarea,
);
