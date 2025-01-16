import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import InputNumber from '@semcore/input-number';
import Radio, { RadioGroup } from '@semcore/radio';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

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
    <Box tag={'label'} htmlFor='acitivty'>
      <Text mb={2} tag='p' size={200}>
        Activity
      </Text>
      <FeedbackForm.Item name='title'>
        {({ input }) => {
          const { state, className, ...other } = input;
          return (
            <Input state={state} className={className}>
              <Input.Value
                {...other}
                placeholder='Activity title'
                id='acitivty'
                autoComplete='off'
              />
            </Input>
          );
        }}
      </FeedbackForm.Item>
    </Box>

    <Box tag={'label'} htmlFor='campaign' mt={4}>
      <Text mb={2} tag='p' size={200}>
        Campaign
      </Text>
      <FeedbackForm.Item name='campaign'>
        {({ input }) => (
          <Select onChange={input.onChange} state={input.state} placeholder='Select campaign'>
            <Select.Trigger id='campaign' {...input} />
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
    </Box>

    <Box tag={'label'} htmlFor='day' mt={4}>
      <Text mb={2} tag='p' size={200}>
        Day
      </Text>
      <FeedbackForm.Item name='day'>
        {({ input }) => {
          const { state, className, ...other } = input;
          return (
            <InputNumber state={state} className={className}>
              <InputNumber.Value id='day' {...other} placeholder='Enter day' autoComplete='off' />
            </InputNumber>
          );
        }}
      </FeedbackForm.Item>
    </Box>

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
