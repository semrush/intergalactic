import React from 'react';
import { createComponent, Component, CONTEXT_COMPONENT, sstyled, Root } from '@semcore/core';
import { Flex, Box, InvalidStateBox } from '@semcore/flex-box';
import assignProps, { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';

import style from './style/radio.shadow.css';
import logger from '@semcore/core/lib/utils/logger';
import { Text as TypographyText } from '@semcore/typography';

class RadioGroupRoot extends Component {
  static displayName = 'RadioGroup';

  static defaultProps = {
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
      <Root render={Flex} direction='column' role='group' __excludeProps={['onChange']}>
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
    // The default values are here, since you cannot rewrite out of context
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
    // The default values are here, since you cannot rewrite out of context
    const {
      size = 'm',
      state = 'normal',
      theme,
      disabled,
      name,
    } = assignProps(this.asProps, this.context);
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
  static enhance = [resolveColorEnhance()];
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
    };

    if (currentValue !== undefined) {
      const { onChange, onClick } = this.props;

      controlProps.checked = currentValue === inputValue;
      controlProps.onChange = callAllEventHandlers(onChange, this.bindHandlerChange(inputValue));
    }

    return controlProps;
  }

  getRadioMarkProps() {
    const currentValue = this.context.value;
    const {
      size,
      state,
      theme,
      keyboardFocused,
      value,
      tag,
      disabled,
      includeInputProps,
      resolveColor,
      ...other
    } = this.asProps;
    const [commonControlProps, radioMarkProps] = getInputProps(other, includeInputProps);
    const { children, Children, ...propsWithoutChildren } = radioMarkProps;
    const inputValue = value ?? '';

    const markProps = {
      theme,
      size,
      state,
      keyboardFocused,
      disabled,
      resolveColor,
      checked: commonControlProps.checked,
      ...propsWithoutChildren,
    };

    if (currentValue !== undefined) {
      const { onClick } = this.props;

      if (tag !== 'label') {
        markProps.onClick = callAllEventHandlers(onClick, this.bindHandlerChange(inputValue));
      }
    }

    return markProps;
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
  const SInvalidPattern = InvalidStateBox;
  const { theme, styles, resolveColor, state, checked } = props;

  return sstyled(styles)(
    <SValue render={Box} tag='div' use:theme={resolveColor(theme)} aria-hidden={true}>
      {state === 'invalid' && !checked && <SInvalidPattern />}
    </SValue>,
  );
};
RadioMark.displayName = 'RadioMark';

const Text = (props) => {
  const SText = Root;
  const { styles, color } = props;

  React.useEffect(() => {
    if (props.rootDisabled !== props.disabled) {
      props.hoistDisabled(props.disabled);
    }
  }, [props.rootDisabled, props.disabled, props.hoistDisabled]);
  const resolveColor = useColorResolver();

  return sstyled(styles)(
    <SText render={TypographyText} tag='span' use:color={resolveColor(color)} />,
  );
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

export const wrapRadioGroup = (wrapper) => wrapper;

export default Radio;
