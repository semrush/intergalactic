import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import { Text as TypographyText } from '@semcore/typography';
import resolveColor from '@semcore/utils/lib/color';
import { forkRef } from '@semcore/utils/lib/ref';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import autoFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';

import style from './style/checkbox.shadow.css';

class Checkbox extends Component {
  static displayName = 'Checkbox';
  static style = style;

  static defaultProps = {
    size: 'm',
    state: 'normal',
  };

  getTextProps() {
    const { size, disabled } = this.asProps;
    return {
      size,
      disabled,
    };
  }

  getValueProps() {
    const { size, state, theme } = this.asProps;
    return {
      size,
      state,
      theme,
    };
  }

  render() {
    const SLabel = Root;
    const { Children, styles } = this.asProps;
    return sstyled(styles)(
      <SLabel render={Box} tag="label">
        <Children />
      </SLabel>,
    );
  }
}

class Value extends Component {
  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };
  static enhance = [autoFocusEnhance()];
  static hoistProps = ['disabled'];

  uncontrolledProps() {
    return {
      checked: (e) => e.target.checked,
    };
  }

  inputRef = (node) => {
    if (!node) return;
    node.indeterminate = Boolean(this.asProps.indeterminate);
  };

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const { forwardRef, styles, size, state, theme, keyboardFocused, includeInputProps, ...other } =
      this.asProps;

    const SControl = Box;
    const SCheckbox = Flex;
    const [controlProps, boxProps] = getInputProps(other, includeInputProps);

    return sstyled(styles)(
      <>
        <SControl
          tag="input"
          type="checkbox"
          ref={forkRef(forwardRef, this.inputRef)}
          {...controlProps}
          onClick={callAllEventHandlers(controlProps.onClick, this.handleClick)}
        />
        <SCheckbox
          tag="span"
          use:theme={resolveColor(theme)}
          size={size}
          state={state}
          keyboardFocused={keyboardFocused}
          {...boxProps}
        />
      </>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={TypographyText} tag="span" />);
}

export { inputProps };

export default createComponent(Checkbox, {
  Text,
  Value,
});
