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

  renderSmartMode() {
    const { label, title, text, actions, closable, onClose } = this.asProps;

    return (
      <>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          {isNode(text) && <Notice.Text>{text}</Notice.Text>}
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
    const { styles, Children, visible } = this.asProps;

    const advancedMode = isAdvanceMode(Children, [
      NoticeFH.Label.displayName,
      NoticeFH.Actions.displayName,
      NoticeFH.Content.displayName,
      NoticeFH.Title.displayName,
      NoticeFH.Text.displayName,
      NoticeFH.Close.displayName,
    ]);

    const beforeVisibility = visible === undefined || visible ? 'visible' : 'hidden';

    return sstyled(styles)(
      <SHighlightedNotice render={Notice} beforeVisibility={beforeVisibility} __excludeProps={['title']} use:theme={undefined}>
        {advancedMode ? this.renderAdvancedMode() : this.renderSmartMode()}
      </SHighlightedNotice>,
    );
  }
}

/**
 * Notice FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#notice|Docs}
 */
export const NoticeFH = createComponent<
  HighlightedNoticeComponent,
  typeof NoticeFHRoot
>(NoticeFHRoot, {
  Label: Notice.Label,
  Actions: Notice.Actions,
  Content: Notice.Content,
  Title: Notice.Title,
  Text: Notice.Text,
  Close: Notice.Close,
});
