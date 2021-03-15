import React from 'react';
import createComponent, { Component } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';
import Notice from './Notice';

class NoticeSmart extends Component {
  static displayName = 'NoticeSmart';

  static defaultProps = {
    theme: 'info',
  };

  render() {
    const SNoticeSmart = this.Root;
    const { Children, label, actions, closable, onClose } = this.asProps;
    return (
      <SNoticeSmart render={Notice}>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          <Children />
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.CloseIcon onClick={onClose} />}
      </SNoticeSmart>
    );
  }
}

export default createComponent(NoticeSmart);
