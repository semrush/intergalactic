import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import { Text, List } from '@semcore/typography';
import Input from '@semcore/input';
import Tooltip from '@semcore/tooltip';
import '@semcore/utils/lib/themes/default.css';
import { useForm } from 'react-hook-form';

const warningBlockStyles = {
  background: 'var(--intergalactic-bg-secondary-critical)',
  border: '1px solid var(--intergalactic-border-critical)',
  borderRadius: 'var(--intergalactic-surface-rounded)',
  marginBottom: '24px',
  padding: '16px',
};

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  const {
    register,
    trigger,
    handleSubmit,
    errors,
    getValues,
    formState: { dirtyFields, isSubmitted },
  } = useForm({
    mode: 'onBlur',
  });
  const [focusedFieldName, setFocusedFieldName] = React.useState('');

  const onSubmit = handleClose;

  const invalid = (fieldName: string): boolean => {
    const hasError = Boolean(errors[fieldName]);
    if (isSubmitted) {
      return hasError;
    }

    return dirtyFields[fieldName] && hasError;
  };

  const showError = (fieldName: string): boolean => {
    const isActive = focusedFieldName === fieldName;
    return invalid(fieldName) && isActive;
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal visible={visible} onClose={handleClose} w={536}>
        <Modal.Title mb={4}>Delete project?</Modal.Title>
        <Text size={300} mb={4} tag='p'>
          This will <Text tag='strong'>delete</Text> the following campaigns set up for{' '}
          <Text tag='strong'>test.com</Text> with all their data:
        </Text>
        <List size={300} mb={4}>
          <List.Item>Position Tracking</List.Item>
          <List.Item>Social Media Poster</List.Item>
          <List.Item>Backlink Audit</List.Item>
          <List.Item>Content Analyzer</List.Item>
        </List>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Flex style={warningBlockStyles} tag='label' direction='column' htmlFor='project'>
            <Text size={300} mb={2} tag='p'>
              Confirm deletion by typing the project name{' '}
              <Text tag='strong' color='red-500'>
                Test
              </Text>
            </Text>

            <Tooltip
              visible={showError('project')}
              theme='warning'
              placement='right'
              interaction={'none'}
              ignorePortalsStacking
            >
              <Tooltip.Popper id='form-email-error'>
                Please enter a correct project name.
              </Tooltip.Popper>

              <Tooltip.Trigger
                tag={Input}
                w='100%'
                mb={2}
                size='l'
                state={invalid('project') ? 'invalid' : 'normal'}
                controlsLength={1}
              >
                {({ getTriggerProps }) => {
                  return (
                    <Input.Value
                      {...getTriggerProps({
                        id: 'project',
                        name: 'project',
                        placeholder: 'Enter project name',
                        onChange: () => {
                          if (invalid('project')) {
                            trigger('project');
                          }
                        },
                        ref: register({
                          required: 'Please enter correct project name',
                          pattern: /test/i,
                        }) as React.ForwardedRef<HTMLInputElement>,
                      })}
                      size='l'
                      w={'100%'}
                      onFocus={() => setFocusedFieldName('project')}
                      onBlur={() => setFocusedFieldName('')}
                      aria-invalid={invalid('project')}
                      aria-errormessage={invalid('project') ? 'form-project-error' : undefined}
                    />
                  );
                }}
              </Tooltip.Trigger>
            </Tooltip>
          </Flex>

          <Flex direction={'row'}>
            <Button use='primary' theme='danger' size='l' type='submit'>
              Delete
            </Button>

            <Button size='l' ml={2} onClick={handleClose} type='button'>
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default Demo;
