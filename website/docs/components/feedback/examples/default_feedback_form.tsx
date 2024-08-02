import React from 'react';
import FeedbackForm from 'intergalactic/feedback-form';
import Input from 'intergalactic/input';
import { Box, Flex } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';
import Dropdown from 'intergalactic/dropdown';
import ChatM from 'intergalactic/icon/Chat/m';
import Textarea from 'intergalactic/textarea';
import { Text } from 'intergalactic/typography';
import Button from 'intergalactic/button';

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
  handleChange = (fn) => (_, e) => {
    fn(e);
    this.props.onChange(e, e.currentTarget.id);
  };

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
              name='description'
              validate={validate.description}
              initialValue={''}
              placement='left-start'
              flip={{
                fallbackPlacements: ['right-start', 'bottom'],
              }}
              validateOnBlur={value.description === '' ? false : true}
            >
              {({ input }) => (
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange)}
                  id='description'
                />
              )}
            </FeedbackForm.Item>
          </Flex>
          <Flex tag='label' mt={4} direction='column' htmlFor='email'>
            <Text mb={2} size={200}>
              Reply-to email
            </Text>
            <FeedbackForm.Item
              name='email'
              validate={validate.email}
              initialValue={''}
              validateOnBlur={value.email === '' ? false : true}
            >
              {({ input }) => (
                <Input state={input.state}>
                  <Input.Value {...input} onChange={this.handleChange(input.onChange)} id='email' />
                </Input>
              )}
            </FeedbackForm.Item>
          </Flex>
          <Box mt={2}>
            <Text size={200} color='text-secondary'>
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
  state = { status: 'default', value: { description: '', email: '' } };
  timeout: any;
  onSubmit = () => {
    this.requestServer('success', 1000);
    this.setState({ status: 'loading' });
  };
  onChange = (e, trigger) => {
    const { value } = e.currentTarget;
    this.setState({ value: { ...this.state.value, [trigger]: value } });
  };
  requestServer = (status, time = 500, cb = () => {}) => {
    this.timeout = setTimeout(() => {
      this.setState({ status });
      cb();
    }, time);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { status, value } = this.state;
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button theme={'info'} use={'tertiary'}>
            <Button.Addon>
              <ChatM />
            </Button.Addon>
            <Button.Text>Send feedback</Button.Text>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Popper
          role={'dialog'}
          aria-label={'Feedback form'}
          aria-modal={'true'}
          tabIndex={-1}
        >
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

export default Demo;
