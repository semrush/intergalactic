import React from 'react';
import BaseTrigger from '@semcore/base-trigger';
import InputMask from '@semcore/input-mask';
import Tooltip from '@semcore/tooltip';
import { Flex, Box } from '@semcore/flex-box';
import Calendar from '@semcore/icon/Calendar/m';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import NeighborLocation from '@semcore/neighbor-location';
import { datesIntersects } from '../utils/datesIntersects';
import { includesDate } from '../utils/includesDate';
import dayjs from 'dayjs';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';

import style from '../style/date-picker.shadow.css';
import assignProps from '@semcore/core/lib/utils/assignProps';

const defaultAllowedParts = { year: true, month: true, day: true };
const exampleDate = new Date(2000, 4, 29);

class InputTriggerRoot extends Component {
  static displayName = 'InputTrigger';
  static style = style;
  static defaultProps = {
    duration: 300,
    popoverVisible: true,
  };

  getSingleDateInputProps() {
    const {
      children,
      id,
      role,
      'aria-haspopup': ariaHasPopup,
      // 'aria-expanded': ariaExpanded,
      'aria-label': ariaLabel,
      style,
      ...otherProps
    } = this.asProps;
    return { ...otherProps, ariaHasPopup, inputId: id };
  }
  getDateRangeProps() {
    const {
      children,
      id,
      role,
      'aria-haspopup': ariaHasPopup,
      'aria-label': ariaLabel,
      // 'aria-expanded': ariaExpanded,
      style,
      ...otherProps
    } = this.asProps;
    return { ...otherProps, ariaHasPopup, inputId: id };
  }

  render() {
    const SInputTrigger = Root;
    const { Children, style, getI18nText } = this.asProps;

    return sstyled(style)(
      <SInputTrigger
        render={Box}
        aria-label={getI18nText('input')}
        __excludeProps={['onChange', 'value', 'role', 'id']}
      >
        <Children />
      </SInputTrigger>,
    );
  }
}

