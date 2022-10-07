import React from 'react';
import BaseTrigger from '@semcore/base-trigger';
import InputMask from '@semcore/input-mask';
import { Flex, Box } from '@semcore/flex-box';
import Calendar from '@semcore/icon/Calendar/m';
import createComponent, { Root, sstyled } from '@semcore/core';
import NeighborLocation from '@semcore/neighbor-location';
import includesDate from '../utils/includesDate';
import dayjs from 'dayjs';

import style from '../style/calendar.shadow.css';

const defaultAllowedParts = { year: true, month: true, day: true };

const InputTriggerRoot = (props) => {
  const SInputTriggerRoot = Root;
  const { Children } = props;
  return sstyled(style)(
    <SInputTriggerRoot render={Box} __excludeProps={['onChange', 'value']}>
      <Children />
    </SInputTriggerRoot>,
  );
};

const SingleDateInput = (props) => {
  const {
    hasChildren,
    Children,
    value,
    onChange,
    onDisplayedPeriodChange,
    locale,
    forwardRef,
    styles,
    w,
    ...otherProps
  } = props;
  const SSingleDateInput = Root;

  return sstyled(styles)(
    <SSingleDateInput
      render={InputMask}
      ref={forwardRef}
      __excludeProps={['onChange', 'value']}
      w={w}
    >
      {hasChildren ? (
        <NeighborLocation>
          <Children />
        </NeighborLocation>
      ) : (
        <NeighborLocation>
          <InputTrigger.Indicator />
          <InputTrigger.MaskedInput
            date={value}
            onDateChange={onChange}
            onDisplayedPeriodChange={onDisplayedPeriodChange}
            locale={locale}
            {...otherProps}
          />
        </NeighborLocation>
      )}
    </SSingleDateInput>,
  );
};

const DateRange = ({
  value,
  onChange,
  locale,
  onDisplayedPeriodChange,
  styles,
  w,
  ...otherProps
}) => {
  const SDateRange = Root;
  const [from, to] = value ?? [undefined, undefined];
  const currentValueRef = React.useRef(value);
  currentValueRef.current = value;

  const fromRef = React.useRef(null);
  const toRef = React.useRef(null);

  const [onFromChange, onToChange] = React.useMemo(() => {
    return [
      (value, event) => {
        const prevValue = currentValueRef.current ?? [undefined, undefined];
        onChange([value, prevValue[1]], event);
        if (value) {
          toRef.current.focus();
          setTimeout(() => {
            toRef.current.setSelectionRange(0, 0);
          }, 0);
        }
      },
      (value, event) => {
        const prevValue = currentValueRef.current ?? [undefined, undefined];
        onChange([prevValue[0], value], event);
      },
    ];
  }, [onChange]);
  const handleFromKeydown = React.useCallback((event) => {
    if (
      event.code === 'ArrowRight' &&
      fromRef.current.selectionStart === fromRef.current.value.length &&
      fromRef.current.selectionEnd === fromRef.current.value.length
    ) {
      toRef.current.focus();
      setTimeout(() => {
        toRef.current.setSelectionRange(0, 0);
      }, 0);
    }
  }, []);
  const handleToKeydown = React.useCallback((event) => {
    if (event.code === 'Backspace' && !toRef.current.value) {
      const value = fromRef.current.value;
      fromRef.current.focus();
      setTimeout(() => {
        fromRef.current.setSelectionRange(value.length, value.length);
      }, 0);
    }
    if (
      event.code === 'ArrowLeft' &&
      toRef.current.selectionStart === 0 &&
      toRef.current.selectionEnd === 0
    ) {
      const value = fromRef.current.value;
      fromRef.current.focus();
      setTimeout(() => {
        fromRef.current.setSelectionRange(value.length, value.length);
      }, 0);
    }
  }, []);

  return sstyled(styles)(
    <SDateRange render={InputMask} __excludeProps={['onChange', 'value']} w={w}>
      <InputTrigger.Indicator />
      <InputTrigger.MaskedInput
        ref={fromRef}
        date={from}
        onDateChange={onFromChange}
        onDisplayedPeriodChange={onDisplayedPeriodChange}
        locale={locale}
        flex="1"
        {...otherProps}
        onKeyDown={handleFromKeydown}
      />
      <Flex alignItems="center" justifyContent="center" flex="0" pr={4}>
        –
      </Flex>
      <InputTrigger.MaskedInput
        ref={toRef}
        date={to}
        onDateChange={onToChange}
        onDisplayedPeriodChange={onDisplayedPeriodChange}
        locale={locale}
        flex="1"
        {...otherProps}
        onKeyDown={handleToKeydown}
      />
    </SDateRange>,
  );
};

