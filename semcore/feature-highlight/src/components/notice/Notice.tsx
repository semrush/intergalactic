import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
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

  renderSmartMode() {
    const { label, title, actions, closable, onClose } = this.asProps;

    return (
      <>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          {this.renderContent()}
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.Close onClick={onClose} />}
      </>
    );
  }

  renderAdvancedMode() {
    const { Children } = this.asProps;

    return <Children />;
  }

  render() {
    const SHighlightedNotice = Root;
    const { styles, Children } = this.asProps;

    const advancedMode = isAdvanceMode(Children, [
      NoticeFH.Label.displayName,
      NoticeFH.Actions.displayName,
      NoticeFH.Content.displayName,
      NoticeFH.Title.displayName,
      NoticeFH.Text.displayName,
      NoticeFH.Close.displayName,
    ]);

    return sstyled(styles)(
      <SHighlightedNotice render={Notice} __excludeProps={['title']} use:theme={undefined}>
        {advancedMode ? this.renderAdvancedMode() : this.renderSmartMode()}
      </SHighlightedNotice>,
    );
  }
}

export const NoticeFH = createComponent(NoticeFHRoot, {
  Label: Notice.Label,
  Actions: Notice.Actions,
  Content: Notice.Content,
  Title: Notice.Title,
  Text: Notice.Text,
  Close: Notice.Close,
  CloseIcon: Notice.CloseIcon,
}) as HighlightedNoticeComponent;
