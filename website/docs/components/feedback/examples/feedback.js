import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Dropdown from '@semcore/dropdown';
import ChatXS from '@semcore/icon/lib/Chat/xs';
import Textarea from '@semcore/textarea';
import { Text } from '@semcore/typography';

const validate = {
  description: (value = '') => {
    const splitText = value.split(' ');
    const numberSpaces = splitText.reduce((acc, item) => {
      if (!item.length) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (value.length - numberSpaces < 10 || splitText.length <= 2) {
      return 'Please tell a few more words about your experience. This will help us improve our service.';
    }
  },
  email: (value = '') => {
    validate.description(value);
    if (!/.+@.+\..+/i.test(String(value).toLowerCase())) {
      return 'Please provide us with a valid email address so we could reply to you.\t';
    }
  },
};

class Feedback extends React.PureComponent {
  handleChange = (fn, trigger) => (value, e) => {
    fn(e);
    this.props.onChange(e, trigger);
  };

  render() {
    const { status, onSubmit, onCancel, value } = this.props;

    if (status === 'success') {
      return <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <FeedbackForm.Item
            name="feedback"
            validate={validate.description}
            initialValue={value.description}
          >
            {({ input }) => (
              <Flex tag="label" direction="column">
                <Text mb={1} size={100}>
                  Tell us your suggestion or report an issue
                </Text>
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange, 'description')}
                />
              </Flex>
            )}
          </FeedbackForm.Item>
          <FeedbackForm.Item name="email" validate={validate.email} initialValue={value.email}>
            {({ input }) => (
              <Flex tag="label" mt={4} direction="column">
                <Text mb={1} size={100}>
                  Reply-to email
                </Text>
                <Input state={input.state}>
                  <Input.Value {...input} onChange={this.handleChange(input.onChange, 'email')} />
                </Input>
              </Flex>
            )}
          </FeedbackForm.Item>
          <Box mt={2}>
            <Text lineHeight="18px" size={100}>
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
          Your message hasn’t been sent.
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
        <Dropdown.Trigger>
          <Link>
            <Link.Addon tag={ChatXS} />
            <Link.Text>Send feedback</Link.Text>
          </Link>
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
