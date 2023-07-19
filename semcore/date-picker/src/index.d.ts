import React, { ChangeEvent, ComponentProps } from 'react';
import dayjs from 'dayjs';
import { Box, BoxProps } from '@semcore/flex-box';
import { UnknownProperties, Intergalactic, PropGetterFn } from '@semcore/core';
import Button from '@semcore/button';
import Dropdown, { DropdownProps, DropdownTriggerProps } from '@semcore/dropdown';
import { WithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import BaseTrigger, { BaseTriggerProps } from '@semcore/base-trigger';
import Input, { InputProps, InputValueProps } from '@semcore/input';
import { InputMaskValueProps } from '@semcore/input-mask';

export type DateConstructorParams = string | number | Date;

/** @deprecated */
export interface ICalendarProps extends CalendarProps, UnknownProperties {}
export type CalendarProps = BoxProps & {
  /**
   * Locale for displaying the days of a week and months, to be transferred to `Intl`
   * @default en
   * */
  locale?: NavigatorLanguage['language'];
  /** Locale setting for dayjs */
  localeParams?: ILocale;
  /**
   * Array of dates blocked for selection
   * Accepts the date or the range of dates for specifying infinity ([Date | false, Date | false]), crontab(6,7)
   * */
  disabled?: (Date | (Date | false)[] | string)[];
  /**
   * @ignore
   * */
  highlighted?: DateConstructorParams[];
  /**
   * @ignore
   * */
  onHighlightedChange?: (date: Date[]) => void;
  /**
   * The selected date, accepts everything which is accepted by `new Date()`
   * */
  value?: DateConstructorParams[];
  /**
   * To be activated upon selecting the date
   * */
  onChange?: (date: Date[]) => void;
  /**
   * Date for showing the necessary month
   * @default new Date()
   * */
  displayedPeriod?: Date;

  renderOutdated?: boolean;
};

/** @deprecated */
export interface ICalendarDaysContext extends CalendarDaysContext, UnknownProperties {}
export type CalendarDaysContext = {
  days: CalendarUnitProps[];
};

/** @deprecated */
export interface ICalendarMonthsContext extends CalendarMonthsContext, UnknownProperties {}
export type CalendarMonthsContext = {
  months: CalendarUnitProps[];
};

/** @deprecated */
export interface ICalendarUnitProps extends CalendarUnitProps, UnknownProperties {}
export type CalendarUnitProps = BoxProps & {
  selected?: boolean;
  outdated?: boolean;
  disabled?: boolean;
  today?: boolean;
  startSelected?: boolean;
  endSelected?: boolean;
  highlighted?: boolean;
  startHighlighted?: boolean;
  endHighlighted?: boolean;
  date?: Date;
  children?: React.ReactNode;
};

/** @deprecated */
export interface ICalendarContext extends CalendarContext, UnknownProperties {}
export type CalendarContext = {
  getUnitProps: PropGetterFn;
};

declare const Calendar: Intergalactic.Component<
  'div',
  CalendarProps,
  CalendarContext & CalendarDaysContext,
  [handlers: AbstractDatePickerHandlers]
> & {
  Unit: Intergalactic.Component<'div', CalendarUnitProps>;
};

/** @deprecated */
export interface IDatePickerProps extends DatePickerProps, UnknownProperties {}
export type DatePickerProps = DropdownProps &
  WithI18nEnhanceProps & {
    /**
     * The selected date, accepts everything which is accepted by `new Date()`
     * */
    value?: DateConstructorParams;
    /**
     * To be activated upon selecting the date
     * */
    onChange?: (date: Date) => void;
    /**
     * Array of dates blocked for selection
     * */
    disabled?: (Date | (Date | false)[] | string)[];
    /**
     * Date for showing the necessary month
     * @default new Date()
     * */
    displayedPeriod?: DateConstructorParams;
    /**
     * To be activated upon changing the current shown month
     * */
    onDisplayedPeriodChange?: (date: Date) => void;
    /**
     * Component size
     * @default m
     */
    size?: 'm' | 'l';
    /**
     * The selected date, accepts everything which is accepted by `new Date()`
     * */
    highlighted?: DateConstructorParams[];
    /**
     * Default value selected date, accepts everything which is accepted by `new Date()`
     * */
    defaultValue?: DateConstructorParams;
    /**
     * Default value date for showing the necessary month
     * */
    defaultDisplayedPeriod?: DateConstructorParams;
    /**
     * Default value selected date, accepts everything which is accepted by `new Date()`
     * */
    defaultHighlighted?: DateConstructorParams[];
    /** Locale setting for dayjs */
    localeParams?: ILocale;
  };

/** @deprecated */
export interface IDateRangePickerProps extends DateRangePickerProps, UnknownProperties {}
export type DateRangePickerProps = DropdownProps &
  WithI18nEnhanceProps & {
    /**
     * The selected date, accepts everything which is accepted by `new Date()`
     * */
    value?: DateConstructorParams[];
    /**
     * Default value selected date, accepts everything which is accepted by `new Date()`
     * */
    defaultValue?: DateConstructorParams[];
    /**
     * Default value date for showing the necessary month
     * */
    defaultDisplayedPeriod?: DateConstructorParams;
    /**
     * Default value selected date, accepts everything which is accepted by `new Date()`
     * */
    defaultHighlighted?: DateConstructorParams[];
    /**
     * To be activated upon selecting the date
     * */
    onChange?: (date: Date[]) => void;
    /**
     * Array of dates blocked for selection
     * */
    disabled?: (Date | (Date | false)[] | string)[];
    /**
     * Date for showing the necessary month
     * @default new Date()
     * */
    displayedPeriod?: DateConstructorParams;
    /**
     * To be activated upon changing the current shown month
     * */
    onDisplayedPeriodChange?: (date: Date) => void;
    /**
     * Component size
     * @default m
     */
    size?: 'm' | 'l' | 'xl';
    /**
     * The selected date, accepts everything which is accepted by `new Date()`
     * */
    highlighted?: DateConstructorParams[];
    /**
     * Remove the 'Reset' button
     * */
    unclearable?: boolean;
    /**
     * To be activated upon selecting the date
     * */
    onHighlightedChange?: (date: Date[]) => void;
    /**
     * Array of periods
     * [{value: [new Date(), new Date()], children: "Today"}]
     * @default Past 2 days / Past week / Past 2 week / Past month / Past 2 month
     * */
    periods?: (ComponentProps<typeof Button> & { value: Date[] })[];
    /** Locale setting for dayjs */
    localeParams?: ILocale;
  };

/** @deprecated */
export interface IDateRangePickerPeriodProps
  extends DateRangePickerPeriodProps,
    UnknownProperties {}
export type DateRangePickerPeriodProps = BoxProps & {
  /**
   * Current selected period
   * */
  value?: DateConstructorParams[];
  /**
   * To be activated by clicking the button for switching the selected period.
   * */
  onChange?: (date: Date[]) => void;
  /**
   * To be activated by hovering a cursor over the button for changing the current displayed month.
   * */
  onDisplayedPeriodChange?: (date: Date) => void;
  /**
   * To be activated by hovering a cursor over the button for selecting the dates.
   * */
  onHighlightedChange?: (date: Date[]) => void;
  /**
   * Array of periods
   * [{value: [new Date(), new Date()], children: "Today"}]
   * @default Past 2 days / Past week / Past 2 week / Past month / Past 2 month
   * */
  periods?: (ComponentProps<typeof Button> & { value: Date[] })[];
};

/** @deprecated */
export interface IDatePickerContext extends DatePickerContext, UnknownProperties {}
export type DatePickerContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getTodayProps: PropGetterFn;
};