class SingleDateInputRoot extends Component {
  static displayName = 'SingleDateInput';
  static style = style;
  static defaultProps = {
    children: () => (
      <>
        <SingleDateInput.Indicator />
        <SingleDateInput.MaskedInput />
      </>
    ),
    defaultDisabledDateInputAttempt: false,
    showError: true,
  };
  state = {
    errorText: null,
    showError: false,
    focused: false,
  };
  uncontrolledProps() {
    return {
      disabledDateInputAttempt: [
        null,
        (date) => {
          let errorText = this.state.errorText;
          let showError = false;
          if (date !== null) {
            errorText = this.asProps.disabledErrorText;
            if (errorText === undefined) {
              let key = 'unavailableDate';
              if (this.asProps.parts && !this.asProps.parts.day) {
                key = 'unavailableMonth';
              }
              errorText = this.asProps.getI18nText(key);
            }
            if (typeof errorText === 'function') {
              errorText = errorText(date);
            }
            showError = this.asProps.disabledErrorText !== null;
          }
          this.setState({ errorText, showError });
        },
      ],
    };
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleInputMaskPipeBlock = (value) => {
    if (value === this.asProps.disabledDateInputAttempt) return;
    this.handlers.disabledDateInputAttempt(value);
  };

  getMaskedInputProps() {
    const {
      value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      w,
      ariaHasPopup,
      showError,
      ...otherProps
    } = this.asProps;

    return {
      date: value,
      onDateChange: onChange,
      onDisplayedPeriodChange,
      locale,
      'aria-haspopup': 'true',
      onMaskPipeBlock: this.handleInputMaskPipeBlock,
      ...otherProps,
    };
  }

  render() {
    const {
      Children,
      forwardRef,
      styles,
      state,
      showError: showErrorProps,
      popoverVisible,
    } = this.asProps;
    const { errorText, showError: showErrorState, focused } = this.state;
    const showError = showErrorState && showErrorProps;
    const SSingleDateInput = Root;

    return sstyled(styles)(
      <SSingleDateInput
        render={InputMask}
        tag={Tooltip}
        placement='top-start'
        title={errorText}
        theme='warning'
        visible={showError && (popoverVisible || focused)}
        state={showError ? 'invalid' : state}
        ref={forwardRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        __excludeProps={['onChange', 'style', 'aria-expanded']}
      >
        <NeighborLocation>
          <Children />
        </NeighborLocation>
      </SSingleDateInput>,
    );
  }
}
class DateRangeRoot extends Component {
  static displayName = 'DateRange';
  static style = style;
  static defaultProps = {
    children: () => (
      <>
        <DateRange.Indicator />
        <DateRange.FromMaskedInput />
        <DateRange.RangeSep />
        <DateRange.ToMaskedInput />
      </>
    ),
    defaultDisabledDateInputAttempt: false,
    showError: true,
  };
  state = {
    containerFocused: false,
    errorText: null,
    showError: false,
    lastChangedInput: 'from',
  };
  uncontrolledProps() {
    return {
      disabledDateInputAttempt: [
        null,
        (date) => {
          let errorText = this.state.errorText;
          let showError = false;
          if (date !== null) {
            errorText = this.asProps.disabledErrorText;
            if (errorText === undefined) {
              let key = 'unavailableDate';
              if (this.asProps.parts && !this.asProps.parts.day) {
                key = 'unavailableMonth';
              }
              if (this.state.lastChangedInput === 'to') {
                key = 'unavailableEndDate';
                if (this.asProps.parts && !this.asProps.parts.day) {
                  key = 'unavailableEndMonth';
                }
              }
              errorText = this.asProps.getI18nText(key);
            }
            if (typeof errorText === 'function') {
              errorText = errorText(date);
            }
            showError = this.asProps.disabledErrorText !== null;
          }
          this.setState({ errorText, showError });
        },
      ],
    };
  }

  fromRef = React.createRef();
  toRef = React.createRef();

  handleFromChange = (value, event) => {
    const { onChange } = this.asProps;
    const prevValue = [this.asProps.value?.[0] ?? null, this.asProps.value?.[1] ?? null];
    onChange([value, prevValue[1]], event);
    if (value) {
      if (!this.toRef.current) return;
      this.toRef.current.focus();
      setTimeout(() => {
        if (!this.toRef.current) return;
        this.toRef.current.setSelectionRange(0, 0);
      }, 0);
    }
  };
  handleToChange = (value, event) => {
    const { onChange } = this.asProps;
    const prevValue = [this.asProps.value?.[0] ?? null, this.asProps.value?.[1] ?? null];
    onChange([prevValue[0], value], event);
  };
  handleFromKeydown = (event) => {
    if (!this.toRef.current) return;
    if (!this.fromRef.current) return;
    this.setState({ lastChangedInput: 'from' });

    if (
      event.key === 'ArrowRight' &&
      this.fromRef.current.selectionStart === this.fromRef.current.value.length &&
      this.fromRef.current.selectionEnd === this.fromRef.current.value.length
    ) {
      this.toRef.current.focus();
      setTimeout(() => {
        this.toRef.current.setSelectionRange(0, 0);
      }, 0);
    }
  };
  handleToKeydown = (event) => {
    if (!this.toRef.current) return;
    if (!this.fromRef.current) return;
    this.setState({ lastChangedInput: 'to' });

    if (event.key === 'Backspace' && !this.toRef.current.value) {
      const value = this.fromRef.current.value;
      this.fromRef.current.focus();
      setTimeout(() => {
        this.fromRef.current.setSelectionRange(value.length, value.length);
      }, 0);
    }
    if (
      event.key === 'ArrowLeft' &&
      this.toRef.current.selectionStart === 0 &&
      this.toRef.current.selectionEnd === 0
    ) {
      const value = this.fromRef.current.value;
      this.fromRef.current.focus();
      setTimeout(() => {
        this.fromRef.current.setSelectionRange(value.length, value.length);
      }, 0);
    }
  };
  handleInputMaskPipeBlock = (value) => {
    if (value === this.asProps.disabledDateInputAttempt) return;
    this.handlers.disabledDateInputAttempt(value);
  };

  getFromMaskedInputProps() {
    const { value, locale, onDisplayedPeriodChange, ariaHasPopup, showError, ...otherProps } =
      this.asProps;

    return assignProps(
      {
        ref: this.fromRef,
        date: value?.[0],
        onDateChange: this.handleFromChange,
        onKeyDown: this.handleFromKeydown,
        locale,
        flex: 1,
        onDisplayedPeriodChange,
        'aria-haspopup': ariaHasPopup,
        onMaskPipeBlock: this.handleInputMaskPipeBlock,
        containerFocused: this.state.containerFocused,
      },
      otherProps,
    );
  }
  getToMaskedInputProps() {
    const {
      value,
      locale,
      onDisplayedPeriodChange,
      ariaHasPopup,
      inputId,
      showError,
      ...otherProps
    } = this.asProps;
    const ariaLabel = this.asProps.getI18nText('toDate', {
      date: this.asProps.getI18nText('input'),
    });

    return assignProps(
      {
        ref: this.toRef,
        date: value?.[1],
        onDateChange: this.handleToChange,
        onKeyDown: this.handleToKeydown,
        locale,
        flex: 1,
        onDisplayedPeriodChange,
        'aria-label': ariaLabel,
        'aria-haspopup': ariaHasPopup,
        onMaskPipeBlock: this.handleInputMaskPipeBlock,
        containerFocused: this.state.containerFocused,
      },
      otherProps,
    );
  }
  getRangeSepProps() {
    const { value } = this.asProps;

    return {
      fulfilled: !!(value && (value[0] || value[1])),
    };
  }
  handleFocus = () => {
    this.setState({ containerFocused: true });
  };
  handleBlur = () => {
    this.setState({ containerFocused: false });
  };

  updateDisabledDateInputAttempt = (value) => {
    const { disabledDates } = this.asProps;

    let invalid = false;
    if (value) {
      if (value[0] && value[1])
        invalid = disabledDates.some(datesIntersects([value[0], value[1]], this.asProps.unit));
      else if (value[0])
        invalid = disabledDates.some(includesDate(dayjs(value[0]), this.asProps.unit));
      else if (value[1])
        invalid = disabledDates.some(includesDate(dayjs(value[1]), this.asProps.unit));
    }

    if (invalid) {
      const invalidValue = this.state.lastChangedInput === 'to' ? value[1] : value[0];
      setTimeout(() => {
        if (value === this.asProps.disabledDateInputAttempt) return;
        this.handlers.disabledDateInputAttempt(invalidValue);
      }, 0);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.asProps.value) {
      this.updateDisabledDateInputAttempt(this.asProps.value);
    }
  }

  componentDidMount() {
    this.updateDisabledDateInputAttempt(this.asProps.value);
  }

  render() {
    const SDateRange = Root;
    const { Children, styles, w, state, showError: showErrorProps, popoverVisible } = this.asProps;
    const { errorText, lastChangedInput, showError: showErrorState, containerFocused } = this.state;
    const showError = showErrorState && showErrorProps;

    return sstyled(styles)(
      <SDateRange
        render={InputMask}
        tag={Tooltip}
        ignorePortalsStacking
        placement={lastChangedInput === 'to' ? 'top-end' : 'top-start'}
        title={errorText}
        theme='warning'
        visible={showError && (popoverVisible || containerFocused)}
        state={showError ? 'invalid' : state}
        __excludeProps={['onChange', 'value', 'aria-expanded']}
        w={w}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Children />
      </SDateRange>,
    );
  }
}

const FromMaskedInput = (props) => {
  const SFromMaskedInput = Root;
  const { getI18nText } = props;

  return sstyled(props.styles)(
    <SFromMaskedInput labelPrefix={getI18nText('fromDatePlaceholder')} render={MaskedInput} />,
  );
};

const ToMaskedInput = (props) => {
  const SToMaskedInput = Root;
  const { getI18nText } = props;

  return sstyled(props.styles)(
    <SToMaskedInput labelPrefix={getI18nText('toDatePlaceholder')} render={MaskedInput} />,
  );
};

const Indicator = (props) => {
  const SIndicator = Root;

  return sstyled(props.styles)(
    <SIndicator render={InputMask.Addon} tag={Calendar} aria-hidden='true' tabIndex={-1} />,
  );
};

const RangeSep = (props) => {
  const SRangeSep = Root;

  return sstyled(props.styles)(
    <SRangeSep
      render={InputMask.Addon}
      tag={Flex}
      alignItems='center'
      justifyContent='center'
      pl={0}
      flex='0'
    >
      –
    </SRangeSep>,
  );
};

const MaskedInput = ({
  date: outerValue,
  onDateChange,
  onDisplayedPeriodChange,
  locale,
  styles,
  parts: allowedParts = defaultAllowedParts,
  disabledDates,
  forwardRef,
  placeholders: providedPlaceholders,
  labelPrefix = 'Date',
  onMaskPipeBlock,
  containerFocused,
  animationsDisabled,
  getI18nText,
  inputId,
  inputRole = 'combobox',

  __excludeProps,

  Root: _root,
  ...otherProps
}) => {
  const ref = React.useRef();
  const [width, setWidth] = React.useState(undefined);

  const placeholders = React.useMemo(() => {
    if (providedPlaceholders) return providedPlaceholders;

    return {
      year: getI18nText('placeholder-years'),
      month: getI18nText('placeholder-months'),
      day: getI18nText('placeholder-days'),
    };
  }, [providedPlaceholders, getI18nText]);

  if (
    placeholders.year.length !== 1 ||
    placeholders.month.length !== 1 ||
    placeholders.day.length !== 1
  ) {
    console.error({ placeholders });
    throw new Error(
      `InputTrigger placeholder prop should contain fields year, month and day each one with string value of single character length. [see above what was received] (${placeholders})`,
      placeholders,
    );
  }

  const { sep, order } = React.useMemo(() => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);

    let sep = undefined;
    const order = [];
    const parts = dateTimeFormat.formatToParts(exampleDate);
    for (const part of parts) {
      if (!sep && part.type === 'literal') {
        sep = part.value;
      }
      if (
        order.length < 3 &&
        ['day', 'month', 'year'].includes(part.type) &&
        allowedParts[part.type]
      ) {
        order.push(part.type);
      }
    }
    sep = sep ?? ' ';

    return { sep, order };
  }, [locale, allowedParts]);

