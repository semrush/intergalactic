import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import Checkbox from '@semcore/checkbox';
import InputNumber from '@semcore/input-number';
import Radio from '@semcore/radio';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required field 😫';
  }

  if (!values.campaign) {
    errors.campaign = 'Required field 😫';
  }

  if (!values.call) {
    errors.call = 'Required field 😫';
  }

  if (!values.period) {
    errors.period = 'Required field 😫';
  }

  if (!values.day || values.day <= 0) {
    errors.day = 'Day <= 0';
  }

  return errors;
};

const Demo = () => (
  <FeedbackForm validate={validate}>
    <FeedbackForm.Item name="title" validate={validate.email}>
      {({ input }) => {
        const { state, className, ...other } = input;
        return (
          <Input state={state} className={className} m="0 0 16px">
            <Input.Value {...other} placeholder="Activity title" />
          </Input>
        );
      }}
    </FeedbackForm.Item>

    <label htmlFor="campaign">
      <Text bold mb="8px" tag="p">
        Campaign
      </Text>
      <FeedbackForm.Item name="campaign">
        {({ input }) => (
          <Select onChange={input.onChange} state={input.state} placeholder="Select campaign">
            <Select.Trigger id="campaign" {...input} m="0 0 16px" />
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

    <label htmlFor="day">
      <Text bold mb="8px" tag="p">
        Day
      </Text>
      <FeedbackForm.Item name="day">
        {({ input }) => {
          const { state, className, ...other } = input;
          return (
            <InputNumber state={state} className={className} m="0 0 32px">
              <InputNumber.Value id="day" {...other} placeholder="Enter day" />
            </InputNumber>
          );
        }}
      </FeedbackForm.Item>
    </label>

    <FeedbackForm.Item name="period" type="checkbox">
      {({ input }) => (
        <Checkbox
          {...input}
          invalid={input.state === 'invalid'}
          labelProps={{ style: { margin: '0 0 16px' } }}
        >
          Period
        </Checkbox>
      )}
    </FeedbackForm.Item>

    <FeedbackForm.Item name="call" type="radio" value="Yes">
      {({ input }) => (
        <Radio state={input.state === 'invalid' ? 'invalid' : 'normal'} m="12px 0 8px">
          <Radio.Value {...input} />
          <Radio.Text>Call me 😏</Radio.Text>
        </Radio>
      )}
    </FeedbackForm.Item>
    <FeedbackForm.Item name="call" type="radio" value="No">
      {({ input }) => (
        <Radio state={input.state === 'invalid' ? 'invalid' : 'normal'} m="0 0 16px">
          <Radio.Value {...input} />
          <Radio.Text>Don't call me!</Radio.Text>
        </Radio>
      )}
    </FeedbackForm.Item>

    <FeedbackForm.Submit>Submit this strange form</FeedbackForm.Submit>
  </FeedbackForm>
);

export default Demo;
