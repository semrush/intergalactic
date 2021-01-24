import React, { HTMLAttributes } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import createComponent, { Component, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import fire from '@semcore/utils/lib/fire';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { isInPeriod, isValidSchedule } from '../utils/cronTabScheduler';

import style from '../style/calendar.shadow.css';

export type DateConstructorParams = string | number | Date;

export interface ICalendarProps extends IBoxProps {
  /**
   * Locale for displaying the days of a week and months, to be transferred to `Intl`
   * @default en
   * */
  locale?: NavigatorLanguage['language'];
  /**
   * Array of dates blocked for selection
   * Accepts the date, the range of dates or `falsICalendarPropse` for specifying infinity ([Date | false, Date | false]), crontab( 6,7)
   * */
  disabled?: (Date | (Date | false)[] | string)[];
  /**
   * @ignore
   * */
  highlighted?: DateConstructorParams[];
  /**
   * @ignore
   * */
  onHighlightedChange?: (date: Date[]) => void;
  /**
   * The selected date, accepts everything which is accepted by `new Date()`
   * */
  value?: DateConstructorParams[];
  /**
   * To be activated upon selecting the date
   * */
  onChange?: (date: Date[]) => void;
  /**
   * Date for showing the necessary month
   * @default new Date()
   * */
  displayedPeriod?: Date;
}

export interface ICalendarDaysProps extends ICalendarProps {
  /**
   * Displays dates of next and previous month
   * */
  renderOutdated?: boolean;
}

export interface ICalendarDaysContext {
  days: ICalendarUnitProps[];
}

export interface ICalendarWeekDaysContext {
  days: ICalendarUnitProps[];
}

export interface ICalendarMonthsContext {
  months: ICalendarUnitProps[];
}

export interface ICalendarUnitProps extends IBoxProps {
  selected?: boolean;
  outdated?: boolean;
  disabled?: boolean;
  today?: boolean;
  startSelected?: boolean;
  endSelected?: boolean;
  highlighted?: boolean;
  startHighlighted?: boolean;
  endHighlighted?: boolean;
  children?: React.ReactNode;
}

export interface ICalendarWeekDaysProps extends IBoxProps {
  locale?: NavigatorLanguage['language'];
}

dayjs.extend(isBetween);

const range = (N, cb) => Array.from({ length: N }, (v, k) => cb(k));

function getDayJSLocaleParams(locale) {
  if (locale.includes('en') || locale.includes('ja')) {
    return {
      ...dayjs.Ls[locale],
      weekStart: 0,
    };
  }
  return {
    ...dayjs.Ls[locale],
    weekStart: 1,
  };
}

function CalendarWeekUnit(props) {
  const { Root: SWeekDay, styles } = props;
  return styled(styles)(<SWeekDay render={Box} />);
}

class CalendarWeekDaysRoot extends Component<ICalendarWeekDaysProps> {
  static displayName = 'CalendarWeekDays';
  static style = style;
  static defaultProps = {
    locale: 'en',
    children: ({ days }) => days.map((data, i) => <CalendarWeekDays.Unit key={i} {...data} />),
  };

  getDaysByWeek() {
    const { locale } = this.asProps;

    let date = dayjs().locale(locale, getDayJSLocaleParams(locale)).startOf('week');
    return range(7, () => {
      const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date.valueOf());
      date = date.add(1, 'day');
      return {
        children: weekday,
      };
    });
  }

  setContext() {
    return {
      days: this.getDaysByWeek(),
    };
  }

  render() {
    const SWeekDays = this.Root;
    const { styles } = this.asProps;
    return styled(styles)(<SWeekDays render={Box} />);
  }
}

class CalendarUnit extends Component<ICalendarUnitProps> {
  static enhance = [keyboardFocusEnhance()];

