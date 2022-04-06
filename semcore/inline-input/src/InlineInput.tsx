import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';
import Tooltip, { ITooltipProps } from '@semcore/tooltip';
import style from './style/inline-input.shadow.css';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';

const isFocusOutsideOf = (element: HTMLElement) => {
  let traversed = document.activeElement;
  for (let i = 0; i < 1000000; i++) {
    if (traversed === element) return false;
    if (traversed === document.body) return true;
    traversed = traversed.parentElement;
  }

  throw new Error(
    'Failed to traverse parents chain in utilite `isFocusOutsideOf` reasonable count of iterations. Possibly Shadow DOM or come other uncommon DOM-way is used, that is not supported by utilite yet. If you are not doing weird things or that is reasonable, contact developers team for yours case support.',
  );
};

type AsProps = {
  state?: 'normal' | 'valid' | 'invalid';
  loading?: boolean;
  disabled?: boolean;
  onConfirm?: (
    value: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => void;
  onCancel?: (
    prevValue: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => void;
  value?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  $tooltipsProps?: ITooltipProps;
  title?: string;
  autoFocus?: boolean;
  placeholder?: string;
  inputId?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlurBehavior?: 'cancel' | 'confirm';
  styles?: React.CSSProperties;
  Children: React.FC;
};

class InlineInputBase extends Component<AsProps> {
  static displayName = 'InlineInput';

  static defaultProps = {
    state: 'normal',
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
    const { value, loading } = this.asProps;
    return {
      value,
      loading,
      onConfirm: this.handleConfirm,
    };
  }

  getCancelControlProps() {
    const { loading } = this.asProps;
    return {
      value: this.initValue,
      loading,
      onCancel: this.handleCancel,
    };
  }

  getValueProps() {
    const { state, loading } = this.asProps;
    return {
      ref: this.inputRef,
      state,
      disabled: loading,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };
  }

  handleMouseDownAddon = (e) => {
    e.preventDefault();
    this.inputRef.current?.focus();
  };

  handleConfirm = (
    text: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    this.asProps.onConfirm?.(text, event);
  };
  handleCancel = (
    prevText: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    this.asProps.onCancel?.(prevText, event);
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = (event: React.FocusEvent) => {
    const { onConfirm, onCancel, onBlurBehavior, value } = this.asProps;
    this.setState({ focused: false });
    if (onBlurBehavior) {
      setTimeout(() => {
        if (isFocusOutsideOf(this.rootRef.current)) {
          if (onBlurBehavior === 'confirm') onConfirm?.(value, event);
          if (onBlurBehavior === 'cancel') onCancel?.(this.initValue, event);
        }
      }, 0);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { onConfirm, onCancel, value } = this.asProps;
    if (event.code === 'Enter') onConfirm?.(value, event);
    if (event.code === 'Escape') onCancel?.(this.initValue, event);
  };

  render() {
    const SInlineInput = Root;
    const SUnderline = 'div';
    const { Children, styles } = this.asProps;
    const { focused } = this.state;

    return sstyled(styles)(
      <SInlineInput render={Box} ref={this.rootRef} focused={focused}>
        <SUnderline>
          <Children />
        </SUnderline>
      </SInlineInput>,
    );
  }
}

class Value extends Component<AsProps> {
  static defaultProps = {
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance()];

  uncontrolledProps() {
    return {
      value: (event) => event.target.value,
    };
  }

  render() {
    const SValue = Root;

    return sstyled(this.asProps.styles)(<SValue render={Box} tag="input" type="text" />);
  }
}

const Addon: React.FC<AsProps> = (props) => {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />) as React.ReactElement;
};

const ConfirmControl: React.FC<AsProps> = (props) => {
  const SAddon = Root;
  const { Children, children: hasChildren, title } = props;

  const handleConfirm = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onConfirm?.(props.value, event);
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
      <SAddon render={Box}>{hasChildren ? <Children /> : <Spin size="xxs" />}</SAddon>,
    ) as React.ReactElement;
  }

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.$tooltipsProps}>
          <Tooltip.Trigger
            tag={CheckM}
            aria-label={`${title} ${props.value ?? ''}`}
            role="button"
            interactive
            color="green-300"
            onClick={handleConfirm}
          />
          <Tooltip.Popper p={2}>{props.title}</Tooltip.Popper>
        </Tooltip>
      )}
    </SAddon>,
  ) as React.ReactElement;
};
ConfirmControl.defaultProps = {
  title: 'Confirm',
};
const CancelControl: React.FC<AsProps> = (props) => {
  const SAddon = Root;
  const SCloseM = CloseM;
  const { Children, children: hasChildren, title } = props;

  const handleCancel = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onCancel?.(props.value, event);
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

  if (props.loading) {
    return sstyled(props.styles)(
      <SAddon render={Box}>{hasChildren ? <Children /> : <SCloseM disabled />}</SAddon>,
    ) as React.ReactElement;
  }

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.$tooltipsProps}>
          <Tooltip.Trigger
            tag={SCloseM}
            aria-label={title}
            role="button"
            interactive
            color="gray-300"
            onClick={handleCancel}
          />
          <Tooltip.Popper p={2}>{title}</Tooltip.Popper>
        </Tooltip>
      )}
    </SAddon>,
  ) as React.ReactElement;
};
CancelControl.defaultProps = {
  title: 'Cancel',
};

/** `createComponent` currently exposes unrelated junk instead of typings, that the reason of to any cast  */
const InlineInput = createComponent(InlineInputBase, {
  Addon,
  Value,
  ConfirmControl,
  CancelControl,
}) as any;

export default InlineInput;
