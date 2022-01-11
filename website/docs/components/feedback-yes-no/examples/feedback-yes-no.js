import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Dropdown from '@semcore/dropdown';
import Textarea from '@semcore/textarea';
import Notice from '@semcore/notice';
import Button from '@semcore/button';
import ThumbUpXS from '@semcore/icon/lib/ThumbUp/m';
import ThumbDownXS from '@semcore/icon/lib/ThumbDown/m';
import { Text } from '@semcore/typography';
import feedback from '../static/feedback.svg';

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
      return 'Your feedback must contain at least 3 words (10 characters).';
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
  handleChange = (fn, trigger) => (value, e) => {
    fn(e);
    this.props.onChange(e, trigger);
  };

  render() {
    const { status, onSubmit, onCancel } = this.props;

    if (status === 'success') {
      return <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <Flex tag="label" direction="column">
            <Text mb={1} size={100}>
              Tell us your suggestion or report an issue
            </Text>
            <FeedbackForm.Item name="feedback" validate={validate.description}>
              {({ input }) => (
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange, 'description')}
                />
              )}
            </FeedbackForm.Item>
          </Flex>
          <Flex tag="label" mt={4} direction="column">
            <Text mb={1} size={100}>
              Reply-to email
            </Text>
            <FeedbackForm.Item name="email" validate={validate.email}>
              {({ input }) => (
                <Input state={input.state}>
                  <Input.Value {...input} onChange={this.handleChange(input.onChange, 'email')} />
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

class FeedbackYesNo extends React.PureComponent {
  state = { status: 'default', visible: true };
  onSubmit = (reaction, data) => {
    this.requestServer('success', 1000);
    this.setState({ status: 'loading' });
  };
  requestServer = (status, time = 500, cb) => {
    this.timeout = setTimeout(() => {
      this.setState({ status });
      cb && cb();
    }, time);
  };
  changeVisible = (visible) => {
    this.setState({ visible });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { status, visible } = this.state;

    return (
      <Notice
        hidden={!visible}
        style={{
          padding: '10px 16px 9px 20px',
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          borderRadius: '0',
        }}
      >
        <Notice.Label my="-6px">
          <img src={feedback} alt="pen" />
        </Notice.Label>
        <Notice.Content>
          Do you find our On Page SEO Checker reports useful?
          <Dropdown>
            <Dropdown.Trigger tag={Button} ml={4}>
              <Button.Addon tag={ThumbUpXS} />
              <Button.Text>Yes</Button.Text>
            </Dropdown.Trigger>
            <Dropdown.Popper>
              {(props, { visible }) => (
                <Feedback
                  status={status}
                  onCancel={() => visible(false)}
                  onSubmit={(data) => this.onSubmit('yes', data)}
                />
              )}
            </Dropdown.Popper>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger tag={Button} ml={2}>
              <Button.Addon tag={ThumbDownXS} />
              <Button.Text>No</Button.Text>
            </Dropdown.Trigger>
            <Dropdown.Popper>
              {(props, { visible }) => (
                <Feedback
                  status={status}
                  onCancel={() => visible(false)}
                  onSubmit={(data) => this.onSubmit('no', data)}
                />
              )}
            </Dropdown.Popper>
          </Dropdown>
          <Button ml={2} use="tertiary" onClick={() => this.changeVisible(false)}>
            Ask me later
          </Button>
        </Notice.Content>
        <Notice.CloseIcon onClick={() => this.changeVisible(false)} />
      </Notice>
    );
  }
}

export default FeedbackYesNo;
