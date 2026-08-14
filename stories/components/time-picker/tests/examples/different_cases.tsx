import { Box } from '@semcore/ui/base-components';
import TimePicker from '@semcore/ui/time-picker';
import type { NSTimePicker } from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type baseExampleProps = NSTimePicker.Props & NSTimePicker.FieldProps;

const Demo = (props: baseExampleProps) => {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const timeValueProps = props.value !== undefined
    ? {
        value,
        onChange: (newValue: string) => setValue(newValue),
      }
    : props.defaultValue !== undefined
      ? { defaultValue: props.defaultValue }
      : {};

  return (
    <>
      <Text tag='label' htmlFor='time-picker' size={200}>
        With Hours Separator Min Format subcomponents
      </Text>
      <Box mt={2} data-testid='expanded'>
        <TimePicker
          size={props.size}
          is12Hour={false}
          disabled={props.disabled}
          state={props.state}
          {...timeValueProps}

          locale={props.locale}
          id='time-picker'
        >
          <TimePicker.Hours

            readOnly={props.readOnly}
          />
          <TimePicker.Separator />
          <TimePicker.Minutes

            readOnly={props.readOnly}
          />
          <TimePicker.Format />
        </TimePicker>
      </Box>

      <Text tag='label' htmlFor='time-picker' size={200}>
        Without Hours Min Format subcomponents
      </Text>
      <Box mt={2} data-testid='regular'>
        <TimePicker
          size={props.size}
          is12Hour={props.is12Hour}
          disabled={props.disabled}
          state={props.state}
          {...timeValueProps}

          locale={props.locale}
          id='time-picker'
        />
      </Box>

      <Text tag='label' htmlFor='time-picker' size={200}>
        Without separator and step=6
      </Text>
      <Box mt={2} data-testid='expanded-without-separator'>
        <TimePicker
          size={props.size}
          is12Hour={props.is12Hour}
          disabled={props.disabled}
          state={props.state}
          {...timeValueProps}
          locale={props.locale}
          id='time-picker'
        >
          <TimePicker.Hours
            step={6}
            readOnly={props.readOnly}
          />
          <TimePicker.Minutes
            step={6}
            readOnly={props.readOnly}
          />
          <TimePicker.Format />
        </TimePicker>
      </Box>

      <Text tag='label' htmlFor='time-picker' size={200}>
        Without separator and format
      </Text>
      <Box mt={2} data-testid='expanded-without-separator-and-format'>
        <TimePicker
          size={props.size}
          is12Hour={props.is12Hour}
          disabled={props.disabled}
          state={props.state}
          {...timeValueProps}
          locale={props.locale}
          id='time-picker'
        >
          <TimePicker.Hours
            step={props.step}
            readOnly={props.readOnly}
            {...(props.placeholder !== undefined && { placeholder: props.placeholder })}
            {...(props.autoFocus !== undefined && { autoFocus: props.autoFocus })}
          />
          <TimePicker.Minutes
            step={props.step}
            readOnly={props.readOnly}
            {...(props.placeholder !== undefined && { placeholder: props.placeholder })}
          />
        </TimePicker>
      </Box>

      <Text tag='label' htmlFor='time-picker' size={200}>
        Without Hours
      </Text>
      <Box mt={2} data-testid='expanded-without-hours'>
        <TimePicker
          size={props.size}
          is12Hour={props.is12Hour}
          disabled={props.disabled}
          state={props.state}
          {...timeValueProps}
          locale={props.locale}
          id='time-picker'
        >

          <TimePicker.Minutes
            step={6}
            readOnly={props.readOnly}
          />
        </TimePicker>
      </Box>

      <Text tag='label' htmlFor='time-picker' size={200}>
        Without minutes
      </Text>
      <Box mt={2} data-testid='expanded-without-minutes'>
        <TimePicker
          size={props.size}
          is12Hour={props.is12Hour}
          disabled={props.disabled}
          state={props.state}
          {...timeValueProps}
          locale={props.locale}
          id='time-picker'
        >
          <TimePicker.Hours
            readOnly={props.readOnly}
          />
          <TimePicker.Format />
        </TimePicker>
      </Box>
    </>
  );
};

export const defaultProps: baseExampleProps = {
  size: 'm',
  is12Hour: true,
  disabled: undefined,
  state: undefined,
  step: 6,
  readOnly: undefined,
  locale: undefined,
  placeholder: undefined,
  autoFocus: undefined,

};

Demo.defaultProps = defaultProps;

export default Demo;
