import React from 'react';
import { createComponent, Component } from '@semcore/core';
import propsForElement from '@semcore/core/lib/utils/propsForElement';

class AnimatedClipPath extends Component {
  static defaultProps = {
    tag: 'rect',
    duration: 500,
    attributeName: 'width',
    values: '0;100%',
  };

  render() {
    const { id, transition, tag: Tag, style, className, ...other } = this.asProps;
    const duration =
      typeof this.asProps.duration === 'number'
        ? `${this.asProps.duration}ms`
        : this.asProps.duration;
    return (
      <clipPath aria-hidden ref={this.refClipPath} id={id}>
        <rect x={0} y={0} width='100%' height='100%'>
          <animate dur={duration} {...propsForElement(other, Tag)} />
        </rect>
      </clipPath>
    );
  }
}

export default createComponent(AnimatedClipPath);
