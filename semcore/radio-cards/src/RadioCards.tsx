import { Flex, NeighborLocation } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, Component, createComponent, sstyled } from '@semcore/core';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import { Text as SemcoreText } from '@semcore/typography';
import React from 'react';

import type { NSRadioCards } from './RadioCards.type';
import style from './styles/radio-cards.shadow.css';

class RadioCardsRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSRadioCards.Component>,
  typeof RadioCardsRoot.enhance,
  NSRadioCards.Handlers,
  {},
  {},
  NSRadioCards.DefaultProps
> {
  static displayName = 'RadioCards';
  static style = style;

  static enhance = [a11yEnhance({
    onNeighborChange: (neighborElement) => {
      if (neighborElement) {
        neighborElement.focus();
        neighborElement.click();
      }
    },
    childSelector: () => {
      const selector: [string, string] = ['role', 'radio'];

      return selector;
    },
  })] as const;

  static defaultProps = {
    defaultValue: '',
  } as const;

  uncontrolledProps() {
    return {
      value: '',
    };
  }

  handleClick = (value: NSRadioCards.Value) => (e: React.MouseEvent) => {
    this.handlers.value(value, e);
  };

  handleKeyDown = (value: NSRadioCards.Value) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      this.handlers.value(value, e);
    }
  };

  getItemProps({ value: itemValue }: NSRadioCards.Item.Props) {
    const { value, disabled } = this.asProps;
    const isChecked = value === itemValue;

    return {
      tabIndex: isChecked ? 0 : -1,
      checked: isChecked,
      disabled,
      onClick: this.handleClick(itemValue),
      onKeyDown: this.handleClick(itemValue),
    };
  }

  render() {
    const SRadioCards = Root;
    const { Children, styles, value, disabled } = this.asProps;

    return sstyled(styles)(
      <SRadioCards render={Flex} role='radiogroup' use:tabIndex={value !== '' ? -1 : 0} aria-disabled={disabled}>
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
  const SRadioItemHeader = Flex;
  const SRadioItemHeaderLeftAddon = Flex;
  const SRadioItemHeaderRightAddon = SemcoreText;
  const { Children, styles, iconAddon, text, textAddon, description, disabled, checked, children } = props;

  const isAdvancedMode = children !== undefined;

  return sstyled(styles)(
    <SRadioItem
      render={Flex}
      tag='button'
      role='radio'
      aria-disabled={disabled}
      aria-checked={checked}
    >
      {isAdvancedMode
        ? (
            <Children />
          )
        : (
            <>
              <SRadioItemHeader>
                {iconAddon && <SRadioItemHeaderLeftAddon>{iconAddon}</SRadioItemHeaderLeftAddon>}
                {text && <SemcoreText size={300} use='primary'>{text}</SemcoreText>}
                {textAddon && (
                  <SRadioItemHeaderRightAddon size={300}>
                    {textAddon}
                  </SRadioItemHeaderRightAddon>
                )}
              </SRadioItemHeader>
              {description && <SemcoreText size={200} use='secondary'>{description}</SemcoreText>}
            </>
          )}
    </SRadioItem>,
  );
}

const RadioCards = createComponent<NSRadioCards.Component, typeof RadioCardsRoot>(RadioCardsRoot, {
  Item,
});

export default RadioCards;
