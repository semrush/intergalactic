import React from 'react';
import BaseTrigger from '@semcore/base-trigger';
import InputMask from '@semcore/input-mask';
import { Flex, Box } from '@semcore/flex-box';
import Calendar from '@semcore/icon/Calendar/m';
import createComponent, { Root, sstyled, Component } from '@semcore/core';
import NeighborLocation from '@semcore/neighbor-location';
import includesDate from '../utils/includesDate';
import dayjs from 'dayjs';

import style from '../style/date-picker.shadow.css';
import assignProps from '@semcore/utils/lib/assignProps';

const defaultAllowedParts = { year: true, month: true, day: true };

class InputTriggerRoot extends Component {
  static displayName = 'InputTrigger';
  static style = style;

  getSingleDateInputProps() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      children,
      id,
      role,
      'aria-haspopup': ariaHasPopup,
      style,
      ...otherProps
    } = this.asProps;
    return otherProps;
  }
  getDateRangeProps() {
    const {
      children,
      id,
      role,
      'aria-haspopup': ariaHasPopup,
      style,
      ...otherProps
    } = this.asProps;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return otherProps;
  }

  render() {
    const SInputTrigger = Root;
    const { Children, style } = this.asProps;

    return sstyled(style)(
      <SInputTrigger render={Box} __excludeProps={['onChange', 'value', 'role']}>
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
  };

  getMaskedInputProps() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, onChange, onDisplayedPeriodChange, locale, w, ...otherProps } = this.asProps;

    return {
      date: value,
      onDateChange: onChange,
      onDisplayedPeriodChange,
      locale,
      ...otherProps,
    };
  }

  render() {
    const { Children, forwardRef, styles } = this.asProps;
    const SSingleDateInput = Root;

    return sstyled(styles)(
      <SSingleDateInput render={InputMask} ref={forwardRef} __excludeProps={['onChange', 'style']}>
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
  };

  fromRef = React.createRef();
  toRef = React.createRef();

  handleFromChange = (value, event) => {
    const { onChange } = this.asProps;
    const prevValue = this.asProps.value ?? [undefined, undefined];
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
    const prevValue = this.asProps.value ?? [undefined, undefined];
    onChange([prevValue[0], value], event);
  };
  handleFromKeydown = (event) => {
    if (!this.toRef.current) return;
    if (!this.fromRef.current) return;

    if (
      event.code === 'ArrowRight' &&
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

    if (event.code === 'Backspace' && !this.toRef.current.value) {
      const value = this.fromRef.current.value;
      this.fromRef.current.focus();
      setTimeout(() => {
        this.fromRef.current.setSelectionRange(value.length, value.length);
      }, 0);
    }
    if (
      event.code === 'ArrowLeft' &&
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

  getFromMaskedInputProps() {
    const { value, locale, onDisplayedPeriodChange, ...otherProps } = this.asProps;

    return assignProps(
      {
        ref: this.fromRef,
        date: value?.[0],
        onDateChange: this.handleFromChange,
        onKeyDown: this.handleFromKeydown,
        locale,
        flex: 1,
        onDisplayedPeriodChange,
      },
      otherProps,
    );
  }
  getToMaskedInputProps() {
    const { value, locale, onDisplayedPeriodChange, ...otherProps } = this.asProps;

    return assignProps(
      {
        ref: this.toRef,
        date: value?.[1],
        onDateChange: this.handleToChange,
        onKeyDown: this.handleToKeydown,
        locale,
        flex: 1,
        onDisplayedPeriodChange,
      },
      otherProps,
    );
  }

  render() {
    const SDateRange = Root;
    const { Children, styles, w } = this.asProps;

    return sstyled(styles)(
      <SDateRange render={InputMask} __excludeProps={['onChange', 'value']} w={w}>
        <Children />
      </SDateRange>,
    );
  }
}

const FromMaskedInput = (props) => {
  const SFromMaskedInput = Root;

  return sstyled(props.styles)(<SFromMaskedInput labelPrefix="from date" render={MaskedInput} />);
};

const ToMaskedInput = (props) => {
  const SToMaskedInput = Root;

  return sstyled(props.styles)(<SToMaskedInput labelPrefix="to date" render={MaskedInput} />);
};

const Indicator = (props) => {
  const SIndicator = Root;

  return sstyled(props.styles)(
    <SIndicator render={InputMask.Addon} tag={Calendar} aria-hidden="true" tabIndex={-1} />,
  );
};

const RangeSep = (props) => {
  const SRangeSep = Root;

  return sstyled(props.styles)(
    <SRangeSep
      render={InputMask.Addon}
      tag={Flex}
      alignItems="center"
      justifyContent="center"
      pl={0}
      flex="0"
    >
      -
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
  labelPrefix = 'Date',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __excludeProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Root: _root,
  ...otherProps
}) => {
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

        if (disabledDates && disabledDates.some(includesDate(dayjs(date), 'date'))) {
          return false;
        }

        if (allowedParts.day) {
          if (date.getDate() !== parseInt(day, 10)) return false;
        }
      }

      const result = [];
      for (const part of order) {
        if (part === 'year') result.push(year);
        if (part === 'month') result.push(month);
        if (part === 'day') result.push(day);
      }

      return { value: result.join(sep), indexesOfPipedChars };
    },
    [placeholders, sep, order, allowedParts, disabledDates],
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
  const humanizedDate = React.useMemo(() => {
    const validDate =
      outerValue && outerValue instanceof Date && !Number.isNaN(outerValue.getTime());
    if (!validDate) return null;

    return new Intl.DateTimeFormat(locale, {
      year: allowedParts.year ? 'numeric' : undefined,
      month: allowedParts.month ? 'short' : undefined,
      day: allowedParts.day ? '2-digit' : undefined,
    }).format(outerValue);
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
      value={value}
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
