import React from 'react';
import createComponent, { Component, Root, sstyled, CHILDREN_COMPONENT } from '@semcore/core';
import BaseTrigger from './BaseTrigger';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import Dot from '@semcore/dot';
import Close from '@semcore/icon/Close/m';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import animatedSizeEnhance from '@semcore/utils/lib/enhances/animatedSizeEnhance';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import getInputProps, { inputProps } from '@semcore/utils/lib/inputProps';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { setFocus } from '@semcore/utils/lib/use/useFocusLock';

import style from './style/filter-trigger.shadow.css';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';

const filterTriggerInputProps = [
  ...inputProps,
  'aria-controls',
  'aria-haspopup',
  'aria-expanded',
  'aria-disabled',
  'aria-activedescendant',
  'aria-label',
  'aria-labelledby',
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
    const { empty, onClear, size, disabled, getI18nText, uid } = this.asProps;

    return {
      size,
      empty,
      onClick: callAllEventHandlers(onClear, this.handleClear, this.handleStopPropagation),
      onKeyDown: this.handleStopPropagation,
      disabled,
      id: `igc-${uid}-filter-trigger-clear`,
      getI18nText,
    };
  }

  render() {
    const SWrapper = Root;
    const { Children, styles, getI18nText, empty, forcedAdvancedMode } = this.asProps;

    const role = this.asProps.role === 'button' ? 'group' : this.asProps.role;

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
        use:role={role}
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
        tag='button'
        type='button'
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
    const { styles, empty, size, disabled, getI18nText, uid, id } = this.asProps;

    if (empty) return null;

    return sstyled(styles)(
      <SFilterTrigger
        render={BaseTrigger}
        tag='button'
        type='button'
        size={size}
        empty={empty}
        selected
        disabled={disabled}
        id={`igc-${uid}-filter-trigger-clear`}
        aria-labelledby={`igc-${uid}-filter-trigger-clear ${id}`}
        aria-label={getI18nText('clear')}
      >
        <FilterTrigger.Addon tag={Close} />
      </SFilterTrigger>,
    );
  }
}

function Counter(props) {
  const SCounter = Root;
  return sstyled(props.styles)(<SCounter render={BaseTrigger.Addon} tag={Dot} />);
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
