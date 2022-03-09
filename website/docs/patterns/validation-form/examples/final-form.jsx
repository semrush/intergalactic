import React from 'react';
import { Text } from '@semcore/typography';
import Input from '@semcore/input';
import Tooltip from '@semcore/tooltip';
import Button from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';
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
                      return (
                        <Tooltip
                          title={meta.error}
                          visible={Boolean(meta.touched && meta.active && meta.error)}
                          theme="warning"
                          placement="top"
                        >
                          <Input
                            size="xl"
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            <Input.Value placeholder="First name" {...input} />
                          </Input>
                        </Tooltip>
                      );
                    }}
                  </Field>
                  <Field name="last" validate={required}>
                    {({ input, meta }) => {
                      return (
                        <Tooltip
                          title={meta.error}
                          visible={Boolean(meta.touched && meta.active && meta.error)}
                          theme="warning"
                          placement="top"
                        >
                          <Input
                            ml={3}
                            size="xl"
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            <Input.Value placeholder="Last name" {...input} />
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
                  {({ input, meta }) => (
                    <Tooltip
                      title={meta.error}
                      visible={Boolean(meta.touched && meta.active && meta.error)}
                      theme="warning"
                      placement="right"
                    >
                      <Input size="xl" state={meta.touched && meta.invalid ? 'invalid' : 'normal'}>
                        <Input.Value placeholder="Email" {...input} />
                      </Input>
                    </Tooltip>
                  )}
                </Field>
              </Flex>
              <Button ml="112px" size="xl" use="primary" theme="success" type="submit">
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
