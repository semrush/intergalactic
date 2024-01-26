import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from '../translations/__intergalactic-dynamic-locales';
import shortDateRangeFormat from '../utils/shortDateRangeFormat';
import Checkbox from '@semcore/checkbox';
import { LinkTrigger } from '@semcore/base-trigger';

import style from '../style/date-picker.shadow.css';

const INTERACTION_KEYS = ['ArrowDown', 'Enter', 'Space'];
const defaultDisplayedPeriod = new Date(new Date().setHours(0, 0, 0, 0));

const getLatestDate = (...dateRanges) => {
  const allDates = dateRanges
    .flat()
    .filter(Boolean)
    .filter((date) => !Number.isNaN(new Date(date).getTime()));
  if (!allDates.length) return null;

  allDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const latestDate = allDates[0];

  return latestDate;
};

class DateRangeComparatorAbstract extends Component {
  static displayName = 'DateRangeComparator';
  static style = style;

  static defaultProps({
    primaryRange,
    defaultPrimaryRange,
    secondaryRange,
    defaultSecondaryRange,
  }) {
    return {
      i18n: localizedMessages,
      locale: 'en',
      defaultValue: null,
      defaultHighlighted: [],
      defaultCompareHighlighted: [],
      defaultDisplayedPeriod:
        getLatestDate(primaryRange, defaultPrimaryRange, secondaryRange, defaultSecondaryRange) ||
        defaultDisplayedPeriod,
      defaultVisible: false,
      defaultPreselectedValue: null,
      defaultPreselectedCompare: null,
      defaultCompareToggle: null,
      defaultFocusedRange: 'value',
      disabled: [],
      size: 'm',
    };
  }

  static enhance = [i18nEnhance(localizedMessages)];

  popperRef = React.createRef();

  getPeriodProps() {
    const {
      periods = this.getDefaultPeriods(),
      onHighlightedChange,
      onCompareHighlightedChange,
      onDisplayedPeriodChange,
      preselectedValue,
      preselectedCompare,
      focusedRange,
    } = this.asProps;

    let value = preselectedValue ?? this.asProps.value?.value;
    if (focusedRange === 'compare') {
      value = preselectedCompare ?? this.asProps.value?.compare;
    }
    return {
      periods,
      value,
      onChange: (value) => {
        if (focusedRange === 'compare') {
          this.handlers.preselectedCompare(value);
        } else {
          this.handlers.preselectedValue(value);
        }
      },
      onHighlightedChange:
        focusedRange === 'compare' ? onCompareHighlightedChange : onHighlightedChange,
      onDisplayedPeriodChange,
    };
  }

  navigateView = (direction) => {
    const { displayedPeriod } = this.asProps;
    const action = direction >= 1 ? 'add' : 'subtract';
    const date = dayjs(displayedPeriod)[action](1, this.navigateStep).toDate();
    this.handlers.displayedPeriod(date);
  };

  bindHandlerNavigateClick = (direction) => () => this.navigateView(direction);

  getPrevProps() {
    const { getI18nText } = this.asProps;
    return {
      getI18nText,
      onClick: this.bindHandlerNavigateClick(-1),
    };
  }
  getNextProps() {
    const { getI18nText } = this.asProps;
    return {
      getI18nText,
      onClick: this.bindHandlerNavigateClick(1),
    };
  }

  uncontrolledProps() {
    return {
      displayedPeriod: null,
      visible: [
        null,
        (visible) => {
          if (!visible) {
            this.handlers.highlighted([]);
            this.handlers.compareHighlighted([]);
            this.handlers.preselectedValue(undefined);
            this.handlers.preselectedCompare(undefined);
            this.handlers.compareToggle(undefined);
            this.handlers.focusedRange('value');
          }

          const { value, displayedPeriod } = this.asProps;
          const newDisplayedPeriod = value ? getLatestDate(value.value, value.compare) : undefined;

          if (visible) {
            if (newDisplayedPeriod && newDisplayedPeriod !== displayedPeriod) {
              this.handlers.displayedPeriod(newDisplayedPeriod);
            } else if (!newDisplayedPeriod) {
              const { displayedPeriod, defaultDisplayedPeriod } = this.props;
              this.handlers.displayedPeriod(displayedPeriod || defaultDisplayedPeriod);
            }
          }
        },
      ],
      highlighted: null,
      compareHighlighted: null,
      preselectedValue: null,
      preselectedCompare: null,
      compareToggle: null,
      focusedRange: null,
      value: [
        null,
        (value) => {
          const dates = [value?.value, value?.compare].flat(2).filter((date) => date?.isValid?.());
          if (dates.length > 0) this.handlers.displayedPeriod(getLatestDate(value));
        },
      ],
    };
  }

  getApplyProps() {
    const { value, getI18nText, preselectedValue, preselectedCompare } = this.asProps;
    return {
      getI18nText,
      onClick: () =>
        this.handleApply(preselectedValue ?? value?.value, preselectedCompare ?? value?.compare),
    };
  }

  getResetProps() {
    const { getI18nText } = this.asProps;
    return {
      getI18nText,
      onClick: () => this.handleApply(null, null),
    };
  }

  handleApply = (value, compare) => {
    this.handlers.value({ value, compare });
    this.handlers.visible(false);
  };

