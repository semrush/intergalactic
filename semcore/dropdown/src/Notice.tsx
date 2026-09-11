import { Component, createComponent, Root, sstyled } from '@semcore/core';
import Notice, { type NSNotice } from '@semcore/notice';
import React from 'react';

import style from './style/dropdownNotice.shadow.css';

class DropdownNoticeRoot extends Component<NSNotice.Props> {
  static displayName = 'Notice';
  static style = style;

  render() {
    const { styles } = this.asProps;
    const SDropdownNotice = Root;
    return sstyled(styles)(<SDropdownNotice render={Notice} />);
  }
}

export const DropdownNotice = createComponent<NSNotice.Component, typeof DropdownNoticeRoot>(DropdownNoticeRoot, {
  Label: Notice.Label,
  Title: Notice.Title,
  Text: Notice.Text,
  Actions: Notice.Actions,
  Content: Notice.Content,
  Close: Notice.Close,
}, { parent: Notice });
