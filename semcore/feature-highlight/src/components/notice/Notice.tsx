import { createComponent, Component, Root, sstyled } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import type { NoticeSmartProps } from '@semcore/notice';
import Notice from '@semcore/notice';
import React from 'react';

import style from './notice.shadow.css';
import type { HighlightedNoticeComponent } from './Notice.type';

class NoticeFHRoot extends Component<NoticeSmartProps> {
  static displayName = 'NoticeFH';
  static style = style;

  renderContent() {
    const { Children, label, title, closable } = this.asProps;
    let textContent = <Children />;

    if (typeof Children.origin === 'string') {
      textContent =
              isNode(title) || isNode(label) || closable
                ? (
                    <Notice.Text>
                      <Children />
                    </Notice.Text>
                  )
                : (
                    <Children />
                  );
    }

    return textContent;
  }

  render() {
    const SHighlightedNotice = Root;
    const { label, title, styles, actions, closable, onClose } = this.asProps;

    return sstyled(styles)(
      <SHighlightedNotice render={Notice} __excludeProps={['title']} use:theme={undefined}>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          {this.renderContent()}
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.Close onClick={onClose} />}
      </SHighlightedNotice>,
    );
  }
}

export const NoticeFH = createComponent(NoticeFHRoot) as HighlightedNoticeComponent;
