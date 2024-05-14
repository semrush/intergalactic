import React from 'react';
import FeedbackForm, { FeedbackRating } from 'intergalactic/feedback-form';
import Link from 'intergalactic/link';
import { Text } from 'intergalactic/typography';

type State = {
  status: 'default' | 'success' | 'loading' | 'error';
  visible: boolean;
  rating: number;
  notificationVisible: boolean;
};

type FormValues = {
  rating: number;
  description: string;
  email: string;
  option1: boolean;
  option2: boolean;
  option3: boolean;
};

const initValue = {
  rating: 0,
  description: '',
  email: '',
  option1: false,
  option2: false,
  option3: false,
};

class FeedbackLink extends React.PureComponent<{}, State> {
  state: State = {
    status: 'default',
    visible: false,
    rating: 0,
    notificationVisible: true,
  };
  timeout: number;
  onSubmit = (values: FormValues) => {
    this.requestServer('success', 1000);
    this.setState({ status: 'loading' });
  };

  requestServer = (status: State['status'], time = 500, cb = () => {}) => {
    this.timeout = window.setTimeout(() => {
      const newState = { status, visible: true, notificationVisible: true };

      if (status === 'success') {
        newState.visible = false;
        newState.notificationVisible = false;
      }

      this.setState(newState);
      cb();
    }, time);
  };

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  handleVisibleChange = (visible: boolean, rating: number) => {
    this.setState({ visible, rating });
  };

  handleCloseNotification = () => {
    this.setState({ notificationVisible: false });
  };

  render() {
    const { status, rating, visible, notificationVisible } = this.state;

    return (
      <FeedbackRating
        notificationVisible={notificationVisible}
        notificationText={'Is it working well for you??'}
        learnMoreLink={'http://google.com'}
        Header={<FeedbackRating.Header>Modal title</FeedbackRating.Header>}
        submitText={'Send feedback'}
        initialValues={initValue}
        rating={rating}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        onNotificationClose={this.handleCloseNotification}
        status={status}
        onSubmit={this.onSubmit}
        formConfig={[
          {
            key: 'option1',
            label: 'Label 1',
            type: 'checkbox',
          },
          {
            key: 'option2',
            label: 'Label 2',
            type: 'checkbox',
          },
          {
            key: 'option3',
            label: 'Label 3',
            type: 'checkbox',
          },
          {
            key: 'description',
            label: 'If there anything we could improve?',
            type: 'textarea',
            validate: FeedbackRating.validate.description('Please share your ideas.'),
          },
          {
            key: 'email',
            label: 'Reply-to email',
            type: 'input',
            validate: FeedbackRating.validate.email('Set correct email'),
            description: (
              <Text size={200} color='--intergalactic-text-secondary'>
                We will only use this email to respond to you on your feedback.{' '}
                <Link href='https://www.semrush.com/company/legal/privacy-policy/'>
                  Privacy Policy
                </Link>
              </Text>
            ),
          },
        ]}
      />
    );
  }
}

const Demo = FeedbackLink;

export default Demo;
