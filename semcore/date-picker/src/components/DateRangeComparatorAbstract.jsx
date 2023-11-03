import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, CORE_INSTANCE, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';
import Divider from '@semcore/divider';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from '../translations/__intergalactic-dynamic-locales';

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

export { Apply, Reset };

export default RangePickerAbstract;
