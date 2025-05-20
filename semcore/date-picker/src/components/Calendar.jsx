import React from 'react';
import dayjs from 'dayjs';
import isBetween from '../utils/isBetweenPlugin';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import fire from '@semcore/core/lib/utils/fire';
import { includesDate } from '../utils/includesDate';
import { formatDDMMYY, formatMMYY } from '../utils/formatDate';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import { ScreenReaderOnly } from '@semcore/flex-box';

import style from '../style/calendar.shadow.css';

dayjs.extend(isBetween);

const range = (N, cb) => Array.from({ length: N }, (v, k) => cb(k));

function getDayJSLocaleParams(locale) {
  if (locale.includes('en') || locale.includes('ja')) {
    return {
      weekStart: 0,
      ...dayjs.Ls[locale],
    };
  }
  return {
    weekStart: 1,
    ...dayjs.Ls[locale],
  };
}

class CalendarWeekDaysRoot extends Component {
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
      const short = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date.valueOf());
      const long = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date.valueOf());
      date = date.add(1, 'day');
      return {
        children: short,
        'aria-label': long,
      };
    });
  }

  setContext() {
    return {
      days: this.getDaysByWeek(),
    };
  }

  render() {
    const SWeekDays = Root;
    const { Children, styles } = this.asProps;
    return sstyled(styles)(
      <SWeekDays render={Box}>
        <Children />
      </SWeekDays>,
    );
  }
}

function CalendarWeekUnit({ styles }) {
  const SWeekDay = Root;
  return sstyled(styles)(<SWeekDay render={Box} role='columnheader' />);
}

function resolveHighlighting(date, unit, highlighted) {
  let highlighted0 = highlighted[0] ? dayjs(highlighted[0]) : null;
  let highlighted1 = highlighted[1] ? dayjs(highlighted[1]) : highlighted0;
  if (highlighted0 && highlighted1) {
    if (highlighted0 > highlighted1) [highlighted1, highlighted0] = [highlighted0, highlighted1];
    return {
      highlighted: date.isBetween(highlighted0, highlighted1, unit, '[]'),
      startHighlighted: highlighted0 && date.isSame(highlighted0, 'date'),
      endHighlighted: highlighted1 && date.isSame(highlighted1, 'date'),
    };
  }
  return {
    highlighted: undefined,
    startHighlighted: undefined,
    endHighlighted: undefined,
  };
}
function resolveSelecting(date, unit, value) {
  let value0 = value[0] ? dayjs(value[0]) : null;
  let value1 = value[1] ? dayjs(value[1]) : null;
  let selected;
  if (value0 && value1) {
    if (value0 > value1) [value1, value0] = [value0, value1];
    selected = date.isBetween(value0, value1, unit, '()');
  }
  const startSelected = value0 && date.isSame(value0, unit);
  const endSelected = value1 && date.isSame(value1, unit);

  return {
    selected,
    startSelected,
    endSelected,
  };
}

class CalendarAbstract extends Component {
  static style = style;

  today = new Date(new Date().setHours(0, 0, 0, 0));

