import type { NSFlex, NSBox } from '@semcore/base-components';
import type Popper from '@semcore/base-components';
import type { BaseTriggerProps } from '@semcore/base-trigger';
import type BaseTrigger from '@semcore/base-trigger';
import type { NSButton } from '@semcore/button';
import type Checkbox from '@semcore/checkbox';
import type { UnknownProperties, Intergalactic, PropGetterFn } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type Divider from '@semcore/divider';
import type { DropdownProps, DropdownTriggerProps } from '@semcore/dropdown';
import type { NSInput } from '@semcore/input';
import type Input from '@semcore/input';
import type { NSInputMask } from '@semcore/input-mask';
import type { TooltipProps } from '@semcore/tooltip';
import type dayjs from 'dayjs';
import type { ChangeEvent } from 'react';
import type React from 'react';

export type DateConstructorParams = string | number | Date;

/**
 * Array of dates blocked for selection
 * Accepts the date or the range of dates for specifying infinity ([Date | false, Date | false]), crontab(6,7)
 * */
export type DisabledDates = (DateConstructorParams | (DateConstructorParams | false)[] | string)[];

export type CalendarProps = NSBox.Props & {
  /**
   * Locale for displaying the days of a week and months, to be transferred to `Intl`
   * @default en
   * */
  locale?: NavigatorLanguage['language'];
  /**
   * Array of dates blocked for selection
   */
  disabled?: DisabledDates;
  /** Internal */
  highlighted?: DateConstructorParams[];
  /** Internal */
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
  /** Controls whether to render dates from previous/next months */
  renderOutdated?: boolean;
};

export type CalendarDaysContext = {
  days: CalendarUnitProps[];
};

export type CalendarMonthsContext = {
  months: CalendarUnitProps[];
};

export type CalendarUnitProps = NSBox.Props & {
  /** Indicates if the calendar unit is part of a selected date range */
  selected?: boolean;
  /** Marks units from previous/next months that appear in the current month view */
  outdated?: boolean;
  /** Prevents interaction with the unit */
  disabled?: boolean;
  /** Highlights the current date */
  today?: boolean;
  /** Marks the beginning of a selected date range */
  startSelected?: boolean;
  /** Marks the end of a selected date range */
  endSelected?: boolean;
  /** Shows preview highlighting during range selection */
  highlighted?: boolean;
  /** Marks the start of a highlighted range */
  startHighlighted?: boolean;
  /** Marks the end of a highlighted range */
  endHighlighted?: boolean;
  /** The actual Date object this unit represents */
  date?: Date;
  /** Content to display within the unit (typically the day number) */
  children?: React.ReactNode;
};

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

export type DatePickerProps = Intergalactic.InternalTypings.EfficientOmit<
  DropdownProps,
  'disabled'
> &
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
  disabled?: (DateConstructorParams | (DateConstructorParams | false)[] | string)[];
  /**
     * Error message when user attempts to input a disabled date
     * */
  disabledErrorText?: ((attemptedDate: Date) => string) | string | null;
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
};

export type DateRangePickerProps = Intergalactic.InternalTypings.EfficientOmit<
  DropdownProps,
  'disabled'
> &
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
  disabled?: (DateConstructorParams | (DateConstructorParams | false)[] | string)[];
  /**
     * Error message when user attempts to input a disabled date
     * */
  disabledErrorText?: ((attemptedDate: Date) => string) | string | null;
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
     * Intermediate value between `highlighted` and `value` that user see before explicitly applying it.
     */
  preselectedValue?: DateConstructorParams[];
  /**
     * Normally called when user preselects a date range and when user applies this range.
     */
  onPreselectedValueChange?: (date: Date[]) => void;
  /**
     * Array of periods
     * [{value: [new Date(), new Date()], children: "Today"}]
     * @default Past 2 days / Past week / Past 2 week / Past month / Past 2 month
     * */
  periods?: (NSButton.Props & { value: Date[] })[];
};

export type DateRangePickerPeriodProps = NSBox.Props & {
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
  periods?: (NSButton.Props & { value: Date[] })[];
};

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

export type AbstractDatePickerHandlers = {
  displayedPeriod: (value: DateConstructorParams) => void;
  visible: (index: boolean) => void;
  highlighted: (list: DateConstructorParams[]) => void;
  value: (index: DateConstructorParams) => void;
};

export type DatePickerHandlers = {
  visible: (index: boolean) => void;
};