  render() {
    const SCalendarUnit = this.Root;
    const {
      styles,
      startSelected,
      endSelected,
      selected,
      outdated,
      highlighted,
      startHighlighted,
      endHighlighted,
      disabled,
      today,
      keyboardFocused,
    } = this.asProps;

    return styled(styles)(
      <SCalendarUnit
        render={Box}
        tag="button"
        startSelected={startSelected}
        endSelected={endSelected}
        selected={selected}
        outdated={outdated}
        highlighted={highlighted}
        startHighlighted={startHighlighted}
        endHighlighted={endHighlighted}
        disabled={disabled}
        today={today}
        keyboardFocused={keyboardFocused}
      />,
    );
  }
}

class CalendarRoot extends Component<ICalendarProps> {
  static style = style;

  today = new Date(new Date().setHours(0, 0, 0, 0));

  createUnit({ date, ...other }, unit) {
    const self = this;
    const { disabled: _disabled, value, highlighted: _highlighted } = this.asProps;

    const includesDate = (day) => {
      if (Array.isArray(day)) {
        const MAX_DATE_TIMESTAMP = 8640000000000000;
        const [start, end] = day;
        return date.isBetween(start || -MAX_DATE_TIMESTAMP, end || MAX_DATE_TIMESTAMP, unit, '[]');
      }
      if (isValidSchedule(day)) {
        return isInPeriod(day, date.toDate());
      }
      return date.isSame(day, 'date');
    };

    let value0 = value[0] ? dayjs(value[0]) : null;
    let value1 = value[1] ? dayjs(value[1]) : null;
    let selected;
    if (value0 && value1) {
      if (value0 > value1) [value1, value0] = [value0, value1];
      selected = date.isBetween(value0, value1, unit, '()');
    }
    const startSelected = value0 && date.isSame(value0, unit);
    const endSelected = value1 && date.isSame(value1, unit);

    let highlighted0 = _highlighted[0] ? dayjs(_highlighted[0]) : null;
    let highlighted1 = _highlighted[1] ? dayjs(_highlighted[1]) : highlighted0;
    let startHighlighted, endHighlighted, highlighted;
    if (highlighted0 && highlighted1) {
      if (highlighted0 > highlighted1) [highlighted1, highlighted0] = [highlighted0, highlighted1];
      highlighted = date.isBetween(highlighted0, highlighted1, unit, '[]');
      startHighlighted = highlighted0 && date.isSame(highlighted0, 'date');
      endHighlighted = highlighted1 && date.isSame(highlighted1, 'date');
    }

    const disabled = _disabled.some(includesDate);

    return {
      date: date.toDate(),
      children: '',
      startSelected,
      endSelected,
      selected,
      disabled,
      highlighted,
      startHighlighted,
      endHighlighted,
      today: date.isSame(self.today, unit),
      onClick: () => {
        const { highlighted: _highlighted } = this.asProps;
        let highlighted = [date.valueOf()];

        if (_highlighted.length === 1) {
          highlighted = [_highlighted[0], date.valueOf()];
        } else if (_highlighted.length >= 2) {
          highlighted = [];
        }

        fire(this, 'onHighlightedChange', highlighted);
        fire(this, 'onChange', date.toDate());
      },
      onMouseEnter: () => {
        const { value, highlighted: _highlighted } = this.asProps;
        if (_highlighted[0] || value.length === 1) {
          const startDate = _highlighted[0] || value[0];
          const highlighted = [startDate.valueOf(), date.valueOf()];
          fire(this, 'onHighlightedChange', highlighted);
        }
      },
      ...other,
    };
  }

  handleMouseLeave = () => {
    const { highlighted: _highlighted } = this.asProps;
    const highlighted = _highlighted[0] ? [_highlighted[0]] : [];

    fire(this, 'onHighlightedChange', highlighted);
  };
}

class CalendarDaysRoot extends CalendarRoot {
  static displayName = 'CalendarDays';
  static defaultProps = {
    displayedPeriod: new Date(new Date().setHours(0, 0, 0, 0)),
    disabled: [],
    value: [],
    locale: 'en',
    children: ({ days }) => days.map((data, i) => <CalendarDays.Unit key={i} {...data} />),
  };

