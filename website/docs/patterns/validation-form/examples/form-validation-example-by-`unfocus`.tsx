import React from 'react';
import { Text } from 'intergalactic/typography';
import Input from 'intergalactic/input';
import Tooltip from 'intergalactic/tooltip';
import Button from 'intergalactic/button';
import { Box, Flex } from 'intergalactic/flex-box';
import { Field, Form } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';

const required = (value) => (value ? undefined : 'Please fill in this field.');
const email = (value) => (value?.includes('@') ? undefined : 'Please enter valid email.');

class Demo extends React.Component {
  focusDecorator: any;

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
              <Flex mb={4}>
                <Text w={100} textAlign='right' size={300} mr={3} mt={2} flex='1 0 auto'>
                  Name
                </Text>
                <Flex justifyContent='space-between'>
                  <Field name='first' validate={required}>
                    {({ input, meta }) => {
                      const showError = Boolean(meta.touched && meta.active && meta.error);

                      return (
                        <Tooltip>
                          <Tooltip.Popper
                            theme='warning'
                            id='form-first-name-error'
                            visible={showError}
                          >
                            {meta.error}
                          </Tooltip.Popper>
                          <Input
                            tag={Tooltip.Trigger}
                            size='l'
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            <Input.Value
                              placeholder='First name'
                              {...input}
                              aria-invalid={meta.touched && meta.invalid}
                              aria-errormessage={showError ? 'form-first-name-error' : undefined}
                            />
                          </Input>
                        </Tooltip>
                      );
                    }}
                  </Field>
                  <Field name='last' validate={required}>
                    {({ input, meta }) => {
                      const showError = Boolean(meta.touched && meta.active && meta.error);

                      return (
                        <Tooltip>
                          <Tooltip.Popper
                            theme='warning'
                            id='form-last-name-error'
                            visible={showError}
                          >
                            {meta.error}
                          </Tooltip.Popper>
                          <Input
                            tag={Tooltip.Trigger}
                            ml={3}
                            size='l'
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            <Input.Value
                              placeholder='Last name'
                              {...input}
                              aria-invalid={meta.touched && meta.invalid}
                              aria-errormessage={showError ? 'form-last-name-error' : undefined}
                            />
                          </Input>
                        </Tooltip>
                      );
                    }}
                  </Field>
                </Flex>
              </Flex>
              <Flex mb={4}>
                <Text w={100} textAlign='right' size={300} mr={3} mt={2} flex='0 0 auto'>
                  Your email
                </Text>
                <Field name='email' validate={email}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper
                          id='form-email-error'
                          theme='warning'
                          visible={showError}
                        >
                          {meta.error}
                        </Tooltip.Popper>
                        <Input
                          tag={Tooltip.Trigger}
                          size='l'
                          state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                        >
                          <Input.Value
                            placeholder='Email'
                            {...input}
                            aria-invalid={meta.touched && meta.invalid}
                            aria-errormessage={showError ? 'form-email-error' : undefined}
                          />
                        </Input>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>
              <Button ml='112px' size='l' use='primary' theme='success' type='submit'>
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
