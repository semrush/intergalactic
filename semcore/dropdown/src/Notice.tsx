import { Flex } from '@semcore/base-components';
import { Component, createComponent, type Intergalactic, Root, sstyled } from '@semcore/core';
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
      <SDropdownNotice render={Notice} use:icon={undefined} __excludeProps={['title']}>
        <Flex alignItems='flex-start' gap={2}>
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

function NoticeText(props: Intergalactic.InternalTypings.InferComponentProps<NSNotice.Text.Component>) {
  const SDropdownNoticeText = Root;

  return sstyled(props.styles)(
    <SDropdownNoticeText render={Notice.Text} />,
  );
}

export const DropdownNotice = createComponent<NSDropdown.Notice.Component, typeof DropdownNoticeRoot>(DropdownNoticeRoot, {
  Text: NoticeText,
  Actions: Notice.Actions,
  Close: Notice.Close,
}, { parent: Notice });
