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
  state?: 'normal' | 'valid' | 'invalid' | 'disabled';
  loading?: boolean;
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
  tooltipsProps?: ITooltipProps;
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
    loading: false,
    defaultValue: '',
    __excludeProps: [
      'defaultValue',
      'placeholder',
      'tooltipsProps',
      'confirmText',
      'cancelText',
      'autoFocus',
      'inputId',
    ],
  };
  static style = style;

  state = {
    focused: false,
  };

  rootRef = React.createRef<HTMLElement>();
  inputRef = React.createRef();
  initValue: string = '';

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.initValue = ((this.asProps.value ?? this.asProps.defaultValue) as string) || '';
  }

  getContextProps() {
    const {
      loading,
      value,
      defaultValue,
      state,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      tooltipsProps = {},
    } = this.asProps;

    return {
      loading,
      onConfirm: this.handleConfirm,
      onCancel: this.handleCancel,
      value,
      defaultValue,
      state,
      confirmText,
      cancelText,
      tooltipsProps,
    };
  }

  geAddonProps() {
    return this.getContextProps();
  }
  getConfirmControlProps() {
    return this.getContextProps();
  }
  getCancelControlProps() {
    return this.getContextProps();
  }
  getControlsProps() {
    return this.getContextProps();
  }

  getValueProps() {
    const { autoFocus, value, inputId, defaultValue, onChange, state, loading, placeholder } =
      this.asProps;

    return {
      ref: this.inputRef,
      autoFocus,
      value,
      defaultValue,
      onChange,
      state,
      loading,
      placeholder,
      id: inputId,
    };
  }

  handleConfirm(text: string, event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent) {
    const { onConfirm } = this.asProps;
    onConfirm?.(text, event);
    return false;
  }
  handleCancel(prevText: string, event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent) {
    const { onCancel } = this.asProps;
    onCancel?.(prevText, event);
    return false;
  }

  handleFocus(event: React.FocusEvent) {
    const { onFocus } = this.asProps;
    this.setState({ focused: true });
    if (onFocus) {
      onFocus(event);
    }
  }
  handleBlur(event: React.FocusEvent) {
    const { onConfirm, onCancel, onBlur, onBlurBehavior, value } = this.asProps;
    this.setState({ focused: false });
    if (onBlurBehavior) {
      setTimeout(() => {
        if (isFocusOutsideOf(this.rootRef.current)) {
          if (onBlurBehavior === 'confirm') onConfirm?.(value, event);
          if (onBlurBehavior === 'cancel') onCancel?.(this.initValue, event);
        }
      }, 0);
    }
    if (onBlur) {
      onBlur(event);
    }
  }
  handleKeyDown(event: React.KeyboardEvent) {
    const { onConfirm, onCancel, value } = this.asProps;
    if (event.code === 'Enter') onConfirm?.(value, event);
    if (event.code === 'Escape') onCancel?.(this.initValue, event);
  }

  render() {
    const SInlineInput = Root;
    const { Children: providedChildren, children: hasChildren, styles, loading } = this.asProps;
    const Children = hasChildren ? providedChildren : DefaultChildren;
    const { focused } = this.state;

    return sstyled(styles)(
      <SInlineInput
        ref={this.rootRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        render={Box}
        focused={focused}
        loading={loading}
      >
        <Children />
      </SInlineInput>,
    );
  }
}

const Underline: React.FC<AsProps> = (props) => {
  const SUnderline = Root;
  const { styles, children, ...restProps } = props;

  return sstyled(styles)(
    <SUnderline render={Box}>{children || <InlineInput.Value {...restProps} />}</SUnderline>,
  ) as React.ReactElement;
};

class Value extends Component<AsProps> {
  static defaultProps = {
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance()];

  uncontrolledProps() {
    return {
      value: (event) => {
        event.stopPropagation();
        return event.target.value;
      },
    };
  }

  render() {
    const SValue = Root;

    return sstyled(this.asProps.styles)(
      <SValue
        render={Box}
        tag="input"
        type="text"
        disabled={this.asProps.state === 'disabled' || this.asProps.loading}
      />,
    );
  }
}

const Addon: React.FC<AsProps> = (props) => {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />) as React.ReactElement;
};

const ConfirmControl: React.FC<AsProps> = (props) => {
  const SConfirmControl = Root;
  const { Children, children: hasChildren } = props;

  const handleConfirm = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onConfirm?.(props.value, event);
    },
    [props.onConfirm, props.value],
  );
  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (props.loading) return;
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        handleConfirm(event);
      }
    },
    [props.loading, handleConfirm],
  );

  if (props.loading) {
    return sstyled(props.styles)(
      <SConfirmControl render={Box} className="controls-icon">
        {hasChildren ? <Children /> : <Spin size="xxs" className="spin" />}
      </SConfirmControl>,
    ) as React.ReactElement;
  }

  return sstyled(props.styles)(
    <SConfirmControl render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.tooltipsProps}>
          <Tooltip.Trigger className="controls-icon">
            <CheckM
              tabIndex={0}
              aria-label={`${props.confirmText} ${props.value ?? ''}`}
              role="button"
              onClick={handleConfirm}
            />
          </Tooltip.Trigger>
          <Tooltip.Popper p={2}>{props.confirmText}</Tooltip.Popper>
        </Tooltip>
      )}
    </SConfirmControl>,
  ) as React.ReactElement;
};
const CancelControl: React.FC<AsProps> = (props) => {
  const SCancelControl = Root;
  const { Children, children: hasChildren } = props;
  const initValue = React.useRef(props.value ?? props.defaultValue);
  const handleCancel = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      if (props.loading || !props.onCancel) return;
      props.onCancel?.(initValue.current, event);
    },
    [props.loading, props.onCancel],
  );
  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (props.loading) return;
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        handleCancel(event);
      }
    },
    [props.loading, handleCancel],
  );

  if (props.loading) {
    return sstyled(props.styles)(
      <SCancelControl render={Box} className="controls-icon">
        {hasChildren ? <Children /> : <CloseM disabled={true} />}
      </SCancelControl>,
    ) as React.ReactElement;
  }

  return sstyled(props.styles)(
    <SCancelControl render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.tooltipsProps}>
          <Tooltip.Trigger className="controls-icon">
            <CloseM
              tabIndex={0}
              aria-label={props.cancelText}
              role="button"
              onClick={handleCancel}
            />
          </Tooltip.Trigger>
          <Tooltip.Popper p={2}>{props.cancelText}</Tooltip.Popper>
        </Tooltip>
      )}
    </SCancelControl>,
  ) as React.ReactElement;
};

const Controls: React.FC<AsProps> = (props) => {
  const SControls = Root;
  return sstyled(props.styles)(
    <SControls render={Box}>
      <InlineInput.ConfirmControl
        tooltipsProps={props.tooltipsProps}
        confirmText={props.confirmText}
        onConfirm={props.onConfirm}
      />
      <InlineInput.CancelControl
        tooltipsProps={props.tooltipsProps}
        cancelText={props.cancelText}
        onCancel={props.onCancel}
      />
    </SControls>,
  ) as React.ReactElement;
};

const DefaultChildren: React.FC<AsProps> = (props) => {
  return (
    <InlineInput.Underline>
      <InlineInput.Value {...props} />
      <InlineInput.Controls />
    </InlineInput.Underline>
  ) as React.ReactElement;
};

/** `createComponent` currently exposes unrelated junk instead of typings, that the reason of to any cast  */
const InlineInput = createComponent(InlineInputBase, {
  Addon,
  Underline,
  Value,
  ConfirmControl,
  CancelControl,
  Controls,
}) as any;

export default InlineInput;
