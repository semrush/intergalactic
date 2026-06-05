import { createComponent, Component, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import Notice from './Notice';

class NoticeSmart extends Component {
  static displayName = 'NoticeSmart';

  static defaultProps = {
    theme: 'info',
  };

  render() {
    const SNoticeSmart = Root;
    const { label, title, actions, closable, onClose, text } = this.asProps;

    return (
      <SNoticeSmart render={Notice} __excludeProps={['title']}>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          {isNode(text) && <Notice.Text>{text}</Notice.Text>}
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.Close onClick={onClose} />}
      </SNoticeSmart>
    );
  }
}

/**
 * NoticeSmart
 *
 * {@link https://developer.semrush.com/intergalactic/components/notice/notice-api#noticesmart|API} | {@link https://developer.semrush.com/intergalactic/components/notice/notice-code/|Examples}
 */
export default createComponent(NoticeSmart);
