/* eslint-disable */
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import createHoc from '../createHoc';

export interface IEnhancedWithAutoFocusProps {
  /**
   * @default undefined
   */
  autoFocus?: string | number | boolean;
  children?: (props: IEnhancedWithAutoFocusProps) => React.ReactNode;
}

class EnhancedWithAutoFocus extends PureComponent<IEnhancedWithAutoFocusProps> {
  static displayName = 'EnhancedWithAutoFocus';

  static defaultProps = {
    autoFocus: undefined,
  };

  private timer: ReturnType<typeof setTimeout>;

  notUsingNativeAutoFocus() {
    const { autoFocus } = this.props;
    return typeof autoFocus === 'boolean' || typeof autoFocus === 'number';
  }

  componentDidMount() {
    if (this.notUsingNativeAutoFocus()) {
      const { autoFocus } = this.props;
      if (autoFocus === false) return;
      const node = findDOMNode(this);
      if (!node) return;
      //@ts-ignore
      this.timer = setTimeout(() => node.focus(), (autoFocus as number) || 0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { children } = this.props;
    const props = {} as IEnhancedWithAutoFocusProps;
    if (this.notUsingNativeAutoFocus()) {
      props.autoFocus = undefined;
    }
    return children(props);
  }
}

export default createHoc(EnhancedWithAutoFocus);
