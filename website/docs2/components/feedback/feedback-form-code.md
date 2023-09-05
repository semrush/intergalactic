---
title: Example
tabs: Feedback('index'), A11y('feedback-form-a11y'), API('feedback-form-api'), Example('feedback-form-code'), Changelog('feedback-form-changelog')
---

## Default feedback form

The information on the GDPR should be obligatorily shown to the users from Europe. See the [component's guide](/components/feedback/) for the styles and its content.

::: sandbox

<script lang="tsx">
import React from 'react';
import FeedbackForm from '@semcore/ui/feedback-form';
import Input from '@semcore/ui/input';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import Dropdown from '@semcore/ui/dropdown';
import ChatM from '@semcore/ui/icon/Chat/m';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';

const validate = {
  description: (value = '') => {
    const splitText = value.split(' ');
    const numberSpaces = splitText.reduce((acc, item) => {
      if (!item.length) {
        acc += 1;
      }
      return acc;
    }, 0);
    if ([...value].length - numberSpaces < 10) {
      return 'Your feedback must contain at least 10 characters.';
    }
  },
  email: (value = '') => {
    validate.description(value);
    if (!/.+@.+\..+/i.test(String(value).toLowerCase())) {
      return 'Please enter valid email.\t';
    }
  },
};

class Feedback extends React.PureComponent<{
  status: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  onChange: (event: any, trigger: string) => void;
  value: { description: string; email: string };
}> {
  constructor(props) {
    super(props);
    this.handleChange = (fn) => (_, e) => {
      fn(e);
    };
  }

  render() {
    const { status, onSubmit, onCancel, value } = this.props;

    if (status === 'success') {
      return <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <Flex tag='label' direction='column' htmlFor='suggestions'>
            <Text mb={2} size={200}>
              Tell us your suggestion or report an issue
            </Text>
            <FeedbackForm.Item
              name='feedback'
              validate={validate.description}
              initialValue={value.description}
              placement='left-start'
              flip={{
                fallbackPlacements: ['right-start', 'bottom'],
              }}
            >
              {({ input }) => (
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange)}
                  id='suggestions'
                />
              )}
            </FeedbackForm.Item>
          </Flex>
          <Flex tag='label' mt={4} direction='column' htmlFor='email'>
            <Text mb={2} size={200}>
              Reply-to email
            </Text>
            <FeedbackForm.Item name='email' validate={validate.email} initialValue={value.email}>
              {({ input }) => (
                <Input state={input.state}>
                  <Input.Value {...input} onChange={this.handleChange(input.onChange)} id='email' />
                </Input>
              )}
            </FeedbackForm.Item>
          </Flex>
          <Box mt={2}>
            <Text lineHeight='18px' size={100} color='#6c6e79'>
              We will only use this email to respond to you on your feedback.{' '}
              <Link href='https://www.semrush.com/company/legal/privacy-policy/'>
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Flex mt={4}>
            <FeedbackForm.Submit>Send feedback</FeedbackForm.Submit>
            <FeedbackForm.Cancel onClick={onCancel}>Cancel</FeedbackForm.Cancel>
          </Flex>
        </Box>
        <FeedbackForm.Notice hidden={status === 'failed'}>
          You can also send us an email to <Link>backlink.audit@semrush.com</Link>
        </FeedbackForm.Notice>
        <FeedbackForm.Notice hidden={status !== 'failed'} theme='danger'>
          Your message has not been sent.
        </FeedbackForm.Notice>
      </FeedbackForm>
    );
  }
}

class FeedbackLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { status: 'default', value: { description: '', email: '' } };
    this.onSubmit = () => {
      this.requestServer('success', 1000);
      this.setState({ status: 'loading' });
    };
    this.onChange = (e, trigger) => {
      const { value } = e.currentTarget;
      this.setState({ value: { ...this.state.value, [trigger]: value } });
    };
    this.requestServer = (status, time = 500, cb = () => {}) => {
      this.timeout = setTimeout(() => {
        this.setState({ status });
        cb();
      }, time);
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { status, value } = this.state;
    return (
      <Dropdown>
        <Dropdown.Trigger tag={Link} size={200}>
          <Link.Addon>
            <ChatM />
          </Link.Addon>
          <Link.Text>Send feedback</Link.Text>
        </Dropdown.Trigger>
        <Dropdown.Popper>
          {(_props, { visible }) => (
            <Feedback
              status={status}
              onCancel={() => visible(false)}
              onSubmit={() => this.onSubmit()}
              value={value}
              onChange={this.onChange}
            />
          )}
        </Dropdown.Popper>
      </Dropdown>
    );
  }
}

const Demo = FeedbackLink;
</script>

:::

## Feedback form example

Refer for more details about forms in the [Form](/patterns/form/).

::: sandbox

<script lang="tsx">
import React from 'react';
import FeedbackForm from '@semcore/ui/feedback-form';
import Input from '@semcore/ui/input';
import InputNumber from '@semcore/ui/input-number';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

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
  <FeedbackForm validate={validate} p={1}>
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
</script>

:::
