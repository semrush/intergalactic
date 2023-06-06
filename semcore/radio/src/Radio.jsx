import React from 'react';
import createComponent, { Component, CONTEXT_COMPONENT, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import assignProps from '@semcore/utils/lib/assignProps';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import resolveColor from '@semcore/utils/lib/color';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';

import style from './style/radio.shadow.css';

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
    const { Children, tag: Tag } = this.asProps;

    if (Tag)
      return (
        <Root render={Tag} role="radiogroup">
          <Children />
        </Root>
      );

    return <Children />;
  }
}

const RadioGroup = createComponent(RadioGroupRoot);

class Radio extends Component {
  static displayName = 'Radio';
  static style = style;
  static contextType = RadioGroup[CONTEXT_COMPONENT];

  bindHandlerChange = (value) => (checked, e) => {
    this.context.onChange(value, e);
  };

  getValueProps(props) {
    // The default values are here, since you cannot rewrite out of context
    const {
      state = 'normal',
      size = 'm',
      theme,
      name,
      disabled,
    } = assignProps(this.props, this.context);
    const { value } = this.context;
    const other = {};
    // if used with the context
    if (value !== undefined) {
      other['checked'] = value === props.value;
      other['onChange'] = this.bindHandlerChange(props.value);
    }
    return {
      ...other,
      state,
      size,
      theme,
      name,
      disabled,
    };
  }

  getTextProps() {
    // The default values are here, since you cannot rewrite out of context
    const { size = 'm' } = assignProps(this.props, this.context);
    return {
      size: size,
    };
  }

  render() {
    const SRadio = Root;
    const { styles, Children } = this.asProps;

    return sstyled(styles)(
      <SRadio render={Box} tag="label">
        <Children />
      </SRadio>,
    );
  }
}

class Value extends Component {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };
  static enhance = [keyboardFocusEnhance()];
  static hoistProps = ['disabled'];

  uncontrolledProps() {
    return {
      checked: (e) => e.target.checked,
    };
  }

  render() {
    const SValue = Box;
    const SControl = Box;
    const { forwardRef, styles, includeInputProps, theme } = this.asProps;

    const [controlProps, boxProps] = getInputProps(this.asProps, includeInputProps);

    return sstyled(styles)(
      <>
        <SControl tag="input" type="radio" {...controlProps} />
        <SValue ref={forwardRef} use:theme={resolveColor(theme)} {...boxProps} />
      </>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} />);
}

export { inputProps, RadioGroup };
export default createComponent(Radio, {
  Value,
  Text,
});
