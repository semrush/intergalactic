import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';
import Notice from './Notice';

class NoticeSmart extends Component {
  static displayName = 'NoticeSmart';

  static defaultProps = {
    theme: 'info',
  };

  render() {
    const SNoticeSmart = Root;
    const { Children, label, title, text, actions, closable, onClose } = this.asProps;

    return (
      <SNoticeSmart render={Notice}>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          <Children />
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.Close onClick={onClose} />}
      </SNoticeSmart>
    );
  }
}

export default createComponent(NoticeSmart);