  getDaysByMonth() {
    const { displayedPeriod, renderOutdated, locale } = this.asProps;
    let date = dayjs(displayedPeriod).startOf('month');
    let prevDate = date.subtract(1, 'month');
    let nextDate = date.add(1, 'month');

    /* 0 - 6 */
    const dateStartOfWeek = date
      .locale(locale, getDayJSLocaleParams(locale))
      .startOf('week')
      .get('d')
      ? (date.get('d') || 7) - 1
      : date.get('d');

    let prevMonthDays = dateStartOfWeek
      ? range(prevDate.daysInMonth(), () => {
          const day = this.createUnit({ date: prevDate, outdated: true }, 'date');
          day.children = String(prevDate.get('date'));
          prevDate = prevDate.add(1, 'day');
          return day;
        }).slice(-dateStartOfWeek)
      : [];

    const monthDays = range(date.daysInMonth(), () => {
      const day = this.createUnit({ date }, 'date');
      day.children = String(date.get('date'));
      date = date.add(1, 'day');
      return day;
    });

    let nextMonthDays = range(42 - prevMonthDays.length - monthDays.length, () => {
      const day = this.createUnit({ date: nextDate, outdated: true }, 'date');
      day.children = String(nextDate.get('date'));
      nextDate = nextDate.add(1, 'day');
      return day;
    });

    if (!renderOutdated) {
      prevMonthDays = prevMonthDays.map(() => ({
        disabled: true,
        children: '',
      }));
      nextMonthDays = [];
    }

    return [...prevMonthDays, ...monthDays, ...nextMonthDays] as [ICalendarUnitProps];
  }

  setContext() {
    return {
      days: this.getDaysByMonth(),
    };
  }

  render() {
    const SCalendar = this.Root;
    const { Children, styles, locale } = this.asProps;
    const SGridDays = 'div';

    return styled(styles)(
      <SCalendar render={Box}>
        <CalendarWeekDays locale={locale} />
        <SGridDays onMouseLeave={this.handleMouseLeave}>
          <Children />
        </SGridDays>
      </SCalendar>,
    );
  }
}

class CalendarMonthsRoot extends CalendarRoot {
  static displayName = 'CalendarMonths';
  static defaultProps = {
    children: ({ months }) => months.map((data, i) => <CalendarMonths.Unit key={i} {...data} />),
  };

  getMonthsByYear() {
    const { displayedPeriod, locale } = this.asProps;

    let date = dayjs(displayedPeriod).startOf('year');

    return range(12, () => {
      const month = this.createUnit({ date: date }, 'month');
      month.children = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date.valueOf());
      date = date.add(1, 'month');
      return month;
    }) as [ICalendarUnitProps];
  }

  setContext() {
    return {
      months: this.getMonthsByYear(),
    };
  }

  render() {
    const SCalendar = this.Root;
    const { Children, styles } = this.asProps;
    const SGridMonths = 'div';

    return styled(styles)(
      <SCalendar render={Box}>
        <SGridMonths onMouseLeave={this.handleMouseLeave}>
          <Children />
        </SGridMonths>
      </SCalendar>,
    );
  }
}

const CalendarWeekDays = createComponent<
  Merge<ICalendarWeekDaysProps, HTMLAttributes<HTMLDivElement>>,
  { Unit: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>> },
  ICalendarWeekDaysContext
>(CalendarWeekDaysRoot, { Unit: CalendarWeekUnit });

const CalendarDays = createComponent<
  Merge<ICalendarDaysProps, HTMLAttributes<HTMLDivElement>>,
  { Unit: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>> },
  ICalendarDaysContext
>(CalendarDaysRoot, { Unit: CalendarUnit });

const CalendarMonths = createComponent<
  Merge<ICalendarProps, HTMLAttributes<HTMLDivElement>>,
  { Unit: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>> },
  ICalendarMonthsContext
>(CalendarMonthsRoot, { Unit: CalendarUnit });

export { CalendarUnit, CalendarWeekDays, CalendarDays, CalendarMonths };
