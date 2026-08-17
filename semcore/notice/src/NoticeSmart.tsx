import type { Intergalactic } from '@semcore/core';
import { sstyled, createComponent, Component, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import Notice from './Notice';
import type { NSNoticeSmart } from './NoticeSmart.type';
import style from './style/notice.shadow.css';

class NoticeSmart extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSNoticeSmart.Component>,
  [],
  {},
  {},
  {},
  NSNoticeSmart.DefaultProps
> {
  static displayName = 'NoticeSmart';
  static style = style;
  static defaultProps = {
    theme: 'info',
  } as const;

  render() {
    const SNoticeSmart = Root;
    const { label, title, actions, closable, onClose, text, styles } = this.asProps;

    return sstyled(styles)(
      <SNoticeSmart render={Notice} __excludeProps={['title']}>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          {isNode(text) && <Notice.Text>{text}</Notice.Text>}
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.Close onClick={onClose} />}
      </SNoticeSmart>,
    );
  }
}

/**
 * NoticeSmart
 *
 * {@link https://developer.semrush.com/intergalactic/components/notice/notice-api#noticesmart|API} | {@link https://developer.semrush.com/intergalactic/components/notice/notice-code/|Examples}
 */
export default createComponent<
  NSNoticeSmart.Component,
  typeof NoticeSmart
>(NoticeSmart);
