import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from '../translations/__intergalactic-dynamic-locales';
import shortDateRangeFormat from '../utils/shortDateRangeFormat';
import Checkbox from '@semcore/checkbox';
import { LinkTrigger } from '@semcore/base-trigger';
import { includesDate } from '../utils/includesDate';
import { formatDDMMYY, formatMMYY } from '../utils/formatDate';

import style from '../style/date-picker.shadow.css';

const INTERACTION_TAGS = ['INPUT'];
const INTERACTION_KEYS = ['ArrowDown', 'Enter', ' '];
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

  static subtract = (date, amount, unit) => {
    return dayjs(date).subtract(amount, unit).toDate();
  };

  popperRef = React.createRef();
  unitRefs = {};

  getPeriodProps() {
    const {
      periods = this.getDefaultPeriods(),
      onHighlightedChange,
      onCompareHighlightedChange,
      onDisplayedPeriodChange,
      preselectedValue,
      preselectedCompare,
      focusedRange,
      getI18nText,
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
      role: 'listbox',
      'aria-label': getI18nText('periods'),
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
    const { navigateStep } = this;
    return {
      getI18nText,
      onClick: this.bindHandlerNavigateClick(-1),
      'aria-label': navigateStep === 'month' ? getI18nText('prevMonth') : getI18nText('prevYear'),
    };
  }
  getNextProps() {
    const { getI18nText } = this.asProps;
    const { navigateStep } = this;
    return {
      getI18nText,
      onClick: this.bindHandlerNavigateClick(1),
      'aria-label': navigateStep === 'month' ? getI18nText('nextMonth') : getI18nText('nextYear'),
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
          } else {
            this.handlers.compareToggle(!!this.asProps.value?.compare?.length);
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

  handleApplyClick = () => {
    const { value, preselectedValue, preselectedCompare } = this.asProps;
    return this.handleApply(preselectedValue ?? value?.value, preselectedCompare ?? value?.compare);
  };

  getApplyProps() {
    const { getI18nText } = this.asProps;
    return {
      getI18nText,
      onClick: this.handleApplyClick,
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

  isDisabled(date) {
    const { disabled } = this.asProps;

    return disabled.some(includesDate(dayjs(date), 'date'));
  }

  handleKeydownDown = (place) => (e) => {
    const { displayedPeriod, preselectedValue, visible, focusedRange } = this.asProps;
    const key = e.key;
    const highlighted =
      focusedRange === 'compare' ? this.asProps.compareHighlighted : this.asProps.highlighted;

    if (place === 'trigger' && INTERACTION_KEYS.includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      this.handlers.visible(!visible);

      setTimeout(() => {
        const popper = this.popperRef.current;

        if (popper) {
          popper.focus();
        }
      }, 0);
    }

    const day = this.keyDiff[key];

    const setNextDisplayedPeriod = (next_highlighted) => {
      const [startPeriod, endPeriod] = next_highlighted;
      const highlightedPeriod = endPeriod || startPeriod;

      let displayedPeriodNormalized = displayedPeriod?.getDate();
      let highlightedPeriodNormalized = highlightedPeriod?.getDate();
      if (this.navigateStep === 'month') {
        displayedPeriodNormalized = displayedPeriod?.getMonth();
        highlightedPeriodNormalized = highlightedPeriod?.getMonth();
      }
      if (this.navigateStep === 'year') {
        displayedPeriodNormalized = displayedPeriod?.getYear();
        highlightedPeriodNormalized = highlightedPeriod?.getYear();
      }
      const offset = highlightedPeriodNormalized - displayedPeriodNormalized;

      if (offset < 0 || offset > 1) {
        return highlightedPeriod;
      }
      return displayedPeriod;
    };

    if (place === 'popper' && e.key === ' ' && highlighted.length) {
      const highlightedDate = highlighted[1] || highlighted[0];

      if (!this.isDisabled(highlightedDate)) {
        this.handleChange(highlightedDate);
      }
      e.preventDefault();
    }
    if (place === 'popper' && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      return this.handleApplyClick();
    }
    let changedDate = undefined;
    if (day) {
      if (INTERACTION_TAGS.includes(e.target.tagName)) return;
      if (highlighted.length) {
        let next_highlighted;
        if (preselectedValue?.length === 1) {
          next_highlighted = [
            preselectedValue[0],
            dayjs(highlighted[1] || highlighted[0])
              .add(day, this.keyStep)
              .toDate(),
          ];
          changedDate = next_highlighted[1];
        } else {
          next_highlighted = [
            dayjs(highlighted[0])
              .add(day, this.keyStep)
              .toDate(),
          ];
          changedDate = next_highlighted[0];
        }
        if (focusedRange === 'compare') {
          this.handlers.compareHighlighted(next_highlighted);
        } else {
          this.handlers.highlighted(next_highlighted);
        }
        this.handlers.displayedPeriod(setNextDisplayedPeriod(next_highlighted));
      } else {
        const highlighted = [displayedPeriod ? displayedPeriod : dayjs().toDate()];
        if (focusedRange === 'compare') {
          this.handlers.compareHighlighted(highlighted);
        } else {
          this.handlers.highlighted(highlighted);
        }
        changedDate = highlighted[0];
      }
      e.preventDefault();

      if (changedDate) {
        const formatter = this.keyStep === 'month' ? formatMMYY : formatDDMMYY;
        const formattedDate = formatter(changedDate, this.asProps.locale);
        this.unitRefs[formattedDate]?.focus();
      }
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

  triggerFormattingProps = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  getTriggerProps({ placeholder = 'Select date ranges', separator = 'vs.' }) {
    const { locale, visible } = this.asProps;
    const value = this.asProps.value?.value;
    const compare = this.asProps.value?.compare;
    const formattingProps = {
      locale,
      ...this.triggerFormattingProps,
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
      onKeyDown: this.handleKeydownDown('trigger'),
    };
  }

  getRangeInput() {
    throw new Error('not implemented');
  }

  getRangeInputProps() {
    return {
      inputRole: null,
    };
  }

  getValueDateRangeProps() {
    const {
      value,
      onDisplayedPeriodChange,
      locale,
      disabled,
      disabledErrorText,
      getI18nText,
      focusedRange,
      preselectedValue,
      animationsDisabled,
      visible,
    } = this.asProps;

    return {
      popoverVisible: visible,
      focused: focusedRange === 'value' ? true : undefined,
      value: preselectedValue ?? value?.value,
      onChange: (value) => this.handlers.preselectedValue(value),
      onDisplayedPeriodChange,
      locale,
      disabledDates: disabled,
      disabledErrorText,
      children: this.getRangeInput(),
      getI18nText,
      onFocus: () => {
        this.handlers.focusedRange('value');
      },
      animationsDisabled,
    };
  }

  getCompareDateRangeProps() {
    const {
      value,
      onDisplayedPeriodChange,
      locale,
      disabled,
      disabledErrorText,
      getI18nText,
      focusedRange,
      preselectedCompare,
      compareToggle,
      animationsDisabled,
      visible,
    } = this.asProps;

    return {
      popoverVisible: visible,
      focused: focusedRange === 'compare' ? true : undefined,
      disabled: !(compareToggle ?? value?.compare?.length),
      value: preselectedCompare ?? value?.compare,
      onChange: (value) => this.handlers.preselectedCompare(value),
      onDisplayedPeriodChange,
      locale,
      disabledDates: disabled,
      children: this.getRangeInput(),
      getI18nText,
      disabledErrorText,
      onFocus: () => {
        this.handlers.focusedRange('compare');
      },
      animationsDisabled,
    };
  }

  getCompareToggleProps() {
    const { getI18nText, value, compareToggle } = this.asProps;

    return {
      getI18nText,
      checked: compareToggle,
      onChange: (checked) => {
        if (checked) {
          this.handlers.compareToggle(true);
          this.handlers.focusedRange('compare');
        } else {
          this.handlers.compareToggle(false);
          this.handlers.focusedRange('value');
          this.handlers.preselectedCompare([]);
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
      getI18nText,
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
      unitRefs: this.unitRefs,
      getI18nText,
      actionsDescribing: index === 0 ? 'range-compare' : null,
      tabIndex: index === 0 ? 0 : -1,
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
      onKeyDown: this.handleKeydownDown('popper'),
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
