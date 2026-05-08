import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Modal from '@semcore/ui/modal';
import Tooltip from '@semcore/ui/tooltip';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

const warningBlockStyles = {
  background: 'var(--intergalactic-bg-secondary-critical, #fff0f7)',
  border: '1px solid var(--intergalactic-border-critical, #ffaeb5)',
  borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
  marginBottom: '24px',
  padding: '16px',
};

type FormValues = {
  project: string;
};

const fieldName: keyof FormValues = 'project';

const Demo = () => {
  const { register, trigger, handleSubmit, reset, resetField, getValues, formState } =
    useForm<FormValues>({
      mode: 'onBlur',
      defaultValues: { project: '' },
    });

  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => {
    setVisible(false);
    reset({ project: '' }, { keepIsSubmitted: false, keepTouched: false });
  }, []);

  const { errors, isSubmitted } = formState;
  const [focusedFieldName, setFocusedFieldName] = React.useState('');
  const onSubmit: SubmitHandler<FormValues> = handleClose;

  const hasError = () => {
    const error = errors[fieldName];

    if (error && error.type === 'projectRequired' && !isSubmitted) {
      return false;
    }

    return Boolean(error);
  };

  const showErrorTooltip = (): boolean => {
    const isActive = focusedFieldName === fieldName;
    return hasError() && isActive;
  };

  const { onChange, ...restField } = register(fieldName, {
    validate: {
      projectRequired: (v) => {
        return Boolean(v) || 'Please enter the correct project name';
      },
      projectName: (v) => {
        if (!v) {
          return true;
        }

        return /^test$/i.test(v) || 'Please enter the correct project name';
      },
    },
    onBlur: () => setFocusedFieldName(''),
  });

  const field = {
    onChange: (_v: string, e: React.SyntheticEvent) => {
      // important: keep call order, otherwise validation breaks
      onChange(e);
      if (hasError()) {
        trigger();
      }
    },
    ...restField,
  };

  return (
    <>
      <Button onClick={handleOpen}>Open confirmation modal</Button>
      <Modal visible={visible} onClose={handleClose} w={536}>
        <Modal.Title mb={4}>Delete project?</Modal.Title>
        <Text size={300} mb={4} tag='p'>
          This will
          {' '}
          <Text tag='strong'>delete</Text>
          {' '}
          the following campaigns set up for
          {' '}
          <Text tag='strong'>test.com</Text>
          {' '}
          with all their data:
        </Text>
        <List size={300} mb={4}>
          <List.Item>Position Tracking</List.Item>
          <List.Item>Social Media Poster</List.Item>
          <List.Item>Backlink Audit</List.Item>
          <List.Item>Content Analyzer</List.Item>
        </List>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Flex style={warningBlockStyles} direction='column'>
            <Text size={300} mb={2} tag='label' htmlFor={fieldName}>
              Confirm deletion by typing the project name
              {' '}
              <Text tag='strong' color='red-500'>
                Test
              </Text>
            </Text>

            <Tooltip
              placement='right'
              interaction='none'
              theme='warning'
            >
              <Tooltip.Popper visible={showErrorTooltip()} id='form-project-error'>
                {errors[fieldName]?.message}
              </Tooltip.Popper>

              <Input state={hasError() ? 'invalid' : 'normal'} controlsLength={1} mb={2} size='l'>
                <Tooltip.Trigger
                  tag={Input.Value}
                  {...field}
                  id={fieldName}
                  placeholder='Enter project name'
                  w='100%'
                  onFocus={() => setFocusedFieldName(fieldName)}
                  aria-invalid={hasError()}
                  aria-describedby={showErrorTooltip() ? 'form-project-error' : undefined}
                />
              </Input>
            </Tooltip>
          </Flex>

          <Flex direction='row'>
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
