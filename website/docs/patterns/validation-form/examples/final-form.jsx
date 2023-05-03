import React from 'react';
import { Text } from '@semcore/ui/typography';
import Input from '@semcore/ui/input';
import Tooltip from '@semcore/ui/tooltip';
import Button from '@semcore/ui/button';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Field, Form } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';

const required = (value) => (value ? undefined : 'Required');
const email = (value) => (value && value.includes('@') ? undefined : 'Enter email');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.focusDecorator = createFocusDecorator();
  }

  render() {
    return (
      <Box w={500}>
        <Form decorators={[this.focusDecorator]} onSubmit={(data) => alert(JSON.stringify(data))}>
          {({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Flex mb={6}>
                <Text w={100} textAlign="right" size={300} mr={3} mt={2} flex="1 0 auto">
                  Name
                </Text>
                <Flex justifyContent="space-between">
                  <Field name="first" validate={required}>
                    {({ input, meta }) => {
                      const showError = Boolean(meta.touched && meta.active && meta.error);

                      return (
                        <Tooltip
                          title={meta.error}
                          visible={showError}
                          theme="warning"
                          placement="top"
                          id="form-frist-name-error"
                        >
                          <Input
                            size="l"
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            <Input.Value
                              placeholder="First name"
                              {...input}
                              aria-invalud={meta.touched && meta.invalid}
                              aria-errormessage={showError ? 'form-frist-name-error' : undefined}
                            />
                          </Input>
                        </Tooltip>
                      );
                    }}
                  </Field>
                  <Field name="last" validate={required}>
                    {({ input, meta }) => {
                      const showError = Boolean(meta.touched && meta.active && meta.error);

                      return (
                        <Tooltip
                          title={meta.error}
                          visible={showError}
                          theme="warning"
                          placement="top"
                          id="form-last-name-error"
                        >
                          <Input
                            ml={3}
                            size="l"
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            <Input.Value
                              placeholder="Last name"
                              {...input}
                              aria-invalud={meta.touched && meta.invalid}
                              aria-errormessage={showError ? 'form-last-name-error' : undefined}
                            />
                          </Input>
                        </Tooltip>
                      );
                    }}
                  </Field>
                </Flex>
              </Flex>
              <Flex mb={6}>
                <Text w={100} textAlign="right" size={300} mr={3} mt={2} flex="0 0 auto">
                  Your email
                </Text>
                <Field name="email" validate={email}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip
                        title={meta.error}
                        visible={showError}
                        id="form-email-error"
                        theme="warning"
                        placement="right"
                      >
                        <Input size="l" state={meta.touched && meta.invalid ? 'invalid' : 'normal'}>
                          <Input.Value
                            placeholder="Email"
                            {...input}
                            aria-invalud={meta.touched && meta.invalid}
                            aria-errormessage={showError ? 'form-email-error' : undefined}
                          />
                        </Input>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>
              <Button ml="112px" size="l" use="primary" theme="success" type="submit">
                <Button.Text>Submit</Button.Text>
              </Button>
            </form>
          )}
        </Form>
      </Box>
    );
  }
}

export default Demo;