/** @deprecated */
export interface IAbstractDatePickerHandlers
  extends AbstractDatePickerHandlers,
    UnknownProperties {}
export type AbstractDatePickerHandlers = {
  displayedPeriod: (value: DateConstructorParams) => void;
  visible: (index: boolean) => void;
  highlighted: (list: DateConstructorParams[]) => void;
  value: (index: DateConstructorParams) => void;
};

/** @deprecated */
export interface IDatePickerHandlers extends DatePickerHandlers, UnknownProperties {}
export type DatePickerHandlers = {
  visible: (index: boolean) => void;
};

/** @deprecated */
export interface IInputTriggerProps extends InputTriggerProps, UnknownProperties {}
export type InputTriggerProps = InputProps & {
  value?: Date;
  /**
   * Date input placeholder characters
   * @default { year: 'Y'; month: 'M'; day: 'D' }
   */
  placeholders?: { year: string; month: string; day: string };
  onChange?: (date: Date, event: ChangeEvent) => void;
  locale?: string;
  onDisplayedPeriodChange?: (date: Date) => void;
};

/** @deprecated */
export interface ISingleDateInputProps extends SingleDateInputProps, UnknownProperties {}
export type SingleDateInputProps = InputTriggerProps & {};

/** @deprecated */
export interface IDateRangeProps extends DateRangeProps, UnknownProperties {}
export type DateRangeProps = InputTriggerProps & {};

