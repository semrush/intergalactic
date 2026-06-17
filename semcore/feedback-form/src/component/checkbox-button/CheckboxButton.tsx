import { Box } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSFeedbackFormCheckboxButton } from './CheckboxButton.type';
import style from '../../style/checkbox-button.shadow.css';

class CheckboxButtonRoot extends Component<NSFeedbackFormCheckboxButton.Props> {
  static style = style;

  checkboxRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    const { focused } = this.asProps;

    if (focused) {
      setTimeout(() => {
        this.checkboxRef.current?.focus();
      }, 20);
    }
  }

  render() {
    const { styles, id, label, type: _type, focused, ...other } = this.asProps;

    const SCheckboxButton = Root;
    return sstyled(styles)(
      <SCheckboxButton render={Box} __excludeProps={['onChange', 'id', 'type']}>
        <Checkbox {...other}>
          <Checkbox.Value ref={this.checkboxRef} aria-labelledby={id} />
          <Checkbox.Text id={id}>{label}</Checkbox.Text>
        </Checkbox>
      </SCheckboxButton>,
    );
  }
}

const CheckboxButton = createComponent<
  NSFeedbackFormCheckboxButton.Component,
  typeof CheckboxButtonRoot
>(CheckboxButtonRoot);

export default CheckboxButton;
