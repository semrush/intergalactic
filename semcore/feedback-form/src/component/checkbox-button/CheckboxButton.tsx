import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import style from '../../style/checkbox-button.shadow.css';
import Checkbox from '@semcore/checkbox';
import { FeedbackRatingCheckboxProps } from '../feedback-rating/FeedbackRating.type';

class CheckboxButtonRoot extends Component<FeedbackRatingCheckboxProps> {
  static style = style;

  render() {
    const { styles, id, label, type, focused, ...other } = this.asProps;
    const autoFocus = focused ? 20 : false;

    const SCheckboxButton = Root;
    return sstyled(styles)(
      <SCheckboxButton render={Box} __excludeProps={['onChange', 'id', 'type']}>
        <Checkbox {...other}>
          <Checkbox.Value autoFocus={autoFocus} aria-labelledby={id} />
          <Checkbox.Text id={id}>{label}</Checkbox.Text>
        </Checkbox>
      </SCheckboxButton>,
    );
  }
}

const CheckboxButton = createComponent(CheckboxButtonRoot);

export default CheckboxButton;
