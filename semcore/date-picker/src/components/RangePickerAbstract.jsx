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

const INTERACTION_TAGS = ['INPUT'];

const defaultDisplayedPeriod = new Date(new Date().setHours(0, 0, 0, 0));

function getEndDate(value) {
  if (!Array.isArray(value)) return null;
  const [startDate, endDate = startDate] = value;
  return endDate;
}

class RangePickerAbstract extends Component {
  static displayName = 'DatePicker';
  static style = style;

  static defaultProps({ value, defaultValue }) {
    return {
      i18n: localizedMessages,
      locale: 'en',
      defaultDisplayedPeriod:
        getEndDate(value) || getEndDate(defaultValue) || defaultDisplayedPeriod,
      defaultValue: [],
      defaultHighlighted: [],
      defaultVisible: false,
      disabled: [],
      size: 'm',
    };
  }

  static enhance = [i18nEnhance()];

  static add = (date, amount, unit) => {
    return dayjs(date).add(amount, unit).toDate();
  };

  static subtract = (date, amount, unit) => {
    return dayjs(date).subtract(amount, unit).toDate();
  };

  navigateStep;
  keyDiff;
  keyStep;

  state = {
    dirtyValue: [],
  };

  uncontrolledProps() {
    return {
      displayedPeriod: null,
      visible: [
        null,
        (visible) => {
          if (!visible) {
            this.handlers.highlighted([]);
            this.setState({ dirtyValue: [] });
            this.handlers.displayedPeriod(
              getEndDate(this.asProps.value ?? undefined) || this.props.defaultDisplayedPeriod,
            );
          }
        },
      ],
      highlighted: null,
      value: [
        null,
        (value) => {
          this.handlers.visible(false);
          this.handlers.displayedPeriod(getEndDate([value[0] ?? undefined, value[1] ?? undefined]));
        },
      ],
    };
  }

  navigateView = (direction) => {
    const { displayedPeriod } = this.asProps;
    const action = direction >= 1 ? 'add' : 'subtract';
    const date = dayjs(displayedPeriod)[action](1, this.navigateStep).toDate();
    this.handlers.displayedPeriod(date);
  };

  bindHandlerNavigateClick = (direction) => () => this.navigateView(direction);

  handlerKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    const { displayedPeriod, highlighted } = this.asProps;
    const { dirtyValue } = this.state;
    const day = this.keyDiff[e.keyCode];

    const setNextDisplayedPeriod = (next_highlighted) => {
      const [, right_period] = next_highlighted;

      if (right_period) {
        const month_right_period = right_period.getMonth();
        const month_displayed_Period = displayedPeriod.getMonth();
        if (month_right_period - month_displayed_Period > 1) {
          return RangePickerAbstract.subtract(right_period, 1, 'month');
        } else if (month_right_period - month_displayed_Period < 0) {
          return right_period;
        }
      }
      return displayedPeriod;
    };