export type BaseInputTriggerProps = NSInput.Props &
  TooltipProps & {
    /**
     * Date input placeholder characters
     * @default { year: 'Y'; month: 'M'; day: 'D' }
     */
    placeholders?: { year: string; month: string; day: string };
    locale?: string;
    onDisplayedPeriodChange?: (date: Date) => void;
  };
export type InputTriggerProps = BaseInputTriggerProps & {
  value?: Date;
  onChange?: (date: Date, event: ChangeEvent) => void;
  /** @deprecated Set `disabledErrorText={null}` on the picker Root instead */
  showError?: boolean;
};

export type RangeInputTriggerProps = BaseInputTriggerProps & {
  value?: Date[];
  onChange?: (date: Date[], event: ChangeEvent) => void;
};

export type SingleDateInputProps = InputTriggerProps & {};

export type DateRangeProps = RangeInputTriggerProps & {};

export type DatePickerMaskedInputProps = {
  date?: Date;
  onDateChange?: (date: Date, event: ChangeEvent) => void;
  onDisplayedPeriodChange?: (date: Date) => void;
  locale?: string;
  parts?: { year: boolean; month: boolean; day: boolean };
  disabledDates?: (Date | (Date | false)[] | string)[];
};

declare const InputTrigger: Intergalactic.Component<
  'div',
  DropdownTriggerProps & InputTriggerProps
> & {
  Addon: typeof Input.Addon;
  Value: typeof Input.Value;
  SingleDateInput: Intergalactic.Component<'div', NSInput.Props & SingleDateInputProps> & {
    Indicator: typeof Input.Addon;
    MaskedInput: Intergalactic.Component<'input', NSInputMask.Value.Props & DatePickerMaskedInputProps>;
  };
};

declare const RangeInputTrigger: Intergalactic.Component<
  'div',
  DropdownTriggerProps & RangeInputTriggerProps
