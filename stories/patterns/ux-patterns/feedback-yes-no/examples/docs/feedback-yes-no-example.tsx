import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Dropdown from '@semcore/dropdown';
import Textarea from '@semcore/textarea';
import Notice from '@semcore/notice';
import Button from '@semcore/button';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import { Text } from '@semcore/typography';
import FeedbackIllustration from '@semcore/illustration/Feedback';

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

type FeedbackChangeEvent = React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>;
class Feedback extends React.PureComponent<{
  status: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  onChange: (event: FeedbackChangeEvent) => void;
  value: { feedback: string; email: string };
}> {
  handleChange = (fn: (e: FeedbackChangeEvent) => void) => (_: any, e: FeedbackChangeEvent) => {
    fn(e);
    this.props.onChange(e);
  };

  render() {
    const { status, onSubmit, onCancel, value } = this.props;

    if (status === 'success') {
      return <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <Flex tag='label' direction='column' htmlFor='feedback'>
            <Text mb={2} size={200}>
              Tell us your suggestion or report an issue
            </Text>
            <FeedbackForm.Item
              name='feedback'
              validate={validate.description}
              initialValue={''}
              placement='left-start'
              flip={{
                fallbackPlacements: ['right-start', 'bottom'],
              }}
              validateOnBlur={value.feedback === '' ? false : true}
            >
              {({ input }) => (
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange)}
                  id='feedback'
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
              {({ input }) => {
                const ariaDescribeBy = input['aria-describedby'] ?? 'privacy-description';
                return (
                  <Input state={input.state}>
                    <Input.Value
                      {...input}
                      onChange={this.handleChange(input.onChange)}
                      id='email'
                      aria-describedby={ariaDescribeBy}
                    />
                  </Input>
                );
              }}
            </FeedbackForm.Item>
          </Flex>
          <Box mt={2}>
            <Text size={200} color='text-secondary' id='privacy-description'>
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
          You can also send us an email to <Link>some.team@domain.com</Link>
        </FeedbackForm.Notice>
        <FeedbackForm.Notice hidden={status !== 'failed'} theme='danger'>
          Your message has not been sent.
        </FeedbackForm.Notice>
      </FeedbackForm>
    );
  }
}

class FeedbackYesNo extends React.PureComponent {
  state = {
    status: 'default',
    visible: true,
    feedbackType: null,
    value: { feedback: '', email: '' },
  };
  timeout: any;
  onSubmit = () => {
    this.requestServer('success', 1000);
    this.setState({ status: 'loading' });
  };
  onChange = (e: FeedbackChangeEvent) => {
    const { value, id } = e.currentTarget;
    this.setState({ value: { ...this.state.value, [id]: value } });
  };
  requestServer = (status: string, time: number, cb?: () => void) => {
    this.timeout = setTimeout(() => {
      this.setState({ status });
      cb?.();
    }, time || 500);
  };
  changeVisible = (visible: boolean) => {
    this.setState({ visible });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleChangeDdVisible = (feedbackType: string) => (visible: boolean) => {
    this.setState({
      feedbackType: visible ? feedbackType : null,
    });
  };

  render() {
    const { status, visible, feedbackType, value } = this.state;

    return (
      <Notice
        aria-label='Leave feedback'
        hidden={!visible}
        display='flex'
        style={{
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          borderRadius: '0',
          alignItems: 'center',
        }}
      >
        <Notice.Label mr={3} aria-hidden={true}>
          <FeedbackIllustration />
        </Notice.Label>
        <Notice.Content role='presentation'>
          <Text mr={4}>Do you find our Design System useful?</Text>
          <Box inline>
            <Dropdown onVisibleChange={this.handleChangeDdVisible('yes')}>
              <Dropdown.Trigger tag={Button} addonLeft={ThumbUpM} active={feedbackType === 'yes'}>
                Yes
              </Dropdown.Trigger>
              <Dropdown.Popper aria-label='Feedback form' tabIndex={-1}>
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
            <Dropdown onVisibleChange={this.handleChangeDdVisible('no')}>
              <Dropdown.Trigger
                ml={2}
                tag={Button}
                addonLeft={ThumbDownM}
                active={feedbackType === 'no'}
              >
                No
              </Dropdown.Trigger>
              <Dropdown.Popper aria-label='Feedback form' tabIndex={-1}>
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
            <Button ml={2} use='tertiary' onClick={() => this.changeVisible(false)}>
              Ask me later
            </Button>
          </Box>
        </Notice.Content>
        <Notice.Close onClick={() => this.changeVisible(false)} />
      </Notice>
    );
  }
}

const Demo = () => <FeedbackYesNo />;
export default Demo;
