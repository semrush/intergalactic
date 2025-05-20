import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import BaseTrigger from './BaseTrigger';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import Dot from '@semcore/dot';
import Close from '@semcore/icon/Close/m';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import animatedSizeEnhance from '@semcore/core/lib/utils/enhances/animatedSizeEnhance';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import getInputProps, { inputProps } from '@semcore/core/lib/utils/inputProps';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { setFocus } from '@semcore/core/lib/utils/use/useFocusLock';

import style from './style/filter-trigger.shadow.css';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { Hint } from '@semcore/tooltip';
import { ScreenReaderOnly } from '@semcore/core/lib/utils/ScreenReaderOnly';

const filterTriggerInputProps = [
  ...inputProps,
  'aria-controls',
  'aria-haspopup',
  'aria-expanded',
  'aria-disabled',
  'aria-activedescendant',
  'aria-label',
  'aria-labelledby',
  'role',
];

class RootFilterTrigger extends Component {
  static displayName = 'FilterTrigger';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    cssVariableEnhance({
      variable: '--intergalactic-duration-control',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
    animatedSizeEnhance({
      animateProps: ['width'],
      onChangeOf: ['value'],
    }),
    uniqueIDEnhancement(),
  ];
  static defaultProps = () => ({
    includeInputProps: filterTriggerInputProps,
    i18n: localizedMessages,
    locale: 'en',
    triggerRef: React.createRef(),
    role: 'group',
  });

  handleStopPropagation = (e) => e.stopPropagation();

  handleClear = () => {
    requestAnimationFrame(() => {
      setFocus(this.asProps.triggerRef.current);
    });
  };

  getTriggerButtonProps() {
    const {
      empty,
      size,
      placeholder,
      active,
      disabled,
      includeInputProps,
      triggerRef,
      'data-ui-name': dataUiName,
      ...other
    } = this.asProps;

    const [controlProps] = getInputProps(other, includeInputProps);

    return {
      size,
      placeholder,
      empty,
      selected: !empty,
      active,
      disabled,
      triggerRef,
      ...controlProps,
    };
  }

  getClearButtonProps() {
    const { empty, onClear, size, disabled, getI18nText } = this.asProps;

    return {
      size,
      empty,
      onClick: callAllEventHandlers(onClear, this.handleClear, this.handleStopPropagation),
      onKeyDown: this.handleStopPropagation,
      disabled,
      getI18nText,
    };
  }

  getCounterProps() {
    const { getI18nText } = this.asProps;

    return {
      getI18nText,
    };
  }

  render() {
    const SWrapper = Root;
    const { Children, styles, getI18nText, empty, forcedAdvancedMode } = this.asProps;

    const advancedMode =
      forcedAdvancedMode ||
      isAdvanceMode(
        Children,
        [FilterTrigger.TriggerButton.displayName, FilterTrigger.ClearButton.displayName],
        true,
      );

    return sstyled(styles)(
      <SWrapper
        render={Box}
        aria-label={getI18nText('filter')}
        __excludeProps={['id']}
        use:role={undefined}
        use:aria-controls={undefined}
        use:aria-owns={undefined}
        use:aria-haspopup={undefined}
        use:aria-expanded={undefined}
        use:aria-disabled={undefined}
        use:aria-activedescendant={undefined}
        use:aria-label={undefined}
        use:aria-labelledby={undefined}
      >
        <NeighborLocation>
          {advancedMode ? (
            <Children />
          ) : (
            <>
              <FilterTrigger.TriggerButton>
                <Children />
              </FilterTrigger.TriggerButton>
              {!empty && <FilterTrigger.ClearButton />}
            </>
          )}
        </NeighborLocation>
      </SWrapper>,
    );
  }
}

class TriggerButton extends Component {
  static displayName = 'TriggerButton';
  static style = style;

  render() {
    const SFilterTrigger = Root;
    const { Children, styles, empty, triggerRef } = this.asProps;

    return sstyled(styles)(
      <SFilterTrigger
        render={BaseTrigger}
        use:role='combobox'
        w='100%'
        empty={empty}
        selected={!empty}
        ref={triggerRef}
        animationsDisabled
      >
        {addonTextChildren(
          Children,
          FilterTrigger.Text,
          [FilterTrigger.Addon, FilterTrigger.Counter],
          empty,
        )}
        {empty && <FilterTrigger.Addon tag={ChevronDown} />}
      </SFilterTrigger>,
    );
  }
}

class ClearButton extends Component {
  static displayName = 'ClearButton';
  static style = style;

  render() {
    const SFilterTrigger = Root;
    const { styles, empty, size, disabled, getI18nText } = this.asProps;

    if (empty) return null;

    return sstyled(styles)(
      <Hint>
        <Hint.Trigger>
          <SFilterTrigger
            render={BaseTrigger}
            size={size}
            empty={empty}
            selected
            disabled={disabled}
            aria-label={getI18nText('clear')}
          >
            <FilterTrigger.Addon tag={Close} />
          </SFilterTrigger>
        </Hint.Trigger>
        <Hint.Popper>{getI18nText('clear')}</Hint.Popper>
      </Hint>,
    );
  }
}

function Counter({ styles, Children, count, getI18nText }) {
  const SCounter = Root;
  return sstyled(styles)(
    <SCounter render={BaseTrigger.Addon} tag={Dot}>
      {count !== undefined ? (
        <>
          {count}
          <ScreenReaderOnly>
            {getI18nText('BaseTrigger.FilterTrigger.Counter.selected:aria-label')}
          </ScreenReaderOnly>
        </>
      ) : (
        <Children />
      )}
    </SCounter>,
  );
}

const FilterTrigger = createComponent(
  RootFilterTrigger,
  {
    Text: BaseTrigger.Text,
    Addon: BaseTrigger.Addon,
    Counter,
    TriggerButton,
    ClearButton,
  },
  {
    parent: BaseTrigger,
  },
);

export default FilterTrigger;
