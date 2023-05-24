import React from 'react';
import FeedbackForm from '@semcore/ui/feedback-form';
import Input from '@semcore/ui/input';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import Dropdown from '@semcore/ui/dropdown';
import ChatXS from '@semcore/ui/icon/Chat/m';
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

class Feedback extends React.PureComponent {
  handleChange = (fn) => (value, e) => {
    fn(e);
  };

  render() {
    const { status, onSubmit, onCancel, value } = this.props;

    if (status === 'success') {
      return <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <Flex tag="label" direction="column" htmlFor="suggestions">
            <Text mb={2} size={200}>
              Tell us your suggestion or report an issue
            </Text>
            <FeedbackForm.Item
              name="feedback"
              validate={validate.description}
              initialValue={value.description}
              placement="left-start"
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
                  id="suggestions"
                />
              )}
            </FeedbackForm.Item>
          </Flex>
          <Flex tag="label" mt={4} direction="column" htmlFor="email">
            <Text mb={2} size={200}>
              Reply-to email
            </Text>
            <FeedbackForm.Item name="email" validate={validate.email} initialValue={value.email}>
              {({ input }) => (
                <Input state={input.state}>
                  <Input.Value {...input} onChange={this.handleChange(input.onChange)} id="email" />
                </Input>
              )}
            </FeedbackForm.Item>
          </Flex>
          <Box mt={2}>
            <Text lineHeight="18px" size={100} color="#6c6e79">
              We will only use this email to respond to you on your feedback.{' '}
              <Link href="https://www.semrush.com/company/legal/privacy-policy/">
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
        <FeedbackForm.Notice hidden={status !== 'failed'} theme="danger">
          Your message has not been sent.
        </FeedbackForm.Notice>
      </FeedbackForm>
    );
  }
}

class FeedbackLink extends React.PureComponent {
  state = { status: 'default', value: { description: '', email: '' } };
  onSubmit = (data) => {
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
        <Dropdown.Trigger tag={Link}>
          <Link.Addon>
            <ChatXS />
          </Link.Addon>
          <Link.Text>Send feedback</Link.Text>
        </Dropdown.Trigger>
        <Dropdown.Popper>
          {(props, { visible }) => (
            <Feedback
              status={status}
              onCancel={() => visible(false)}
              onSubmit={(data) => this.onSubmit(data)}
              value={value}
              onChange={this.onChange}
            />
          )}
        </Dropdown.Popper>
      </Dropdown>
    );
  }
}

export default FeedbackLink;
