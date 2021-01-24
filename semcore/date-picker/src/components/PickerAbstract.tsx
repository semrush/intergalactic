import React from 'react';
import dayjs from 'dayjs';
import { Component, CORE_INSTANCE, styled } from '@semcore/core';
import Dropdown, { IDropdownProps } from '@semcore/dropdown';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import { DateConstructorParams } from './Calendar';
import de from '../translations/de.json';
import en from '../translations/en.json';
import es from '../translations/es.json';
import fr from '../translations/fr.json';
import it from '../translations/it.json';
import ja from '../translations/ja.json';
import pt from '../translations/pt.json';
import ru from '../translations/ru.json';
import zh from '../translations/zh.json';

import style from '../style/date-picker.shadow.css';

export interface IDatePickerProps extends IDropdownProps, IWithI18nEnhanceProps {
  /**
   * The selected date, accepts everything which is accepted by `new Date()`
   * */
  value?: DateConstructorParams;
  /**
   * To be activated upon selecting the date
   * */
  onChange?: (date: Date) => void;
  /**
   * Array of dates blocked for selection
   * */
  disabled?: (Date | (Date | false)[] | string)[];
  /**
   * Date for showing the necessary month
   * @default new Date()
   * */
  displayedPeriod?: DateConstructorParams;
  /**
   * To be activated upon changing the current shown month
   * */
  onDisplayedPeriodChange?: (date: Date) => void;
  /**
   * Component size
   * @default m
   */
  size?: 'm' | 'l' | 'xl';
}

class PickerAbstract extends Component<IDatePickerProps> {
  static displayName = 'DatePicker';
  static style = style;
  static defaultProps: any = {
    i18n: {
      de,
      en,
      es,
      fr,
      it,
      ja,
      pt,
      ru,
      zh,
    },
    locale: 'en',
    defaultDisplayedPeriod: new Date(new Date().setHours(0, 0, 0, 0)),
    defaultValue: null,
    defaultVisible: false,
    disabled: [],
    size: 'm',
  };
  static enhance = [i18nEnhance()];

  static add = (date, amount, unit) => {
    return dayjs(date).add(amount, unit).toDate();
  };

  static subtract = (date, amount, unit) => {
    return dayjs(date).subtract(amount, unit).toDate();
  };

  navigateStep: dayjs.OpUnitType;

  uncontrolledProps() {
    return {
      displayedPeriod: null,
      visible: [
        null,
        (visible) => {
          if (visible) {
            const { value } = this.asProps;
            this.handlers.displayedPeriod(value ? dayjs(value).toDate() : new Date());
          }
        },
      ],
      value: [
        null,
        () => {
          // TODO: работает только из-за new Date() !== new Date()
          this.handlers.visible(false);
        },
      ],
    };
  }

  navigateView = (direction: number) => {
    const { displayedPeriod } = this.asProps;
    const action = direction >= 1 ? 'add' : 'subtract';
    const date = dayjs(displayedPeriod)[action](1, this.navigateStep).toDate();
    this.handlers.displayedPeriod(date);
  };

  bindHandlerNavigateClick = (direction) => () => {
    this.navigateView(direction);
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
    return {
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
    const { locale, displayedPeriod, disabled, value, onChange } = this.asProps;
    return {
      locale,
      displayedPeriod,
      disabled,
      onChange,
      value: [value, value],
      renderOutdated: true,
      highlighted: [],
    };
  }

  render() {
    const { Root } = this;
    const { styles } = this.asProps;

    return styled(styles)(<Root render={Dropdown} />);
  }
}

export default PickerAbstract;
