import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import trottle from '@semcore/utils/lib/rafTrottle';
import { getNodeByRef } from '@semcore/utils/lib/ref';
import fire from '@semcore/utils/lib/fire';

class ResponsiveContainerRoot extends Component {
  static displayName = 'ResponsiveContainer';

  constructor(props) {
    super(props);
    this.observer = new ResizeObserver(this.handleResize);
    this.isControlled = props.onResize;
    this.$container = null;
    this.state = {
      width: props.wMax,
      height: props.hMax,
    };
  }

  componentDidMount() {
    const { $container } = this;
    if ($container) {
      this.observer.observe($container);
    }
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  setContext() {
    return this.getSizeContainer();
  }

  getSizeContainer = () => {
    const { width, height } = this.state;
    return {
      width,
      height,
    };
  };

  handleResize = trottle((entries) => {
    const { width: oldWidth, height: oldHeight } = this.getSizeContainer();
    const { clientWidth: width, clientHeight: height } = this.$container;

    if (this.isControlled) {
      fire(this, 'onResize', { width, height }, entries);
      return;
    }

    if (width !== oldWidth || height !== oldHeight) {
      this.setState({ width, height });
    }
  });

  setContainerRef = (ref) => {
    this.$container = getNodeByRef(ref);
  };

  render() {
    const { Root: SResponsiveContainer } = this;
    const { styles } = this.asProps;
    return styled(styles)(<SResponsiveContainer render={Box} ref={this.setContainerRef} />);
  }
}

const ResponsiveContainer = createComponent(ResponsiveContainerRoot);

export default ResponsiveContainer;
