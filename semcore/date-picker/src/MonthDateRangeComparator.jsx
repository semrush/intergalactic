import React from 'react';
import { createComponent, Root, sstyled } from '@semcore/core';
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

function RangeInput(props) {
  const { styles } = props;
  const SComparatorRangeInput = Root;
  const SRangeIndicator = Box;
  return sstyled(styles)(
    <SComparatorRangeInput
      data-name='SComparatorRangeInput'
      render={Box}
      tag={InputTriggerBase}
      parts={dateParts}
      unit='month'
      __excludeProps={['role', 'aria-haspopup', 'aria-expanded', 'onChange', 'value', 'id']}
    >
      <InputTriggerBase.DateRange>
        <SRangeIndicator range={props.range} disabled={props.disabled} w={12} h={12} ml={2} />
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

class MonthDateRangeComparatorRoot extends RangeComparatorAbstract {
  static displayName = 'MonthDateRangeComparator';
  static defaultProps = (props) => {
    return {
      ...RangeComparatorAbstract.defaultProps(props),
      children: (
        <>
          <MonthDateRangeComparator.Trigger />
          <MonthDateRangeComparator.Popper />
        </>
      ),
    };
  };

  navigateStep = 'year';
  keyStep = 'month';
  keyDiff = {
    ArrowLeft: -1,
    ArrowUp: -3,
    ArrowRight: 1,
    ArrowDown: 3,
  };

  triggerFormattingProps = {
    month: 'short',
    year: 'numeric',
  };

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
    return <MonthDateRangeComparator.RangeInput.DateRange />;
  }

  getRangeCalendarProps() {
    return {
      children: (
        <>
          <Flex direction='column'>
            <MonthDateRangeComparator.CalendarHeader tag={Flex}>
              <MonthDateRangeComparator.Prev />
              <MonthDateRangeComparator.Title />
            </MonthDateRangeComparator.CalendarHeader>
            <MonthDateRangeComparator.Calendar />
          </Flex>
          <Flex direction='column'>
            <MonthDateRangeComparator.CalendarHeader tag={Flex}>
              <MonthDateRangeComparator.Title />
              <MonthDateRangeComparator.Next />
            </MonthDateRangeComparator.CalendarHeader>
            <MonthDateRangeComparator.Calendar />
          </Flex>
        </>
      ),
    };
  }

  getValueDateRangeProps() {
    const props = super.getValueDateRangeProps();
    return {
      ...props,
      w: props.w - 60,
    };
  }

  getCompareDateRangeProps() {
    const props = super.getCompareDateRangeProps();
    return {
      ...props,
      w: props.w - 60,
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      children: (
        <>
          <MonthDateRangeComparator.Header />
          <MonthDateRangeComparator.Body showButtons={true} />
        </>
      ),
    };
  }

  getHeaderProps() {
    return {
      children: (
        <>
          <MonthDateRangeComparator.ValueDateRange />
          <MonthDateRangeComparator.CompareToggle />
          <MonthDateRangeComparator.CompareDateRange />
        </>
      ),
    };
  }

  getBodyProps({ showButtons }) {
    return {
      children: (
        <>
          <MonthDateRangeComparator.RangeCalendar />
          <MonthDateRangeComparator.Periods showButtons={showButtons} />
        </>
      ),
    };
  }

  getPeriodsProps({ showButtons, unclearable = false }) {
    return {
      children: (
        <>
          <MonthDateRangeComparator.Periods.Divider />
          <MonthDateRangeComparator.Periods.Column>
            <MonthDateRangeComparator.Periods.Options />
            {showButtons && (
              <MonthDateRangeComparator.Periods.Controls>
                <MonthDateRangeComparator.Apply />
                {!unclearable && <MonthDateRangeComparator.Reset />}
              </MonthDateRangeComparator.Periods.Controls>
            )}
          </MonthDateRangeComparator.Periods.Column>
        </>
      ),
    };
  }

  getFooterProps({ unclearable = false }) {
    return {
      children: (
        <>
          <MonthDateRangeComparator.Apply />
          {!unclearable && <MonthDateRangeComparator.Reset />}
        </>
      ),
    };
  }
}

function ValueDateRange(props) {
  const { Root: SValueDateRange, styles } = props;
  return sstyled(styles)(
    <SValueDateRange render={MonthDateRangeComparator.RangeInput} range='value' />,
  );
}

function CompareDateRange(props) {
  const { Root: SCompareDateRange, styles } = props;
  return sstyled(styles)(
    <SCompareDateRange render={MonthDateRangeComparator.RangeInput} range='compare' />,
  );
}

function RangeCalendar(props) {
  const { Root: SRangeCalendar, Children, styles } = props;
  return sstyled(styles)(
    <SRangeCalendar render={Flex} gap={8}>
      <Children />
    </SRangeCalendar>,
  );
}
function Periods(props) {
  const { Root: SPeriods, styles } = props;
  return sstyled(styles)(<SPeriods render={Flex} />);
}
function PeriodsDivider(props) {
  const { Root: SPeriodsDivider, styles } = props;
  return sstyled(styles)(<SPeriodsDivider orientation='vertical' h='auto' render={Divider} />);
}
function PeriodsColumn(props) {
  const { Root: SPeriodsColumn, styles } = props;
  return sstyled(styles)(
    <SPeriodsColumn render={Flex} direction='column' justifyContent='space-between' p={1} />,
  );
}
function PeriodsOptions(props) {
  const { styles, Root: SPeriodsList } = props;
  return sstyled(styles)(<SPeriodsList render={MonthDateRangeComparator.Period} />);
}
function PeriodsControls(props) {
  const { styles, Root: SPeriodsControls } = props;
  return sstyled(styles)(<SPeriodsControls render={Flex} p={4} gap={2} />);
}

const MonthDateRangeComparator = createComponent(
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
    ValueDateRange,
    CompareToggle,
    CompareDateRange,
    Body,
    RangeCalendar,
    Periods: [
      Periods,
      {
        Divider: PeriodsDivider,
        Column: PeriodsColumn,
        Options: PeriodsOptions,
        Controls: PeriodsControls,
      },
    ],
    Footer,
    RangeInput,
  },
  {
    parent: Calendar,
  },
);

export default MonthDateRangeComparator;
