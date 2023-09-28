import React from 'react';
import createComponent, { Component, CONTEXT_COMPONENT, sstyled, Root } from '@semcore/core';
import { Flex, Box } from '@semcore/flex-box';
import assignProps, { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import resolveColor from '@semcore/utils/lib/color';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';

import style from './style/radio.shadow.css';
import logger from '@semcore/utils/lib/logger';
import { Text as TypographyText } from '@semcore/typography';

class RadioGroupRoot extends Component {
  static displayName = 'RadioGroup';

  static defaultProps = {
    state: 'normal',
    size: 'm',
    defaultValue: null,
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  setContext() {
    const { theme, size, name, value, onChange, disabled } = this.asProps;

    return {
      onChange,
      value,
      theme,
      size,
      name,
      disabled,
    };
  }

  render() {
    const { Children } = this.asProps;

    return (
      <Root render={Flex} direction='column' role='radiogroup' __excludeProps={['onChange']}>
        <Children />
      </Root>
    );
  }
}

const RadioGroup = createComponent(RadioGroupRoot);

class RadioRoot extends Component {
  static displayName = 'Radio';
  static style = style;
  static contextType = RadioGroup[CONTEXT_COMPONENT];

  state = {
    hoistedDisabled: undefined,
  };

  hoistDisabled = (disabled) => {
    logger.warn(
      true,
      `Don't set disabled on Radio.Value or Radio.Text, set it on Radio or on RadioGroup (for all items) instead. Otherwise it will produce wrong SSR output.`,
      this.asProps['data-ui-name'],
    );
    this.setState({ hoistedDisabled: disabled });
  };

  getTextProps() {
    const { size = 'm', disabled, label } = assignProps(this.asProps, this.context);
    const { hoistedDisabled } = this.state;

    const textProps = {
      size,
      children: label,
      disabled: disabled ?? hoistedDisabled,
      hoistDisabled: this.hoistDisabled,
      rootDisabled: this.props.disabled,
    };

    return textProps;
  }

  getValueProps() {
    const {
      size = 'm',
      state = 'normal',
      theme,
      disabled,
      name,
    } = assignProps(this.context, this.asProps);
    const { value, checked } = this.asProps;
    const { hoistedDisabled } = this.state;

    return {
      size: this.props.size ?? size,
      disabled: disabled ?? hoistedDisabled,
      state: state,
      theme,
      value,
      checked,
      name,
      hoistDisabled: this.hoistDisabled,
      rootDisabled: this.props.disabled,
    };
  }

  render() {
    const SRadio = Root;
    const { styles, Children, children: hasChildren } = this.asProps;

    return sstyled(styles)(
      <SRadio render={Box} tag='label' __excludeProps={['onChange', 'label', 'disabled']}>
        {hasChildren ? (
          <Children />
        ) : (
          <>
            <Radio.Value />
            <Radio.Text />
          </>
        )}
      </SRadio>,
    );
  }
}

class ValueRoot extends Component {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };
  static enhance = [keyboardFocusEnhance()];
  static displayName = 'Value';
  static contextType = RadioGroup[CONTEXT_COMPONENT];
  static style = style;

  bindHandlerChange = (value) => (e) => {
    if (typeof this.context.onChange === 'function') {
      this.context.onChange(value, e);
    }
  };

  uncontrolledProps() {
    return {
      checked: (e) => e.target.checked,
    };
  }

  getControlProps() {
    const currentValue = this.context.value;
    const { forwardRef, includeInputProps, state, value } = this.asProps;
    const [commonControlProps] = getInputProps(this.asProps, includeInputProps);
    const inputValue = value ?? '';

    const controlProps = {
      ref: forwardRef,
      state,
      ...commonControlProps,
      value: inputValue,
      checked: this.props.checked ?? currentValue === inputValue,
      onChange: callAllEventHandlers((...args) => {
        // must write like that, because onChange could return `false` and `this.bindHandlerChange` will never called
        commonControlProps.onChange(...args);
      }, this.bindHandlerChange(inputValue)),
    };

    if (this.asProps.tag !== 'label') {
      controlProps.onClick = this.bindHandlerChange(inputValue);
    }

    return controlProps;
  }

  getRadioMarkProps() {
    const { size, state, theme, keyboardFocused, checked, disabled, includeInputProps, ...other } =
      this.asProps;
    const [, radioMarkProps] = getInputProps(other, includeInputProps);
    const { children, Children, ...propsWithoutChildren } = radioMarkProps;

    return {
      theme,
      size,
      state,
      keyboardFocused,
      checked,
      disabled,
      ...propsWithoutChildren,
    };
  }

  componentDidUpdate() {
    if (this.asProps.rootDisabled !== this.asProps.disabled) {
      this.asProps.hoistDisabled(this.asProps.disabled);
    }
  }
  componentDidMount() {
    if (this.asProps.rootDisabled !== this.asProps.disabled) {
      this.asProps.hoistDisabled(this.asProps.disabled);
    }
  }

  render() {
    const { styles, children: hasChildren, Children } = this.asProps;

    if (!hasChildren) {
      return sstyled(styles)(
        <>
          <Radio.Value.Control />
          <Radio.Value.RadioMark />
        </>,
      );
    }

    return sstyled(styles)(<Children />);
  }
}

const Control = (props) => {
  const SControl = Root;
  const { styles, state } = props;

  return sstyled(styles)(
    <SControl render={Box} tag='input' type='radio' aria-invalid={state === 'invalid'} />,
  );
};
Control.displayName = 'Control';

const RadioMark = (props) => {
  const SValue = Root;
  const { theme, styles } = props;

  return sstyled(styles)(<SValue render={Box} tag='div' use:theme={resolveColor(theme)} />);
};
RadioMark.displayName = 'RadioMark';

const Text = (props) => {
  const SText = Root;
  const { styles } = props;

  React.useEffect(() => {
    if (props.rootDisabled !== props.disabled) {
      props.hoistDisabled(props.disabled);
    }
  }, [props.rootDisabled, props.disabled, props.hoistDisabled]);

  return sstyled(styles)(<SText render={TypographyText} tag='span' />);
};
Text.displayName = 'Text';

export { inputProps, RadioGroup };

const Value = createComponent(ValueRoot, {
  Control,
  RadioMark,
});

const Radio = createComponent(RadioRoot, {
  Text,
  Value,
});

export default Radio;
