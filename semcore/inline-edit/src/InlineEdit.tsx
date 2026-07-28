import { FadeInOut, Box } from '@semcore/base-components';
import {
  createComponent,
  Component,
  sstyled,
  Root,
  type Intergalactic,
} from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import reactToText from '@semcore/core/lib/utils/reactToText';
import { useCssVariable } from '@semcore/core/lib/utils/useCssVariable';
import React from 'react';

import type { NSInlineEdit } from './InlineEdit.type';
import style from './style/inline-edit.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class InlineEdit extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSInlineEdit.Component>,
  typeof InlineEdit.enhance,
  NSInlineEdit.Handlers,
  WithI18nEnhanceProps,
  {},
  NSInlineEdit.DefaultProps
> {
  static displayName = 'InlineEdit';

  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];

  static defaultProps = {
    defaultEditable: false,
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  viewRef = React.createRef<HTMLElement>();

  constructor(props: any) {
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
      getI18nText,
      ref: this.viewRef,
    };
  }

  getEditProps() {
    const { editable } = this.asProps;

    return {
      editable,
      onKeyDown: this.handlerKeyDownEdit,
    };
  }

  handlerKeyDownEdit = (event: React.KeyboardEvent) => {
    if (this.viewRef.current && (event.key === 'Enter' || event.key === 'Escape')) {
      event.preventDefault();
      this.viewRef.current?.focus();
    }
  };

  handleOnEdit() {
    this.handlers.editable(true);
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
    const { editable } = this.props;
    if (prevProps.editable !== editable && editable === false) {
      setTimeout(() => {
        this.viewRef.current?.focus();
      }, 0);
    }
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

const useHidden = (visible: boolean) => {
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    if (visible) {
      setHidden(false);
    } else {
      setTimeout(() => {
        setHidden(true);
      }, 200);
    }
  }, [visible]);

  return hidden;
};

function Edit(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineEdit.Edit.Component, typeof InlineEdit, 'Edit'>,
) {
  const visible = props.editable;
  const SEdit = Root;
  const ref = React.useRef();
  const durationStr = useCssVariable('--intergalactic-duration-control', '200', ref);
  const duration = React.useMemo(() => Number.parseInt(durationStr, 10), [durationStr]);
  const hidden = useHidden(Boolean(visible));

  return sstyled(props.styles)(
    <SEdit
      render={FadeInOut}
      visible={visible}
      duration={duration}
      aria-hidden={hidden ? 'true' : undefined}
      exiting={!visible}
      ref={ref}
    />,
  ) as React.ReactElement;
}

function View(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineEdit.View.Component, typeof InlineEdit, 'View'>,
) {
  const visible = !props.editable;
  const SView = Root;

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!visible) return;
      if (props.onEdit && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        props.onEdit();
      }
    },
    [visible, props.onEdit],
  );
  const textContent = reactToText(getOriginChildren(props.Children)).trim();
  const hidden = useHidden(Boolean(visible));

  return sstyled(props.styles)(
    <SView
      render={FadeInOut}
      visible={visible}
      preserveNode
      tabIndex={0}
      role='button'
      aria-hidden={hidden ? 'true' : undefined}
      aria-label={`${props.getI18nText?.('tapToEdit')}: ${textContent}`}
      onClick={visible ? props.onEdit : undefined}
      onKeyDown={handleKeyDown}
    />,
  ) as React.ReactElement;
}

/**
 * InlineEdit
 *
 * {@link https://developer.semrush.com/intergalactic/components/inline-edit/inline-edit-api/|API} | {@link https://developer.semrush.com/intergalactic/components/inline-edit/inline-edit-code/|Examples}
 */
export default createComponent<
  NSInlineEdit.Component,
  typeof InlineEdit
>(InlineEdit, {
  Edit,
  View,
});
