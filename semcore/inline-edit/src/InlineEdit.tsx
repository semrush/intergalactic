import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { FadeInOut } from '@semcore/animation';

import style from './style/inline-edit.shadow.css';

const isElementInside = (element: Element, possibleParent: Element) => {
  while (element.parentElement !== possibleParent && element !== document.body) {
    element = element.parentElement;
  }
  return element.parentElement === possibleParent;
};

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

  constructor(props) {
    super(props);
    this.handleOnEdit = this.handleOnEdit.bind(this);
  }

  getViewProps() {
    const { editable } = this.asProps;

    return {
      editable,
      onEdit: this.handleOnEdit,
      inlineEditContainerRef: this.containerRef,
    };
  }

  getEditProps() {
    const { editable } = this.asProps;

    return {
      editable,
    };
  }

  handleOnEdit() {
    this.handlers.editable(true);
  }

  containerRef = React.createRef<HTMLElement>();

  render() {
    const SInlineEdit = Root;
    const { Children, children: hasChildren, styles } = this.asProps;

    if (!hasChildren) {
      throw new Error(
        '<InlineEdit /> component cannot be rendered without children. Either provide <InlineEdit.View /> and <InlineEdit.Edit /> or do not render <InlineEdit /> at all.',
      );
    }

    return sstyled(styles)(
      <SInlineEdit render={Box} ref={this.containerRef}>
        <Children />
      </SInlineEdit>,
    );
  }
}

const Edit: React.FC<AsProps> = (props) => {
  const visible = props.editable;
  const SEdit = Root;

  return sstyled(props.styles)(
    <SEdit
      render={FadeInOut}
      visible={visible}
      duration={200}
      aria-hidden={!visible}
      exiting={!visible}
    />,
  ) as React.ReactElement;
};
// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
const View: React.FC<AsProps & { inlineEditContainerRef: React.RefObject<HTMLElement> }> = (
  props,
) => {
  const visible = !props.editable;
  const SView = Root;

  const containerRef = React.useRef<HTMLElement>(null);
  const prevVisibleRef = React.useRef(visible);
  React.useEffect(() => {
    const visibleChanged = prevVisibleRef.current !== visible;
    if (visible && visibleChanged) {
      const focusWithinContainer = isElementInside(
        document.activeElement,
        props.inlineEditContainerRef.current,
      );
      if (focusWithinContainer) {
        // containerRef.current?.focus();
      }
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
      render={FadeInOut}
      visible={visible}
      preserveNode
      tabIndex={0}
      aria-hidden={!visible}
      role="button"
      ref={containerRef}
      onClick={visible ? props.onEdit : undefined}
      onKeyDown={handlekeyDown}
    />,
  ) as React.ReactElement;
};

export default createComponent(InlineEdit, {
  Edit,
  View,
});
