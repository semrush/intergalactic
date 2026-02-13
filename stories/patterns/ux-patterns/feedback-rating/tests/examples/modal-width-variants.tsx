import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { FeedbackRating } from '@semcore/ui/feedback-form';
import Link from '@semcore/ui/link';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
    console.log('Send data to server', data);
    setTimeout(resolve, 500);
  });
};

const widthOptions = [
  { value: 300, label: 'Narrow (300px)' },
  { value: 440, label: 'Default (440px)' },
  { value: 600, label: 'Wide (600px)' },
  { value: 800, label: 'Extra Wide (800px)' },
];

const Demo = () => {
  const [status, setStatus] = React.useState<'default' | 'success' | 'loading' | 'error'>(
    'default',
  );
  const [visible, setVisible] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [notificationVisible, setNotificationVisible] = React.useState(true);
  const [modalWidth, setModalWidth] = React.useState<number>(440);

  const handleSubmit = React.useCallback(async (values: Record<string, any>) => {
    setStatus('loading');
    await fakeSendDataToServer(values);
    setStatus('success');
    setVisible(false);
    setNotificationVisible(false);
  }, []);

  const handleVisibleChange = React.useCallback((visible: boolean, rating: number) => {
    setVisible(visible);
    setRating(visible === false ? 0 : rating);
  }, []);

  const handleCloseNotification = React.useCallback(() => {
    setNotificationVisible(false);
  }, []);

  return (
    <Flex direction='column' gap={4}>
      <Box>
        <Text size={500} tag='h2' mb={3}>
          FeedbackRating Modal Width
        </Text>
        <Text size={300} color='text-secondary' mb={4}>
          Customize the modal width using the
          {' '}
          <code>modalWidth</code>
          {' '}
          prop to fit your design
          needs.
        </Text>
      </Box>

      <Box>
        <Text size={300} mb={2}>
          Select modal width:
        </Text>
        <Select value={modalWidth} onChange={(value: any) => setModalWidth(value)} w={200}>
          <Select.Trigger />
          <Select.Menu>
            {widthOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>
      </Box>

      <Box mt={3}>
        <FeedbackRating
          modalWidth={modalWidth}
          notificationVisible={notificationVisible}
          notificationText={`Click stars to see modal with ${modalWidth}px width`}
          header='Rate your experience'
          submitText='Send feedback'
          initialValues={initValue}
          rating={rating}
          visible={visible}
          onVisibleChange={handleVisibleChange}
          onNotificationClose={handleCloseNotification}
          status={status}
          onSubmit={handleSubmit}
          errorFeedbackEmail='feedback@example.com'
          formConfig={[
            {
              key: 'option1',
              label: 'Easy to use',
              type: 'checkbox',
            },
            {
              key: 'option2',
              label: 'Works as expected',
              type: 'checkbox',
            },
            {
              key: 'option3',
              label: 'Would recommend',
              type: 'checkbox',
            },
            {
              key: 'description',
              label: 'Tell us more',
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
                  We will only use this email to respond to you on your feedback.
                  {' '}
                  <Link noWrap={true} href='https://www.semrush.com/company/legal/privacy-policy/'>
                    Privacy Policy
                  </Link>
                </>
              ),
            },
          ]}
        />
      </Box>
    </Flex>
  );
};

export default Demo;
