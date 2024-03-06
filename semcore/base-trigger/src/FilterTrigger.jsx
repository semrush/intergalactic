import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
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

  render() {
    const SWrapper = Root;
    const SFilterTrigger = BaseTrigger;
    const {
      Children,
      styles,
      empty,
      onClear,
      size,
      placeholder,
      active,
      disabled,
      getI18nText,
      includeInputProps,
      uid,
      id,
      triggerRef,
    } = this.asProps;

    const role = this.asProps.role === 'button' ? 'group' : this.asProps.role;

    const [controlProps] = getInputProps(this.asProps, includeInputProps);

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
          <SFilterTrigger
            tag='button'
            type='button'
            w='100%'
            size={size}
            placeholder={placeholder}
            empty={empty}
            selected={!empty}
            active={active}
            disabled={disabled}
            ref={triggerRef}
            animationsDisabled
            {...controlProps}
          >
            {addonTextChildren(
              Children,
              FilterTrigger.Text,
              [FilterTrigger.Addon, FilterTrigger.Counter],
              empty,
            )}
            {empty && <FilterTrigger.Addon tag={ChevronDown} />}
          </SFilterTrigger>
          {!empty && (
            <SFilterTrigger
              tag='button'
              type='button'
              size={size}
              empty={empty}
              selected
              onClick={callAllEventHandlers(onClear, this.handleClear, this.handleStopPropagation)}
              onKeyDown={this.handleStopPropagation}
              disabled={disabled}
              id={`igc-${uid}-filter-trigger-clear`}
              aria-labelledby={`igc-${uid}-filter-trigger-clear ${id}`}
              aria-label={getI18nText('clear')}
            >
              <FilterTrigger.Addon tag={Close} />
            </SFilterTrigger>
          )}
        </NeighborLocation>
      </SWrapper>,
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
  },
  {
    parent: BaseTrigger,
  },
);

export default FilterTrigger;
