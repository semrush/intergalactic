import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { DatePicker } from '@semcore/date-picker';
import TimePicker from '@semcore/time-picker';
import Checkbox from '@semcore/checkbox';
import Button from '@semcore/button';

type FormValues = {
  start_date?: Date;
  start_time?: string;
  due_date?: Date;
  due_time?: string;
};
const defaultValues: FormValues = {
  start_date: new Date(),
  start_time: '12:00',
  due_date: new Date(),
  due_time: '12:00',
};

const Demo = () => {
  const [period, setPeriod] = React.useState(false);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data));
  };

  const onReset = () => {
    reset(defaultValues);
  };

  const onPreventDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start'>
      <Flex mb={4}>
        <Flex direction='column'>
          <Text size={300} tag='label' mb={1} htmlFor='startDate'>
            Start date
          </Text>
          <Controller
            render={(props) => <DatePicker id='startDate' size='l' {...props} />}
            control={control}
            name='start_date'
          />
        </Flex>
        <Flex direction='column' ml={2}>
          <Text size={300} tag='label' mb={1} htmlFor='startTime'>
            Time
          </Text>
          <Controller
            render={(props) => (
              <TimePicker id='startTime' size='l' is12Hour {...props}>
                <TimePicker.Hours />
                <TimePicker.Separator />
                <TimePicker.Minutes />
                <TimePicker.Format onClick={onPreventDefault} />
              </TimePicker>
            )}
            control={control}
            name='start_time'
          />
        </Flex>
      </Flex>

      <Checkbox mb={4} size='l'>
        <Checkbox.Value onChange={setPeriod} />
        <Checkbox.Text>Period</Checkbox.Text>
      </Checkbox>

      {period && (
        <Flex mb={4}>
          <Flex direction='column'>
            <Text size={300} tag='label' mb={1} htmlFor='dueDate'>
              Due date
            </Text>
            <Controller
              render={(props) => <DatePicker id='dueDate' size='l' {...props} />}
              control={control}
              name='due_date'
            />
          </Flex>
          <Flex direction='column' ml={2}>
            <Text size={300} tag='label' mb={1} htmlFor='dueTime'>
              Time
            </Text>
            <Controller
              render={(props) => (
                <TimePicker id='dueTime' size='l' is12Hour {...props}>
                  <TimePicker.Hours />
                  <TimePicker.Separator />
                  <TimePicker.Minutes />
                  <TimePicker.Format onClick={onPreventDefault} />
                </TimePicker>
              )}
              control={control}
              name='due_time'
            />
          </Flex>
        </Flex>
      )}

      <Flex>
        <Button type='submit' use='primary' theme='success' size='l'>
          Create
        </Button>
        <Button ml={2} size='l' onClick={onReset}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
