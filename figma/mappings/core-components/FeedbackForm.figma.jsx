import figma from '@figma/code-connect';
import { Flex, Box } from '@semcore/ui/base-components';
import FeedbackForm from '@semcore/ui/feedback-form';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';

// Not a flexible mapping, but I don't think teams need to customize it much

figma.connect(
  FeedbackForm,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-298563&t=7CEXrbu9XEfMUFlr-11', {

    example: () => (
      <FeedbackForm loading={loading}>
        <Box p={4}>
          <Flex direction='column'>
            <Text mb={2} size={200} tag='label' htmlFor='description'>
              {/* Add label for textarea */}
            </Text>
            <FeedbackForm.Item
              name='description'
              validate={validate.description}
              initialValue=''
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
              initialValue=''
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
              {/* Add hint for input */}
            </Text>
          </Box>
          <Flex mt={4}>
            <FeedbackForm.Submit>Send feedback</FeedbackForm.Submit>
            <FeedbackForm.Cancel onClick={onCancel}>Cancel</FeedbackForm.Cancel>
          </Flex>
        </Box>
        <FeedbackForm.Notice hidden={status === 'failed'}>
          You can also send us an email to
          {' '}
          <Link>backlink.audit@semrush.com</Link>
        </FeedbackForm.Notice>
        <FeedbackForm.Notice hidden={status !== 'failed'} theme='danger'>
          Your message has not been sent.
        </FeedbackForm.Notice>
      </FeedbackForm>
    ),
  },
);
