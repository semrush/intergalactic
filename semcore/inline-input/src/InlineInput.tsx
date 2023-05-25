import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';
import Tooltip, { ITooltipProps } from '@semcore/tooltip';
import style from './style/inline-input.shadow.css';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

const isFocusOutsideOf = (element: HTMLElement) => {
  let traversed: Element | null | undefined = document.activeElement;
  for (let i = 0; i < 1000000; i++) {
    if (traversed === element) return false;
    if (traversed === document.body) return true;
    traversed = traversed?.parentElement;
  }

  throw new Error(
    'Failed to traverse parents chain in utilite `isFocusOutsideOf` in reasonable count of iterations. Possibly Shadow DOM or come other uncommon DOM-way is used, that is not supported by utilite yet. If you are not doing weird things or that is reasonable, contact developers team for yours case support.',
  );
};

type OnConfirm = (
  value: string,
  event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
) => void;
type OnCancel = (
  prevValue: string,
  event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
) => void;
type RootAsProps = {
  state?: 'normal' | 'valid' | 'invalid';
  loading?: boolean;
  disabled?: boolean;
  onConfirm?: OnConfirm;
  onCancel?: OnCancel;
  value?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlurBehavior?: 'cancel' | 'confirm';
  styles?: React.CSSProperties;
  Children: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

type AddonAsProps = {
  styles?: React.CSSProperties;
  Children: React.FC;
};

type ControlAsProps = {
  Children: React.FC;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  title?: string;
  $tooltipsProps?: ITooltipProps;
  loading?: boolean;
  disabled?: boolean;
  onCancel?: OnCancel;
  value?: string;
  icon?: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};
type ConfirmControlAsProps = ControlAsProps & {
  onConfirm?: OnConfirm;
};
type CancelControlAsProps = ControlAsProps & {
  onCancel?: OnCancel;
};

class InlineInputBase extends Component<RootAsProps> {
  static displayName = 'InlineInput';

  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    state: 'normal',
    onBlurBehavior: 'confirm',
    i18n: localizedMessages,
    locale: 'en',
  };
  static style = style;

  state = {
    focused: false,
  };

  rootRef = React.createRef<HTMLElement>();
  inputRef = React.createRef<HTMLInputElement>();
  initValue: string = '';

  componentDidMount() {
    this.initValue = this.inputRef.current?.value || '';
  }

  getAddonProps() {
    return {
      onMouseDown: this.handleMouseDownAddon,
    };
  }

  getConfirmControlProps() {
    const { loading, getI18nText } = this.asProps;
    return {
      value: this.inputRef.current?.value,
      loading,
      onConfirm: this.handleConfirm,
      getI18nText,
    };
  }

  getCancelControlProps() {
    const { loading, disabled, getI18nText } = this.asProps;
    return {
      value: this.initValue,
      // because double disabled(root disabled and addon disabled)
      disabled: loading && !disabled,
      onCancel: this.handleCancel,
      getI18nText,
    };
  }

  getValueProps() {
    const { state } = this.asProps;
    return {
      ref: this.inputRef,
      state,
      onKeyDown: this.handleKeyDown,
      onFocus: this.bindHandlerValueFocused(true),
      onBlur: this.bindHandlerValueFocused(false),
    };
  }

  bindHandlerValueFocused = (focused: boolean) => () => {
    this.setState({ focused });
  };

  handleMouseDownAddon = (event: React.MouseEvent) => {
    event.preventDefault();
    this.inputRef.current?.focus();
  };

  lastResultHandle = -1;
  handleConfirm = (
    text: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    this.lastResultHandle = Date.now()
    this.asProps.onConfirm?.(text, event);
  };
  handleCancel = (
    prevText: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    this.lastResultHandle = Date.now()
    this.asProps.onCancel?.(prevText, event);
  };

  handleBlur = (event: React.FocusEvent) => {
    const { onConfirm, onCancel, onBlurBehavior } = this.asProps;
    if (onBlurBehavior && Date.now() - this.lastResultHandle > 10) {
      this.lastResultHandle = Date.now()
      setTimeout(() => {
        if (this.rootRef.current && isFocusOutsideOf(this.rootRef.current)) {
          if (onBlurBehavior === 'confirm') onConfirm?.(this.inputRef.current?.value ?? '', event);
          if (onBlurBehavior === 'cancel') onCancel?.(this.initValue, event);
        }
      }, 0);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { onConfirm, onCancel } = this.asProps;
    if (event.code === 'Enter') {
      this.lastResultHandle = Date.now();
      onConfirm?.(this.inputRef.current?.value ?? '', event);
    }
    if (event.code === 'Escape') {
      this.lastResultHandle = Date.now();
      onCancel?.(this.initValue, event);
    }
  };

  render() {
    const SInlineInput = Root;
    const SUnderline = 'div';
    const { Children, styles, getI18nText } = this.asProps;
    const { focused } = this.state;

    return sstyled(styles)(
      <SInlineInput
        render={Box}
        ref={this.rootRef}
        focused={focused}
        onBlur={this.handleBlur}
        aria-label={getI18nText('keyboardHint')}
      >
        <SUnderline>
          <Children />
        </SUnderline>
      </SInlineInput>,
    );
  }
}

class Value extends Component<RootAsProps> {
  static defaultProps = {
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance()];
  static hoistProps = ['disabled'];

  uncontrolledProps() {
    return {
      value: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value,
    };
  }

  render() {
    const SValue = Root;

    return sstyled(this.asProps.styles)(<SValue render={Box} tag="input" type="text" />);
  }
}

const Addon: React.FC<AddonAsProps> = (props) => {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />) as React.ReactElement;
};

