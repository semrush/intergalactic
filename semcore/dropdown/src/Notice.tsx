import { Flex } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import Notice, { type NSNotice } from '@semcore/notice';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSDropdown } from './index';
import style from './style/dropdownNotice.shadow.css';

class DropdownNoticeRoot extends Component<NSDropdown.Notice.Props> {
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
          {Boolean(icon) && (
            <SIcon
            // @ts-expect-error for css styles only
              theme={theme}
            >
              {icon}
            </SIcon>
          )}
          <STitle bold size={300}>{title}</STitle>
        </Flex>
        <Children />
      </SDropdownNotice>,
    );
  }
}

export const DropdownNotice = createComponent<NSDropdown.Notice.Component, typeof DropdownNoticeRoot>(DropdownNoticeRoot, {
  Text: Notice.Text,
  Actions: Notice.Actions,
  Content: Notice.Content,
  Close: Notice.Close,
}, { parent: Notice });
