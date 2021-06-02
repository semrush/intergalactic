import PickerAbstract, { IDatePickerProps } from './components/PickerAbstract';
import createComponent, { Merge, MergeGetters, PropGetter } from '@semcore/core';
import React, { ComponentProps, HTMLAttributes } from 'react';
import Dropdown, { IDropdownProps } from '@semcore/dropdown';
import ButtonTrigger from './components/ButtonTrigger';
import { Box, IBoxProps } from '@semcore/flex-box';
import Button from '@semcore/button';
import {
  CalendarDays as Calendar,
  ICalendarDaysContext,
  ICalendarMonthsContext,
} from './components/Calendar';
import dayjs from 'dayjs';
import {
  Header,
  IDateRangePickerPeriodProps,
  Next,
  Period,
  Popper,
  Prev,
  Title,
  Trigger,
} from './components';
import RangePickerAbstract, { IDateRangePickerProps } from './components/RangePickerAbstract';
import BaseTrigger from '@semcore/base-trigger';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export interface IDatePickerContext extends IDatePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<DatePickerRoot['getTriggerProps']>,
    PropGetter<PickerAbstract['getTriggerProps']>
  >;
  getPopperProps: MergeGetters<
    PropGetter<DatePickerRoot['getPopperProps']>,
    PropGetter<PickerAbstract['getPopperProps']>
  >;
  getHeaderProps: PropGetter<DatePickerRoot['getHeaderProps']>;
  getTitleProps: MergeGetters<
    PropGetter<DatePickerRoot['getTitleProps']>,
    PropGetter<PickerAbstract['getTitleProps']>
  >;
  getNextProps: PropGetter<DatePickerRoot['getNextProps']>;
  getPrevProps: PropGetter<DatePickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<DatePickerRoot['getCalendarProps']>;
  getTodayProps: PropGetter<DatePickerRoot['getTodayProps']>;
}

const DatePicker = createComponent<
  Merge<IDatePickerProps, HTMLAttributes<HTMLButtonElement>>,
  {
    Trigger: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof ButtonTrigger>>;
    Popper: ComponentProps<typeof Dropdown.Popper>;
    Header: ComponentProps<typeof Box>;
    Title: ComponentProps<typeof Box>;
    Prev: ComponentProps<typeof Button>;
    Next: ComponentProps<typeof Button>;
    Calendar: [
      ComponentProps<typeof Calendar>,
      {
        Unit: ComponentProps<typeof Calendar.Unit>;
      },
    ];
    Today: ComponentProps<typeof Box>;
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IDatePickerContext & ICalendarDaysContext
>(
  DatePickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
    Today,
  },
  {
    parent: Calendar,
  },
);

export interface IDateRangePickerContext extends IDateRangePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<DateRangePickerRoot['getTriggerProps']>,
    PropGetter<RangePickerAbstract['getTriggerProps']>
  >;
  getPopperProps: PropGetter<DateRangePickerRoot['getPopperProps']>;
  getHeaderProps: PropGetter<DateRangePickerRoot['getHeaderProps']>;
  getTitleProps: PropGetter<DateRangePickerRoot['getTitleProps']>;
  getNextProps: PropGetter<DateRangePickerRoot['getNextProps']>;
  getPrevProps: PropGetter<DateRangePickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<DateRangePickerRoot['getCalendarProps']>;
  getPeriodProps: PropGetter<DateRangePickerRoot['getPeriodProps']>;
}

const DateRangePicker = createComponent<
  Merge<IDateRangePickerProps, IDropdownProps>,
  {
    Trigger: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof ButtonTrigger>>;
    Popper: ComponentProps<typeof Dropdown.Popper>;
    Header: ComponentProps<typeof Box>;
    Title: ComponentProps<typeof Box>;
    Prev: ComponentProps<typeof Button>;
    Next: ComponentProps<typeof Button>;
    Calendar: [
      ComponentProps<typeof Calendar>,
      {
        Unit: ComponentProps<typeof Calendar.Unit>;
      },
    ];
    Period: Merge<IDateRangePickerPeriodProps, HTMLAttributes<HTMLDivElement>>;
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IDateRangePickerContext & ICalendarDaysContext
>(
  DateRangePickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
    Period,
  },
  {
    parent: Calendar,
  },
);

