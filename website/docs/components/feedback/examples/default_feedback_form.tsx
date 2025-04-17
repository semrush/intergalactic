import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Dropdown from '@semcore/dropdown';
import ChatM from '@semcore/icon/Chat/m';
import Textarea from '@semcore/textarea';
import { Text } from '@semcore/typography';
import { ButtonLink } from '@semcore/button';

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

type FeedbackProps = {
  status: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  onChange: (event: any, trigger: string) => void;
  value: { description: string; email: string };
};

class Feedback extends React.PureComponent<FeedbackProps> {
  ref = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    // need this timeout because Feedback component used in function component
    setTimeout(() => {
      this.ref.current?.focus();
    }, 0);
  }

  componentDidUpdate(prevProps: Readonly<FeedbackProps>): void {
    if (prevProps.status !== 'success' && this.props.status === 'success') {
      this.ref.current?.focus();
    }
  }

  handleChange = (fn) => (_, e) => {
    fn(e);
    this.props.onChange(e, e.currentTarget.id);
  };

  render() {
    const { status, onSubmit, onCancel, value } = this.props;

    if (status === 'success') {
      return (
        <FeedbackForm.Success ref={this.ref}>Thank you for your feedback!</FeedbackForm.Success>
      );
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <Flex direction='column'>
            <Text mb={2} size={200} tag='label' htmlFor='description'>
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
          <Flex mt={4} direction='column'>
            <Text mb={2} size={200} tag='label' htmlFor='email'>
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
                  <Input.Value
                    {...input}
                    onChange={this.handleChange(input.onChange)}
                    id='email'
                    type='email'
                    autoComplete='email'
                    aria-describedby='email-description'
                  />
                </Input>
              )}
            </FeedbackForm.Item>
          </Flex>
          <Box mt={2}>
            <Text size={200} color='text-secondary' id='email-description'>
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
        <Dropdown.Trigger tag={ButtonLink} addonLeft={ChatM}>
          Send feedback
        </Dropdown.Trigger>
        <Dropdown.Popper aria-label={'Feedback form'} tabIndex={-1}>
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