  const outer = React.useMemo(() => {
    let outerDate = outerValue;
    if (typeof outerValue === 'number' || typeof outerValue === 'string') {
      outerDate = new Date(outerValue);
    }
    const validDate = outerDate && outerDate instanceof Date && !Number.isNaN(outerDate.getTime());
    if (!validDate) return null;

    return {
      year: outerDate.getFullYear().toString().padStart(4, '0'),
      month: (outerDate.getMonth() + 1).toString().padStart(2, '0'),
      day: outerDate.getDate().toString().padStart(2, '0'),
    };
  }, [outerValue]);
  const stringifyValue = React.useCallback(
    (value) => {
      if (!value) return null;
      if (!value.year && !value.month && !value.day) return null;

      const result = [];
      for (const part of order) {
        if (!allowedParts[part]) continue;
        if (part === 'year' && value.year) result.push(value.year);
        if (part === 'month' && value.month) result.push(value.month);
        if (part === 'day' && value.day) result.push(value.day);
      }
      return result.join(sep);
    },
    [order, allowedParts],
  );

  const [internalValue, setInternalValue] = React.useState(outer);
  const value = React.useMemo(() => stringifyValue(internalValue), [stringifyValue, internalValue]);

  const lastKnownOuterValue = React.useRef(outer);
  React.useEffect(() => {
    if (
      lastKnownOuterValue.current?.day !== outer?.day ||
      lastKnownOuterValue.current?.month !== outer?.month ||
      lastKnownOuterValue.current?.year !== outer?.year
    ) {
      setInternalValue(outer);
    }
    lastKnownOuterValue.current = outer;
  }, [outer, setInternalValue]);

