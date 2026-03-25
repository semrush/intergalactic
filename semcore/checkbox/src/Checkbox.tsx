import { Box, Flex, InvalidStateBox } from '@semcore/base-components';
import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import logger from '@semcore/core/lib/utils/logger';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import { Text as TypographyText } from '@semcore/typography';
import React from 'react';

import type { CheckboxTextPropsInternal, CheckboxValueCheckMarkPropsInternal, CheckboxValueControlPropsInternal, CheckboxValuePropsInternal } from './Checkbox.internal.type';
import type { CheckboxComponent, CheckboxProps, CheckboxTextProps, CheckboxValueCheckMarkProps, CheckboxValueComponent, CheckboxValueControlProps, CheckboxValueProps } from './Checkbox.type';
import style from './style/checkbox.shadow.css';

type State = {
  hoistedDisabled?: boolean;
};

class CheckboxRoot extends Component<CheckboxProps, never, {}, State> {
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

  hoistDisabled = (disabled: CheckboxProps['disabled']) => {
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
      ['aria-label']: this.asProps['aria-label'],
      ['aria-labelledby']: this.asProps['aria-labelledby'],
      ['aria-describedby']: this.asProps['aria-describedby'],
    };
  }

  render() {
    const SLabel = Root;
    const { Children, children: hasChildren, styles } = this.asProps;
    return sstyled(styles)(
      <SLabel
        render={Box}
        tag='label'
        __excludeProps={[
          'onChange',
          'indeterminate',
          'checked',
          'checkedDefault',
          'label',
          'aria-label',
          'aria-labelledby',
          'aria-describedby',
        ]}
      >
        {hasChildren
          ? (
              <Children />
            )
          : (
              <>
                <Checkbox.Value />
                <Checkbox.Text />
              </>
            )}
      </SLabel>,
    );
  }
}

class ValueRoot extends Component<
  CheckboxValueProps & CheckboxValuePropsInternal,
  typeof ValueRoot.enhance,
  { checked: (e: React.ChangeEvent<HTMLInputElement>) => boolean }
> {
  static defaultProps = () => {
    return {
      includeInputProps: [...inputProps, 'aria-label', 'aria-labelledby', 'aria-describedby'],
    };
  };

  static enhance = [resolveColorEnhance()] as const;
  static displayName = 'Value';
  static style = style;

  handleClick(e: React.MouseEvent) {
    // idk for what it exists, leaving just in case it saves us from some bugs
    e.stopPropagation();
  }

  uncontrolledProps() {
    return {
      checked: (e: React.ChangeEvent<HTMLInputElement>) => e.target.checked,
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
      // keyboardFocused,
      checked,
      indeterminate,
      includeInputProps,
      resolveColor,
      children,
      Children,
      ...other
    } = this.asProps;
    const [, checkMarkProps] = getInputProps(other, includeInputProps);

    return {
      theme: resolveColor(theme),
      size,
      state,
      // keyboardFocused,
      checked,
      indeterminate,
      resolveColor,
      ...checkMarkProps,
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

function Control(props: CheckboxValueControlProps & CheckboxValueControlPropsInternal) {
  const SControl = Root;
  const { indeterminate, styles, state } = props;
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      if (indeterminate === undefined) return;

      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, checkboxRef]);

  return sstyled(styles)(
    <SControl
      ref={checkboxRef}
      render={Box}
      tag='input'
      type='checkbox'
      aria-invalid={state === 'invalid'}
    />,
  );
}
Control.displayName = 'Control';

function CheckMark(props: CheckboxValueCheckMarkProps & CheckboxValueCheckMarkPropsInternal) {
  const SCheckbox = Root;
  const SInvalidPattern = InvalidStateBox;
  const { styles, state, checked, indeterminate } = props;
  return sstyled(styles)(
    <SCheckbox render={Flex} tag='span'>
      {state === 'invalid' && !checked && !indeterminate && <SInvalidPattern />}
    </SCheckbox>,
  );
}
CheckMark.displayName = 'CheckMark';

function Text(props: CheckboxTextProps & CheckboxTextPropsInternal) {
  const SText = Root;
  const { styles, color } = props;

  React.useEffect(() => {
    if (props.rootDisabled !== props.disabled) {
      if (props.disabled === undefined) return;

      props.hoistDisabled(props.disabled);
    }
  }, [props.rootDisabled, props.disabled, props.hoistDisabled]);

  const resolveColor = useColorResolver();

  return sstyled(styles)(
    <SText render={TypographyText} tag='span' use:color={resolveColor(color)} />,
  );
}
Text.displayName = 'Text';

const Value = createComponent(ValueRoot, {
  Control,
  CheckMark,
}) as CheckboxValueComponent;

const Checkbox = createComponent(CheckboxRoot, {
  Text,
  Value,
}) as CheckboxComponent;

export default Checkbox;
