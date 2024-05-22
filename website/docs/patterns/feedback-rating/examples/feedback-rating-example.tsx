import React from 'react';
import { FeedbackRating } from 'intergalactic/feedback-form';
import Link from 'intergalactic/link';
import { Text } from 'intergalactic/typography';

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

const fakeSendDataToServer = (data) => {
  return new Promise((resolve) => {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('Send data to server', data);
    setTimeout(resolve, 500);
  });
};

const Demo = () => {
  const [status, setStatus] = React.useState<'default' | 'success' | 'loading' | 'error'>(
    'default',
  );
  const [visible, setVisible] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [notificationVisible, setNotificationVisible] = React.useState(true);

  const handleSubmit = React.useCallback(async (values: FormValues) => {
    setStatus('loading');
    await fakeSendDataToServer(values);
    setStatus('success');
    setVisible(false);
    setNotificationVisible(false);
  }, []);

  const handleVisibleChange = React.useCallback((visible: boolean, rating: number) => {
    setVisible(visible);
    setRating(rating);
  }, []);
  const handleCloseNotification = React.useCallback(() => {
    setNotificationVisible(false);
  }, []);

  return (
    <FeedbackRating
      locale='de'
      notificationVisible={notificationVisible}
      notificationText={'Is it working well for you?'}
      learnMoreLink={'http://google.com'}
      Header={<FeedbackRating.Header>Feedback form title</FeedbackRating.Header>}
      submitText={'Send feedback'}
      initialValues={initValue}
      rating={rating}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      onNotificationClose={handleCloseNotification}
      status={status}
      onSubmit={handleSubmit}
      errorFeedbackEmail={''}
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
            <Text size={200} color='text-secondary'>
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
};

export default Demo;
