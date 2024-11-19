import React from 'react';
import { FeedbackRating } from '@semcore/feedback-form';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';

const initValue = {
  rating: 0,
  description: '',
  email: '',
  option1: false,
  option2: false,
  option3: false,
};

const fakeSendDataToServer = (data: Record<string, any>) => {
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

  const handleSubmit = React.useCallback(async (values: Record<string, any>) => {
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
      notificationVisible={notificationVisible}
      notificationText={'Is it working well for you?'}
      learnMoreLink={'http://google.com'}
      header={<FeedbackRating.Header>Feedback form title</FeedbackRating.Header>}
      submitText={'Send feedback'}
      initialValues={initValue}
      rating={rating}
      visible={visible}
      modalWidth = {300}
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
