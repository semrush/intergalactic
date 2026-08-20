import type { NSBox } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSInput } from '@semcore/input';

declare namespace NSTimePicker {
  type Meridiem = 'AM' | 'PM';
  type Field = 'hours' | 'minutes';
  type Props = Omit<NSInput.Props, 'size'> & {
  /** Time in the hh:mm format */
    value?: string;
    /** Default value if `value` property is not provided */
    defaultValue?: string;
    /** The event responses upon time changing */
    onChange?: (time: string, event?: React.SyntheticEvent) => void;
    /** In charge of the component blocking */
    disabled?: boolean;
    /** Control size
   * @default m */
    size?: 'm' | 'l';
    /** 12-hour time format */
    is12Hour?: boolean;
    /** Specifies the locale for i18n support */
    locale?: string;
  };
  type DefaultProps = {
    defaultValue: '';
    size: 'm';
    children: React.ReactNode;
    locale: 'en';
  };
  type FieldProps = NSInput.Value.Props & {
    /** Step for changing of the values in the dropdown list */
    step?: number;
  };
  type Handlers = {
    value: (value: string) => void;
  };
  type Ctx = {
    getHoursProps: PropGetterFn;
    getFormatProps: PropGetterFn;
    getMinutesProps: PropGetterFn;
    getSeparatorProps: PropGetterFn;
  };

  namespace Hours {
    type Props = NSTimePicker.FieldProps;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Minutes {
    type Props = NSTimePicker.FieldProps;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Separator {
    type Component = NSBox.Component;
  }

  namespace Format {
    type Props = NSBox.Props;

    type Component = NSBox.Component;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]> & {
    Hours: Hours.Component;
    Minutes: Minutes.Component;
    Separator: Separator.Component;
    Format: Format.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type TimePickerProps = NSTimePicker.Props;
/** @deprecated It will be removed in v19. */
export type TimePickerDefaultProps = NSTimePicker.DefaultProps;
/** @deprecated It will be removed in v19. */
export type TimePickerSeparatorProps = {
  /** @Internal */
  hoursInputRef: React.RefObject<HTMLElement>;
  /** @Internal */
  disabled?: boolean;
}; ;
/** @deprecated It will be removed in v19. */
export type TimePickerItemProps = NSTimePicker.FieldProps;
/** @deprecated It will be removed in v19. */
export type TimePickerContext = NSTimePicker.Ctx;
/** @deprecated It will be removed in v19. */
export type TimePickerHandlers = NSTimePicker.Handlers;
/** @deprecated It will be removed in v19. */
export type TimePickerMeridiem = NSTimePicker.Meridiem;
/** @deprecated It will be removed in v19. */
export type TimePickerField = NSTimePicker.Field;
/** @deprecated It will be removed in v19. */
export type TimePickerComponent = NSTimePicker.Component;

export type { NSTimePicker };
