import React from 'react';
import BaseTrigger from '@semcore/base-trigger';
import InputMask from '@semcore/input-mask';
import Tooltip from '@semcore/tooltip';
import { Flex, Box } from '@semcore/flex-box';
import Calendar from '@semcore/icon/Calendar/m';
import createComponent, { Root, sstyled, Component } from '@semcore/core';
import NeighborLocation from '@semcore/neighbor-location';
import includesDate from '../utils/includesDate';
import dayjs from 'dayjs';

import style from '../style/date-picker.shadow.css';
import assignProps from '@semcore/utils/lib/assignProps';

const defaultAllowedParts = { year: true, month: true, day: true };
const defaultPlaceholders = { year: 'Y', month: 'M', day: 'D' };

class InputTriggerRoot extends Component {
  static displayName = 'InputTrigger';
  static style = style;

  getSingleDateInputProps() {
    const {
      children,
      id,
      role,
      'aria-haspopup': ariaHasPopup,
      'aria-expanded': ariaExpanded,
      'aria-label': ariaLabel,
      style,
      ...otherProps
    } = this.asProps;
    return { ...otherProps, ariaHasPopup };
  }
  getDateRangeProps() {
    const {
      children,
      id,
      role,
      'aria-haspopup': ariaHasPopup,
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      style,
      ...otherProps
    } = this.asProps;
    return { ...otherProps, ariaHasPopup };
  }

  render() {
    const SInputTrigger = Root;
    const { Children, style, getI18nText } = this.asProps;

    return sstyled(style)(
      <SInputTrigger
        render={Box}
        aria-label={getI18nText('input')}
        __excludeProps={['onChange', 'value', 'role']}
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
  };
  state = {
    errorText: null,
    showError: false,
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
            showError = true;
          }
          this.setState({ errorText, showError });
        },
      ],
    };
  }

  handleDisabledDateInputAttemptChange = (value) => {
    if (value === this.asProps.disabledDateInputAttempt) return;
    this.handlers.disabledDateInputAttempt(value);
  };

  getMaskedInputProps() {
    const { value, onChange, onDisplayedPeriodChange, locale, w, ariaHasPopup, ...otherProps } =
      this.asProps;

    return {
      date: value,
      onDateChange: onChange,
      onDisplayedPeriodChange,
      locale,
      'aria-haspopup': 'true',
      onMaskPipeBlock: this.handleDisabledDateInputAttemptChange,
      ...otherProps,
    };
  }

  render() {
    const { Children, forwardRef, styles, state } = this.asProps;
    const { errorText, showError } = this.state;
    const SSingleDateInput = Root;

    return sstyled(styles)(
      <SSingleDateInput
        render={InputMask}
        tag={Tooltip}
        placement='top-start'
        title={errorText}
        theme='warning'
        visible={showError}
        state={showError ? 'invalid' : state}
        ref={forwardRef}
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
  };
  state = {
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
            showError = true;
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
  handleDisabledDateInputAttemptChange = (value) => {
    if (value === this.asProps.disabledDateInputAttempt) return;
    this.handlers.disabledDateInputAttempt(value);
  };

  getFromMaskedInputProps() {
    const {
      value,
      locale,
      onDisplayedPeriodChange,
      ariaHasPopup,

      ...otherProps
    } = this.asProps;

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
        onMaskPipeBlock: this.handleDisabledDateInputAttemptChange,
      },
      otherProps,
    );
  }
  getToMaskedInputProps() {
    const { value, locale, onDisplayedPeriodChange, ariaHasPopup, ...otherProps } = this.asProps;

    return assignProps(
      {
        ref: this.toRef,
        date: value?.[1],
        onDateChange: this.handleToChange,
        onKeyDown: this.handleToKeydown,
        locale,
        flex: 1,
        onDisplayedPeriodChange,
        'aria-haspopup': ariaHasPopup,
        onMaskPipeBlock: this.handleDisabledDateInputAttemptChange,
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

  render() {
    const SDateRange = Root;
    const { Children, styles, w, state } = this.asProps;
    const { errorText, showError, lastChangedInput } = this.state;

    return sstyled(styles)(
      <SDateRange
        render={InputMask}
        tag={Tooltip}
        placement={lastChangedInput === 'to' ? 'top-end' : 'top-start'}
        title={errorText}
        theme='warning'
        visible={showError}
        state={showError ? 'invalid' : state}
        __excludeProps={['onChange', 'value', 'aria-expanded']}
        w={w}
      >
        <Children />
      </SDateRange>,
    );
  }
}

const FromMaskedInput = (props) => {
  const SFromMaskedInput = Root;

  return sstyled(props.styles)(<SFromMaskedInput labelPrefix='from date' render={MaskedInput} />);
};

const ToMaskedInput = (props) => {
  const SToMaskedInput = Root;

  return sstyled(props.styles)(<SToMaskedInput labelPrefix='to date' render={MaskedInput} />);
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
  placeholders = defaultPlaceholders,
  labelPrefix = 'Date',
  onMaskPipeBlock,

  __excludeProps,

  Root: _root,
  ...otherProps
}) => {
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
    const exampleDate = new Date(2000, 4, 29);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
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
        const date = new Date();
        date.setFullYear(allowedParts.year ? parseInt(year, 10) : 0);
        date.setMonth(allowedParts.month ? parseInt(month, 10) - 1 : 0);
        date.setDate(allowedParts.day ? parseInt(day, 10) : 1);

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
        const date = new Date();
        date.setFullYear(allowedParts.year ? parseInt(year, 10) : 0);
        date.setMonth(allowedParts.month ? parseInt(month, 10) - 1 : 0);
        date.setDate(allowedParts.day ? parseInt(day, 10) : 1);

        onDateChange(date);
        lastKnownOuterValue.current = { year, month, day };
        return;
      }

      if (lastKnownOuterValue.current !== null) {
        onDateChange(null);
        lastKnownOuterValue.current = null;
      }

      if (yearFulfilled && allowedParts.year) {
        const date = new Date();
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
      day: allowedParts.day ? '2-digit' : undefined,
    }).format(outerDate);
  }, [outerValue, locale, allowedParts]);

  const SHumanizedDate = 'div';
  const handleInputRef = React.useCallback(
    (node) => {
      if (!node || node.tagName !== 'INPUT') return;
      if (typeof forwardRef === 'function') forwardRef(node);
      else forwardRef.current = node;
    },
    [forwardRef],
  );

  return sstyled(styles)(
    <InputMask.Value
      title={`${labelPrefix} ${mask}`}
      mask={mask}
      aliases={aliases}
      maskOnlySymbols={maskOnlySymbols}
      placeholder={mask}
      {...otherProps}
      ref={handleInputRef}
      pipe={pipeMask}
      value={value ?? ''}
      onChange={handleChange}
      noHumanizedDate={!humanizedDate}
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