export interface IMonthPickerContext extends IDatePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<MonthPickerRoot['getTriggerProps']>,
    PropGetter<PickerAbstract['getTriggerProps']>
  >;
  getPopperProps: PropGetter<MonthPickerRoot['getTriggerProps']>;
  getHeaderProps: PropGetter<MonthPickerRoot['getHeaderProps']>;
  getTitleProps: MergeGetters<
    PropGetter<MonthPickerRoot['getTitleProps']>,
    PropGetter<PickerAbstract['getTitleProps']>
  >;
  getNextProps: PropGetter<MonthPickerRoot['getNextProps']>;
  getPrevProps: PropGetter<MonthPickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<MonthPickerRoot['getCalendarProps']>;
}

const MonthPicker = createComponent<
  Merge<IDatePickerProps, HTMLAttributes<HTMLButtonElement>>,
  {
    Trigger: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof ButtonTrigger>>;
    Popper: ComponentProps<typeof Dropdown.Popper>;
    Header: ComponentProps<typeof Box>;
    Title: ComponentProps<typeof Box>;
    Prev: ComponentProps<typeof Button>;
    Next: ComponentProps<typeof Button>;
    Calendar: [
      ComponentProps<typeof Calendar>,
      {
        Unit: ComponentProps<typeof Calendar.Unit>;
      },
    ];
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IMonthPickerContext & ICalendarMonthsContext
>(
  MonthPickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
  },
  {
    parent: Calendar,
  },
);

export interface IMonthRangePickerContext extends IDateRangePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<MonthRangePickerRoot['getTriggerProps']>,
    PropGetter<RangePickerAbstract['getTriggerProps']>
  >;
  getPopperProps: PropGetter<MonthRangePickerRoot['getPopperProps']>;
  getHeaderProps: PropGetter<MonthRangePickerRoot['getHeaderProps']>;
  getTitleProps: PropGetter<MonthRangePickerRoot['getTitleProps']>;
  getNextProps: PropGetter<MonthRangePickerRoot['getNextProps']>;
  getPrevProps: PropGetter<MonthRangePickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<MonthRangePickerRoot['getCalendarProps']>;
  getPeriodProps: PropGetter<MonthRangePickerRoot['getPeriodProps']>;
}

const MonthRangePicker = createComponent<
  Merge<IDateRangePickerProps, IDropdownProps>,
  {
    Trigger: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof ButtonTrigger>>;
    Popper: ComponentProps<typeof Dropdown.Popper>;
    Header: ComponentProps<typeof Box>;
    Title: ComponentProps<typeof Box>;
    Prev: ComponentProps<typeof Button>;
    Next: ComponentProps<typeof Button>;
    Calendar: [
      ComponentProps<typeof Calendar>,
      {
        Unit: ComponentProps<typeof Calendar.Unit>;
      },
    ];
    Period: Merge<IDateRangePickerPeriodProps, HTMLAttributes<HTMLDivElement>>;
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IMonthRangePickerContext & ICalendarMonthsContext
>(
  MonthRangePickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
    Period,
  },
  {
    parent: Calendar,
  },
);

const ButtonTrigger = createComponent<
  ComponentProps<typeof BaseTrigger>,
  {
    Text: ComponentProps<typeof BaseTrigger.Text>;
    Addon: ComponentProps<typeof BaseTrigger.Addon>;
  }
>(ButtonTriggerRoot, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
});

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

export interface ICalendarDaysProps extends ICalendarProps {
  /**
   * Displays dates of next and previous month
   * */
  renderOutdated?: boolean;
}

export interface ICalendarDaysContext {
  days: ICalendarUnitProps[];
}

export interface ICalendarWeekDaysContext {
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

export interface ICalendarWeekDaysProps extends IBoxProps {
  locale?: NavigatorLanguage['language'];
}

const CalendarWeekDays = createComponent<
  Merge<ICalendarWeekDaysProps, HTMLAttributes<HTMLDivElement>>,
  { Unit: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>> },
  ICalendarWeekDaysContext
>(CalendarWeekDaysRoot, { Unit: CalendarWeekUnit });

const CalendarDays = createComponent<
  Merge<ICalendarDaysProps, HTMLAttributes<HTMLDivElement>>,
  { Unit: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>> },
  ICalendarDaysContext
>(CalendarDaysRoot, { Unit: CalendarUnit });

const CalendarMonths = createComponent<
  Merge<ICalendarProps, HTMLAttributes<HTMLDivElement>>,
  { Unit: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>> },
  ICalendarMonthsContext
>(CalendarMonthsRoot, { Unit: CalendarUnit });

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
  size?: 'm' | 'l' | 'xl';
}

export interface IDateRangePickerProps extends IDropdownProps, IWithI18nEnhanceProps {
  /**
   * The selected date, accepts everything which is accepted by `new Date()`
   * */
  value?: DateConstructorParams[];
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
