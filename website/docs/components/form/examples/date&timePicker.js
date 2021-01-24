import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { DatePicker } from '@semcore/date-picker';
import TimePicker from '@semcore/time-picker';
import Checkbox from '@semcore/checkbox';
import Button from '@semcore/button';

const Demo = () => {
  const [period, updatePeriod] = React.useState(false);
  const defaultValues = {
    start_date: new Date(),
    start_time: '12:00',
    due_date: new Date(),
    due_time: '12:00',
  };
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const onReset = () => {
    reset(defaultValues);
  };

  const onPreventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <Flex tag="form" onSubmit={handleSubmit(onSubmit)} direction="column" alignItems="flex-start">
      <Flex mb={4}>
        <Flex direction="column">
          <Text size={200} tag="label" mb={1}>
            Start date
          </Text>
          <Controller
            render={(props) => <DatePicker size="l" {...props} />}
            control={control}
            name="start_date"
          />
        </Flex>
        <Flex direction="column" ml={2}>
          <Text size={200} tag="label" mb={1}>
            Time
          </Text>
          <Controller
            render={(props) => (
              <TimePicker size="l" is12Hour {...props}>
                <TimePicker.Hours />
                <TimePicker.Separator />
                <TimePicker.Minutes />
                <TimePicker.Format onClick={onPreventDefault} />
              </TimePicker>
            )}
            control={control}
            name="start_time"
          />
        </Flex>
      </Flex>

      <Checkbox mb={4} size="l">
        <Checkbox.Value onChange={updatePeriod} />
        <Checkbox.Text>Period</Checkbox.Text>
      </Checkbox>

      {period && (
        <Flex mb={4}>
          <Flex direction="column">
            <Text size={200} tag="label" mb={1}>
              Due date
            </Text>
            <Controller
              render={(props) => <DatePicker size="l" {...props} />}
              control={control}
              name="due_date"
            />
          </Flex>
          <Flex direction="column" ml={2}>
            <Text size={200} tag="label" mb={1}>
              Time
            </Text>
            <Controller
              render={(props) => (
                <TimePicker size="l" is12Hour {...props}>
                  <TimePicker.Hours />
                  <TimePicker.Separator />
                  <TimePicker.Minutes />
                  <TimePicker.Format onClick={onPreventDefault} />
                </TimePicker>
              )}
              control={control}
              name="due_time"
            />
          </Flex>
        </Flex>
      )}

      <Flex>
        <Button type="submit" use="primary" theme="success" size="l">
          Create
        </Button>
        <Button ml={2} size="l" onClick={onReset}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
