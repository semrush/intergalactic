import React from 'react';
import FeedbackForm from 'intergalactic/feedback-form';
import Input from 'intergalactic/input';
import InputNumber from 'intergalactic/input-number';
import Radio, { RadioGroup } from 'intergalactic/radio';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

type Data = {
  title: string;
  campaign: string;
  call: boolean;
  day: number;
};

const validate = (values: Data) => {
  if (!values) return {};
  const errors: Partial<Record<keyof Data, string>> = {};
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
  <FeedbackForm validate={validate} p={1} onSubmit={() => ({})}>
    <FeedbackForm.Item name='title'>
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
                .fill(0)
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
              <Radio.Text>Call me</Radio.Text>
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
