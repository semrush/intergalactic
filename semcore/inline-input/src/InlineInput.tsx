import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';
import Tooltip, { ITooltipProps } from '@semcore/tooltip';
import Button from '@semcore/button';
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
  size?: 's' | 'm' | 'l' | 'xl';
  state?: 'normal' | 'valid' | 'invalid' | 'disabled';
  loading?: boolean;
  onConfirm?: (value: string) => void;
  onCancel?: (prevValue: string) => void;
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
};

class InlineInputBase extends Component<AsProps> {
  static displayName = 'InlineInput';

  static defaultProps = {
    size: 's',
    state: 'normal',
    loading: false,
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

  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.initValue = ((this.asProps.value ?? this.asProps.defaultValue) as string) || '';
  }

  getContextProps() {
    const {
      size,
      loading,
      onConfirm,
      onCancel,
      value,
      defaultValue,
      state,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      tooltipsProps = {},
    } = this.asProps;

    return {
      size,
      loading,
      onConfirm: (text: string) => {
        onConfirm?.(text);
        return false;
      },
      onCancel: (prevText: string) => {
        onCancel?.(prevText);
        return false;
      },
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
  getConfirmIconProps() {
    return this.getContextProps();
  }
  getCancelIconProps() {
    return this.getContextProps();
  }
  getControlIconsProps() {
    return this.getContextProps();
  }
  getConfirmButtonProps() {
    return this.getContextProps();
  }
  getCancelButtonProps() {
    return this.getContextProps();
  }
  getControlButtonsProps() {
    return this.getContextProps();
  }

  getValueProps() {
    const { size, autoFocus, value, inputId, defaultValue, onChange, state, loading, placeholder } =
      this.asProps;

    return {
      ref: this.inputRef,
      size,
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
          if (onBlurBehavior === 'confirm') onConfirm?.(value);
          if (onBlurBehavior === 'cancel') onCancel?.(this.initValue);
        }
      }, 0);
    }
    if (onBlur) {
      onBlur(event);
    }
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
        render={Box}
        focused={focused}
        loading={loading}
      >
        <Children />
      </SInlineInput>,
    );
  }
}

const Outline: React.FC<AsProps> = (props) => {
  const SOutline = Root;
  const { styles, children, ...restProps } = props;

  return sstyled(styles)(
    <SOutline render={Box}>{children || <InlineInput.Value {...restProps} />}</SOutline>,
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
      <>
        <SValue
          render={Box}
          tag="input"
          type="text"
          disabled={this.asProps.state === 'disabled' || this.asProps.loading}
        />
      </>,
    );
  }
}

const Addon: React.FC<AsProps> = (props) => {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />) as React.ReactElement;
};

const ConfirmIcon: React.FC<AsProps> = (props) => {
  const SConfirmIcon = Root;

  const handleConfirm = React.useCallback(() => {
    props.onConfirm?.(props.value);
  }, [props.onConfirm, props.value]);

  if (props.loading) {
    return sstyled(props.styles)(
      <SConfirmIcon render={Box} className="controls-icon">
        <Spin size="xxs" className="spin" />
      </SConfirmIcon>,
    ) as React.ReactElement;
  }

  return sstyled(props.styles)(
    <SConfirmIcon render={Box}>
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
    </SConfirmIcon>,
  ) as React.ReactElement;
};
const CancelIcon: React.FC<AsProps> = (props) => {
  const SCancelIcon = Root;
  const initValue = React.useRef(props.value ?? props.defaultValue);
  const handleCancel = React.useCallback(() => {
    if (props.loading || !props.onCancel) return;
    props.onCancel?.(initValue.current);
  }, [props.loading, props.onCancel]);

  if (props.loading) {
    return sstyled(props.styles)(
      <SCancelIcon render={Box} className="controls-icon">
        <CloseM disabled={true} onClick={handleCancel} />
      </SCancelIcon>,
    ) as React.ReactElement;
  }

  return sstyled(props.styles)(
    <SCancelIcon render={Box}>
      <Tooltip {...props.tooltipsProps}>
        <Tooltip.Trigger className="controls-icon">
          <CloseM tabIndex={0} aria-label={props.cancelText} role="button" onClick={handleCancel} />
        </Tooltip.Trigger>
        <Tooltip.Popper p={2}>{props.cancelText}</Tooltip.Popper>
      </Tooltip>
    </SCancelIcon>,
  ) as React.ReactElement;
};

const ControlIcons: React.FC<AsProps> = (props) => {
  const SControls = Root;
  return sstyled(props.styles)(
    <SControls render={Box}>
      <InlineInput.ConfirmIcon
        tooltipsProps={props.tooltipsProps}
        confirmText={props.confirmText}
        onConfirm={props.onConfirm}
      />
      <InlineInput.CancelIcon
        tooltipsProps={props.tooltipsProps}
        cancelText={props.cancelText}
        onCancel={props.onCancel}
      />
    </SControls>,
  ) as React.ReactElement;
};

const ConfirmButton: React.FC<AsProps> = (props) => {
  const SConfirmButton = Root;

  const handleConfirm = React.useCallback(() => {
    props.onConfirm?.(props.value);
  }, [props.onConfirm, props.value]);

  return sstyled(props.styles)(
    <SConfirmButton render={Box}>
      <Button
        use="primary"
        aria-label={`${props.confirmText} ${props.value ?? ''}`}
        loading={props.loading}
        disabled={props.state === 'disabled'}
        onClick={handleConfirm}
        size={props.size}
      >
        {props.confirmText}
      </Button>
    </SConfirmButton>,
  ) as React.ReactElement;
};
const CancelButton: React.FC<AsProps> = (props) => {
  const SCancelButton = Root;
  const initValue = React.useRef(props.value);
  const handleCancel = React.useCallback(() => {
    if (props.loading || !props.onCancel) return;
    props.onCancel?.(initValue.current);
  }, [props.loading, props.onCancel]);

  return sstyled(props.styles)(
    <SCancelButton render={Box}>
      <Button
        disabled={props.loading || props.state === 'disabled'}
        onClick={handleCancel}
        aria-label={props.cancelText}
        size={props.size}
      >
        {props.cancelText}
      </Button>
    </SCancelButton>,
  ) as React.ReactElement;
};
const ControlButtons: React.FC<AsProps> = (props) => {
  const SControls = Root;
  return sstyled(props.styles)(
    <SControls render={Box}>
      <InlineInput.ConfirmButton
        confirmText={props.confirmText}
        size={props.size}
        onConfirm={props.onConfirm}
      />
      <InlineInput.CancelButton
        cancelText={props.cancelText}
        size={props.size}
        onCancel={props.onCancel}
      />
    </SControls>,
  ) as React.ReactElement;
};

const DefaultChildren: React.FC<AsProps> = (props) => {
  return (
    <InlineInput.Outline>
      <InlineInput.Value {...props} />
      <InlineInput.ControlIcons />
    </InlineInput.Outline>
  ) as React.ReactElement;
};

/** `createComponent` currently exposes unrelated junk instead of typings, that the reason of to any cast  */
const InlineInput = createComponent(InlineInputBase, {
  Addon,
  Outline,
  Value,
  ConfirmIcon,
  CancelIcon,
  ControlIcons,
  ConfirmButton,
  CancelButton,
  ControlButtons,
}) as any;

export default InlineInput;
