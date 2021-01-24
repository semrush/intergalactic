import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';
import Notice, { INoticeProps } from '../Notice';

export interface INoticeSmartProps extends INoticeProps {
  /**
   * A custom element for additional information
   */
  label?: React.ReactNode;
  /**
   * Custom action element
   */
  actions?: React.ReactNode;
  /**
   *  Adds a Close icon
   */
  closable?: boolean;
  /**
   * Callback on a click on the close button
   */
  onClose?: (event: React.SyntheticEvent) => void;
}

class NoticeSmart extends Component<INoticeSmartProps> {
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

export default createComponent<Merge<INoticeSmartProps, HTMLAttributes<HTMLDivElement>>>(
  NoticeSmart,
);
