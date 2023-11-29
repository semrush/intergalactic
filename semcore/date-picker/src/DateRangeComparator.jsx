import React from 'react';
import createComponent, { Root, sstyled } from '@semcore/core';
import { Header as CalendarHeader, Next, Period, Popper, Prev, Title } from './components';
import { CalendarDays as Calendar } from './components/Calendar';
import { Box, Flex } from '@semcore/flex-box';
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

function RangeInput(props) {
  const { styles } = props;
  const SComparatorRangeInput = Root;
  const SRangeIndicator = Box;
  return sstyled(styles)(
    <SComparatorRangeInput
      data-name='SComparatorRangeInput'
      render={Box}
      tag={InputTriggerBase}
      __excludeProps={['role', 'aria-haspopup', 'onChange', 'value']}
    >
      <InputTriggerBase.DateRange>
        <SRangeIndicator range={props.range} w={12} h={12} ml={2} />
        <InputTriggerBase.DateRange.Indicator />
        <InputTriggerBase.DateRange.FromMaskedInput />
        <InputTriggerBase.DateRange.RangeSep />
        <InputTriggerBase.DateRange.ToMaskedInput />
      </InputTriggerBase.DateRange>
    </SComparatorRangeInput>,
  );
}
RangeInput.Indicator = InputTriggerBase.Indicator;
RangeInput.MaskedInput = InputTriggerBase.MaskedInput;
RangeInput.Addon = InputTriggerBase.Addon;
RangeInput.SingleDateInput = InputTriggerBase.SingleDateInput;
RangeInput.DateRange = InputTriggerBase.DateRange;
RangeInput.DateRangeFromInput = InputTriggerBase.DateRangeFromInput;
RangeInput.DateRangeToInput = InputTriggerBase.DateRangeToInput;
class DateRangeComparatorRoot extends RangeComparatorAbstract {
  static displayName = 'DateRangeComparator';
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

  navigateStep = 'month';
  keyStep = 'day';
  keyDiff = {
    37: -1,
    38: -7,
    39: 1,
    40: 7,
  };

  getRangeInput() {
    return <DateRangeComparator.RangeInput.DateRange />;
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      children: (
        <>
          <DateRangeComparator.Header />
          <DateRangeComparator.Body />
          <DateRangeComparator.Footer />
        </>
      ),
    };
  }

  getHeaderProps() {
    return {
      children: (
        <>
          <DateRangeComparator.ValueDateRange />
          <DateRangeComparator.CompareToggle />
          <DateRangeComparator.CompareDateRange />
        </>
      ),
    };
  }

  getBodyProps() {
    return {
      children: (
        <>
          <DateRangeComparator.RangeCalendar />
          <DateRangeComparator.Periods />
        </>
      ),
    };
  }

  getFooterProps({ unclearable = false }) {
    return {
      children: (
        <>
          <DateRangeComparator.Apply />
          {!unclearable && <DateRangeComparator.Reset />}
        </>
      ),
    };
  }
}

function ValueDateRange(props) {
  const { Root: SValueDateRange, styles } = props;
  return sstyled(styles)(<SValueDateRange render={DateRangeComparator.RangeInput} range='value' />);
}

function CompareDateRange(props) {
  const { Root: SSecondaryDateRange, styles } = props;
  return sstyled(styles)(
    <SSecondaryDateRange render={DateRangeComparator.RangeInput} range='compare' />,
  );
}

function RangeCalendar(props) {
  const { Root: SRangeCalendar, styles } = props;
  return sstyled(styles)(
    <SRangeCalendar render={Flex} gap={8}>
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
  const SPeriodsList = DateRangeComparator.Period;
  return sstyled(styles)(
    <SPeriods render={Flex}>
      <Divider orientation='vertical' h='auto' />
      <Flex direction='column'>
        <SPeriodsList />
      </Flex>
    </SPeriods>,
  );
}

const DateRangeComparator = createComponent(
  DateRangeComparatorRoot,
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
    ValueDateRange,
    CompareToggle,
    CompareDateRange,
    Body,
    RangeCalendar,
    Periods,
    Footer,
    RangeInput,
  },
  {
    parent: Calendar,
  },
);

export default DateRangeComparator;
