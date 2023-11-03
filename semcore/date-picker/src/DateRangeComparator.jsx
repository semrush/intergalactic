import React, { Children } from 'react';
import dayjs from 'dayjs';
import createComponent, { sstyled, Root } from '@semcore/core';
import shortDateRangeFormat from './utils/shortDateRangeFormat';
import { Header, Next, Period, Popper, Prev, Title, Trigger as ButtonTrigger } from './components';
import { CalendarDays as Calendar } from './components/Calendar';
import RangeComparatorAbstract, { Apply, Reset } from './components/DateRangeComparatorAbstract';
import { Flex, Box } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import Divider from '@semcore/divider';
import InputTriggerBase from './components/InputTrigger';
import Dropdown from '@semcore/dropdown';
import { LinkTrigger } from '@semcore/base-trigger';

function RangeInput() {
  return (
    <Root
      render={Box}
      tag={InputTriggerBase}
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

class DateRangeComparatorRoot extends RangeComparatorAbstract {
  static displayName = 'DateRangeComparator';
  static defaultProps = (props) => {
    return {
      defaultValue: undefined,
      defaultCompare: undefined,
      defaultHighlighted: [],
      defaultCompareHighlighted: [],
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

  getDefaultPeriods() {
    const { getI18nText } = this.asProps;
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return [
      {
        children: getI18nText('last2Days'),
        value: [dayjs(today).subtract(1, 'day').toDate(), today],
      },
      {
        children: getI18nText('lastWeek'),
        value: [dayjs(today).subtract(6, 'day').toDate(), today],
      },
      {
        children: getI18nText('last2Weeks'),
        value: [dayjs(today).subtract(13, 'day').toDate(), today],
      },
      {
        children: getI18nText('lastMonth'),
        value: [dayjs(today).subtract(1, 'month').toDate(), today],
      },
      {
        children: getI18nText('last2Months'),
        value: [dayjs(today).subtract(2, 'month').toDate(), today],
      },
    ];
  }

  getTriggerProps() {
    const { value, compare, locale, separator = 'vs.', visible, onVisibleChange } = this.asProps;
    const formattingProps = {
      locale,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    let children = 'Select date ranges';
    if (value?.length) {
      children = shortDateRangeFormat(value, formattingProps);
    }
    if (compare?.length) {
      children = `${children || ''} ${separator} ${shortDateRangeFormat(compare, formattingProps)}`;
    }
    return {
      children,
      visible,
      onVisibleChange: console.log,
    };
  }

  getPrimaryDateRangeProps() {
    const { value, onChange, onDisplayedPeriodChange, locale, disabled, size, getI18nText } =
      this.asProps;
    const { range, dirtyValue } = this.state;

    return {
      // ...super.getButtonTriggerProps(),
      focused: range === 'value' ? true : undefined,
      value: dirtyValue.length ? dirtyValue : value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      w: size === 'm' ? 270 : 300,
      disabledDates: disabled,
      children: () => <RangeInput.DateRange />,
      getI18nText,
      onFocus: () => {
        this.setState({ range: 'value' });
        return false;
      },
    };
  }
  getSecondaryDateRangeProps() {
    const {
      compare,
      onCompareChange,
      onDisplayedPeriodChange,
      locale,
      disabled,
      size,
      getI18nText,
    } = this.asProps;
    const { range, dirtyCompare } = this.state;

    return {
      focused: range === 'compare' ? true : undefined,
      disabled: !(compare?.length || dirtyCompare.length || range === 'compare'),
      value: dirtyCompare.length ? dirtyCompare : compare,
      onChange: onCompareChange,
      onDisplayedPeriodChange,
      locale,
      w: size === 'm' ? 270 : 300,
      disabledDates: disabled,
      children: () => <RangeInput.DateRange />,
      getI18nText,
      onFocus: () => {
        this.setState({ range: 'compare' });
        return false;
      },
    };
  }
  getCompareToggleProps() {
    const { getI18nText, compare } = this.asProps;
    const { range, dirtyCompare } = this.state;

    return {
      getI18nText,
      checked: compare?.length || dirtyCompare.length || range === 'compare',
      onChange: (checked) => {
        if (checked) {
          this.setState({ range: 'compare' });
        } else {
          this.setState({ range: 'value', dirtyCompare: [] });
        }
      },
    };
  }

  getCalendarProps(_props, index) {
    const {
      locale,
      displayedPeriod,
      disabled,
      value,
      compare,
      onCompareHighlightedChange,
      highlighted,
      compareHighlighted,
      onHighlightedChange,
    } = this.asProps;
    const { dirtyValue, dirtyCompare, range } = this.state;

    return {
      locale,
      displayedPeriod: dayjs(displayedPeriod)
        .add(index, this.navigateStep)
        .startOf(this.navigateStep)
        .toDate(),
      disabled,
      onChange: this.handleChange,
      highlighted,
      compareHighlighted,
      onCompareHighlightedChange,
      onHighlightedChange,
      range,
      value: dirtyValue.length ? dirtyValue : value,
      compare: dirtyCompare.length ? dirtyCompare : compare,
    };
  }
  handleChange = (date) => {
    const { dirtyValue, dirtyCompare, range } = this.state;
    let highlighted = [];
    let dirty = range === 'compare' ? dirtyCompare : dirtyValue;
    if (Array.isArray(date)) {
      dirty = date;
    } else if (!dirty.length) {
      dirty = [date];
      highlighted = [date];
    } else if (dirty.length >= 2) {
      dirty = [date];
      highlighted = [date];
    } else if (dirty[0] > date) {
      dirty = [date, dirty[0]];
    } else {
      dirty = [dirty[0], date];
    }
    const state = {};
    if (range === 'compare') {
      state['dirtyCompare'] = dirty;
    } else {
      state['dirtyValue'] = dirty;
    }

    this.setState(state, () => {
      if (range === 'compare') {
        this.handlers.compareHighlighted(highlighted);
      } else {
        this.handlers.highlighted(highlighted);
      }
    });
  };
}

function Trigger(props) {
  const { Root: STrigger, styles } = props;
  return sstyled(styles)(<STrigger render={Dropdown.Trigger} tag={LinkTrigger} />);
}

function PrimaryDateRange(props) {
  const { Root: SPrimaryDateRange, styles } = props;
  return sstyled(styles)(<SPrimaryDateRange render={RangeInput} />);
}

function CompareToggle(props) {
  const { Root: SCompareToggle, styles, getI18nText } = props;
  return sstyled(styles)(<SCompareToggle render={Checkbox} label={getI18nText('compare')} />);
}
function SecondaryDateRange(props) {
  const { Root: SSecondaryDateRange, styles } = props;
  return sstyled(styles)(<SSecondaryDateRange render={RangeInput} />);
}
function Body(props) {
  const { Root: SBody, Children, styles } = props;
  return sstyled(styles)(
    <SBody render={Flex} gap={4}>
      <Children />
    </SBody>,
  );
}
function RangeCalendar(props) {
  const { Root: SRangeCalendar, styles } = props;
  return sstyled(styles)(
    <SRangeCalendar render={Flex}>
      <Flex direction='column'>
        <DateRangeComparator.Header tag={Flex}>
          <DateRangeComparator.Prev />
          <DateRangeComparator.Title />
        </DateRangeComparator.Header>
        <DateRangeComparator.Calendar />
      </Flex>
      <Flex direction='column'>
        <DateRangeComparator.Header tag={Flex}>
          <DateRangeComparator.Title />
          <DateRangeComparator.Next />
        </DateRangeComparator.Header>
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
function Footer(props) {
  const { Root: SFooter, styles, Children } = props;
  return sstyled(styles)(
    <SFooter render={Box}>
      <Children />
    </SFooter>,
  );
}

const DateRangeComparator = createComponent(
  DateRangeComparatorRoot,
  {
    // Trigger: InputTrigger,
    // ButtonTrigger,
    Popper,
    Header,
    Title,
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
