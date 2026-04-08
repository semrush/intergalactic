import { Flex, Box, InvalidStateBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import logger from '@semcore/core/lib/utils/logger';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import { Text as TypographyText } from '@semcore/typography';
import React from 'react';

import type { NRadio } from './Radio.type';
import style from './style/radio.shadow.css';

const RadioContext = React.createContext<{
  onChange?: NRadio.Group.Props['onChange'];
  value?: NRadio.Group.Props['value'];
  theme?: NRadio.Group.Props['theme'];
  size?: NRadio.Group.Props['size'];
  name?: NRadio.Group.Props['name'];
  disabled?: NRadio.Group.Props['disabled'];
}>({});

class RadioGroupRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NRadio.Group.Component>,
  [],
  { value: null }
> {
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

const RadioGroup = createComponent(RadioGroupRoot, {}, { context: RadioContext }) as unknown as NRadio.Group.Component;

class RadioRoot extends Component<Intergalactic.InternalTypings.InferComponentProps<NRadio.Component>> {
  static displayName = 'Radio';
  static style = style;
  static contextType = RadioContext;

  context: React.ContextType<typeof RadioContext> = {};

  state = {
    hoistedDisabled: undefined,
  };

  hoistDisabled = (disabled: NRadio.Props['disabled']) => {
    logger.warn(
      true,
      `Don't set disabled on Radio.Value or Radio.Text, set it on Radio or on RadioGroup (for all items) instead. Otherwise it will produce wrong SSR output.`,
      this.asProps['data-ui-name'],
    );
    this.setState({ hoistedDisabled: disabled });
  };

  getTextProps() {
    const { size = this.context.size ?? 'm', disabled = this.context.disabled, label } = this.asProps;

    const { hoistedDisabled } = this.state;

    const textProps = {
      size: size === 'm' ? 200 : 300,
      children: label,
      disabled: disabled ?? hoistedDisabled,
      hoistDisabled: this.hoistDisabled,
      rootDisabled: this.props.disabled,
    };

    return textProps;
  }

  getValueProps() {
    const {
      state = 'normal',
      size = this.context.size ?? 'm',
      theme = this.context.theme,
      disabled = this.context.disabled,
      name = this.context.name,
    } = this.asProps;

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
        {hasChildren
          ? (
              <Children />
            )
          : (
              <>
                <Radio.Value />
                <Radio.Text />
              </>
            )}
      </SRadio>,
    );
  }
}

class ValueRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NRadio.Value.Component, typeof RadioRoot, 'Value'>,
  typeof ValueRoot.enhance,
  { checked: (e: React.ChangeEvent<HTMLInputElement>) => boolean }
> {
  context: React.ContextType<typeof RadioContext> = {};

  static defaultProps = {
    includeInputProps: inputProps,
    defaultChecked: false,
  };

  static enhance = [resolveColorEnhance()] as const;
  static displayName = 'Value';
  static contextType = RadioContext;
  static style = style;

  bindHandlerChange = (value: NRadio.Props['value']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof this.context.onChange === 'function' && value !== undefined) {
      this.context.onChange(value, e);
    }
  };

  uncontrolledProps() {
    return {
      checked: (e: React.ChangeEvent<HTMLInputElement>) => e.target.checked,
    };
  }

  getControlProps() {
    const { value: currentValue } = this.context;
    const { forwardRef, includeInputProps, state, value } = this.asProps;
    const { onChange } = this.props;

    const [commonControlProps] = getInputProps(this.asProps, includeInputProps);
    const inputValue = value ?? '';

    return {
      ref: forwardRef,
      state,
      ...commonControlProps,
      value: inputValue,
      ...(currentValue !== undefined
        ? {
            checked: currentValue === inputValue,
            onChange: callAllEventHandlers(onChange, this.bindHandlerChange(inputValue)),
          }
        : {}),
    };
  }

  getRadioMarkProps() {
    const { value: currentValue } = this.context;
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
      children,
      Children,
      ...other
    } = this.asProps;
    const { onClick } = this.props;
    const [commonControlProps, radioMarkProps] = getInputProps(other, includeInputProps);
    const inputValue = value ?? '';

    return {
      theme,
      size,
      state,
      keyboardFocused,
      disabled,
      resolveColor,
      checked: commonControlProps.checked,
      ...radioMarkProps,
      ...(currentValue !== undefined && tag !== 'label'
        ? {
            onClick: callAllEventHandlers(onClick, this.bindHandlerChange(inputValue)),
          }
        : {}),
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

function Control(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NRadio.Value.Control.Component,
    typeof ValueRoot,
    'Control'
  >,
) {
  const SControl = Root;
  const { styles, state } = props;

  return sstyled(styles)(<SControl render={Box} tag='input' type='radio' aria-invalid={state === 'invalid'} />);
}
Control.displayName = 'Control';

function RadioMark(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NRadio.Value.Mark.Component,
    typeof ValueRoot,
    'RadioMark'
  >,
) {
  const SValue = Root;
  const SInvalidPattern = InvalidStateBox;
  const { theme, styles, resolveColor, state, checked } = props;

  return sstyled(styles)(
    <SValue render={Box} tag='div' use:theme={resolveColor(theme)} aria-hidden={true}>
      {state === 'invalid' && !checked && <SInvalidPattern />}
    </SValue>,
  );
}
RadioMark.displayName = 'RadioMark';

function Text(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NRadio.Text.Component, typeof RadioRoot, 'Text'>,
) {
  const SText = Root;
  const { styles, color } = props;

  React.useEffect(() => {
    if (props.rootDisabled !== props.disabled) {
      props.hoistDisabled(props.disabled);
    }
  }, [props.rootDisabled, props.disabled, props.hoistDisabled]);
  const resolveColor = useColorResolver();

  return sstyled(styles)(<SText render={TypographyText} tag='span' use:color={resolveColor(color)} />);
}
Text.displayName = 'Text';

const Value = createComponent(ValueRoot, {
  Control,
  RadioMark,
}) as NRadio.Value.Component;

const Radio = createComponent(RadioRoot, {
  Text,
  Value,
}) as NRadio.Component;

export const wrapRadioGroup = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<NRadio.Group.Component>
    > &
    PropsExtending,
  ) => React.ReactNode,
) => wrapper as NRadio.Group.Component<PropsExtending>;

export { inputProps, RadioGroup };

export default Radio;
