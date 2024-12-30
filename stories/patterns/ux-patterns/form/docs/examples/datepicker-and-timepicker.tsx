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
const defaultValues: FormValues = {};

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
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start' gap={6}>
      <Flex gap={4}>
        <Flex direction='column' gap={2}>
          <Text size={300} tag='label' htmlFor='startDate'>
            Start date
          </Text>
          <Controller
            render={({ field: { value, onChange } }) => (
              <DatePicker value={value} onChange={onChange}>
                <DatePicker.Trigger id='startDate' size='l' />
                <DatePicker.Popper />
              </DatePicker>
            )}
            control={control}
            name='start_date'
          />
        </Flex>
        <Flex direction='column' gap={2}>
          <Text size={300} tag='label' htmlFor='startTime'>
            Time
          </Text>
          <Controller
            render={({ field: { value, onChange } }) => (
              <TimePicker id='startTime' size='l' is12Hour value={value} onChange={onChange}>
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

      <Checkbox size='l'>
        <Checkbox.Value onChange={setPeriod} />
        <Checkbox.Text>Period</Checkbox.Text>
      </Checkbox>

      {period && (
        <Flex gap={4}>
          <Flex direction='column' gap={2}>
            <Text size={300} tag='label' htmlFor='dueDate'>
              Due date
            </Text>
            <Controller
              render={({ field: { value, onChange } }) => (
                <DatePicker value={value} onChange={onChange}>
                  <DatePicker.Trigger id='dueDate' size='l' />
                  <DatePicker.Popper />
                </DatePicker>
              )}
              control={control}
              name='due_date'
            />
          </Flex>
          <Flex direction='column' gap={2}>
            <Text size={300} tag='label' htmlFor='dueTime'>
              Time
            </Text>
            <Controller
              render={({ field: { value, onChange } }) => (
                <TimePicker id='dueTime' size='l' is12Hour value={value} onChange={onChange}>
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

      <Flex gap={3} mt={2}>
        <Button type='submit' use='primary' theme='success' size='l'>
          Create
        </Button>
        <Button size='l' onClick={onReset}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