  createUnit({ date, ...other }, unit) {
    const self = this;
    const {
      disabled: _disabled,
      value,
      compare,
      highlighted,
      compareHighlighted,
      locale,
    } = this.asProps;

    const highlighting = resolveHighlighting(date, unit, highlighted ?? []);
    const comparedHighlighting = resolveHighlighting(date, unit, compareHighlighted ?? []);
    const selecting = resolveSelecting(date, unit, value ?? []);
    const comparing = resolveSelecting(date, unit, compare ?? []);

    const disabled = _disabled.some(includesDate(date, unit));

    return {
      date: formatDDMMYY(date, locale),
      dateKey: this.formatter(date, locale),
      children: '',
      role: 'gridcell',
      startSelected: selecting.startSelected,
      endSelected: selecting.endSelected,
      selected: selecting.selected,
      highlighted: highlighting.highlighted,
      startHighlighted: highlighting.startHighlighted,
      endHighlighted: highlighting.endHighlighted,

      compareHighlighted: comparedHighlighting.highlighted || comparing.selected,
      compareStartHighlighted: comparedHighlighting.startHighlighted,
      compareEndHighlighted: comparedHighlighting.endHighlighted,
      compareStart: comparing.startSelected,
      compareEnd: comparing.endSelected,

      'aria-selected': selecting.selected,
      'aria-disabled': disabled,
      'aria-current': highlighting.highlighted ? 'date' : undefined,

      disabled,
      today: date.isSame(self.today, unit),
      onClick: () => {
        const { range, highlighted: _highlighted } = this.asProps;
        let highlighted = [date.valueOf()];

        if (_highlighted.length === 1) {
          highlighted = [_highlighted[0], date.valueOf()];
        } else if (_highlighted.length >= 2) {
          highlighted = [];
        }

        if (range === 'compare') {
          fire(this, 'onCompareHighlightedChange', highlighted);
        } else {
          fire(this, 'onHighlightedChange', highlighted);
        }
        fire(this, 'onChange', date.toDate());
      },
      onMouseEnter: () => {
        const { range, highlighted: _highlighted } = this.asProps;
        const value = range === 'compare' ? this.asProps.compare : this.asProps.value;
        if (_highlighted[0] || (value ?? []).length === 1) {
          const startDate = _highlighted[0] || (value ?? [])[0];
          const highlighted = [startDate.valueOf(), date.valueOf()];
          if (range === 'compare') {
            fire(this, 'onCompareHighlightedChange', highlighted);
          } else {
            fire(this, 'onHighlightedChange', highlighted);
          }
        }
      },
      ...other,
    };
  }

  handleMouseLeave = () => {
    const { highlighted } = this.asProps;

    fire(this, 'onHighlightedChange', highlighted.length ? [highlighted[0]] : []);
  };

  getUnitProps({ dateKey }, index) {
    const inRow = 7;
    const { unitRefs } = this.asProps;
    return {
      'aria-colindex': (index % inRow) + 1,
      'aria-rowindex': Math.floor(index / inRow) + 1,
      ref: (node) => {
        if (!dateKey) return;
        unitRefs[dateKey] = node;
      },
    };
  }

  getRootProps() {
    return {
      role: 'grid',
      tabIndex: 0,
    };
  }

  formatter = formatDDMMYY;
  describeValue() {
    const { locale, getI18nText, actionsDescribing } = this.asProps;
    const value = this.asProps.value || [];
    const compare = this.asProps.compare || [];

    if (!actionsDescribing) return null;

    const t = (key, date) =>
      getI18nText(key, date ? { date: this.formatter(date, locale) } : undefined);

    let description = '';
    if (value.length === 1 || compare.length === 1) {
      description += t('selectingStarted') + '. ';
    } else if (value.length === 2 || compare.length === 2) {
      description += t('selectingFinished') + '. ';
    }

    if (actionsDescribing === 'range') {
      if (value[0] || value[1]) description += t('dateRange') + ' ';
      if (value[0]) description += t('fromDate', value[0]) + ', ';
      if (value[1]) description += t('toDate', value[1]) + '. ';
    } else if (actionsDescribing === 'range-compare') {
      if (compare.length === 1) {
        description += t('dateRange2') + ' ';
        if (compare[0]) description += t('fromDate', value[0]) + ', ';
        if (compare[1]) description += t('toDate', value[1]) + '. ';
      } else {
        if (value[0] || value[1]) description += t('dateRange1') + ' ';
        if (value[0]) description += t('fromDate', value[0]) + ', ';
        if (value[1]) description += t('toDate', value[1]) + '. ';
        if (compare.length > 0) {
          description += t('dateRange2') + ' ';
          if (compare[0]) description += t('fromDate', compare[0]) + ', ';
          if (compare[1]) description += t('toDate', compare[1]) + '. ';
        }
      }
    }

    return description;
  }
}

