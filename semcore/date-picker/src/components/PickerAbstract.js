import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, CORE_INSTANCE, sstyled } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
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
import assignProps from '@semcore/utils/lib/assignProps';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi };

class PickerAbstract extends Component {
  static displayName = 'DatePicker';
  static style = style;
  static defaultProps = {
    i18n,
    locale: 'en',
    defaultDisplayedPeriod: new Date(new Date().setHours(0, 0, 0, 0)),
    defaultValue: null,
    defaultVisible: false,
    defaultHighlighted: [],
    disabled: [],
    size: 'm',
  };
  static enhance = [
    i18nEnhance(),
    keyboardFocusEnhance({
      propName: '$keyboardFocusEnhance',
      isDisabled: () => false,
      isCurrent: true,
      focusMethod: 'onFocusCapture',
      blurMethod: 'onBlurCapture',
    }),
  ];

  static add = (date, amount, unit) => {
    return dayjs(date)
      .add(amount, unit)
      .toDate();
  };

  static subtract = (date, amount, unit) => {
    return dayjs(date)
      .subtract(amount, unit)
      .toDate();
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
          if (visible) {
            const { value } = this.asProps;
            this.handlers.displayedPeriod(value ? dayjs(value).toDate() : new Date());
          } else {
            this.handlers.highlighted([]);
          }
        },
      ],
      highlighted: null,
      value: [
        null,
        () => {
          // TODO: работает только из-за new Date() !== new Date()
          this.handlers.visible(false);
        },
      ],
    };
  }

  navigateView = (direction) => {
    const { displayedPeriod } = this.asProps;
    const action = direction >= 1 ? 'add' : 'subtract';
    const date = dayjs(displayedPeriod)
      [action](1, this.navigateStep)
      .toDate();
    this.handlers.displayedPeriod(date);
  };

  bindHandlerNavigateClick = (direction) => () => {
    this.navigateView(direction);
  };

  handlerPopperKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    const { displayedPeriod, highlighted } = this.asProps;
    const day = this.keyDiff[e.keyCode];
    if (e.keyCode === 32 || (e.keyCode === 13 && highlighted.length)) {
      this.handlers.value(highlighted[0]);
      e.preventDefault();
    }
    if (day) {
      const current_highlighted = dayjs(highlighted[0] || displayedPeriod).add(day, this.keyStep);
      this.handlers.highlighted([current_highlighted.toDate()]);
      this.handlers.displayedPeriod(current_highlighted.toDate());
      e.preventDefault();
    }
  };

  getTriggerProps() {
    const { value, size } = this.asProps;
    return {
      size,
      empty: !value,
    };
  }

  getPopperProps() {
    const Picker = this[CORE_INSTANCE];
    const { $keyboardFocusEnhance } = this.asProps;
    return assignProps($keyboardFocusEnhance, {
      onKeyDown: this.handlerPopperKeyDown,
      children: (
        <>
          <Picker.Header />
          <Picker.Calendar />
        </>
      ),
    });
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
    return sstyled(this.asProps.styles)(<Root render={Dropdown} />);
  }
}

export default PickerAbstract;
