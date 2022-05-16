import React, { ComponentProps } from 'react';
import dayjs from 'dayjs';
import { Box, IBoxProps } from '@semcore/flex-box';
import Button from '@semcore/button';
import { CProps, Merge, PropGetterFn, ReturnEl } from '@semcore/core';
import Dropdown, { IDropdownProps } from '@semcore/dropdown';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import BaseTrigger from '@semcore/base-trigger';

export type DateConstructorParams = string | number | Date;

export interface ICalendarProps extends IBoxProps {
  /**
   * Locale for displaying the days of a week and months, to be transferred to `Intl`
   * @default en
   * */
  locale?: NavigatorLanguage['language'];
  /**
   * Array of dates blocked for selection
   * Accepts the date, the range of dates or `falsICalendarPropse` for specifying infinity ([Date | false, Date | false]), crontab( 6,7)
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
}

export interface ICalendarDaysContext {
  days: ICalendarUnitProps[];
}

export interface ICalendarMonthsContext {
  months: ICalendarUnitProps[];
}

export interface ICalendarUnitProps extends IBoxProps {
  selected?: boolean;
  outdated?: boolean;
  disabled?: boolean;
  today?: boolean;
  startSelected?: boolean;
  endSelected?: boolean;
  highlighted?: boolean;
  startHighlighted?: boolean;
  endHighlighted?: boolean;
  children?: React.ReactNode;
}

export interface ICalendarContext {
  getUnitProps: PropGetterFn;
}

declare const Calendar: (<T>(
  props: CProps<ICalendarProps & T, ICalendarContext, IAbstractDatePickerHandlers>,
) => ReturnEl) & {
  Unit: <T>(props: ICalendarUnitProps & T) => ReturnEl;
};

export interface IDatePickerProps extends IDropdownProps, IWithI18nEnhanceProps {
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
}

export interface IDateRangePickerProps extends IDropdownProps, IWithI18nEnhanceProps {
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
}

export interface IDateRangePickerPeriodProps extends IBoxProps {
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
}

export interface IDatePickerContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getTodayProps: PropGetterFn;
}

export interface IAbstractDatePickerHandlers {
  displayedPeriod: (value: DateConstructorParams) => void;
  visible: (index: boolean) => void;
  highlighted: (list: DateConstructorParams[]) => void;
  value: (index: DateConstructorParams) => void;
}

export interface IDatePickerHandlers {
  visible: (index: boolean) => void;
}

declare const DatePicker: ((
  props: CProps<IDatePickerProps, IDatePickerContext & ICalendarDaysContext, IDatePickerHandlers>,
) => ReturnEl) & {
  Trigger: (<T>(
    props: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof BaseTrigger>> & T,
  ) => ReturnEl) & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: <T>(props: CProps<IDatePickerProps & IBoxProps & T, IDatePickerContext>) => ReturnEl;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  Today: typeof Box;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

export interface IDateRangePickerContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getPeriodProps: PropGetterFn;
}

declare const DateRangePicker: ((
  props: CProps<
    IDateRangePickerProps,
    IDateRangePickerContext & ICalendarDaysContext,
    IDatePickerHandlers
  >,
) => ReturnEl) & {
  Trigger: (<T>(
    props: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof BaseTrigger>> & T,
  ) => ReturnEl) & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Popper: <T>(props: ComponentProps<typeof Dropdown.Popper> & T) => ReturnEl;
  Header: typeof Box;
  Title: <T>(
    props: CProps<IDateRangePickerProps & IBoxProps & T, IDateRangePickerContext>,
  ) => ReturnEl;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  Period: <T>(props: IDateRangePickerPeriodProps & T) => ReturnEl;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

export interface IMonthPickerContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
}

declare const MonthPicker: ((
  props: CProps<
    IDatePickerProps,
    IMonthPickerContext & ICalendarMonthsContext,
    IDatePickerHandlers
  >,
) => ReturnEl) & {
  Trigger: (<T>(
    props: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof BaseTrigger>> & T,
  ) => ReturnEl) & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: <T>(props: CProps<IDatePickerProps & IBoxProps & T, IMonthPickerContext>) => ReturnEl;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

export interface IMonthRangePickerContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  getHeaderProps: PropGetterFn;
  getTitleProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getCalendarProps: PropGetterFn;
  getPeriodProps: PropGetterFn;
}

declare const MonthRangePicker: ((
  props: CProps<
    IDateRangePickerProps,
    IMonthRangePickerContext & ICalendarMonthsContext,
    IDatePickerHandlers
  >,
) => ReturnEl) & {
  Trigger: (<T>(
    props: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof BaseTrigger>> & T,
  ) => ReturnEl) & {
    Addon: typeof BaseTrigger.Addon;
    Text: typeof BaseTrigger.Text;
  };
  Popper: typeof Dropdown.Popper;
  Header: typeof Box;
  Title: <T>(
    props: CProps<IDateRangePickerProps & IBoxProps & T, IMonthRangePickerContext>,
  ) => ReturnEl;
  Prev: typeof Button;
  Next: typeof Button;
  Calendar: typeof Calendar;
  Period: <T>(props: IDateRangePickerPeriodProps & T) => ReturnEl;
  add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
};

export { DatePicker, DateRangePicker, MonthPicker, MonthRangePicker };
