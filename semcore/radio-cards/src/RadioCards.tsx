import { Box, Flex, NeighborLocation } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, Component, createComponent, sstyled } from '@semcore/core';
import Dot from '@semcore/dot';
import Skeleton from '@semcore/skeleton';
import { Text as SemcoreText } from '@semcore/typography';
import React from 'react';

import type { NSRadioCards } from './RadioCards.type';
import style from './styles/radio-cards.shadow.css';

const DEFAULT_VALUE = '';

class RadioCardsRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSRadioCards.Component>,
  [],
  NSRadioCards.Handlers,
  {},
  {},
  NSRadioCards.DefaultProps
> {
  static displayName = 'RadioCards';
  static style = style;

  static defaultProps = ({
    defaultValue,
  }: Intergalactic.InternalTypings.InferComponentProps<NSRadioCards.Component>) => ({
    defaultValue: defaultValue ?? DEFAULT_VALUE,
  });

  uncontrolledProps() {
    return {
      value: DEFAULT_VALUE,
    };
  }

  handleOnChange = (value: NSRadioCards.Value) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.handlers.value(value, e);
  };

  getItemProps(props: NSRadioCards.Item.Props) {
    const { value: itemValue } = props;
    const { value, disabled, name } = this.asProps;

    return {
      disabled,
      checked: value === itemValue,
      onChange: this.handleOnChange(itemValue),
      name: name,
    };
  }

  render() {
    const SRadioCards = Root;
    const { Children, styles, disabled } = this.asProps;

    return sstyled(styles)(
      <SRadioCards
        render={Flex}
        role='radiogroup'
        aria-disabled={disabled}
        /*
          Need to exclude to prevent a call on the bubbling phase from the inner control.
          This handler is created implicitly by `uncontrolledProps` and added to `.asProps`.
          All props are applied to the Root element by default.
        */
        __excludeProps={['onChange']}
      >
        <NeighborLocation>
          <Children />
        </NeighborLocation>
      </SRadioCards>,
    );
  }
}

function Item(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSRadioCards.Item.Component,
    typeof RadioCardsRoot,
    'Item'
  >,
) {
  const SRadioItem = Root;
  const SRadioItemControl = 'input';
  const SRadioItemHeader = Flex;
  const SRadioItemHeaderLeftAddon = Flex;
  const SRadioItemHeaderInnerContainer = Box;
  const SRadioItemHeaderText = SemcoreText;
  const SRadioItemHeaderRightAddon = SemcoreText;
  const SRadioItemDescription = SemcoreText;
  const SRadioItemSkeleton = Skeleton;
  const {
    Children,
    styles,
    iconAddon,
    text,
    textAddon,
    description,
    disabled,
    checked,
    dot,
    children,
    onChange,
    name,
    loading,
  } = props;

  const isAdvancedMode = children !== undefined;

  return sstyled(styles)(
    <SRadioItem render={Flex} tag='label' __excludeProps={['tabIndex', 'disabled', 'checked', 'onChange', 'name']}>
      <SRadioItemControl type='radio' disabled={disabled} checked={checked} onChange={onChange} name={name} />
      {isAdvancedMode
        ? (
            <Children />
          )
        : (
            <>
              <SRadioItemHeader>
                {iconAddon && <SRadioItemHeaderLeftAddon aria-hidden>{iconAddon}</SRadioItemHeaderLeftAddon>}
                <SRadioItemHeaderInnerContainer>
                  {text && (
                    <SRadioItemHeaderText size={300} use='primary'>
                      {text}
                    </SRadioItemHeaderText>
                  )}
                  {loading
                    ? (
                        <SRadioItemSkeleton w={24} h={16}>
                          <rect x='0' y='0' rx='4' ry='4' width='100%' height='100%' />
                        </SRadioItemSkeleton>
                      )
                    : (
                        textAddon && <SRadioItemHeaderRightAddon size={300}>{textAddon}</SRadioItemHeaderRightAddon>
                      )}
                </SRadioItemHeaderInnerContainer>
              </SRadioItemHeader>
              {description && (
                <SRadioItemDescription size={200} use='secondary'>
                  {description}
                </SRadioItemDescription>
              )}
              {dot && <Dot up size='l' aria-label={dot} />}
            </>
          )}
    </SRadioItem>,
  );
}

const RadioCards = createComponent<NSRadioCards.Component, typeof RadioCardsRoot>(RadioCardsRoot, {
  Item,
});

export default RadioCards;