/** @deprecated */
export interface IDatePickerMaskedInputProps
  extends DatePickerMaskedInputProps,
    UnknownProperties {}
export type DatePickerMaskedInputProps = {
  date: Date;
  onDateChange: (date: Date, event: ChangeEvent) => void;
  onDisplayedPeriodChange: (date: Date) => void;
  locale?: string;
  parts: { year: Boolean; month: Boolean; day: Boolean };
  disabledDates: (Date | (Date | false)[] | string)[];
};

declare const InputTrigger: Intergalactic.Component<
  'div',
  DropdownTriggerProps & InputTriggerProps
> & {
  Addon: typeof Input.Addon;
  Value: typeof Input.Value;
  SingleDateInput: Intergalactic.Component<'div', InputProps & ISingleDateInputProps> & {
    Indicator: typeof Input.Addon;
    MaskedInput: Intergalactic.Component<'input', InputMaskValueProps & DatePickerMaskedInputProps>;
  };
  DateRange: Intergalactic.Component<'div', InputValueProps & DateRangeProps> & {
    Indicator: typeof Input.Addon;
    RangeSep: typeof Input.Addon;
    FromMaskedInput: Intergalactic.Component<
      'input',
      InputMaskValueProps & DatePickerMaskedInputProps
    >;
    ToMaskedInput: Intergalactic.Component<
      'input',
      InputMaskValueProps & DatePickerMaskedInputProps
    >;
  };
};

declare const DatePicker: Intergalactic.Component<
  'div',
  DatePickerProps,
  DatePickerContext & CalendarDaysContext
> & {
  /** @deprecated `DatePicker.ButtonTrigger` is deprecated, consider migrating to `DatePicker.Trigger` instead */
  ButtonTrigger: Intergalactic.Component<'div', DropdownTriggerProps & BaseTriggerProps> & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Trigger: typeof InputTrigger;
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: Intergalactic.Component<'div', DatePickerProps, DatePickerContext>;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  Today: typeof Box;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

/** @deprecated */
export interface IDateRangePickerContext extends DateRangePickerContext, UnknownProperties {}
export type DateRangePickerContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getPeriodProps: PropGetterFn;
};

declare const DateRangePicker: Intergalactic.Component<
  'div',
  DateRangePickerProps,
  DateRangePickerContext & CalendarDaysContext,
  [handlers: DatePickerHandlers]
> & {
  /** @deprecated `DatePicker.ButtonTrigger` is deprecated, consider migrating to `DatePicker.Trigger` instead */
  ButtonTrigger: Intergalactic.Component<'div', DropdownTriggerProps & BaseTriggerProps> & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Trigger: typeof InputTrigger;
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: Intergalactic.Component<'div', DateRangePickerProps, DateRangePickerContext>;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  Period: Intergalactic.Component<'div', DateRangePickerPeriodProps>;
  Apply: typeof Button;
  Reset: typeof Button;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

/** @deprecated */
export interface IMonthPickerContext extends MonthPickerContext, UnknownProperties {}
export type MonthPickerContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
};

declare const MonthPicker: Intergalactic.Component<
  'div',
  DatePickerProps,
  MonthPickerContext & CalendarMonthsContext,
  [handlers: DatePickerHandlers]
> & {
  /** @deprecated `DatePicker.ButtonTrigger` is deprecated, consider migrating to `DatePicker.Trigger` instead */
  ButtonTrigger: Intergalactic.Component<'div', DropdownTriggerProps & BaseTriggerProps> & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Trigger: typeof InputTrigger;
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: Intergalactic.Component<'div', DatePickerProps, MonthPickerContext>;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

/** @deprecated */
export interface IMonthRangePickerContext extends MonthRangePickerContext, UnknownProperties {}
export type MonthRangePickerContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getPeriodProps: PropGetterFn;
};

declare const MonthRangePicker: Intergalactic.Component<
  'div',
  DateRangePickerProps,
  MonthRangePickerContext & CalendarMonthsContext,
  [handlers: DatePickerHandlers]
> & {
  /** @deprecated `DatePicker.ButtonTrigger` is deprecated, consider migrating to `DatePicker.Trigger` instead */
  ButtonTrigger: Intergalactic.Component<'div', DropdownTriggerProps & BaseTriggerProps> & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Trigger: typeof InputTrigger;
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: Intergalactic.Component<'div', DateRangePickerProps, MonthRangePickerContext>;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  Period: Intergalactic.Component<'div', DateRangePickerPeriodProps>;
  Apply: typeof Button;
  Reset: typeof Button;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

export { DatePicker, DateRangePicker, MonthPicker, MonthRangePicker };
