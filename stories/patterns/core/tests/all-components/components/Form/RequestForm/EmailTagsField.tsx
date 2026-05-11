import { Flex } from '@semcore/ui/flex-box';
import Counter from '@semcore/ui/counter';
import InputTags from '@semcore/ui/input-tags';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const MAX_EMAIL_TAGS = 5;

const isEmailValid = (val: string) => /.+@.+\..+/i.test(val);

function useEmailInputTags() {
  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailTagInput, setEmailTagInput] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAppendEmailTags = React.useCallback(
    (newTags: string[]) => {
      if (newTags.some((tag) => !isEmailValid(tag))) {
        setError('Email isn\'t valid.');
        return;
      }
      if (emails.length + newTags.length > MAX_EMAIL_TAGS) {
        setError(`There must be no more than ${MAX_EMAIL_TAGS} emails.`);
        return;
      }
      setEmails([...emails, ...newTags]);
      setEmailTagInput('');
      setError(null);
    },
    [emails],
  );

  const handleEmailTagBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError('Email isn\'t valid.');
    }
    setFocused(false);
  }, []);

  const handleEmailTagChange = React.useCallback((value: string) => {
    setEmailTagInput(value);
    if (!value || isEmailValid(value)) {
      setError(null);
    }
  }, []);

  const handleRemoveEmailTag = React.useCallback(() => {
    if (emails.length === 0) return;
    setEmails(emails.slice(0, -1));
    setEmailTagInput(`${emails.slice(-1)[0]} ${emailTagInput}`);
  }, [emails, emailTagInput]);

  const handleCloseEmailTag = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { dataset } = e.currentTarget;
      setEmails(emails.filter((_tag, idx) => idx !== Number(dataset.id)));
    },
    [emails],
  );

  const invalid = Boolean(error);
  const showErrorTooltip = focused && invalid;

  return {
    emails,
    emailTagInput,
    error,
    invalid,
    showErrorTooltip,
    handleAppendEmailTags,
    handleEmailTagBlur,
    handleEmailTagChange,
    handleRemoveEmailTag,
    handleCloseEmailTag,
    handleFocus: () => setFocused(true),
  };
}

export function EmailTagsField() {
  const {
    emails,
    emailTagInput,
    error,
    invalid,
    showErrorTooltip,
    handleAppendEmailTags,
    handleEmailTagBlur,
    handleEmailTagChange,
    handleRemoveEmailTag,
    handleCloseEmailTag,
    handleFocus,
  } = useEmailInputTags();

  return (
    <Flex direction='column' gap={2}>
      <Flex alignItems='baseline'>
        <Text size={300} tag='label' htmlFor='request-form-emails'>
          Emails
        </Text>
        <Counter
          ml={1}
          size='l'
          theme={emails.length < MAX_EMAIL_TAGS ? '' : 'warning'}
        >
          {`${emails.length}/${MAX_EMAIL_TAGS}`}
        </Counter>
      </Flex>
      <Tooltip
        interaction='none'
        placement='right'
        theme='warning'
        w='100%'
        animationsDisabled
        visible={showErrorTooltip}
      >
        <Tooltip.Trigger
          tag={InputTags}
          size='l'
          state={invalid ? 'invalid' : 'normal'}
          onAppend={handleAppendEmailTags}
          onRemove={handleRemoveEmailTag}
        >
          {emails.map((tag, idx) => (
            <InputTags.Tag key={idx}>
              <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
              <InputTags.Tag.Close data-id={idx} onClick={handleCloseEmailTag} />
            </InputTags.Tag>
          ))}
          <InputTags.Value
            id='request-form-emails'
            name='email'
            type='email'
            autoComplete='email'
            value={emailTagInput}
            onChange={handleEmailTagChange}
            onBlur={handleEmailTagBlur}
            onFocus={handleFocus}
            aria-invalid={invalid}
            aria-describedby={showErrorTooltip ? 'request-form-emails-error' : undefined}
            __excludeProps={['aria-haspopup']}
          />
        </Tooltip.Trigger>
        <Tooltip.Popper id='request-form-emails-error'>
          {error ?? ''}
        </Tooltip.Popper>
      </Tooltip>
    </Flex>
  );
}
