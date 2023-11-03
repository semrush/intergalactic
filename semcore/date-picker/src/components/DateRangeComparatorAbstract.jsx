import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from '../translations/__intergalactic-dynamic-locales';
import shortDateRangeFormat from '../utils/shortDateRangeFormat';
import Checkbox from '@semcore/checkbox';
import { LinkTrigger } from '@semcore/base-trigger';

import style from '../style/date-picker.shadow.css';

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

class RangePickerAbstract extends Component {
  static displayName = 'DatePicker';
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
      defaultCompare: null,
      defaultHighlighted: [],
      defaultCompareHighlighted: [],
      defaultDisplayedPeriod:
        getLatestDate(primaryRange, defaultPrimaryRange, secondaryRange, defaultSecondaryRange) ||
        defaultDisplayedPeriod,
      defaultVisible: false,
      disabled: [],
      size: 'm',
    };
  }

  static enhance = [i18nEnhance(localizedMessages)];

  state = {
    dirtyValue: [],
    dirtyCompare: [],
    range: 'value', // compare
  };

  getPeriodProps() {
    const {
      periods = this.getDefaultPeriods(),
      onHighlightedChange,
      onCompareHighlightedChange,
      onDisplayedPeriodChange,
    } = this.asProps;
    const { dirtyValue, dirtyCompare, range } = this.state;

    let value = dirtyValue.length ? dirtyValue : this.asProps.value;
    if (range === 'compare') {
      value = dirtyCompare.length ? dirtyCompare : this.asProps.compare;
    }
    return {
      periods,
      value,
      onChange: (value) => {
        if (range === 'compare') {
          this.setState({ dirtyCompare: value });
        } else {
          this.setState({ dirtyValue: value });
        }
      },
      onHighlightedChange: range === 'compare' ? onCompareHighlightedChange : onHighlightedChange,
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
            this.setState({ dirtyValue: [], dirtyCompare: [], range: 'value' });
            this.handlers.displayedPeriod(
              getLatestDate(this.asProps.value ?? undefined) || this.props.defaultDisplayedPeriod,
            );
          }
        },
      ],
      highlighted: null,
      compareHighlighted: null,
      value: [
        null,
        (value) => {
          this.handlers.displayedPeriod(getLatestDate(value));
        },
      ],
      compare: [
        null,
        (value) => {
          this.handlers.displayedPeriod(getLatestDate(value));
        },
      ],
    };
  }

  getApplyProps() {
    const { value, getI18nText } = this.asProps;
    const { dirtyValue, dirtyCompare } = this.state;
    return {
      getI18nText,
      onClick: () =>
        this.handleApply(
          dirtyValue.length ? dirtyValue : value,
          dirtyCompare.length ? dirtyCompare : [],
        ),
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
    this.handlers.value(value);
    this.handlers.compare(compare);
    this.handlers.visible(false);
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

  getTitleProps(props, index) {
    const { locale, displayedPeriod } = this.asProps;
    return {
      children: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        dayjs(displayedPeriod).add(index, this.navigateStep).startOf(this.navigateStep).toDate(),
      ),
    };
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

  getRangeInput() {
    throw new Error('not implemented');
  }

  getPrimaryDateRangeProps() {
    const { value, onChange, onDisplayedPeriodChange, locale, disabled, size, getI18nText } =
      this.asProps;
    const { range, dirtyValue } = this.state;

    return {
      focused: range === 'value' ? true : undefined,
      value: dirtyValue.length ? dirtyValue : value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      w: size === 'm' ? 270 : 300,
      disabledDates: disabled,
      children: this.getRangeInput(),
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
      children: this.getRangeInput(),
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

  render() {
    const { Children, styles, 'aria-label': providedAriaLabel, value, compare } = this.asProps;

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
    <SRangeComparatorHeader render={Flex} gap={4}>
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
    <SFooter render={Box}>
      <Children />
    </SFooter>,
  );
}

export { Apply, Reset, Trigger, CompareToggle, Body, Footer, Header };

export default RangePickerAbstract;
