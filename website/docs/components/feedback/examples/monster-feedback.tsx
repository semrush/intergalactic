//https://github.com/semrush/intergalactic/tree/master/website/docs/components/feedback/examples/monster-feedback.tsx
import React from 'react';
import FeedbackForm from '@semcore/ui/feedback-form';
import Input from '@semcore/ui/input';
import InputNumber from '@semcore/ui/input-number';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.campaign) {
    errors.campaign = 'Campaign is required';
  }

  if (!values.call) {
    errors.call = 'To pick to call or not is required';
  }

  if (!values.day || values.day <= 0) {
    errors.day = 'Invalid day value';
  }

  return errors;
};

const Demo = () => (
  <FeedbackForm validate={validate}>
    <FeedbackForm.Item name='title' validate={validate.email}>
      {({ input }) => {
        const { state, className, ...other } = input;
        return (
          <Input state={state} className={className} m='0 0 16px'>
            <Input.Value {...other} placeholder='Activity title' />
          </Input>
        );
      }}
    </FeedbackForm.Item>

    <label htmlFor='campaign'>
      <Text bold mb='8px' tag='p' size={200}>
        Campaign
      </Text>
      <FeedbackForm.Item name='campaign'>
        {({ input }) => (
          <Select onChange={input.onChange} state={input.state} placeholder='Select campaign'>
            <Select.Trigger id='campaign' {...input} m='0 0 16px' />
            <Select.Menu>
              {Array(4)
                .fill()
                .map((item, ind) => (
                  <Select.Option
                    value={`Company ${ind}`}
                    key={ind}
                  >{`Company ${ind}`}</Select.Option>
                ))}
            </Select.Menu>
          </Select>
        )}
      </FeedbackForm.Item>
    </label>

    <label htmlFor='day'>
      <Text bold mb={2} tag='p' size={200}>
        Day
      </Text>
      <FeedbackForm.Item name='day'>
        {({ input }) => {
          const { state, className, ...other } = input;
          return (
            <InputNumber state={state} className={className}>
              <InputNumber.Value id='day' {...other} placeholder='Enter day' />
            </InputNumber>
          );
        }}
      </FeedbackForm.Item>
    </label>

    <FeedbackForm.Item name='call'>
      {({ input }) => (
        <RadioGroup {...input}>
          <Flex direction='column' gap={1} my={4}>
            <Radio>
              <Radio.Value value='yes' />
              <Radio.Text>Call me 😏</Radio.Text>
            </Radio>
            <Radio>
              <Radio.Value value='no' />
              <Radio.Text>Don't call me!</Radio.Text>
            </Radio>
          </Flex>
        </RadioGroup>
      )}
    </FeedbackForm.Item>

    <FeedbackForm.Submit>Submit this strange form</FeedbackForm.Submit>
  </FeedbackForm>
);

export default Demo;
