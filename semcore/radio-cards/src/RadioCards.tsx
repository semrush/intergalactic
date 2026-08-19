import { Flex, NeighborLocation } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, Component, createComponent, sstyled } from '@semcore/core';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import Dot from '@semcore/dot';
import { Text as SemcoreText } from '@semcore/typography';
import React from 'react';

import type { NSRadioCards } from './RadioCards.type';
import style from './styles/radio-cards.shadow.css';

const DEFAULT_VALUE = '';

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
    defaultValue: DEFAULT_VALUE,
  } as const;

  uncontrolledProps() {
    return {
      value: DEFAULT_VALUE,
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

  getTabIndexFor(index: number, condition: boolean) {
    const { value } = this.asProps;

    if (index === 0 && value === DEFAULT_VALUE) {
      return 0;
    }

    return condition ? 0 : -1;
  }

  getItemProps({ value: itemValue }: NSRadioCards.Item.Props, index: number) {
    const { value, disabled } = this.asProps;
    const isChecked = value === itemValue;

    return {
      tabIndex: this.getTabIndexFor(index, isChecked),
      checked: isChecked,
      disabled,
      onClick: this.handleClick(itemValue),
      onKeyDown: this.handleKeyDown(itemValue),
    };
  }

  render() {
    const SRadioCards = Root;
    const { Children, styles, disabled } = this.asProps;

    return sstyled(styles)(
      <SRadioCards render={Flex} role='radiogroup' aria-disabled={disabled}>
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
  const SRadioItemHeaderText = SemcoreText;
  const SRadioItemHeaderRightAddon = SemcoreText;
  const SRadioItemDescription = SemcoreText;
  const { Children, styles, iconAddon, text, textAddon, description, disabled, checked, dot, children } = props;

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
                {text && <SRadioItemHeaderText size={300} use='primary'>{text}</SRadioItemHeaderText>}
                {textAddon && (
                  <SRadioItemHeaderRightAddon size={300}>
                    {textAddon}
                  </SRadioItemHeaderRightAddon>
                )}
              </SRadioItemHeader>
              {description && <SRadioItemDescription size={200} use='secondary'>{description}</SRadioItemDescription>}
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
