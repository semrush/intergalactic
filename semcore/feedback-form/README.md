```js
import React from 'react';
import Link from '@semcore/link';
import Input from '@semcore/input';
import Textarea from '@semcore/textarea';
import Checkbox from '@semcore/checkbox';
import Chat from '@semcore/icon/Chat/m';
import Dropdown from '@semcore/dropdown';
import FeedbackForm from '@semcore/feedback-form';
import { Box } from '@semcore/flex-box';
import { Small } from '@semcore/typography';

import If from '@semcore/utils/lib/if';

class MyFeedback extends React.PureComponent {
  render() {
    const validateDescription = FeedbackForm.validate.description(
      `Your feedback must contain at least 3 words (10 characters).`,
    );
    const validateEmail = FeedbackForm.validate.email(`Please enter valid email.`);

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Link before={<Chat />}>Send feedback</Link>
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
