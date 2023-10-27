import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import { Text as TypographyText } from '@semcore/typography';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import autoFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';
import logger from '@semcore/utils/lib/logger';

import style from './style/checkbox.shadow.css';

class CheckboxRoot extends Component {
  static displayName = 'Checkbox';
  static style = style;

  static defaultProps = {
    size: 'm',
    state: 'normal',
    defaultChecked: false,
  };
  state = {
    hoistedDisabled: undefined,
  };

  hoistDisabled = (disabled) => {
    logger.warn(
      true,
      `Don't set disabled on Checkbox.Value or Checkbox.Text, set it on Checkbox instead. Otherwise it will produce wrong SSR output.`,
      this.asProps['data-ui-name'],
    );
    this.setState({ hoistedDisabled: disabled });
  };

  getTextProps() {
    const { size, disabled, label } = this.asProps;
    const { hoistedDisabled } = this.state;
    return {
      size,
      disabled: disabled ?? hoistedDisabled,
      children: label,
      hoistDisabled: this.hoistDisabled,
      rootDisabled: this.props.disabled,
    };
  }

  getValueProps() {
    const { size, state, theme, onChange, defaultChecked, checked, disabled, indeterminate } =
      this.asProps;
    const { hoistedDisabled } = this.state;

    return {
      size,
      disabled: disabled ?? hoistedDisabled,
      state,
      theme,
      onChange,
      checked,
      defaultChecked,
      indeterminate,
      hoistDisabled: this.hoistDisabled,
      rootDisabled: this.props.disabled,
    };
  }

  render() {
    const SLabel = Root;
    const { Children, children: hasChildren, styles } = this.asProps;
    return sstyled(styles)(
      <SLabel
        render={Box}
        tag='label'
        __excludeProps={['onChange', 'indeterminate', 'checked', 'checkedDefault', 'label']}
      >
        {hasChildren ? (
          <Children />
        ) : (
          <>
            <Checkbox.Value />
            <Checkbox.Text />
          </>
        )}
      </SLabel>,
    );
  }
}

class ValueRoot extends Component {
  static defaultProps = {
    includeInputProps: inputProps,
  };
  static enhance = [autoFocusEnhance(), resolveColorEnhance()];
  static displayName = 'Value';
  static style = style;

  handleClick(e) {
    // idk for what it exists, leaving just in case it saves us from some bugs
    e.stopPropagation();
  }

  uncontrolledProps() {
    return {
      checked: (e) => e.target.checked,
    };
  }

  getControlProps() {
    const { forwardRef, includeInputProps, indeterminate, state } = this.asProps;
    const [controlProps] = getInputProps(this.asProps, includeInputProps);

    return {
      indeterminate,
      ref: forwardRef,
      state,
      ...controlProps,
      onClick: callAllEventHandlers(controlProps.onClick, this.handleClick),
    };
  }

  getCheckMarkProps() {
    const {
      size,
      state,
      theme,
      keyboardFocused,
      checked,
      includeInputProps,
      resolveColor,
      ...other
    } = this.asProps;
    const [, checkMarkProps] = getInputProps(other, includeInputProps);
    const { children, Children, ...propsWithoutChildren } = checkMarkProps;
    return {
      theme,
      size,
      state,
      keyboardFocused,
      checked,
      resolveColor,
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
          <Checkbox.Value.Control />
          <Checkbox.Value.CheckMark />
        </>,
      );
    }

    return sstyled(styles)(<Children />);
  }
}

const Control = (props) => {
  const SControl = Root;
  const { indeterminate, styles, state } = props;
  return sstyled(styles)(
    <SControl
      render={Box}
      tag='input'
      type='checkbox'
      aria-checked={indeterminate ? 'mixed' : undefined}
      aria-invalid={state === 'invalid'}
    />,
  );
};
Control.displayName = 'Control';

const CheckMark = (props) => {
  const SCheckbox = Root;
  const { theme, styles, resolveColor } = props;
  return sstyled(styles)(<SCheckbox render={Flex} tag='span' use:theme={resolveColor(theme)} />);
};
CheckMark.displayName = 'CheckMark';

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

const Value = createComponent(ValueRoot, {
  Control,
  CheckMark,
});

const Checkbox = createComponent(CheckboxRoot, {
  Text,
  Value,
});
export { inputProps };
export default Checkbox;
