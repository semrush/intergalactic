import { Box, Flex } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import CheckM from '@semcore/icon/Check/m';
import WarnM from '@semcore/icon/Warning/m';
import FeedbackIllustration from '@semcore/illustration/Feedback';
import Input from '@semcore/input';
import Link from '@semcore/link';
import Modal from '@semcore/modal';
import { default as SemcoreNotice } from '@semcore/notice';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import SpinContainer from '@semcore/spin-container';
import Textarea from '@semcore/textarea';
import { Text } from '@semcore/typography';
import createFocusDecorator from 'final-form-focus';
import React, { type ReactElement } from 'react';
import { Field, Form } from 'react-final-form';

import CheckboxButton from './component/checkbox-button/CheckboxButton';
import { FeedbackItem } from './component/feedback-item/FeedbackItem';
import SliderRating from './component/slider-rating/SliderRating';
import { SubmitButton } from './component/submit-button/SubmitButton';
import type { NSFeedbackRating } from './FeedbackRating.type';
import style from './style/feedback-rating.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class FeedbackRatingRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSFeedbackRating.Component>,
  typeof FeedbackRatingRoot.enhance,
  {},
  WithI18nEnhanceProps,
  NSFeedbackRating.State,
  NSFeedbackRating.DefaultProps
> {
  static displayName = 'FeedbackRatingForm';
  static style = style;

  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()] as const;

  static defaultProps: NSFeedbackRating.DefaultProps = {
    onSubmit: () => {},
    i18n: localizedMessages,
    locale: 'en',
    Illustration: FeedbackIllustration,
    Notice: SemcoreNotice,
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

  state: NSFeedbackRating.State = {
    error: false,
  };

  manager = new NoticeBubbleManager();

  private focusDecorator = createFocusDecorator<Record<string, any>>();

  get headerId() {
    const { uid } = this.asProps;

    return `${uid}-feedback-rating-header`;
  }

  getHeaderProps() {
    return {
      id: this.headerId,
    };
  }

  getItemProps() {
    const { validateOnBlur } = this.asProps;

    return {
      validateOnBlur,
    };
  }

  getNoticeTextId() {
    const { uid } = this.asProps;
    return `${uid}-feedback-rating-notice`;
  }

  handleChangeRating = (rating: number) => {
    if (rating > 0) {
      this.asProps.onVisibleChange(true, rating);
    }
  };

  handelCloseModal = () => {
    this.asProps.onVisibleChange(false, this.asProps.rating);
  };

  handleChange =
    (fn: (e: React.SyntheticEvent) => void) => (_value: any, e: React.SyntheticEvent) => {
      fn(e);
    };

  componentDidUpdate(prevProps: typeof this.asProps) {
    const { status, getI18nText } = this.asProps;

    if (prevProps.status !== status) {
      this.setState({ error: false });

      if (status === 'success') {
        // showing notice with delay for SR, less than 100ms is not enough
        setTimeout(() => {
          this.manager.add({
            icon: <CheckM color='green-400' />,
            children: getI18nText('successMessage'),
            initialAnimation: true,
            duration: 5000,
          });
        }, 300);
      } else if (status === 'error') {
        this.setState({ error: true });
      }
    }
  }

  renderCheckbox = (config: NSFeedbackRating.FormConfigItem, index: number) => {
    const initialValue = this.props.initialValues[config.key];

    return (
      <Field name={config.key} initialValue={initialValue} type='checkbox' key={config.key}>
        {({ input }) => (
          <FeedbackRating.Checkbox
            {...input}
            id={config.key}
            label={config.label}
            onChange={(_: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => input.onChange(e)}
            focused={index === 0}
          />
        )}
      </Field>
    );
  };

  renderTextField = (config: NSFeedbackRating.FormConfigItem) => {
    const initialValue = this.props.initialValues[config.key];

    const label =
      typeof config.label === 'string'
        ? (
            <Text mb={2} size={200}>
              {config.label}
            </Text>
          )
        : (
            (config.label as unknown as JSX.Element)
          );

    const isDescriptionReactFragment =
      (config.description as ReactElement)?.type === React.Fragment;

    return (
      <Flex key={config.key} direction='column'>
        <Flex tag='label' mt={4} htmlFor={config.key}>
          {label}
        </Flex>

        <FeedbackRating.Item
          name={config.key}
          validate={config.validate}
          initialValue={initialValue}
          placement='left-start'
          flip={{
            fallbackPlacements: ['right-start', 'bottom'],
          }}
          aria-describedby={config.description ? config.key + '-description' : undefined}
        >
          {/* @ts-ignore */}
          {({ input }) => {
            if (config.type === 'textarea') {
              return (
                <Textarea
                  {...input}
                  h={80}
                  onChange={this.handleChange(input.onChange)}
                  id={config.key}
                />
              );
            }
            if (config.type === 'input' || config.type === 'email') {
              if (config.type === 'email') {
                input.autoComplete = 'email';
                input.type = 'email';
              }

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
        </FeedbackRating.Item>
        {config.description && (
          <Box mt={2}>
            {typeof config.description === 'string' || isDescriptionReactFragment
              ? (
                  <Text size={200} color='text-secondary' id={config.key + '-description'}>
                    {config.description}
                  </Text>
                )
              : (
                  config.description
                )}
          </Box>
        )}
      </Flex>
    );
  };

  render() {
    const {
      header,
      submitText,
      formConfig,
      notificationText,
      notificationTitle,
      learnMoreLink,
      Children: _Children,
      styles,
      forwardRef,
      status,
      theme,
      background,
      rating,
      visible,
      onVisibleChange: _onVisibleChange,
      notificationVisible,
      onNotificationClose,
      getI18nText,
      errorFeedbackEmail,
      modalWidth,
      Illustration,
      Notice: NoticeComponent,
      ...other
    } = this.asProps;

    const SFeedbackRating = Root;
    const checkboxFields = formConfig.filter((item) => item.type === 'checkbox');
    const textFields = formConfig.filter(
      (item) => item.type === 'textarea' || item.type === 'input' || item.type === 'email',
    );
    const notificationId = this.getNoticeTextId();

    return sstyled(styles)(
      <Root render={Box}>
        <NoticeComponent
          visible={notificationVisible}
          aria-label={getI18nText('leaveFeedback')}
          tag={Flex}
          alignItems={notificationTitle ? 'flex-start' : 'center'}
        >
          <NoticeComponent.Label mr={3} aria-hidden={true}>
            <Illustration />
          </NoticeComponent.Label>
          <NoticeComponent.Content>
            {notificationTitle ? <NoticeComponent.Title>{notificationTitle}</NoticeComponent.Title> : null}
            <NoticeComponent.Text gap={3} tag={Flex} alignItems={notificationTitle ? 'flex-start' : 'center'}>
              <Text id={notificationId}>
                {notificationText}
              </Text>
              <NoticeComponent.Actions mt={0}>
                <SliderRating
                  value={rating}
                  onChange={this.handleChangeRating}
                  aria-labelledby={notificationId}
                />
              </NoticeComponent.Actions>
              {learnMoreLink && (
                <Link href={learnMoreLink}>
                  {getI18nText('learnMore')}
                </Link>
              )}
            </NoticeComponent.Text>
          </NoticeComponent.Content>
          <NoticeComponent.Close onClick={onNotificationClose} />
        </NoticeComponent>

        <SFeedbackRating
          render={Modal}
          visible={visible}
          onClose={this.handelCloseModal}
          p={0}
          use:w={modalWidth ?? 440}
          aria-labelledby={this.headerId}
        >
          <Form decorators={[this.focusDecorator]} {...other}>
            {(api) =>
              sstyled(styles)(
                <SpinContainer
                  background={background}
                  theme={theme}
                  size='xl'
                  loading={status !== 'loading' ? api.submitting : status === 'loading'}
                  p={1}
                  m={9}
                >
                  <Flex justifyContent='center'>
                    <SliderRating value={rating} readonly={true} />
                  </Flex>

                  {(header as ReactElement)?.type === FeedbackRating.Header
                    ? (
                        header
                      )
                    : (
                        <FeedbackRating.Header>{header}</FeedbackRating.Header>
                      )}

                  <Box
                    tag='form'
                    noValidate
                    method='POST'
                    ref={forwardRef}
                    {...other}
                    onSubmit={api.handleSubmit}
                  >
                    <Field name='rating' initialValue={rating}>
                      {({ input }) => <input {...input} type='hidden' />}
                    </Field>

                    <div role='group' aria-labelledby={this.headerId}>
                      {checkboxFields.map((formConfigItem, index) =>
                        this.renderCheckbox(formConfigItem, index),
                      )}
                    </div>

                    {textFields.map((formConfigItem) => this.renderTextField(formConfigItem))}

                    {this.state.error && (
                      <SemcoreNotice theme='warning' mt={4} mb={4}>
                        <SemcoreNotice.Label>
                          <WarnM />
                        </SemcoreNotice.Label>
                        <SemcoreNotice.Content>
                          {getI18nText('errorMessage', {
                            email: (
                              <Link href={`mailto:${errorFeedbackEmail}`}>
                                {errorFeedbackEmail}
                              </Link>
                            ),
                          })}
                        </SemcoreNotice.Content>
                      </SemcoreNotice>
                    )}

                    <Flex mt={4} justifyContent='center'>
                      <FeedbackRating.Submit
                        loading={status !== 'loading' ? api.submitting : status === 'loading'}
                        size='l'
                      >
                        {submitText ?? getI18nText('submitButton')}
                      </FeedbackRating.Submit>
                    </Flex>
                  </Box>
                </SpinContainer>,
              )}
          </Form>
        </SFeedbackRating>

        <NoticeBubbleContainer manager={this.manager} />
      </Root>,
    );
  }
}

function Header(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSFeedbackRating.Header.Component, typeof FeedbackRatingRoot, 'Header'>,
) {
  const { styles } = props;
  const SHeader = Root;
  return sstyled(styles)(
    <SHeader render={Modal.Title} />,
  );
}

/**
 * FeedbackRating
 *
 * {@link https://developer.semrush.com/intergalactic/components/feedback-form/feedback-form-api#feedbackform-feedbackrating|API} | {@link https://developer.semrush.com/intergalactic/components/feedback-form/feedback-form-code/|Examples}
 */
const FeedbackRating = createComponent<
  NSFeedbackRating.Component,
  typeof FeedbackRatingRoot
>(FeedbackRatingRoot, {
  Header,
  Item: FeedbackItem,
  Checkbox: CheckboxButton,
  Submit: SubmitButton,
});

export default FeedbackRating;
