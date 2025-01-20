import React from 'react';
import { createComponent, Root, sstyled } from '@semcore/core';
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
      unit='date'
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
    ArrowLeft: -1,
    ArrowUp: -7,
    ArrowRight: 1,
    ArrowDown: 7,
  };

  getRangeInput() {
    return <DateRangeComparator.RangeInput.DateRange />;
  }

  getRangeCalendarProps() {
    return {
      children: (
        <>
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
        </>
      ),
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      children: (
        <>
          <DateRangeComparator.Header />
          <DateRangeComparator.Body showButtons={true} />
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

  getBodyProps({ showButtons }) {
    return {
      children: (
        <Flex>
          <DateRangeComparator.RangeCalendar />
          <DateRangeComparator.Periods showButtons={showButtons} />
        </Flex>
      ),
    };
  }

  getPeriodsProps({ showButtons, unclearable = false }) {
    return {
      children: (
        <>
          <DateRangeComparator.Periods.Divider />
          <DateRangeComparator.Periods.Column>
            <DateRangeComparator.Periods.Options />
            {showButtons && (
              <DateRangeComparator.Periods.Controls>
                <DateRangeComparator.Apply />
                {!unclearable && <DateRangeComparator.Reset />}
              </DateRangeComparator.Periods.Controls>
            )}
          </DateRangeComparator.Periods.Column>
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
    <SPeriodsColumn render={Flex} direction='column' justifyContent='space-between' />,
  );
}
function PeriodsOptions(props) {
  const { styles, Root: SPeriodsOptions } = props;
  return sstyled(styles)(<SPeriodsOptions render={DateRangeComparator.Period} p={2} />);
}
function PeriodsControls(props) {
  const { styles, Root: SPeriodsControls } = props;
  return sstyled(styles)(<SPeriodsControls render={Flex} p={4} gap={2} />);
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

export default DateRangeComparator;
