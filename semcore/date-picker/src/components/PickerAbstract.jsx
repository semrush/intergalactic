import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, CORE_INSTANCE, sstyled } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

import { localizedMessages } from '../translations/__intergalactic-dynamic-locales';

import style from '../style/date-picker.shadow.css';
import { includesDate } from '../utils/includesDate';
import { formatDDMMYY, formatMMYY } from '../utils/formatDate';

const INTERACTION_TAGS = ['INPUT'];
const INTERACTION_KEYS = ['ArrowDown', 'Enter', ' '];

const defaultDisplayedPeriod = new Date(new Date().setHours(0, 0, 0, 0));

class PickerAbstract extends Component {
  static displayName = 'DatePicker';
  static style = style;
  static defaultProps({ value, defaultValue }) {
    return {
      i18n: localizedMessages,
      locale: 'en',
      defaultDisplayedPeriod: value || defaultValue || defaultDisplayedPeriod,
      defaultValue: null,
      defaultVisible: false,
      defaultHighlighted: [],
      disabled: [],
      size: 'm',
    };
  }
  static enhance = [i18nEnhance(localizedMessages)];

  static add = (date, amount, unit) => {
    return dayjs(date).add(amount, unit).toDate();
  };

  static subtract = (date, amount, unit) => {
    return dayjs(date).subtract(amount, unit).toDate();
  };

  popperRef = React.createRef();
  unitRefs = {};

  navigateStep;
  keyDiff;
  keyStep;

  uncontrolledProps() {
    return {
      displayedPeriod: null,
      visible: [
        null,
        (visible) => {
          const { value, displayedPeriod } = this.asProps;

          if (!visible) {
            this.handlers.highlighted([]);
          }

          if (visible) {
            if (value && value !== displayedPeriod) {
              this.handlers.displayedPeriod(value);
            } else if (!value) {
              const { displayedPeriod, defaultDisplayedPeriod } = this.props;
              this.handlers.displayedPeriod(displayedPeriod || defaultDisplayedPeriod);
            }
          }
        },
      ],
      highlighted: null,
      value: [
        null,
        (value) => {
          if (value) {
            this.handlers.visible(false);
          }
          this.handlers.displayedPeriod(value ?? undefined);
        },
      ],
    };
  }

  navigateView = (direction) => {
    const { displayedPeriod } = this.asProps;
    const action = direction >= 1 ? 'add' : 'subtract';
    const date = dayjs(displayedPeriod)[action](1, this.navigateStep).toDate();
    this.handlers.displayedPeriod(date);
  };

  bindHandlerNavigateClick = (direction) => () => {
    this.navigateView(direction);
  };

  handlerKeyDown = (place) => (e) => {
    const { value, displayedPeriod, highlighted, disabled: _disabled, visible } = this.asProps;
    const key = e.key;

    if (place === 'trigger' && INTERACTION_KEYS.includes(key)) {
      e.stopPropagation();
      this.handlers.visible(!visible);

      setTimeout(() => {
        const popper = this.popperRef.current;

        if (popper) {
          popper.focus();
        }
      }, 0);
    }

    const day = this.keyDiff[e.key];

    const getCurrentHighlightedDay = (day) => {
      return day.toDate();
    };

    if (place === 'popper' && (e.key === ' ' || (e.key === 'Enter' && highlighted.length))) {
      if (!this.isDisabled(highlighted[0])) {
        this.handlers.value(highlighted[0]);
      }
      e.preventDefault();
    }
    if (day) {
      if (INTERACTION_TAGS.includes(e.target.tagName)) return;
      const current_highlighted =
        !highlighted[0] && !value
          ? dayjs(highlighted[0] || displayedPeriod)
          : dayjs(displayedPeriod).add(day, this.keyStep);
      const current_day =
        getCurrentHighlightedDay(current_highlighted) ||
        getCurrentHighlightedDay(dayjs(highlighted[0] || displayedPeriod));

      if (current_day) {
        this.handlers.highlighted([current_day]);
        this.handlers.displayedPeriod(current_day);
        e.preventDefault();
        const formatter = this.keyStep === 'month' ? formatMMYY : formatDDMMYY;
        const formattedDate = formatter(current_day, this.asProps.locale);
        this.unitRefs[formattedDate]?.focus();
      }
    }
  };

  isDisabled(date) {
    const { disabled } = this.asProps;

    return disabled.some(includesDate(dayjs(date), 'date'));
  }

  getButtonTriggerProps() {
    const { value, size, visible } = this.asProps;

    return {
      popoverVisible: visible,
      size,
      empty: !value,
      onKeyDown: this.handlerKeyDown('trigger'),
    };
  }

  getPopperProps() {
    const Picker = this[CORE_INSTANCE];
    return {
      tabIndex: 0,
      ref: this.popperRef,
      onKeyDown: this.handlerKeyDown('popper'),
      children: (
        <>
          <Picker.Header />
          <Picker.Calendar />
        </>
      ),
    };
  }

  getHeaderProps() {
    const Picker = this[CORE_INSTANCE];
    return {
      children: (
        <>
          <Picker.Prev />
          <Picker.Title />
          <Picker.Next />
        </>
      ),
    };
  }

  getTitleProps() {
    return {};
  }

  getNextProps() {
    const { getI18nText } = this.asProps;
    const { navigateStep } = this;

    return {
      onClick: this.bindHandlerNavigateClick(1),
      getI18nText,
      'aria-label': navigateStep === 'month' ? getI18nText('nextMonth') : getI18nText('nextYear'),
    };
  }

  getPrevProps() {
    const { getI18nText } = this.asProps;
    const { navigateStep } = this;

    return {
      onClick: this.bindHandlerNavigateClick(-1),
      getI18nText,
      'aria-label': navigateStep === 'month' ? getI18nText('prevMonth') : getI18nText('prevYear'),
    };
  }

  getCalendarProps() {
    const {
      locale,
      displayedPeriod,
      disabled,
      value,
      highlighted,
      onVisibleChange,
      onChange,
      getI18nText,
    } = this.asProps;
    return {
      locale,
      displayedPeriod,
      disabled,
      onChange,
      highlighted,
      value: [value, value],
      renderOutdated: true,
      onVisibleChange,
      unitRefs: this.unitRefs,
      getI18nText,
      actionsDescribing: null,
    };
  }

  render() {
    const { styles, Children, 'aria-label': providedAriaLabel } = this.asProps;

    return (
      <>
        {sstyled(styles)(
          <Root
            render={Dropdown}
            use:aria-label={providedAriaLabel}
            __excludeProps={['onChange', 'value']}
          >
            <Children />
          </Root>,
        )}
      </>
    );
  }
}

export default PickerAbstract;