  handleKeyDown = (e) => {
    const { visible } = this.asProps;
    const key = e.code;

    if (INTERACTION_KEYS.includes(key)) {
      e.stopPropagation();
      this.handlers.visible(!visible);

      setTimeout(() => {
        const popper = this.popperRef.current;

        if (popper) {
          popper.focus();
        }
      }, 0);
    }
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
    const { locale, displayedPeriod } = this.asProps;
    return {
      children: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        dayjs(displayedPeriod).add(index, this.navigateStep).startOf(this.navigateStep).toDate(),
      ),
    };
  }

  getTriggerProps({ placeholder = 'Select date ranges', separator = 'vs.' }) {
    const { locale, visible } = this.asProps;
    const value = this.asProps.value?.value;
    const compare = this.asProps.value?.compare;
    const formattingProps = {
      locale,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    let children = placeholder;
    if (value?.[0] && value?.[1]) {
      children = shortDateRangeFormat(value, formattingProps);
    }
    if (compare?.[0] && compare?.[1]) {
      children = `${children || ''} ${separator} ${shortDateRangeFormat(compare, formattingProps)}`;
    }
    return {
      children,
      visible,
      onClick: () => this.handlers.visible(!visible),
      onKeyDown: this.handleKeyDown,
    };
  }

  getRangeInput() {
    throw new Error('not implemented');
  }

  getValueDateRangeProps() {
    const {
      value,
      onDisplayedPeriodChange,
      locale,
      disabled,
      size,
      getI18nText,
      focusedRange,
      preselectedValue,
    } = this.asProps;

    return {
      focused: focusedRange === 'value' ? true : undefined,
      value: preselectedValue ?? value?.value,
      onChange: (value) => this.handlers.preselectedValue(value),
      onDisplayedPeriodChange,
      locale,
      w: size === 'm' ? 300 : 330,
      disabledDates: disabled,
      children: this.getRangeInput(),
      getI18nText,
      onFocus: () => {
        this.handlers.focusedRange('value');
        return false;
      },
    };
  }

  getCompareDateRangeProps() {
    const {
      value,
      onDisplayedPeriodChange,
      locale,
      disabled,
      size,
      getI18nText,
      focusedRange,
      preselectedCompare,
      compareToggle,
    } = this.asProps;

    return {
      focused: focusedRange === 'compare' ? true : undefined,
      disabled: !(compareToggle ?? value?.compare?.length),
      value: preselectedCompare ?? value?.compare,
      onChange: (value) => this.handlers.preselectedCompare(value),
      onDisplayedPeriodChange,
      locale,
      w: size === 'm' ? 300 : 330,
      disabledDates: disabled,
      children: this.getRangeInput(),
      getI18nText,
      onFocus: () => {
        this.handlers.focusedRange('compare');
        return false;
      },
    };
  }

  getCompareToggleProps() {
    const { getI18nText, value, compareToggle } = this.asProps;

    return {
      getI18nText,
      checked: compareToggle ?? value?.compare?.length,
      onChange: (checked) => {
        if (checked) {
          this.handlers.compareToggle(true);
          this.handlers.focusedRange('compare');
        } else {
          this.handlers.compareToggle(false);
          this.handlers.focusedRange('value');
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
      onCompareHighlightedChange,
      highlighted,
      compareHighlighted,
      onHighlightedChange,
      preselectedCompare,
      preselectedValue,
      focusedRange,
    } = this.asProps;

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
      range: focusedRange,
      value: preselectedValue ?? value?.value,
      compare: preselectedCompare ?? value?.compare,
    };
  }

  handleChange = (date) => {
    const { focusedRange, preselectedCompare, preselectedValue } = this.asProps;
    let highlighted = [];
    let value = focusedRange === 'compare' ? preselectedCompare : preselectedValue;
    if (Array.isArray(date)) {
      value = date;
    } else if (!value?.length) {
      value = [date];
      highlighted = [date];
    } else if (value?.length >= 2) {
      value = [date];
      highlighted = [date];
    } else if (value?.[0] > date) {
      value = [date, value?.[0]];
    } else {
      value = [value?.[0], date];
    }

    if (focusedRange === 'compare') {
      this.handlers.preselectedCompare(value);
      this.handlers.compareHighlighted(highlighted);
    } else {
      this.handlers.preselectedValue(value);
      this.handlers.highlighted(highlighted);
    }
  };

  getPopperProps() {
    return {
      p: 0,
      ref: this.popperRef,
    };
  }

  render() {
    const { Children, styles, 'aria-label': providedAriaLabel } = this.asProps;

    return (
      <>
        {sstyled(styles)(
          <Root
            render={Dropdown}
            use:aria-label={providedAriaLabel}
            __excludeProps={['onChange', 'value']}
          >
            <Children />
          </Root>,
        )}
      </>
    );
  }
}

function Apply(props) {
  const { getI18nText } = props;
  return <Root render={Button} use='primary' children={getI18nText('apply')} />;
}

function Reset(props) {
  const { getI18nText } = props;
  return <Root render={Button} use='tertiary' theme='muted' children={getI18nText('reset')} />;
}

function Trigger(props) {
  const { Root: STrigger, styles } = props;
  return sstyled(styles)(<STrigger render={Dropdown.Trigger} tag={LinkTrigger} />);
}

function CompareToggle(props) {
  const { Root: SCompareToggle, styles, getI18nText } = props;
  return sstyled(styles)(<SCompareToggle render={Checkbox} label={getI18nText('compare')} />);
}
function Header(props) {
  const { Root: SRangeComparatorHeader, Children, styles } = props;
  return sstyled(styles)(
    <SRangeComparatorHeader render={Flex} gap={4} alignItems='center'>
      <Children />
    </SRangeComparatorHeader>,
  );
}
function Body(props) {
  const { Root: SBody, Children, styles } = props;
  return sstyled(styles)(
    <SBody render={Flex} gap={4}>
      <Children />
    </SBody>,
  );
}

function Footer(props) {
  const { Root: SFooter, styles, Children } = props;
  return sstyled(styles)(
    <SFooter render={Flex} gap={2}>
      <Children />
    </SFooter>,
  );
}

export { Apply, Reset, Trigger, CompareToggle, Body, Footer, Header };

export default DateRangeComparatorAbstract;