  const pipeMask = React.useCallback(
    (value) => {
      let placeholdersOnly = true;
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== '_' && value[i] !== sep) {
          placeholdersOnly = false;
          break;
        }
      }

      if (placeholdersOnly) {
        onMaskPipeBlock?.(null);
        return '';
      }

      const getOffsetTo = (partName) => {
        const partsBefore = order.slice(0, order.indexOf(partName));
        let offset = 0;
        for (const part of partsBefore) {
          if (part === 'year' && allowedParts.year) offset += 4;
          if (part === 'month' && allowedParts.month) offset += 2;
          if (part === 'day' && allowedParts.day) offset += 2;
        }
        offset += partsBefore.length * sep.length;
        return offset;
      };

      const indexesOfPipedChars = [];
      const parsed = {};
      const parts = value.split(sep);
      for (const partName in placeholders) {
        parsed[partName] = placeholders[partName];
      }
      for (let i = 0; i < order.length; i++) {
        parsed[order[i]] = parts[i];
      }

      let { year, month, day } = parsed;

      if (allowedParts.month) {
        if (month[0] !== '_' && parseInt(month[0], 10) > 1) {
          month = `0${month[0]}`;
          indexesOfPipedChars.push(getOffsetTo('month'));
        }
        if (month === '00') month = '01';
        if (month[0] !== '_' && month[1] !== '_' && parseInt(month, 10) > 12) return false;
      }
      if (allowedParts.day) {
        if (day[0] !== '_' && parseInt(day[0], 10) > 3) {
          day = `0${day[0]}`;
          indexesOfPipedChars.push(getOffsetTo('day'));
        }
        if (day === '00') day = '01';
        if (day[0] !== '_' && day[1] !== '_' && parseInt(day, 10) > 31) return false;
      }

