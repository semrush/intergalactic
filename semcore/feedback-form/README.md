```js
import React from 'react';
import Link from '@semcore/link';
import Input from '@semcore/input';
import Textarea from '@semcore/textarea';
import Checkbox from '@semcore/checkbox';
import ChatXS from '@semcore/icon/lib/Chat/xs';
import Dropdown from '@semcore/dropdown';
import FeedbackForm from '@semcore/feedback-form';
import { Box } from '@semcore/flex-box';
import { Small } from '@semcore/typography';

import If from '@semcore/utils/lib/if';

class MyFeedback extends React.PureComponent {
  render() {
    const validateDescription = FeedbackForm.validate.description(
      `Please tell a few more words about your experience. This will help us improve our service.`,
    );
    const validateEmail = FeedbackForm.validate.email(
      `Please provide us with a valid email address so we could reply to you.`,
    );

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Link before={<ChatXS />}>Send feedback</Link>
        </Dropdown.Trigger>
        <Dropdown.Popper>
          {({ changeVisible }) => (
            <FeedbackForm onSubmit={(data) => console.log(data)}>
              {({ submitSucceeded }) => (
                <React.Fragment>
                  <If condition={submitSucceeded}>
                    <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>
                  </If>
                  <If condition={!submitSucceeded}>
                    <FeedbackForm.Item
                      name="feedback"
                      tag={Textarea}
                      validate={validateDescription}
                      fullWidth
                      autoFocus
                      placeholder="Please tell us your suggestion or report an issue"
                    />
                    <FeedbackForm.Item
                      name="email"
                      tag={Input}
                      type="email"
                      validate={validateEmail}
                      placeholder="Reply-to email"
                    />
                    <Box mt={-2} mb={4} mx={4}>
                      <Small>
                        We will only use this email to respond to you on your feedback.{' '}
                        <Link href="#">Privacy Policy</Link>
                      </Small>
                    </Box>
                    <FeedbackForm.Item name="needHelp" type="checkbox">
                      {({ input }) => (
                        <Checkbox {...input} size="s">
                          I need help, please contact me
                        </Checkbox>
                      )}
                    </FeedbackForm.Item>
                    <Box m={4}>
                      <FeedbackForm.Submit>Send feedback</FeedbackForm.Submit>
                      <FeedbackForm.Cancel onClick={() => changeVisible(false)}>
                        Cancel
                      </FeedbackForm.Cancel>
                    </Box>
                  </If>
                </React.Fragment>
              )}
            </FeedbackForm>
          )}
        </Dropdown.Popper>
      </Dropdown>
    );
  }
}

export default MyFeedback;
```
