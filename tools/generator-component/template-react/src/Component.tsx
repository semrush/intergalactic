import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';

import style from './style/{{ dashCase name }}.shadow.css';

export interface I{{ properCase name }}Props {}

class {{ properCase name }} extends Component<I{{ properCase name }}Props> {
  static displayName = '{{ properCase name }}';

  static style = style;

  render() {
    const S{{ properCase name }} = this.Root;
    const { styles } = this.asProps;

    return styled(styles)(
      <S{{ properCase name }} render="div">
        GENERATE TEMPLATE
      </S{{ properCase name }}>
    )
  }
}

export default createComponent<I{{ properCase name }}Props>({{ properCase name }});
