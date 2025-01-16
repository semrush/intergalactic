import React from 'react';
import { Text } from '@semcore/typography';
import Input from '@semcore/input';
import Checkbox from '@semcore/checkbox';
import Radio, { RadioGroup } from '@semcore/radio';
import Textarea from '@semcore/textarea';
import Select from '@semcore/select';
import { DatePicker } from '@semcore/date-picker';
import Tooltip from '@semcore/tooltip';
import Button from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';
import { Field, FieldInputProps, Form } from 'react-final-form';
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
      <Box w={400}>
        <Form
          decorators={[this.focusDecorator]}
          validateOnBlur={false}
          onSubmit={(data) => alert(JSON.stringify(data))}
        >
          {({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Flex mb={4}>
                <Text w={80} size={300} mr={3} mt={2} flex='1 0 auto'>
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
                <Text w={80} size={300} mr={3} mt={2} flex='0 0 auto'>
                  Email
                </Text>
                <Field name='email' validate={email}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper id='form-email-error' theme='warning' visible={showError}>
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

              <Flex mb={4}>
                <Text w={80} size={300} mr={3} mt={2} flex='0 0 auto'>
                  Date
                </Text>
                <Field name='date' validate={required}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper id='form-date-error' theme='warning' visible={showError}>
                          {meta.error}
                        </Tooltip.Popper>

                        <DatePicker
                          value={input.value}
                          size={'l'}
                          onChange={(e) => input.onChange(e)}
                        >
                          <Tooltip.Trigger w={'100%'}>
                            <DatePicker.Trigger
                              {...input}
                              w={'100%'}
                              state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                            />
                          </Tooltip.Trigger>
                          <DatePicker.Popper />
                        </DatePicker>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>

              <Flex mb={4}>
                <Text w={80} size={300} mr={3} mt={2} flex='0 0 auto'>
                  Daytime
                </Text>
                <Field name='someSelect' validate={required}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper
                          id='form-select-error'
                          theme='warning'
                          placement='top'
                          visible={showError}
                        >
                          {meta.error}
                        </Tooltip.Popper>
                        <Tooltip.Trigger w={'100%'} inline={false} {...input}>
                          <Select
                            value={input.value === '' ? undefined : input.value}
                            size={'l'}
                            placeholder={'Select'}
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                            onChange={(value, event) => {
                              Object.defineProperty(event.target, 'value', {
                                writable: false,
                                value,
                              });

                              input.onChange(event);
                            }}
                          >
                            <Select.Trigger w={'100%'} onBlur={(e) => input.onBlur(e)} />
                            <Select.Popper aria-label={'Options'}>
                              <Select.Option value={1}>Morning</Select.Option>
                              <Select.Option value={2}>Afternoon</Select.Option>
                              <Select.Option value={3}>Evening</Select.Option>
                            </Select.Popper>
                          </Select>
                        </Tooltip.Trigger>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>

              <Flex mb={4}>
                <Text w={80} size={300} mr={3} flex='0 0 auto'>
                  Visit purpose
                </Text>
                <Field name='radio' type={'radio'} validate={required}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper id='form-radio-error' theme='warning' visible={showError}>
                          {meta.error}
                        </Tooltip.Popper>
                        <RadioGroup
                          size='l'
                          {...input}
                          tag={Tooltip.Trigger}
                          onChange={(value, e) => input.onChange(e)}
                        >
                          <Radio
                            label='Regular'
                            mb={3}
                            value='1'
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          />
                          <Radio
                            label='Special (I will provide details below)'
                            mb={3}
                            value='2'
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          />
                        </RadioGroup>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>

              <Flex mb={4}>
                <Text w={80} size={300} mr={3} mt={2} flex='0 0 auto'>
                  Comment
                </Text>
                <Field name='textarea' validate={required}>
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper
                          id='form-textarea-error'
                          theme='warning'
                          visible={showError}
                        >
                          {meta.error}
                        </Tooltip.Popper>
                        <Tooltip.Trigger w={'100%'}>
                          <Textarea
                            {...input}
                            h={80}
                            size='l'
                            placeholder='Add details'
                            state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          >
                            {input.value}
                          </Textarea>
                        </Tooltip.Trigger>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>

              <Flex mb={4}>
                <Field
                  name='confirm'
                  type={'checkbox'}
                  validate={(value) => (value === true ? undefined : 'Please confirm')}
                >
                  {({ input, meta }) => {
                    const showError = Boolean(meta.touched && meta.active && meta.error);

                    return (
                      <Tooltip>
                        <Tooltip.Popper id='form-confirm-error' theme='warning' visible={showError}>
                          {meta.error}
                        </Tooltip.Popper>
                        <Checkbox
                          {...input}
                          state={meta.touched && meta.invalid ? 'invalid' : 'normal'}
                          size={'l'}
                          ml='92px'
                          onChange={(value, e) => input.onChange(e)}
                        >
                          <Checkbox.Value />
                          <Checkbox.Text tag={Text} size={300}>
                            I confirm that I have filled out this strange form.
                          </Checkbox.Text>
                        </Checkbox>
                      </Tooltip>
                    );
                  }}
                </Field>
              </Flex>

              <Button ml='92px' size='l' use='primary' theme='success' type='submit'>
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