      year = year
        .split('')
        .map((char) => (char === '_' ? placeholders.year : char))
        .join('');
      month = month
        .split('')
        .map((char) => (char === '_' ? placeholders.month : char))
        .join('');
      day = day
        .split('')
        .map((char) => (char === '_' ? placeholders.day : char))
        .join('');

      const yearFulfilled =
        !allowedParts.year || (year && year.length >= 4 && !year.includes(placeholders.year));
      const monthFulfilled =
        !allowedParts.month || (month && month.length === 2 && !month.includes(placeholders.month));
      const dayFulfilled =
        !allowedParts.day || (day && day.length === 2 && !day.includes(placeholders.day));
      const fulfilled = yearFulfilled && monthFulfilled && dayFulfilled;

      if (fulfilled) {
        const date = new Date(0, 0, 0, 0, 0, 0, 0);
        const yearParsed = allowedParts.year ? parseInt(year, 10) : 0;
        const monthParsed = allowedParts.month ? parseInt(month, 10) - 1 : 0;
        const dayParsed = allowedParts.day ? parseInt(day, 10) : 1;

        date.setFullYear(yearParsed, monthParsed, dayParsed);

        if (disabledDates?.some(includesDate(dayjs(date), 'date'))) {
          onMaskPipeBlock?.(date);
          return false;
        }

        if (allowedParts.day) {
          if (date.getDate() !== parseInt(day, 10)) {
            onMaskPipeBlock?.(date);
            return false;
          }
        }
      }

      const result = [];
      for (const part of order) {
        if (part === 'year') result.push(year);
        if (part === 'month') result.push(month);
        if (part === 'day') result.push(day);
      }