    if (e.keyCode === 32 && highlighted.length) {
      this.handlerChange(highlighted[1] || highlighted[0]);
      e.preventDefault();
    }
    if (day) {
      if (INTERACTION_TAGS.includes(e.target.tagName)) return;
      if (highlighted.length) {
        let next_highlighted;
        if (dirtyValue.length === 1) {
          next_highlighted = [
            dirtyValue[0],
            dayjs(highlighted[1] || highlighted[0])
              .add(day, this.keyStep)
              .toDate(),
          ];
        } else {
          next_highlighted = [dayjs(highlighted[0]).add(day, this.keyStep).toDate()];
        }
        this.handlers.highlighted(next_highlighted);
        this.handlers.displayedPeriod(setNextDisplayedPeriod(next_highlighted));
      } else {
        this.handlers.highlighted([displayedPeriod]);
      }
      e.preventDefault();
    }
  };

  handlerApply = (value) => {
    const [startDate, endDate = startDate] = value;
    this.handlerChange([]);
    this.handlers.value([startDate, endDate]);
  };

  handlerChange = (date) => {
    let { dirtyValue } = this.state;
    let highlighted = [];
    if (Array.isArray(date)) {
      dirtyValue = date;
    } else if (!dirtyValue.length) {
      dirtyValue = [date];
      highlighted = [date];
    } else if (dirtyValue.length >= 2) {
      dirtyValue = [date];
      highlighted = [date];
    } else if (dirtyValue[0] > date) {
      dirtyValue = [date, dirtyValue[0]];
    } else {
      dirtyValue = [dirtyValue[0], date];
    }

    this.setState({ dirtyValue }, () => {
      this.handlers.highlighted(highlighted);
    });
  };

  getDefaultPeriods() {
    return [];
  }

  getTriggerProps() {
    const { value, size } = this.asProps;
    return {
      size,
      empty: !value[0] && !value[1],
      onKeyDown: this.handlerKeyDown,
    };
  }

  getPopperProps() {
    const Picker = this[CORE_INSTANCE];
    const { periods = this.getDefaultPeriods(), unclearable } = this.asProps;

    const buttons = (
      <>
        <Picker.Apply />
        {!unclearable && <Picker.Reset ml={2} />}
      </>
    );

    return {
      tabIndex: 0,
      onKeyDown: this.handlerKeyDown,
      children: (
        <>
          <Flex>
            <Box mr={2}>
              <Picker.Header>
                <Picker.Prev />
                <Picker.Title />
              </Picker.Header>
              <Picker.Calendar />
            </Box>
            <Box ml={2}>
              <Picker.Header>
                <Picker.Title />
                <Picker.Next />
              </Picker.Header>
              <Picker.Calendar />
            </Box>
            {Boolean(periods.length) ? (
              <>
                <Divider m="-16px 16px" orientation="vertical" h="auto" />
                <Flex direction="column">
                  <Picker.Period />
                  <Flex mt="auto">{buttons}</Flex>
                </Flex>
              </>
            ) : (
              <Flex mt={4}>{buttons}</Flex>
            )}
          </Flex>
        </>
      ),
    };
  }

  getHeaderProps() {
    const Picker = this[CORE_INSTANCE];
    return {
      children: (
        <>
          <Picker.Prev />
          <Picker.Title />
          <Picker.Next />
        </>
      ),
    };
  }

  getTitleProps(props, index) {
    const { locale, displayedPeriod } = this.asProps;
    return {
      children: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        dayjs(displayedPeriod).add(index, this.navigateStep).startOf(this.navigateStep).toDate(),
      ),
    };
  }

  getNextProps() {
    return {
      onClick: this.bindHandlerNavigateClick(1),
      getI18nText: this.asProps.getI18nText,
    };
  }

  getPrevProps() {
    return {
      onClick: this.bindHandlerNavigateClick(-1),
      getI18nText: this.asProps.getI18nText,
    };
  }

  getCalendarProps(props, index) {
    const {
      locale,
      displayedPeriod,
      disabled,
      value,
      highlighted,
      onHighlightedChange,
      onVisibleChange,
    } = this.asProps;
    const { dirtyValue } = this.state;

    return {
      locale,
      displayedPeriod: dayjs(displayedPeriod)
        .add(index, this.navigateStep)
        .startOf(this.navigateStep)
        .toDate(),
      disabled,
      highlighted,
      onHighlightedChange,
      onVisibleChange,
      value: dirtyValue.length ? dirtyValue : value,
      onChange: this.handlerChange,
    };
  }

  getPeriodProps() {
    const {
      periods = this.getDefaultPeriods(),
      value,
      onHighlightedChange,
      onDisplayedPeriodChange,
    } = this.asProps;
    const { dirtyValue } = this.state;
    return {
      periods,
      value: dirtyValue.length ? dirtyValue : value,
      onChange: this.handlerApply,
      onHighlightedChange,
      onDisplayedPeriodChange,
    };
  }

  getApplyProps() {
    const { value, getI18nText } = this.asProps;
    const { dirtyValue } = this.state;
    return {
      getI18nText,
      onClick: () => this.handlerApply(dirtyValue.length ? dirtyValue : value),
    };
  }

  getResetProps() {
    const { getI18nText } = this.asProps;
    return {
      getI18nText,
      onClick: () => this.handlerApply([]),
    };
  }

  render() {
    const { Children, styles, 'aria-label': providedAriaLabel } = this.asProps;

    return sstyled(styles)(
      <Root
        render={Dropdown}
        use:aria-label={providedAriaLabel}
        interaction="focus"
        __excludeProps={['onChange', 'value']}
      >
        <Children />
      </Root>,
    );
  }
}

function Apply(props) {
  const { getI18nText } = props;
  return <Root render={Button} use="primary" children={getI18nText('apply')} />;
}

function Reset(props) {
  const { getI18nText } = props;
  return <Root render={Button} use="tertiary" theme="muted" children={getI18nText('reset')} />;
}

export { Apply, Reset };

export default RangePickerAbstract;
