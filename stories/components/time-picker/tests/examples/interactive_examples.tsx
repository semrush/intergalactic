import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Select from '@semcore/ui/select';
import TimePicker from '@semcore/ui/time-picker';
import type { TimePickerProps, TimePickerItemProps } from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type InteractiveExampleProps = TimePickerProps & TimePickerItemProps & {
  showOnChange?: boolean;
  showValidation?: boolean;
  showLocaleSwitch?: boolean;
  showStepControls?: boolean;
};

const Demo = (props: InteractiveExampleProps) => {
  const [time, setTime] = React.useState(props.value || props.defaultValue || '14:30');
  const [lastChanged, setLastChanged] = React.useState<string>('');
  const [error, setError] = React.useState('');
  const [startTime, setStartTime] = React.useState('09:00');
  const [endTime, setEndTime] = React.useState('17:00');

  const handleChange = (newTime: string, event?: React.SyntheticEvent) => {
    console.log('Returned value:', newTime);
    console.log('Value length:', newTime.length);
    console.log('Event type:', event?.type);
    setTime(newTime);
    setLastChanged(new Date().toLocaleTimeString());
    if (props.onChange) {
      props.onChange(newTime, event);
    }
  };

  const validateTimes = (start: string, end: string) => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (startMinutes >= endMinutes) {
      setError('Start time must be before end time');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleStartChange = (newTime: string) => {
    console.log('Start time onChange:', newTime);
    setStartTime(newTime);
    validateTimes(newTime, endTime);
  };

  const handleEndChange = (newTime: string) => {
    console.log('End time onChange:', newTime);
    setEndTime(newTime);
    validateTimes(startTime, newTime);
  };

  return (
    <Box>
      {/* Basic TimePicker with onChange */}
      {props.showOnChange && (
        <Box mb={5}>
          <Text tag='h3' size={300} mb={3}>
            Controlled Component with onChange
          </Text>
          <Text tag='label' htmlFor='controlled-time-picker' size={200} mb={2}>
            Meeting time
          </Text>
          <Box mb={3}>
            <TimePicker
              id='controlled-time-picker'
              value={time}
              onChange={handleChange}
              is12Hour={props.is12Hour}
              size={props.size}
              disabled={props.disabled}
              state={props.state}
            />
          </Box>

          <Box mb={3}>
            <Text size={200} bold>
              Selected time (24h format): {time}
            </Text>
            {lastChanged && (
              <Text size={100} color='text-secondary'>
                Last changed at: {lastChanged}
              </Text>
            )}
          </Box>

          <Box display='flex' m={2}>
            <Button use='primary' onClick={() => handleChange('09:00')}>
              Set to 9:00 AM
            </Button>
            <Button onClick={() => handleChange('13:30')}>
              Set to 1:30 PM
            </Button>
            <Button onClick={() => handleChange('17:00')}>
              Set to 5:00 PM
            </Button>
          </Box>
        </Box>
      )}

      {/* Form Validation */}
      {props.showValidation && (
        <Box mb={5}>
          <Text tag='h3' size={300} mb={3}>
            Form Validation
          </Text>

          <Box mb={3}>
            <Text tag='label' htmlFor='start-time' size={200} mb={2}>
              Start time
            </Text>
            <TimePicker
              id='start-time'
              value={startTime}
              onChange={handleStartChange}
              state={error ? 'invalid' : 'normal'}
              size={props.size}
              is12Hour={props.is12Hour}
            />
          </Box>

          <Box mb={3}>
            <Text tag='label' htmlFor='end-time' size={200} mb={2}>
              End time
            </Text>
            <TimePicker
              id='end-time'
              value={endTime}
              onChange={handleEndChange}
              state={error ? 'invalid' : 'normal'}
              size={props.size}
              is12Hour={props.is12Hour}
            />
          </Box>

          {error && (
            <Box mb={3}>
              <Text size={200} color='text-critical'>
                {error}
              </Text>
            </Box>
          )}

          <Button use='primary' disabled={!!error}>
            Schedule Meeting
          </Button>
        </Box>
      )}
    </Box>
  );
};

export const defaultProps: InteractiveExampleProps = {
  size: 'm',
  is12Hour: true,
  disabled: false,
  state: 'normal',
  step: undefined,
  showOnChange: true,
  showValidation: false,
  showLocaleSwitch: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