> & {
  Addon: typeof Input.Addon;
  Value: typeof Input.Value;
  DateRange: Intergalactic.Component<'div', NSInput.Value.Props & DateRangeProps> & {
    Indicator: typeof Input.Addon;
    RangeSep: typeof Input.Addon;
    FromMaskedInput: Intergalactic.Component<
      'input',
      NSInputMask.Value.Props & DatePickerMaskedInputProps
    >;
    ToMaskedInput: Intergalactic.Component<
      'input',
      NSInputMask.Value.Props & DatePickerMaskedInputProps
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
  Popper: typeof Popper.Popper;
  Header: NSBox.Component;
  Title: Intergalactic.Component<'div', DatePickerProps, DatePickerContext>;
  Prev: NSButton.Component;
  Next: NSButton.Component;
  Calendar: typeof Calendar;
  Today: NSBox.Component;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

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
  Trigger: typeof RangeInputTrigger;
  Popper: typeof Popper.Popper;
  Header: NSBox.Component;
  Title: Intergalactic.Component<'div', DateRangePickerProps, DateRangePickerContext>;
  Prev: NSButton.Component;
  Next: NSButton.Component;
  Calendar: typeof Calendar;
  Period: Intergalactic.Component<'div', DateRangePickerPeriodProps>;
  Apply: NSButton.Component;
  Reset: NSButton.Component;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

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
  Popper: typeof Popper.Popper;
  Header: NSBox.Component;
  Title: Intergalactic.Component<'div', DatePickerProps, MonthPickerContext>;
  Prev: NSButton.Component;
  Next: NSButton.Component;
  Calendar: typeof Calendar;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

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
  Trigger: typeof RangeInputTrigger;
  Popper: typeof Popper.Popper;
  Header: NSBox.Component;
  Title: Intergalactic.Component<'div', DateRangePickerProps, MonthRangePickerContext>;
  Prev: NSButton.Component;
  Next: NSButton.Component;
  Calendar: typeof Calendar;
  Period: Intergalactic.Component<'div', DateRangePickerPeriodProps>;
  Apply: NSButton.Component;
  Reset: NSButton.Component;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

export type DateRangeComparatorFocusRange = 'value' | 'compare';
export type DateRangeComparatorValue = {
  value?: DateConstructorParams[];
  compare?: DateConstructorParams[];
};

export type DateRangeComparatorProps = Intergalactic.InternalTypings.EfficientOmit<
  DropdownProps,
  'disabled'
> &
WithI18nEnhanceProps & {
  /**
     * Selected date ranges
     * */
  value?: DateRangeComparatorValue;
  /**
     * Default value for selected date ranges
     * */
  defaultValue?: DateRangeComparatorValue;
  /**
     * Default value date for showing the necessary month
     * */
  defaultDisplayedPeriod?: DateConstructorParams;
  /**
     * Default value selected date, accepts everything which is accepted by `new Date()`
     * */
  defaultHighlighted?: DateConstructorParams[];
  /**
     * Called with selected date when user clicks `Apply` button.
     * */
  onChange?: (ranges: {
    value?: DateConstructorParams[];
    compare?: DateConstructorParams[];
  }) => void;
  /**
     * Array of dates blocked for selection
     * */
  disabled?: (DateConstructorParams | (DateConstructorParams | false)[] | string)[];
  /**
     * Error message when user attempts to input a disabled date
     * */
  disabledErrorText?: ((attemptedDate: Date) => string) | string | null;
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
     * The selected date, accepts everything which is accepted by `new Date()`
     * */
  highlighted?: DateConstructorParams[];
  /**
     * To be activated upon selecting the date
     * */
  onHighlightedChange?: (date: Date[]) => void;
  /**
     * The selected date, accepts everything which is accepted by `new Date()`
     * */
  compareHighlighted?: DateConstructorParams[];
  /**
     * To be activated upon selecting the date
     * */
  onCompareHighlightedChange?: (date: Date[]) => void;
  /**
     * Intermediate value between `highlighted` and `value` that user see before explicitly applying it.
     */
  preselectedValue?: DateConstructorParams[];
  /**
     * Normally called when user preselects a date range and when user applies this range.
     */
  onPreselectedValueChange?: (date: Date[]) => void;
  /**
     * Intermediate value between `compareHighlighted` and `compare` that user see before explicitly applying it.
     */
  preselectedCompare?: DateConstructorParams[];
  /**
     * Normally called when user preselects a compare range and when user applies ranges.
     */
  onPreselectedCompareChange?: (date: Date[]) => void;
  /**
     * Controls that compare range input is enabled.
     */
  compareToggle?: boolean;
  /**
     * Toggles when compare range input enables or disables.
     */
  onCompareToggleChange?: (compareToggle: boolean) => void;
  /**
     * Controls which date range is focused.
     */
  focusedRange?: DateRangeComparatorFocusRange;
  /**
     * Called when user focuses or is focused on some of the date ranges.
     */
  onFocusedRangeChange?: (focusedRange: DateRangeComparatorFocusRange) => void;
  /**
     * Remove the 'Reset' button
     * */
  unclearable?: boolean;
  /**
     * Array of periods
     * [{value: [new Date(), new Date()], children: "Today"}]
     * @default Past 2 days / Past week / Past 2 week / Past month / Past 2 month
     * */
  periods?: (NSButton.Props & { value: Date[] })[];
};

export type DateRangeComparatorContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getPeriodProps: PropGetterFn;
};

export type DateRangeComparatorTriggerProps = DropdownTriggerProps &
  BaseTriggerProps & {
    /**
     * Text between the selected date range and the compared date range when both are selected.
     * @default 'vs.'
     */
    separator?: string;
    /**
     * Trigger text when no ranges are selected.
     */
    placeholder?: string;
  };

declare const DateRangeComparator: Intergalactic.Component<
  'div',
  DateRangeComparatorProps,
  DateRangeComparatorContext & CalendarDaysContext
> & {
  Popper: typeof Popper.Popper;
  Header: NSFlex.Component;
  Prev: NSButton.Component;
  Next: NSButton.Component;
  Calendar: typeof Calendar;
  Apply: NSButton.Component;
  Reset: NSButton.Component;

  CalendarHeader: NSBox.Component;
  Title: NSBox.Component;

  Trigger: Intergalactic.Component<'div', DropdownTriggerProps & BaseTriggerProps> & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  ValueDateRange: Intergalactic.Component<'div', InputTriggerProps>;
  CompareToggle: typeof Checkbox;
  CompareDateRange: Intergalactic.Component<'div', InputTriggerProps>;
  Body: NSFlex.Component;
  RangeCalendar: NSFlex.Component;
  Periods: NSFlex.Component & {
    Divider: typeof Divider;
    Column: NSFlex.Component;
    Options: NSFlex.Component;
    Controls: NSFlex.Component;
  };
  Footer: NSFlex.Component;
};

declare const MonthDateRangeComparator: typeof DateRangeComparator;

export {
  DatePicker,
  DateRangePicker,
  MonthPicker,
  MonthRangePicker,
  DateRangeComparator,
  MonthDateRangeComparator,
};
