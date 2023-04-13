import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { FadeInOut } from '@semcore/animation';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { useCssVariable } from '@semcore/utils/lib/useCssVariable';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

import style from './style/inline-edit.shadow.css';

// const isElementInside = (element: Element, possibleParent: Element) => {
//   while (element.parentElement !== possibleParent && element !== document.body) {
//     element = element.parentElement;
//   }
//   return element.parentElement === possibleParent;
// };

type AsProps = {
  Children: React.FC,
  defaultEditable?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  styles?: React.CSSProperties;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

class InlineEdit extends Component<AsProps> {
  static displayName = 'InlineEdit';

  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];

  static defaultProps = {
    defaultEditable: false,
    i18n: localizedMessages,
    locale: 'en',
  };

  containerRef = React.createRef<HTMLElement>();
  viewRef = React.createRef<HTMLElement>();

  constructor(props) {
    super(props);
    this.handleOnEdit = this.handleOnEdit.bind(this);
  }

  uncontrolledProps() {
    return {
      editable: null,
    };
  }

  getViewProps() {
    const { editable, getI18nText } = this.asProps;

    return {
      editable,
      onEdit: this.handleOnEdit,
      inlineEditContainerRef: this.containerRef,
      getI18nText,
      ref: this.viewRef
    };
  }

  getEditProps() {
    const { editable } = this.asProps;

    return {
      editable,
      onKeyDown: this.handlerKeyDownEdit
    };
  }

  handlerKeyDownEdit = (event) => {
    if (event.code === 'Enter' || event.code === 'Escape') {
      this.viewRef.current?.focus()
    }
  }

  handleOnEdit() {
    this.handlers.editable(true);
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
      <SInlineEdit render={Box} ref={this.containerRef}>
        <Children />
      </SInlineEdit>,
    );
  }
}

const Edit: React.FC<AsProps> = (props) => {
  const visible = props.editable;
  const SEdit = Root;
  const ref = React.useRef();
  const durationStr = useCssVariable('--intergalactic-duration-control', '200', ref);
  const duration = React.useMemo(() => parseInt(durationStr, 10), [durationStr]);

  return sstyled(props.styles)(
    <SEdit
      render={FadeInOut}
      visible={visible}
      duration={duration}
      aria-hidden={!visible}
      exiting={!visible}
      ref={ref}
    />,
  ) as React.ReactElement;
};
// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
const View: React.FC<AsProps & { inlineEditContainerRef: React.RefObject<HTMLElement> }> = (
  props,
) => {
  const visible = !props.editable;
  const SView = Root;

  // const containerRef = React.useRef<HTMLElement>(null);
  // const prevVisibleRef = React.useRef(visible);
  // React.useEffect(() => {
  //   const visibleChanged = prevVisibleRef.current !== visible;
  //   if (visible && visibleChanged) {
  //     const focusWithinContainer = isElementInside(
  //       document.activeElement,
  //       props.inlineEditContainerRef.current,
  //     );
  //     if (focusWithinContainer) {
  //       // containerRef.current?.focus();
  //     }
  //   }
  //   prevVisibleRef.current = visible;
  // }, [visible]);

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
  const textContent = reactToText(getOriginChildren(props.Children)).trim();

  return sstyled(props.styles)(
    <SView
      render={FadeInOut}
      visible={visible}
      preserveNode
      tabIndex={0}
      role="button"
      aria-hidden={!visible}
      aria-label={`${props.getI18nText('tapToEdit')}:${textContent}`}
      // ref={containerRef}
      onClick={visible ? props.onEdit : undefined}
      onKeyDown={handlekeyDown}
    />,
  ) as React.ReactElement;
};

export default createComponent(InlineEdit, {
  Edit,
  View,
});
