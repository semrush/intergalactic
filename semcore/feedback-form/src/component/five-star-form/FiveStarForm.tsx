import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Form } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';
import SpinContainer from '@semcore/spin-container';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { useI18n } from '@semcore/utils/lib/enhances/WithI18n';
import Notice from '@semcore/notice';
import CloseAltM from '@semcore/icon/Close/m';
import CheckM from '@semcore/icon/Check/m';
import WarnM from '@semcore/icon/Warning/m';
import { Text } from '@semcore/typography';
import FeedbackIllustration from '@semcore/illustration/Feedback';
import Link from '@semcore/link';
import SliderRating from '../slider-rating/SliderRating';
import Modal from '@semcore/modal';
import Textarea from '@semcore/textarea';
import { Box, Flex } from '@semcore/flex-box';
import { FeedbackItem } from '../feedback-item/FeedbackItem';
import { SubmitButton } from '../submit-button/SubmitButton';
import { FiveStarFormProps, FiveStarFormType, FormConfigItem } from './FiveStartForm.type';
import CheckboxButton from '../checkbox-button/CheckboxButton';
import Input from '@semcore/input';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';

type Enhances = {
  getI18nText: ReturnType<typeof useI18n>;
};

type State = {
  error: boolean;
};

class FiveStarFormRoot extends Component<FiveStarFormProps, {}, State, Enhances> {
  static displayName = 'FiveStarForm';
  static style = {};

  static enhance = [i18nEnhance(localizedMessages)];

  static defaultProps = {
    onSubmit: () => {},
    i18n: localizedMessages,
    locale: 'en',
  };

  static validate = {
    description: (error: Error | string) => (value = '') => {
      const words = value.split(/\s+/);
      const symbols = words.join(' ');
      if (Boolean(value) && (symbols.length < 10 || words.length < 3)) {
        return error;
      }
    },
    email: (error: Error | string) => (value = '') => {
      if (Boolean(value) && !/.+@.+\..+/i.test(String(value).toLowerCase())) {
        return error;
      }
    },
  };

  state: State = {
    error: false,
  };

  manager = new NoticeBubbleManager();

  focusDecorator = createFocusDecorator<Record<string, any>>();

  getItemProps() {
    const { validateOnBlur } = this.asProps;

    return {
      validateOnBlur,
    };
  }

  handleChangeRating = (rating: number) => {
    this.asProps.onVisibleChange(true, rating);
  };

  handelCloseModal = () => {
    this.asProps.onVisibleChange(false, this.asProps.rating);
  };

  handleChange =
    (fn: (e: React.SyntheticEvent) => void) => (value: any, e: React.SyntheticEvent) => {
      fn(e);
    };

  componentDidUpdate(prevProps: Readonly<FiveStarFormProps>) {
    const { status, getI18nText } = this.asProps;

    if (prevProps.status !== status) {
      this.setState({ error: false });

      if (status === 'success') {
        this.manager.add({
          icon: <CheckM color='green-400' />,
          children: getI18nText('successMessage'),
          initialAnimation: true,
          duration: 5000,
        });
      } else if (status === 'error') {
        this.setState({ error: true });
      }
    }
  }

  renderCheckbox = (config: FormConfigItem) => {
    const initialValue = this.props.initialValues[config.key];

    return (
      <FiveStarForm.Item
        name={config.key}
        initialValue={initialValue}
        type={'checkbox'}
        key={config.key}
      >
        {({ input }) => (
          <FiveStarForm.Checkbox
            {...input}
            id={config.key}
            name={config.key}
            label={config.label}
            onChange={this.handleChange(input.onChange)}
          />
        )}
      </FiveStarForm.Item>
    );
  };

