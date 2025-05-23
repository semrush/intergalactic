import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, CORE_INSTANCE, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';
import Divider from '@semcore/divider';
import Dropdown from '@semcore/dropdown';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from '../translations/__intergalactic-dynamic-locales';
import { includesDate } from '../utils/includesDate';
import { formatDDMMYY, formatMMYY } from '../utils/formatDate';

import style from '../style/date-picker.shadow.css';

const INTERACTION_TAGS = ['INPUT'];
const INTERACTION_KEYS = ['ArrowDown', 'Enter', ' '];

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
      defaultPreselectedValue: [],
      disabled: [],
      size: 'm',
    };
  }

  static enhance = [i18nEnhance(localizedMessages)];

  static add = (date, amount, unit) => {
    return dayjs(date).add(amount, unit).toDate();
  };

  static subtract = (date, amount, unit) => {
    return dayjs(date).subtract(amount, unit).toDate();
  };

  popperRef = React.createRef();
  unitRefs = {};

  navigateStep;
  keyDiff;
  keyStep;

  uncontrolledProps() {
    return {
      displayedPeriod: null,
      visible: [
        null,
        (visible) => {
          const { value, displayedPeriod } = this.asProps;
          const endDate = getEndDate(value ?? undefined);

          if (!visible) {
            this.handlers.highlighted([]);
            this.handlers.preselectedValue([]);
          }

          if (visible) {
            if (endDate && endDate !== displayedPeriod) {
              this.handlers.displayedPeriod(endDate);
            } else if (!endDate) {
              const { displayedPeriod, defaultDisplayedPeriod } = this.props;
              this.handlers.displayedPeriod(displayedPeriod || defaultDisplayedPeriod);
            }
          }
        },
      ],
      highlighted: null,
      preselectedValue: null,
      value: [
        null,
        (value) => {
          if (value[0] !== null || value[1] !== null) {
            this.handlers.displayedPeriod(
              getEndDate([value[0] ?? undefined, value[1] ?? undefined]),
            );
          }
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

  handlerKeyDown = (place) => (e) => {
    const { displayedPeriod, highlighted, preselectedValue, visible } = this.asProps;
    const key = e.key;

    if (place === 'trigger' && INTERACTION_KEYS.includes(key)) {
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

    if (place === 'popper' && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      return this.handleApplyClick();
    }
    if (place === 'popper' && e.key === ' ' && highlighted.length) {
      const highlightedDate = highlighted[1] || highlighted[0];

      if (!this.isDisabled(highlightedDate)) {
        this.handleChange(highlightedDate);
      }
      e.preventDefault();
    }
    let changedDate = undefined;
    if (day) {
      if (INTERACTION_TAGS.includes(e.target.tagName)) return;
      if (highlighted.length) {
        let next_highlighted;
        if (preselectedValue.length === 1) {
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
        this.handlers.highlighted(next_highlighted);
        this.handlers.displayedPeriod(setNextDisplayedPeriod(next_highlighted));
      } else {
        const highlighted = [displayedPeriod ? displayedPeriod : dayjs().toDate()];
        this.handlers.highlighted(highlighted);
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

  isDisabled(date) {
    const { disabled } = this.asProps;

    return disabled.some(includesDate(dayjs(date), 'date'));
  }

  handleApply = (value) => {
    const [startDate, endDate = startDate] = value;
    this.handleChange([]);
    this.handlers.value([startDate, endDate]);
    this.handlers.visible(false);
  };

  handleChange = (date) => {
    let { preselectedValue } = this.asProps;
    let highlighted = [];
    if (Array.isArray(date)) {
      preselectedValue = date;
    } else if (!preselectedValue.length) {
      preselectedValue = [date];
      highlighted = [date];
    } else if (preselectedValue.length >= 2) {
      preselectedValue = [date];
      highlighted = [date];
    } else if (preselectedValue[0] > date) {
      preselectedValue = [date, preselectedValue[0]];
    } else {
      preselectedValue = [preselectedValue[0], date];
    }

    this.handlers.preselectedValue(preselectedValue);
    this.handlers.highlighted(highlighted);
  };

  getDefaultPeriods() {
    return [];
  }

  getButtonTriggerProps() {
    const { value, size, visible } = this.asProps;

    return {
      popoverVisible: visible,
      size,
      empty: !value[0] && !value[1],
      onKeyDown: this.handlerKeyDown('trigger'),
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
      ref: this.popperRef,
      onKeyDown: this.handlerKeyDown('popper'),
      children: (
        <>
          <Flex>
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
                  {/* biome-ignore lint/a11y/useValidAriaValues: */}
                  <Picker.Title aria-live={undefined} />
                  <Picker.Next />
                </Picker.Header>
                <Picker.Calendar />
              </Box>
            </Flex>
            {periods.length > 0 && (
              <>
                <Divider m='-16px 16px' orientation='vertical' h='auto' />
                <Flex direction='column'>
                  <Picker.Period />
                  <Flex mt='auto'>{buttons}</Flex>
                </Flex>
              </>
            )}
          </Flex>
          {periods.length === 0 && (
            <>
              <Divider m='16px -16px' orientation='horizontal' w='auto' />
              <Flex>
                <Picker.Period />
                <Flex mt='auto'>{buttons}</Flex>
              </Flex>
            </>
          )}
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
    const { getI18nText } = this.asProps;
    const { navigateStep } = this;

    return {
      onClick: this.bindHandlerNavigateClick(1),
      getI18nText,
      'aria-label': navigateStep === 'month' ? getI18nText('nextMonth') : getI18nText('nextYear'),
    };
  }

  getPrevProps() {
    const { getI18nText } = this.asProps;
    const { navigateStep } = this;

    return {
      onClick: this.bindHandlerNavigateClick(-1),
      getI18nText,
      'aria-label': navigateStep === 'month' ? getI18nText('prevMonth') : getI18nText('prevYear'),
    };
  }

  getCalendarProps(_props, index) {
    const {
      locale,
      displayedPeriod,
      disabled,
      value,
      highlighted,
      onHighlightedChange,
      onVisibleChange,
      preselectedValue,
      getI18nText,
    } = this.asProps;

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
      value: preselectedValue.length ? preselectedValue : value,
      onChange: this.handleChange,
      unitRefs: this.unitRefs,
      getI18nText,
      actionsDescribing: index === 0 ? 'range' : null,
      tabIndex: index === 0 ? 0 : -1,
    };
  }

  getPeriodProps() {
    const {
      periods = this.getDefaultPeriods(),
      value,
      onHighlightedChange,
      onDisplayedPeriodChange,
      preselectedValue,
      getI18nText,
    } = this.asProps;
    return {
      periods,
      value: preselectedValue.length ? preselectedValue : value,
      onChange: this.handleApply,
      onHighlightedChange,
      onDisplayedPeriodChange,
      role: 'listbox',
      'aria-label': getI18nText('periods'),
    };
  }

  handleApplyClick = () => {
    const { value, preselectedValue } = this.asProps;
    return this.handleApply(preselectedValue.length ? preselectedValue : value);
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
      onClick: () => this.handleApply([]),
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

export { Apply, Reset };

export default RangePickerAbstract;
