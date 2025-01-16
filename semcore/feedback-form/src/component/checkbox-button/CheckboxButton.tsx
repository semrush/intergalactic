import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import style from '../../style/checkbox-button.shadow.css';
import Checkbox, { CheckboxProps } from '@semcore/checkbox';

class CheckboxButtonRoot extends Component<CheckboxProps> {
  static style = style;

  render() {
    const { styles, id, label, ...other } = this.asProps;
    const SCheckboxButton = Root;
    return sstyled(styles)(
      <SCheckboxButton render={Box} __excludeProps={['onChange', 'id']}>
        <Checkbox {...other}>
          <Checkbox.Value id={id} />
          <Checkbox.Text>{label}</Checkbox.Text>
        </Checkbox>
      </SCheckboxButton>,
    );
  }
}

const CheckboxButton = createComponent(CheckboxButtonRoot);

export default CheckboxButton;
