import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, CORE_INSTANCE, sstyled } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import de from '../translations/de.json';
import en from '../translations/en.json';
import es from '../translations/es.json';
import fr from '../translations/fr.json';
import it from '../translations/it.json';
import ja from '../translations/ja.json';
import pt from '../translations/pt.json';
import ru from '../translations/ru.json';
import zh from '../translations/zh.json';
import ko from '../translations/ko.json';
import vi from '../translations/vi.json';

import style from '../style/date-picker.shadow.css';
import includesDate from '../utils/includesDate';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi };

const INTERACTION_TAGS = ['INPUT'];

const defaultDisplayedPeriod = new Date(new Date().setHours(0, 0, 0, 0));

class PickerAbstract extends Component {
  static displayName = 'DatePicker';
  static style = style;
  static defaultProps({ value, defaultValue }) {
    return {
      i18n,
      locale: 'en',
      defaultDisplayedPeriod: value || defaultValue || defaultDisplayedPeriod,
      defaultValue: null,
      defaultVisible: false,
      defaultHighlighted: [],
      disabled: [],
      size: 'm',
    };
  }
  static enhance = [i18nEnhance()];

  static add = (date, amount, unit) => {
    return dayjs(date).add(amount, unit).toDate();
  };

  static subtract = (date, amount, unit) => {
    return dayjs(date).subtract(amount, unit).toDate();
  };

  navigateStep;
  keyDiff;
  keyStep;

  uncontrolledProps() {
    return {
      displayedPeriod: null,
      visible: [
        null,
        (visible) => {
          if (!visible) {
            this.handlers.highlighted([]);
            this.handlers.displayedPeriod(this.asProps.value || this.props.defaultDisplayedPeriod);
          }
        },
      ],
      highlighted: null,
      value: [
        null,
        (value) => {
          // TODO: работает только из-за new Date() !== new Date()
          this.handlers.visible(false);
          this.handlers.displayedPeriod(value);
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

  handlerKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    const { value, displayedPeriod, highlighted, disabled: _disabled } = this.asProps;
    const day = this.keyDiff[e.keyCode];

    const getCurrentHighlightedDay = (day) => {
      const current_day = day.toDate();
      const isDisabledDay = _disabled.some(includesDate(dayjs(current_day), 'date'));
      return isDisabledDay ? null : current_day;
    };

    if (e.keyCode === 32 || (e.keyCode === 13 && highlighted.length)) {
      this.handlers.value(highlighted[0]);
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
      }
    }
  };

  getTriggerProps() {
    const { value, size } = this.asProps;
    return {
      size,
      empty: !value,
      onKeyDown: this.handlerKeyDown,
    };
  }

  getPopperProps() {
    const { interaction } = this.asProps;
    const Picker = this[CORE_INSTANCE];
    return {
      tabIndex: 0,
      onKeyDown: this.handlerKeyDown,
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
    return {
      onClick: this.bindHandlerNavigateClick(1),
    };
  }

  getPrevProps() {
    return {
      onClick: this.bindHandlerNavigateClick(-1),
    };
  }

  getCalendarProps() {
    const { locale, displayedPeriod, disabled, value, onChange, highlighted } = this.asProps;
    return {
      locale,
      displayedPeriod,
      disabled,
      onChange,
      highlighted,
      value: [value, value],
      renderOutdated: true,
    };
  }

  render() {
    const { styles, Children } = this.asProps;
    return sstyled(styles)(
      <Root render={Dropdown}>
        <Children />
      </Root>,
    );
  }
}

export default PickerAbstract;