      onMaskPipeBlock?.(null);
      return { value: result.join(sep), indexesOfPipedChars };
    },
    [placeholders, sep, order, allowedParts, disabledDates, onMaskPipeBlock],
  );

  const handleChange = React.useCallback(
    (value) => {
      const parsed = {};
      for (const partName in placeholders) {
        parsed[partName] = placeholders[partName];
      }
      const parts = value.split(sep);
      for (let i = 0; i < order.length; i++) {
        parsed[order[i]] = parts[i];
      }
      const { year, month, day } = parsed;
      setInternalValue({ year, month, day });

      const yearFulfilled =
        !allowedParts.year || (year && year.length >= 4 && !year.includes(placeholders.year));
      const monthFulfilled =
        !allowedParts.month || (month && month.length === 2 && !month.includes(placeholders.month));
      const dayFulfilled =
        !allowedParts.day || (day && day.length === 2 && !day.includes(placeholders.day));
      const fulfilled = yearFulfilled && monthFulfilled && dayFulfilled;
      if (fulfilled) {
        const date = new Date(0, 0, 0, 0, 0, 0, 0);
        const yearParsed = allowedParts.year ? parseInt(year, 10) : 0;
        const monthParsed = allowedParts.month ? parseInt(month, 10) - 1 : 0;
        const dayParsed = allowedParts.day ? parseInt(day, 10) : 1;

        date.setFullYear(yearParsed, monthParsed, dayParsed);

        onDateChange(date);
        lastKnownOuterValue.current = { year, month, day };
        return;
      }

      if (lastKnownOuterValue.current !== null) {
        onDateChange(null);
        lastKnownOuterValue.current = null;
      }

      if (yearFulfilled && allowedParts.year) {
        const date = new Date(0, 0, 0, 0, 0, 0, 0);
        date.setFullYear(parseInt(year, 10));
        if (monthFulfilled && allowedParts.month) {
          date.setMonth(parseInt(month, 10) - 1);
        }
        onDisplayedPeriodChange(date);
      }
    },
    [onDateChange, setInternalValue, placeholders, onDisplayedPeriodChange, order, allowedParts],
  );

  const mask = React.useMemo(() => {
    const result = [];
    for (const part of order) {
      if (part === 'year')
        result.push(placeholders.year + placeholders.year + placeholders.year + placeholders.year);
      if (part === 'month') result.push(placeholders.month + placeholders.month);
      if (part === 'day') result.push(placeholders.day + placeholders.day);
    }
    return result.join(sep);
  }, [sep, order, placeholders]);
  const aliases = React.useMemo(
    () => ({
      [placeholders.year]: /\d/,
      [placeholders.month]: /\d/,
      [placeholders.day]: /\d/,
    }),
    [placeholders],
  );
  const maskOnlySymbols = React.useMemo(
    () => ({
      [placeholders.year]: true,
      [placeholders.month]: true,
      [placeholders.day]: true,
      [sep]: true,
    }),
    [sep, placeholders],
  );
  const humanizedDate = React.useMemo(() => {
    let outerDate = outerValue;
    if (typeof outerValue === 'number' || typeof outerValue === 'string') {
      outerDate = new Date(outerValue);
    }
    const validDate = outerDate && outerDate instanceof Date && !Number.isNaN(outerDate.getTime());
    if (!validDate) return null;

    return new Intl.DateTimeFormat(locale, {
      year: allowedParts.year ? 'numeric' : undefined,
      month: allowedParts.month ? 'short' : undefined,
      day: allowedParts.day ? 'numeric' : undefined,
    }).format(outerDate);
  }, [outerValue, locale, allowedParts]);

  useEnhancedEffect(() => {
    if (!ref.current) return;
    const stringsToMeasure = humanizedDate ? [humanizedDate, mask] : [mask];
    const widths = [];
    const measureSpan = document.createElement('span');
    const computedStyle = window.getComputedStyle(ref.current);
    const typographyRelatedStyles = [
      'height',
      'font-size',
      'font-family',
      'font-weight',
      'font-style',
      'line-height',
      'letter-spacing',
      'text-transform',
      'word-spacing',
    ];
    for (const style of typographyRelatedStyles) {
      measureSpan.style[style] = computedStyle[style];
    }
    measureSpan.style.position = 'absolute';
    measureSpan.style.visibility = 'hidden';
    document.body.appendChild(measureSpan);
    for (const string of stringsToMeasure) {
      measureSpan.innerHTML = string;
      widths.push(measureSpan.offsetWidth);
    }
    measureSpan.remove();
    const maxWidth = Math.max(...widths);
    setWidth(maxWidth);
  }, [locale, humanizedDate, allowedParts, mask]);

  const SHumanizedDate = 'div';
  const handleInputRef = React.useCallback(
    (node) => {
      ref.current = node;
      if (!node || node.tagName !== 'INPUT') return;
      if (typeof forwardRef === 'function') forwardRef(node);
      else forwardRef.current = node;
    },
    [forwardRef],
  );

  const [appliedWidth, setAppliedWidth] = React.useState(width);
  const [innerFocused, setInnerFocused] = React.useState(false);
  const focused = containerFocused ?? innerFocused;
  const handleFocus = React.useCallback((event) => {
    otherProps.onFocus?.(event);
    setInnerFocused(true);
  }, []);
  const handleBlur = React.useCallback((event) => {
    otherProps.onBlur?.(event);
    setInnerFocused(false);
  }, []);
  useEnhancedEffect(() => {
    if (focused) return;
    setAppliedWidth(width);
  }, [width, focused]);

  return sstyled(styles)(
    <InputMask.Value
      aria-label={labelPrefix}
      title={mask}
      mask={mask}
      aliases={aliases}
      maskOnlySymbols={maskOnlySymbols}
      placeholder={mask}
      inputW={appliedWidth}
      wMin={appliedWidth}
      id={inputId}
      {...otherProps}
      onFocus={handleFocus}
      onBlur={handleBlur}
      focused={focused}
      ref={handleInputRef}
      pipe={pipeMask}
      value={value ?? ''}
      onChange={handleChange}
      noHumanizedDate={!humanizedDate}
      animationsDisabled={animationsDisabled}
      inputRole={inputRole}
      inputMode={'numeric'}
    >
      {humanizedDate && <SHumanizedDate>{humanizedDate}</SHumanizedDate>}
    </InputMask.Value>,
  );
};

const SingleDateInput = createComponent(SingleDateInputRoot, {
  Indicator,
  MaskedInput,
});
const DateRange = createComponent(DateRangeRoot, {
  Indicator,
  RangeSep,
  FromMaskedInput,
  ToMaskedInput,
});

const InputTrigger = createComponent(InputTriggerRoot, {
  Addon: BaseTrigger.Addon,
  SingleDateInput,
  DateRange,
});

export default InputTrigger;
