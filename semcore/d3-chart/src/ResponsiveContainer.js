import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import trottle from '@semcore/utils/lib/rafTrottle';
import fire from '@semcore/utils/lib/fire';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

class ResponsiveContainerRoot extends Component {
  static displayName = 'ResponsiveContainer';

  containerRef = React.createRef();
  size = [0, 0];

  constructor(props) {
    super(props);
    this.observer = new ResizeObserver(this.handleResize);
  }

  get $container() {
    return this.containerRef.current;
  }

  handleResize = trottle((entries) => {
    const { Children, aspect } = this.asProps;
    let { clientWidth: width, clientHeight: height } = this.$container;

    if (aspect) {
      const style = window.getComputedStyle(this.$container);
      const minHeight = Number.parseInt(style.getPropertyValue('min-height'));
      const maxHeight = Number.parseInt(style.getPropertyValue('max-height'));
      height = width * aspect;

      if (height < minHeight) {
        height = minHeight;
      }
      if (height > maxHeight) {
        height = maxHeight;
      }
    }

    if (this.size[0] === width && this.size[1] === height) return;

    this.size = [width, height];

    fire(this, 'onResize', this.size, entries);

    if (typeof getOriginChildren(Children) === 'function') {
      this.forceUpdate();
    }
  });

  setContext() {
    const [width, height] = this.size;
    return {
      width,
      height,
    };
  }

  componentDidMount() {
    if (this.$container) {
      // TODO ускорить можно?
      this.observer.observe(this.$container);
    }
  }

  // TODO component did update ref?

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { Root: SResponsiveContainer } = this;
    const { styles } = this.asProps;
    return styled(styles)`
      SResponsiveContainer {
      }
    `(<SResponsiveContainer render={Box} ref={this.containerRef} />);
  }
}

const ResponsiveContainer = createComponent(ResponsiveContainerRoot);

export default ResponsiveContainer;
