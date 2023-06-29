import React from 'react';
import createComponent, { Component } from '@semcore/core';
import propsForElement from '@semcore/utils/lib/propsForElement';

class ClipPath extends Component {
  static defaultProps = {
    tag: 'rect',
    id: '',
    transition: '',
    setAttributeTag: null,
  };

  refClipPath = React.createRef();

  setAttributeTag() {
    const { id, tag, setAttributeTag } = this.asProps;
    if (setAttributeTag) {
      Array.from(document.querySelectorAll(`#${id} ${tag}`)).forEach(setAttributeTag);
    }
  }

  componentDidMount() {
    const { id } = this.asProps;
    if (!document || !id || !document.querySelector(`#${id}`)) return;
    const svg = document.querySelector(`#${id}`).closest('svg');
    Array.from(svg.querySelectorAll(`[clip-path="url(#${id})"]`)).forEach((node) => {
      node?.getTotalLength?.();
    });
    this.setAttributeTag();
  }

  componentDidUpdate() {
    this.setAttributeTag();
  }

  render() {
    const { id, transition, tag: Tag, style, className, ...other } = this.asProps;
    return (
      <clipPath aria-hidden ref={this.refClipPath} id={id}>
        <Tag style={{ ...style, transition }} {...propsForElement(other, Tag)} />
      </clipPath>
    );
  }
}

export default createComponent(ClipPath);
