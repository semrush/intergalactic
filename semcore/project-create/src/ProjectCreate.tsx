import React from 'react';
import { Field, FieldProps, Form, FormProps } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';
import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import Input from '@semcore/input';
import Tooltip from '@semcore/tooltip';
import Button from '@semcore/button';
import SpinContainer from '@semcore/spin-container';
import Checkbox, { ICheckboxValueProps } from '@semcore/checkbox';
import Info from '@semcore/icon/lib/InfoOutline/s';
import assignProps from '@semcore/utils/lib/assignProps';
import fire from '@semcore/utils/lib/fire';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import createComponent, { Component, Merge, sstyled } from '@semcore/core';

import style from './style/project-create.shadow.css';
import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';
import pt from './translations/pt.json';
import ko from './translations/ko.json';
import vi from './translations/vi.json';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi };

export interface IProjectCreateValues {
  url: string;
  name: string;
}

export interface IProjectCreateI18n {
  /** Title of the modal window */
  title: string;
  /** Text of the domain input label */
  inputDomainLabel: string;
  /** The text of the domain input error  */
  inputDomainError: string;
  /** Placeholder of the domain input  */
  inputDomainPlaceholder: string;
  /** Label text input for entering the project name */
  inputNameLabel: string;
  /** The text of the project name input error is very long */
  inputNameErrorLength: string;
  /** Error text for entering the project name with unavailable characters */
  inputNameErrorCharacters: string;
  /** Input placeholder for project name input */
  inputNamePlaceholder: string;
  /** Additional information */
  description: string;
  /** The text of the button to create the project */
  buttonCreate: string;
  /** Text of the button, which cancel creation of a project */
  buttonCancel: string;
  /** The text of the checkbox for sharing the project */
  sharingCheckboxLegend: string;

  [key: string]: string;
}