const ConfirmControl: React.FC<ConfirmControlAsProps> = (props) => {
  const SAddon = Root;
  const { Children, children: hasChildren } = props;
  const title = props.title ?? props.getI18nText('confirm');

  const handleConfirm = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onConfirm?.(props.value ?? '', event);
    },
    [props.onConfirm, props.value],
  );

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        handleConfirm(event);
      }
    },
    [handleConfirm],
  );

  if (props.loading) {
    return sstyled(props.styles)(
      <SAddon render={Box}>{hasChildren ? <Children /> : <Spin size="xs" />}</SAddon>,
    ) as React.ReactElement;
  }

  const sstyles = sstyled(props.styles);
  const sConfirmIconStyles = sstyles.cn('SConfirmIcon', {});

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.$tooltipsProps}>
          <Tooltip.Trigger
            tag={props.icon ?? CheckM}
            aria-hidden="true"
            role="button"
            onClick={handleConfirm}
            className={sConfirmIconStyles.className}
            style={sConfirmIconStyles.style}
          />
          <Tooltip.Popper p={3}>{title}</Tooltip.Popper>
        </Tooltip>
      )}
    </SAddon>,
  ) as React.ReactElement;
};
const CancelControl: React.FC<CancelControlAsProps> = (props) => {
  const SAddon = Root;
  const { Children, children: hasChildren } = props;
  const title = props.title ?? props.getI18nText('discard');

  const handleCancel = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onCancel?.(props.value ?? '', event);
    },
    [props.onCancel, props.value],
  );

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        handleCancel(event);
      }
    },
    [handleCancel],
  );

  if (props.disabled) {
    return sstyled(props.styles)(
      <SAddon render={Box}>{hasChildren ? <Children /> : <CloseM disabled />}</SAddon>,
    ) as React.ReactElement;
  }

  const sstyles = sstyled(props.styles);
  const sCancelIconStyles = sstyles.cn('SCancelIcon', {});

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.$tooltipsProps}>
          <Tooltip.Trigger
            tag={props.icon ?? CloseM}
            aria-hidden="true"
            role="button"
            onClick={handleCancel}
            className={sCancelIconStyles.className}
            style={sCancelIconStyles.style}
          />
          <Tooltip.Popper p={3}>{title}</Tooltip.Popper>
        </Tooltip>
      )}
    </SAddon>,
  ) as React.ReactElement;
};

/** `createComponent` currently exposes unrelated junk instead of typings, that the reason of to any cast  */
const InlineInput = createComponent(InlineInputBase, {
  Addon,
  Value,
  ConfirmControl,
  CancelControl,
}) as any;

export default InlineInput;
