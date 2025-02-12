import React from 'react';
import { createComponent, Component, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import Notice from './Notice';

class NoticeSmart extends Component {
  static displayName = 'NoticeSmart';

  static defaultProps = {
    theme: 'info',
  };

  render() {
    const SNoticeSmart = Root;
    const { Children, label, title, actions, closable, onClose } = this.asProps;
    let textContent = <Children />;

    if (typeof Children.origin === 'string') {
      textContent =
        isNode(title) || isNode(label) || closable ? (
          <Notice.Text>
            <Children />
          </Notice.Text>
        ) : (
          <Children />
        );
    }

    return (
      <SNoticeSmart render={Notice} __excludeProps={['title']}>
        {isNode(label) && <Notice.Label>{label}</Notice.Label>}
        <Notice.Content>
          {isNode(title) && <Notice.Title>{title}</Notice.Title>}
          {textContent}
          {isNode(actions) && <Notice.Actions>{actions}</Notice.Actions>}
        </Notice.Content>
        {closable && <Notice.Close onClick={onClose} />}
      </SNoticeSmart>
    );
  }
}

export default createComponent(NoticeSmart);
