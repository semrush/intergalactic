import React from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';

import style from './style/{{ dashCase name }}.shadow.css';

class {{ properCase name }} extends Component {
  static displayName = '{{ properCase name }}';

  static style = style;

  render() {
    const S{{ properCase name }} = this.Root;
    const { styles } = this.asProps;

    return sstyled(styles)(
      <S{{ properCase name }} render="div">
        GENERATE TEMPLATE
      </S{{ properCase name }}>
    )
  }
}

export default createComponent({{ properCase name }})
