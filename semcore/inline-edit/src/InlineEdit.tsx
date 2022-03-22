import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import useDeferredState from 'use-deferred-state';

import style from './style/inline-edit.shadow.css';

type AsProps = {
  defaultEditable?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  styles?: React.CSSProperties;
};

class InlineEdit extends Component<AsProps> {
  static displayName = 'InlineEdit';

  static style = style;

  static defaultProps: AsProps = {
    defaultEditable: false,
  };

  uncontrolledProps() {
    return {
      editable: null,
    };
  }

  getViewProps() {
    const { editable } = this.asProps;

    return {
      editable,
      onEdit: () => this.handlers.editable(true),
    };
  }

  getEditProps() {
    const { editable } = this.asProps;

    return {
      editable,
    };
  }

  render() {
    const SInlineEdit = Root;
    const { Children, children: hasChildren, styles } = this.asProps;

    if (!hasChildren) {
      throw new Error(
        '<InlineEdit /> component cannot be rendered without children. Either provide <InlineEdit.View /> and <InlineEdit.Edit /> or do not render <InlineEdit /> at all.',
      );
    }

    return sstyled(styles)(
      <SInlineEdit render={Box}>
        <Children />
      </SInlineEdit>,
    );
  }
}

const Edit: React.FC<AsProps> = (props) => {
  const visible = props.editable;
  const render = useDeferredState(visible, [true], 100);

  if (!render) return null;
  const SEdit = Root;
  return sstyled(props.styles)(
    <SEdit aria-hidden={!visible} exiting={!visible} render={Box} />,
  ) as React.ReactElement;
};
const View: React.FC<AsProps> = (props) => {
  const visible = !props.editable;
  const SView = Root;

  const containerRef = React.useRef<HTMLElement>(null);
  const prevVisibleRef = React.useRef(visible);
  React.useEffect(() => {
    if (visible && prevVisibleRef.current !== visible) {
      containerRef.current?.focus();
    }
    prevVisibleRef.current = visible;
  }, [visible]);

  const handlekeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!visible) return;
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        props.onEdit();
      }
    },
    [visible, props.onEdit],
  );

  return sstyled(props.styles)(
    <SView
      render={Box}
      tabIndex={0}
      aria-hidden={!visible}
      role="button"
      ref={containerRef}
      hiddenView={!visible}
      onClick={visible ? props.onEdit : undefined}
      onKeyDown={handlekeyDown}
    />,
  ) as React.ReactElement;
};

export default createComponent(InlineEdit, {
  Edit,
  View,
});
