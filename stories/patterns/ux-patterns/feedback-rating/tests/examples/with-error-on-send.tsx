import React from 'react';
import { FeedbackRating } from '@semcore/feedback-form';
import Link from '@semcore/link';
import Button from '@semcore/button';

const initValue = {
  rating: 0,
  description: '',
  email: '',
  option1: false,
  option2: false,
  option3: false,
};

const fakeSendDataToServer = (data: Record<string, any>) => {
  return new Promise((_, reject) => {
    console.log('Send data to server', data);
    setTimeout(() => reject(new Error('Server error')), 500);
  });
};

const Demo = () => {
  const [status, setStatus] = React.useState<'default' | 'success' | 'loading' | 'error'>(
    'default',
  );
  const [visible, setVisible] = React.useState(false);
  const [refreshBtnVisible, setRefreshBtnVisible] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [notificationVisible, setNotificationVisible] = React.useState(true);
  const refreshBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    refreshBtnVisible && refreshBtnRef.current?.focus();
  }, [refreshBtnVisible]);

  const showRefreshButton = () => setTimeout(() => setRefreshBtnVisible(true), 300);

  const handleSubmit = React.useCallback(async (values: Record<string, any>) => {
    setStatus('loading');
    try {
      await fakeSendDataToServer(values);
      setStatus('success');
      setVisible(false);
      setNotificationVisible(false);
      showRefreshButton();
    } catch (error) {
      setStatus('error');
    }
  }, []);
  

  const handleVisibleChange = React.useCallback((visible: boolean, rating: number) => {
    setVisible(visible);
    setRating(rating);
  }, []);
  const handleCloseNotification = React.useCallback(() => {
    setNotificationVisible(false);
    showRefreshButton();
  }, []);

  return (
    <>
      <FeedbackRating
        notificationVisible={notificationVisible}
        notificationText={'Is it working well for you?'}
        learnMoreLink={
          'https://developer.semrush.com/intergalactic/patterns/feedback-rating/feedback-rating-a11y'
        }
        header={'Great! What do you like the most?'}
        submitText={'Send feedback'}
        initialValues={initValue}
        rating={rating}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        onNotificationClose={handleCloseNotification}
        status={status}
        onSubmit={handleSubmit}
        errorFeedbackEmail={'some@default.email'}
        formConfig={[
          {
            key: 'option1',
            label: 'Score is more accurate',
            type: 'checkbox',
          },
          {
            key: 'option2',
            label: 'Formula is more transparent',
            type: 'checkbox',
          },
          {
            key: 'option3',
            label: "It's easier to use for evaluation",
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
            type: 'email',
            validate: FeedbackRating.validate.email('Please enter valid email'),
            description: (
              <>
                We will only use this email to respond to you on your feedback.{' '}
                <Link href='https://www.semrush.com/company/legal/privacy-policy/'>
                  Privacy Policy
                </Link>
              </>
            ),
          },
        ]}
      />

      {refreshBtnVisible ? (
        <Button ref={refreshBtnRef} use='tertiary' onClick={() => window.location.reload()}>
          Reload page
        </Button>
      ) : null}
    </>
  );
};

export default Demo;