export interface IProjectCreateModalProps extends IWithI18nEnhanceProps {
  /** This parameter is responsible for displaying data loading */
  loading?: boolean;
  /** This parameter controls the visibility of the modal window */
  visible?: boolean;
  /** Properties for the project sharing checkbox
   * @default {}
   */
  sharingCheckboxProps?: ISharingCheckboxProps;
  /** This parameter is responsible for displaying the project sharing checkbox
   * @default false
   */
  hasSharingCheckbox?: boolean;
  /** The function is called in while data validation
   * @default (values, _: Object with needed localization) => errors
   */
  validate?: <T extends Partial<IProjectCreateValues>>(
    values: T,
    _: ReturnType<IWithI18nEnhanceProps['getI18nText']>,
  ) => T;
  /** This function is called in when the form is submitted */
  onSubmit?: (values: IProjectCreateValues) => void;
  /** The function is called in when the modal window is closed */
  onClose?: (
    trigger: 'onOutsideClick' | 'onCloseClick' | 'onEscape',
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
}

export interface IProjectCreateModalItemProps extends FieldProps<any, any> {
  label?: string;
}

export interface ISharingCheckboxProps extends ICheckboxValueProps {
  label?: string;
}

function validate(values, _) {
  const { url, name } = values;
  const errors: { url?: string; name?: string } = {};
  if (!/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i.test(url)) {
    errors.url = _['inputDomainError'];
  }
  if (!name) return errors;
  if (name.length > 256) {
    errors.name = _['inputNameErrorLength'];
    return errors;
  }
  if (/[\~\|\`\!\#\%\^\&\*\=\[\]\\'\/\{\}\|"\:\<\>\?]/.test(name)) {
    errors.name = _['inputNameErrorCharacters'];
  }
  return errors;
}

class ProjectCreateModalRoot extends Component<Merge<IProjectCreateModalProps, FormProps>> {
  static displayName = 'ProjectCreateModal';
  static defaultProps = {
    validate,
    i18n,
    locale: 'en',
    hasSharingCheckbox: false,
    sharingCheckboxProps: {},
  };
  static style = style;
  static enhance = [i18nEnhance()];

  constructor(props) {
    super(props);
    this.focusDecorator = createFocusDecorator();
  }

  focusDecorator: any;

  handleSubmit = (values) => {
    return fire(this, 'onSubmit', values);
  };

  handleCloseModal = (e) => {
    fire(this, 'onClose', 'onCloseClick', e);
  };

  render() {
    const SProjectCreate = Modal.Window;
    const {
      loading,
      visible,
      validate,
      onClose,
      styles,
      getI18nText,
      hasSharingCheckbox,
      sharingCheckboxProps,
      ...other
    } = this.asProps;
    const dictionary = getI18nText();

    return sstyled(styles)(
      <Modal visible={visible} onClose={onClose}>
        <Modal.Overlay>
          <SProjectCreate>
            <Modal.Close />
            <Form
              {...other}
              onSubmit={this.handleSubmit}
              decorators={[this.focusDecorator]}
              validate={(values) => validate(values, dictionary)}
            >
              {({ handleSubmit, form }) => (
                <SpinContainer
                  size="xl"
                  loading={loading === undefined ? form.getState().submitting : loading}
                >
                  <form onSubmit={handleSubmit} method="POST" noValidate>
                    <Text tag="h2" size={500} medium>
                      {getI18nText('title')}
                    </Text>
                    <ProjectCreateItem
                      autoFocus
                      name="url"
                      label={getI18nText('inputDomainLabel')}
                      placeholder={getI18nText('inputDomainPlaceholder')}
                    />
                    <ProjectCreateItem
                      name="name"
                      label={getI18nText('inputNameLabel')}
                      placeholder={getI18nText('inputNamePlaceholder')}
                    />
                    {hasSharingCheckbox && (
                      <SharingCheckbox
                        label={getI18nText('sharingCheckboxLegend')}
                        {...sharingCheckboxProps}
                      />
                    )}
                    <Flex mt={6}>
                      <Info style={{ flexShrink: 0 }} color="stone" mr={2} />
                      <Text tag="p" size={100}>
                        {getI18nText('description')}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center" mt={6}>
                      <Button use="primary" theme="success" size="l" type="submit" mr={3}>
                        {getI18nText('buttonCreate')}
                      </Button>
                      <Button size="l" onClick={this.handleCloseModal}>
                        {getI18nText('buttonCancel')}
                      </Button>
                    </Flex>
                  </form>
                </SpinContainer>
              )}
            </Form>
          </SProjectCreate>
        </Modal.Overlay>
      </Modal>,
    );
  }
}

function ProjectCreateItem(props: IProjectCreateModalItemProps) {
  const { placeholder, label, ...other } = props;
  return (
    <Box mt={6}>
      <Text tag="p" size={200} mb={2}>
        {label}
      </Text>
      <Field {...other}>
        {({ input, meta, ...fieldProps }) => {
          const invalid = meta.invalid && meta.touched;
          return (
            <Tooltip
              title={meta.error}
              visible={invalid && meta.active}
              inline={false}
              theme="warning"
              placement="right"
            >
              <Input size="l" state={invalid ? 'invalid' : 'normal'}>
                <Input.Value
                  placeholder={placeholder}
                  autoComplete="off"
                  {...assignProps(input, fieldProps)}
                />
              </Input>
            </Tooltip>
          );
        }}
      </Field>
    </Box>
  );
}

function SharingCheckbox(props: ISharingCheckboxProps) {
  const { label, ...other } = props;
  return (
    <Box mt={4}>
      <Checkbox>
        <Checkbox.Value {...other} />
        <Checkbox.Text>{label}</Checkbox.Text>
      </Checkbox>
    </Box>
  );
}

const ProjectCreateModal = createComponent<Merge<IProjectCreateModalProps, FormProps>>(
  ProjectCreateModalRoot,
);

export default ProjectCreateModal;
