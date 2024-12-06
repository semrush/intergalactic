import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import { Text, List } from '@semcore/typography';
import Input from '@semcore/input';
import Tooltip from '@semcore/tooltip';
import '@semcore/utils/lib/themes/default.css';
import { useForm, SubmitHandler } from 'react-hook-form';

const warningBlockStyles = {
  background: 'var(--intergalactic-bg-secondary-critical)',
  border: '1px solid var(--intergalactic-border-critical)',
  borderRadius: 'var(--intergalactic-surface-rounded)',
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

  const { errors, isSubmitted, touchedFields } = formState;
  const [focusedFieldName, setFocusedFieldName] = React.useState('');
  const onSubmit: SubmitHandler<FormValues> = handleClose;

  const hasError = () => {
    const error = errors[fieldName];

    if (error && error.type === 'projectRequired' && !isSubmitted) {
      return false;
    }

    return Boolean(error);
  };

  const invalid = (): boolean => {
    return Boolean(touchedFields[fieldName]) && hasError();
  };

  const showErrorTooltip = (): boolean => {
    const isActive = focusedFieldName === fieldName;
    return invalid() && isActive;
  };

  const resetIfChangedToValid = (isValid: boolean) => {
    if (isValid) {
      resetField(fieldName, { keepTouched: false, defaultValue: getValues(fieldName) });
    }
  };

  type RegisterOptions = Parameters<typeof register>[1];
  const registerHelper = (options: RegisterOptions) => {
    const usersOnChange = options?.onChange;

    const result = register(fieldName, options);
    const { onChange, ...rest } = result;
    const rewiredOnChange = (_v: string, e: React.SyntheticEvent) => {
      onChange(e);
      usersOnChange?.(e);
    };

    return { ...rest, onChange: rewiredOnChange };
  };

  const field = registerHelper({
    validate: {
      projectRequired: (v) => {
        return Boolean(v) || 'Please enter correct project name';
      },
      projectName: (v) => {
        if (!v) {
          return true;
        }

        return /^test$/i.test(v) || 'Please enter correct project name';
      },
    },
    onBlur: () => setFocusedFieldName(''),
    onChange: () => {
      hasError() && trigger().then(resetIfChangedToValid);
    },
  });

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
              placement='right'
              interaction={'none'}
              animationsDisabled={true}
            >
              <Tooltip.Popper visible={showErrorTooltip()} theme='warning' id='form-project-error'>
                {errors[fieldName]?.message}
              </Tooltip.Popper>

              <Input
                tag={Tooltip.Trigger}
                w='100%'
                mb={2}
                size='l'
                state={invalid() ? 'invalid' : 'normal'}
                controlsLength={1}
              >
                <Input.Value
                  {...field}
                  id={fieldName}
                  onFocus={() => setFocusedFieldName(fieldName)}
                  placeholder={'Enter project name'}
                  size='l'
                  w={'100%'}
                  aria-invalid={invalid()}
                  aria-errormessage={invalid() ? 'form-project-error' : undefined}
                />
              </Input>
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