function CalendarUnit({ styles, date, long, outdated, disabled, highlighted }) {
  const SCalendarUnit = Root;
  return sstyled(styles)(
    <SCalendarUnit
      use:disabled={disabled || outdated || !date}
      render={Box}
      aria-hidden={!date}
      aria-label={long || date}
      use:tabIndex={highlighted ? 0 : -1}
    />,
  );
}
CalendarUnit.enhance = [keyboardFocusEnhance()];

class CalendarDaysRoot extends CalendarAbstract {
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
      ? range(prevDate.daysInMonth(), (i) => {
          const day = this.createUnit({ date: prevDate, outdated: true, i }, 'date');
          day.children = String(prevDate.get('date'));
          prevDate = prevDate.add(1, 'day');
          return day;
        }).slice(-dateStartOfWeek)
      : [];

    const monthDays = range(date.daysInMonth(), (i) => {
      const day = this.createUnit({ date, i }, 'date');
      day.children = String(date.get('date'));
      date = date.add(1, 'day');
      return day;
    });

    let nextMonthDays = range(42 - prevMonthDays.length - monthDays.length, (i) => {
      const day = this.createUnit({ date: nextDate, outdated: true, i }, 'date');
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

    return [...prevMonthDays, ...monthDays, ...nextMonthDays];
  }

  setContext() {
    return {
      days: this.getDaysByMonth(),
    };
  }

  render() {
    const SCalendar = Root;
    const SGridDays = 'div';
    const { Children, styles, locale } = this.asProps;
    const description = this.describeValue();

    return sstyled(styles)(
      <SCalendar render={Box} {...this.getRootProps()}>
        <CalendarWeekDays locale={locale} role='row' />
        <SGridDays onMouseLeave={this.handleMouseLeave} role='row'>
          <Children />
        </SGridDays>
        <ScreenReaderOnly role='row'>
          <span aria-live='polite' role='gridcell'>
            {description}
          </span>
        </ScreenReaderOnly>
      </SCalendar>,
    );
  }
}

class CalendarMonthsRoot extends CalendarAbstract {
  static displayName = 'CalendarMonths';
  static defaultProps = {
    locale: 'en',
    children: ({ months }) => months.map((data, i) => <CalendarMonths.Unit key={i} {...data} />),
  };

  getMonthsByYear() {
    const { displayedPeriod, locale } = this.asProps;

    let date = dayjs(displayedPeriod).startOf('year');

    return range(12, () => {
      const month = this.createUnit({ date }, 'month');
      month.children = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date.valueOf());
      month.long = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        date.valueOf(),
      );
      date = date.add(1, 'month');
      return month;
    });
  }

  setContext() {
    return {
      months: this.getMonthsByYear(),
    };
  }

  formatter = formatMMYY;

  render() {
    const SCalendar = Root;
    const SGridMonths = 'div';
    const { Children, styles } = this.asProps;
    const description = this.describeValue();

    return sstyled(styles)(
      <SCalendar render={Box} {...this.getRootProps()}>
        <SGridMonths onMouseLeave={this.handleMouseLeave} role='row'>
          <Children />
        </SGridMonths>
        <ScreenReaderOnly role='row'>
          <span aria-live='polite' role='gridcell'>
            {description}
          </span>
        </ScreenReaderOnly>
      </SCalendar>,
    );
  }
}

const CalendarWeekDays = createComponent(CalendarWeekDaysRoot, {
  Unit: CalendarWeekUnit,
});

const CalendarDays = createComponent(CalendarDaysRoot, {
  Unit: CalendarUnit,
});

const CalendarMonths = createComponent(CalendarMonthsRoot, {
  Unit: CalendarUnit,
});

export { CalendarUnit, CalendarWeekDays, CalendarDays, CalendarMonths };
