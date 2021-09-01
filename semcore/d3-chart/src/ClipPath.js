import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import style from './style/bar.shadow.css';

class ClipPath extends Component {
  static defaultProps = {
    tag: 'rect',
    id: '',
    transition: '',
    setAttributeTag: () => {},
  };

  refClipPath = React.createRef();

  componentDidMount() {
    const { id, tag, setAttributeTag } = this.asProps;
    if (!document || !document.querySelector(`#${id}`)) return;
    const svg = document.querySelector(`#${id}`).closest('svg');
    Array.from(svg.querySelectorAll(`[clip-path="url(#${id})"]`)).forEach((node) => {
      node?.getTotalLength();
    });
    Array.from(document.querySelectorAll(`#${id} ${tag}`)).forEach(setAttributeTag);
  }

  isRenderClipPath() {
    return true;
    return !this.refClipPath.current;
  }

  render() {
    const { id, transition, tag: Tag, style, ...other } = this.asProps;
    if (this.isRenderClipPath()) {
      return (
        <clipPath ref={this.refClipPath} id={id}>
          <Tag style={{ ...style, transition }} {...other} />
        </clipPath>
      );
    }

    return null;
  }
}

export default createComponent(ClipPath);
