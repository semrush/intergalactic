import React from 'react';
import createComponent, { Root, sstyled } from '@semcore/core';
import { Header as CalendarHeader, Next, Period, Popper, Prev, Title } from './components';
import { CalendarMonths as Calendar } from './components/Calendar';
import { Box, Flex } from '@semcore/flex-box';
import dayjs from 'dayjs';
import Divider from '@semcore/divider';
import RangeComparatorAbstract, {
  Apply,
  Reset,
  Header,
  Trigger,
  CompareToggle,
  Body,
  Footer,
} from './components/DateRangeComparatorAbstract';
import InputTriggerBase from './components/InputTrigger';

const dateParts = { day: false, month: true, year: true };

function RangeInput() {
  return (
    <Root
      render={Box}
      tag={InputTriggerBase}
      parts={dateParts}
      __excludeProps={['role', 'aria-haspopup', 'onChange', 'value']}
    />
  );
}
RangeInput.Indicator = InputTriggerBase.Indicator;
RangeInput.MaskedInput = InputTriggerBase.MaskedInput;
RangeInput.Addon = InputTriggerBase.Addon;
RangeInput.SingleDateInput = InputTriggerBase.SingleDateInput;
RangeInput.DateRange = InputTriggerBase.DateRange;
RangeInput.DateRangeFromInput = InputTriggerBase.DateRangeFromInput;
RangeInput.DateRangeToInput = InputTriggerBase.DateRangeToInput;

class MonthDateRangeComparatorRoot extends RangeComparatorAbstract {
  static displayName = 'MonthDateRangeComparator';
  static defaultProps = (props) => {
    return {
      ...RangeComparatorAbstract.defaultProps(props),
      children: (
        <>
          <DateRangeComparator.Trigger />
          <DateRangeComparator.Popper />
        </>
      ),
    };
  };

  navigateStep = 'year';
  keyStep = 'month';
  keyDiff = {
    37: -1,
    38: -3,
    39: 1,
    40: 3,
  };

  getDefaultPeriods() {
    const { getI18nText } = this.asProps;
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return [
      {
        children: getI18nText('lastMonth'),
        value: [
          dayjs(today).subtract(1, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
      {
        children: getI18nText('last3Months'),
        value: [
          dayjs(today).subtract(2, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
      {
        children: getI18nText('last6Months'),
        value: [
          dayjs(today).subtract(5, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
      {
        children: getI18nText('last12Months'),
        value: [
          dayjs(today).subtract(11, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
    ];
  }

  getTitleProps(props, index) {
    const { displayedPeriod, locale } = this.asProps;
    return {
      ...super.getTitleProps(props, index),
      children: new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
        dayjs(displayedPeriod).add(index, this.navigateStep).startOf(this.navigateStep).toDate(),
      ),
    };
  }

  getRangeInput() {
    return <RangeInput.DateRange />;
  }
}

function PrimaryDateRange(props) {
  const { Root: SPrimaryDateRange, styles } = props;
  return sstyled(styles)(<SPrimaryDateRange render={RangeInput} />);
}

function SecondaryDateRange(props) {
  const { Root: SSecondaryDateRange, styles } = props;
  return sstyled(styles)(<SSecondaryDateRange render={RangeInput} />);
}

function RangeCalendar(props) {
  const { Root: SRangeCalendar, styles } = props;
  return sstyled(styles)(
    <SRangeCalendar render={Flex}>
      <Flex direction='column'>
        <DateRangeComparator.CalendarHeader tag={Flex}>
          <DateRangeComparator.Prev />
          <DateRangeComparator.Title />
        </DateRangeComparator.CalendarHeader>
        <DateRangeComparator.Calendar />
      </Flex>
      <Flex direction='column'>
        <DateRangeComparator.CalendarHeader tag={Flex}>
          <DateRangeComparator.Title />
          <DateRangeComparator.Next />
        </DateRangeComparator.CalendarHeader>
        <DateRangeComparator.Calendar />
      </Flex>
    </SRangeCalendar>,
  );
}
function Periods(props) {
  const { Root: SPeriods, styles } = props;
  return sstyled(styles)(
    <SPeriods render={Flex}>
      <Divider m='-16px 16px' orientation='vertical' h='auto' />
      <Flex direction='column'>
        <DateRangeComparator.Period />
      </Flex>
    </SPeriods>,
  );
}

const DateRangeComparator = createComponent(
  MonthDateRangeComparatorRoot,
  {
    Popper,
    CalendarHeader,
    Title,
    Header,
    Prev,
    Next,
    Calendar,
    Period,
    Apply,
    Reset,

    Trigger,
    PrimaryDateRange,
    CompareToggle,
    SecondaryDateRange,
    Body,
    RangeCalendar,
    Periods,
    Footer,
  },
  {
    parent: Calendar,
  },
);

export default DateRangeComparator;
