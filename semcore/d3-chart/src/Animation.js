import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import style from './style/bar.shadow.css';

class Animation extends Component {
  static defaultProps = {
    tag: 'rect',
    id: '',
    transition: '',
    setAttributeTag: () => {},
  };

  componentDidMount() {
    const { id, tag, setAttributeTag } = this.asProps;
    const svg = document.querySelector(`#${id}`).closest('svg');
    Array.from(svg.querySelectorAll(`[clip-path="url(#${id})"]`)).forEach((node) => {
      node?.getTotalLength();
    });
    Array.from(document.querySelectorAll(`#${id} ${tag}`)).forEach(setAttributeTag);
  }

  render() {
    const { id, transition, tag: Tag, style, ...other } = this.asProps;

    return (
      <clipPath id={id}>
        <Tag style={{ ...style, transition }} {...other} />
      </clipPath>
    );
  }
}

export default createComponent(Animation);