const DateRangeFromInput = (props) => {
  const SDateRangeFromInput = Root;

  return sstyled(props.styles)(<SDateRangeFromInput>xxx</SDateRangeFromInput>);
};

const DateRangeToInput = (props) => {
  const SDateRangeToInput = Root;

  return sstyled(props.styles)(<SDateRangeToInput />);
};

const Indicator = (props) => {
  const SIndicator = Root;

  return sstyled(props.styles)(
    <SIndicator render={InputMask.Addon} tag={Calendar} aria-hidden="true" />,
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
  ...otherProps
}) => {
  const SMaskedInput = Root;
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

  const placeholders = React.useMemo(() => ({ year: 'Y', month: 'M', day: 'D' }), []);
  const outer = React.useMemo(() => {
    const validDate =
      outerValue && outerValue instanceof Date && !Number.isNaN(outerValue.getTime());
    if (!validDate) return null;

    return {
      year: outerValue.getFullYear().toString().padStart(4, '0'),
      month: (outerValue.getMonth() + 1).toString().padStart(2, '0'),
      day: outerValue.getDate().toString().padStart(2, '0'),
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
      const parsed = { ...placeholders };
      const parts = value.split(sep);
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

        if (disabledDates && disabledDates.some(includesDate(dayjs(date), 'date'))) {
          return false;
        }

        if (allowedParts.day) {
          if (date.getDate() !== parseInt(day, 10)) return false;
        }
      }

      const textParts = [];
      for (const part of order) {
        if (part === 'year') textParts.push(year);
        if (part === 'month') textParts.push(month);
        if (part === 'day') textParts.push(day);
      }
      const text = textParts.join(sep);

      return { value: text, indexesOfPipedChars };
    },
    [placeholders, sep, order, allowedParts, disabledDates],
  );

  const handleChange = React.useCallback(
    (value) => {
      const parsed = { ...placeholders };
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
        onDateChange(undefined);
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
      if (part === 'year') result.push('YYYY');
      if (part === 'month') result.push('MM');
      if (part === 'day') result.push('DD');
    }
    return result.join(sep);
  }, [sep, order]);
  const aliases = React.useMemo(
    () => ({
      Y: /\d/,
      M: /\d/,
      D: /\d/,
    }),
    [],
  );
  const maskOnlySymbols = React.useMemo(
    () => ({
      Y: true,
      M: true,
      D: true,
      [sep]: true,
    }),
    [sep],
  );

  return sstyled(styles)(
    <SMaskedInput
      render={InputMask.Value}
      title="Date"
      mask={mask}
      aliases={aliases}
      maskOnlySymbols={maskOnlySymbols}
      placeholder={mask}
      {...otherProps}
      pipe={pipeMask}
      value={value}
      onChange={handleChange}
    />,
  );
};

InputTriggerRoot.displayName = 'InputTrigger';

const InputTrigger = createComponent(InputTriggerRoot, {
  Indicator,
  MaskedInput,
  Addon: BaseTrigger.Addon,
  SingleDateInput,
  DateRange,
  DateRangeFromInput,
  DateRangeToInput,
});

export default InputTrigger;
