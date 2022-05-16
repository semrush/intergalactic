import React, { useContext } from 'react';
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
import Info from '@semcore/icon/Info/m';
import assignProps from '@semcore/utils/lib/assignProps';
import fire from '@semcore/utils/lib/fire';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import createComponent, {
  Component,
  CONTEXT_COMPONENT,
  IStyledProps,
  Merge,
  sstyled,
} from '@semcore/core';

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

import style from './style/project-create.shadow.css';

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
  /** Disables children rendering in React portal */
  disablePortal?: boolean;
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
  /** @ignore */
  styles?: IStyledProps['styles'];
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

  setContext() {
    return { styles: this.asProps.styles };
  }

  render() {
    const SProjectCreate = Modal.Window;
    const SIconInfo = Info;
    const SItem = Flex;
    const STitle = Text;
    const SDescription = Text;
    const SButtonSuccess = Button;
    const {
      loading,
      visible,
      validate,
      onClose,
      styles,
      getI18nText,
      hasSharingCheckbox,
      sharingCheckboxProps,
      disablePortal,
      ...other
    } = this.asProps;
    const dictionary = getI18nText();

    return (
      <Form
        {...other}
        onSubmit={this.handleSubmit}
        decorators={[this.focusDecorator]}
        validate={(values) => validate(values, dictionary)}
      >
        {({ handleSubmit, form }) =>
          sstyled(styles)(
            <Modal visible={visible} onClose={onClose} disablePortal={disablePortal}>
              <Modal.Overlay>
                <SProjectCreate>
                  <SpinContainer
                    size="xl"
                    loading={loading === undefined ? form.getState().submitting : loading}
                  >
                    <form onSubmit={handleSubmit} method="POST" noValidate>
                      <STitle tag="h2">{getI18nText('title')}</STitle>
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
                      <SItem>
                        <SIconInfo />
                        <SDescription tag="p">{getI18nText('description')}</SDescription>
                      </SItem>
                      <SItem>
                        <SButtonSuccess use="primary" theme="success" size="l" type="submit">
                          {getI18nText('buttonCreate')}
                        </SButtonSuccess>
                        <Button size="l" onClick={this.handleCloseModal}>
                          {getI18nText('buttonCancel')}
                        </Button>
                      </SItem>
                    </form>
                  </SpinContainer>
                </SProjectCreate>
              </Modal.Overlay>
            </Modal>,
          )
        }
      </Form>
    );
  }
}

function ProjectCreateItemInner(props: IProjectCreateModalItemProps): any {
  const SItem = Box;
  const SLabel = Text;
  const { placeholder, label, styles, ...other } = props;
  return sstyled(styles)(
    <SItem>
      <SLabel tag="p">{label}</SLabel>
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
    </SItem>,
  );
}

function SharingCheckboxInner(props: ISharingCheckboxProps): any {
  const SSharingCheckbox = Box;
  const { label, styles, ...other } = props;
  return sstyled(styles)(
    <SSharingCheckbox>
      <Checkbox>
        <Checkbox.Value {...other} />
        <Checkbox.Text>{label}</Checkbox.Text>
      </Checkbox>
    </SSharingCheckbox>,
  );
}

function ProjectCreateItem(props: IProjectCreateModalItemProps) {
  const { styles } = useContext(ProjectCreateModal[CONTEXT_COMPONENT]);
  return <ProjectCreateItemInner styles={styles} {...props} />;
}

function SharingCheckbox(props: ISharingCheckboxProps) {
  const { styles } = useContext(ProjectCreateModal[CONTEXT_COMPONENT]);
  return <SharingCheckboxInner styles={styles} {...props} />;
}

const ProjectCreateModal =
  createComponent<Merge<IProjectCreateModalProps, FormProps>>(ProjectCreateModalRoot);

export default ProjectCreateModal;
