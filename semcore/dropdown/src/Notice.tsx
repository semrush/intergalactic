import { Flex } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import Notice, { type NSNotice } from '@semcore/notice';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './style/dropdownNotice.shadow.css';

class DropdownNoticeRoot extends Component<NSNotice.Props> {
  static displayName = 'Notice';
  static style = style;

  render() {
    const { styles, Children, icon, title, theme } = this.asProps;
    const SDropdownNotice = Root;
    const SIcon = 'div';
    const STitle = Text;

    return sstyled(styles)(
      <SDropdownNotice render={Notice} use:icon={undefined}>
        <Flex alignItems='baseline' gap={2}>
          <SIcon theme={theme}>{icon}</SIcon>
          <STitle bold size={300}>{title}</STitle>
        </Flex>
        <Children />
      </SDropdownNotice>,
    );
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