  renderTextField = (config: FormConfigItem) => {
    const initialValue = this.props.initialValues[config.key];

    const label =
      typeof config.label === 'string' ? (
        <Text mb={2} size={200}>
          {config.label}
        </Text>
      ) : (
        (config.label as unknown as JSX.Element)
      );

    return (
      <Flex tag='label' mt={4} direction='column' htmlFor={config.key} key={config.key}>
        {label}

        <FiveStarForm.Item
          name={config.key}
          validate={config.validate}
          initialValue={initialValue}
          placement='left-start'
          flip={{
            fallbackPlacements: ['right-start', 'bottom'],
          }}
        >
          {({ input }) => {
            if (config.type === 'textarea') {
              return (
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange)}
                  id={config.key}
                />
              );
            }
            if (config.type === 'input') {
              return (
                <Input state={input.state}>
                  <Input.Value
                    {...input}
                    onChange={this.handleChange(input.onChange)}
                    id={config.key}
                  />
                </Input>
              );
            }
            return null;
          }}
        </FiveStarForm.Item>
        {config.description && (
          <Box mt={2}>
            {typeof config.description === 'string' ? (
              <Text lineHeight='18px' size={200} color='#6c6e79'>
                {config.description}
              </Text>
            ) : (
              config.description
            )}
          </Box>
        )}
      </Flex>
    );
  };

  render() {
    const {
      Header,
      submitText,
      formConfig,
      notificationText,
      learnMoreLink,
      Children,
      styles,
      forwardRef,
      status,
      theme,
      background,
      rating,
      visible,
      onVisibleChange,
      notificationVisible,
      onNotificationClose,
      getI18nText,
      ...other
    } = this.asProps;

    return sstyled(styles)(
      <Root render={Box}>
        <Notice visible={notificationVisible}>
          <Notice.Label mt={1} mr={2} aria-hidden={true}>
            <FeedbackIllustration />
          </Notice.Label>
          <Notice.Content style={{ display: 'flex', alignItems: 'center' }}>
            <Text mr={3}>{notificationText}</Text>
            <Notice.Actions mt={0}>
              <SliderRating value={rating} onChange={this.handleChangeRating} />
            </Notice.Actions>
            {learnMoreLink && (
              <Link ml={3} href={learnMoreLink}>
                {getI18nText('learnMore')}
              </Link>
            )}
          </Notice.Content>
          <Notice.CloseIcon interactive onClick={onNotificationClose}>
            <CloseAltM />
          </Notice.CloseIcon>
        </Notice>

        <Modal visible={visible} onClose={this.handelCloseModal} p={0}>
          <Form decorators={[this.focusDecorator]} {...other}>
            {(api) =>
              sstyled(styles)(
                <SpinContainer
                  background={background}
                  theme={theme}
                  size='xl'
                  loading={status !== 'loading' ? api.submitting : status === 'loading'}
                  p={10}
                >
                  <Flex justifyContent='center'>
                    <SliderRating value={rating} readonly={true} />
                  </Flex>

                  {
                    // @ts-ignore
                    Header
                  }

                  <Box
                    tag='form'
                    noValidate
                    method='POST'
                    ref={forwardRef}
                    {...other}
                    onSubmit={api.handleSubmit}
                    title={getI18nText('formTitle')}
                    wMax={320}
                  >
                    <FiveStarForm.Item name={'rating'} initialValue={rating}>
                      {({ input }) => {
                        return <input {...input} type='hidden' />;
                      }}
                    </FiveStarForm.Item>

                    {formConfig.map((formConfigItem) => {
                      switch (formConfigItem.type) {
                        case 'checkbox': {
                          return this.renderCheckbox(formConfigItem);
                        }
                        case 'textarea':
                        case 'input': {
                          return this.renderTextField(formConfigItem);
                        }
                        default: {
                          const type: never = formConfigItem.type;

                          return null;
                        }
                      }
                    })}

                    {this.state.error && (
                      <Notice theme={'warning'} mt={4} mb={4}>
                        <Notice.Label>
                          <WarnM />
                        </Notice.Label>
                        <Notice.Content>{getI18nText('errorMessage')}</Notice.Content>
                      </Notice>
                    )}

                    <Flex mt={4} justifyContent={'center'}>
                      <FiveStarForm.Submit
                        loading={status !== 'loading' ? api.submitting : status === 'loading'}
                      >
                        {submitText ?? getI18nText('submitButton')}
                      </FiveStarForm.Submit>
                    </Flex>
                  </Box>
                </SpinContainer>,
              )
            }
          </Form>
        </Modal>

        <NoticeBubbleContainer manager={this.manager} />
      </Root>,
    );
  }
}

function Header(props: any) {
  const { styles } = props;
  const SHeader = Root;
  return sstyled(styles)(
    <SHeader render={Text} size={300} tag='h2' mb={4} mt={4} textAlign={'center'} />,
  );
}

const FiveStarForm: typeof FiveStarFormType = createComponent(FiveStarFormRoot, {
  Header,
  Item: FeedbackItem,
  Checkbox: CheckboxButton,
  Submit: SubmitButton,
});

export default FiveStarForm;
