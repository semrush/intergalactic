import { Flex, Box } from '@semcore/base-components';
import Button, { ButtonLink } from '@semcore/button';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import fire from '@semcore/core/lib/utils/fire';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import CloseIcon from '@semcore/icon/Close/l';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './style/fullscreen-modal.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class FullscreenModalRoot extends Component {
  static displayName = 'FullscreenModal';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()];
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  };

  state = { hasTitle: false };

  bindHandlerClose = (trigger) => (e) => {
    fire(this, 'onClose', trigger, e);
  };

  getCloseProps() {
    const { getI18nText } = this.asProps;
    return {
      onClick: this.bindHandlerClose('onCloseClick'),
      getI18nText,
    };
  }

  getBackProps() {
    return {
      onClick: this.bindHandlerClose('onBackClick'),
    };
  }

  getTitleProps() {
    const { uid } = this.asProps;
    const setHasTitle = () => this.setState({ hasTitle: true });

    return {
      id: `igc-${uid}-title`,
      setHasTitle,
    };
  }

  render() {
    const SFullscreenModal = Root;
    const {
      styles,
      Children,
      onClose,
      visible,
      closable,
      duration,
      disablePortal,
      getI18nText,
      uid,
    } = this.asProps;
    const { hasTitle } = this.state;
    const SFullscreenOverlay = Modal.Overlay;

    return sstyled(styles)(
      <Modal
        closable={false}
        visible={visible}
        onClose={onClose}
        duration={duration}
        disablePortal={disablePortal}
      >
        <SFullscreenOverlay>
          <SFullscreenModal
            render={Modal.Window}
            use:closable={false}
            aria-label={hasTitle ? undefined : getI18nText('title')}
            aria-labelledby={hasTitle ? `igc-${uid}-title` : undefined}
          >
            {closable && <FullscreenModal.Close />}
            <Children />
          </SFullscreenModal>
        </SFullscreenOverlay>
      </Modal>,
    );
  }
}

function Header(props) {
  const SHeader = Root;
  const { Children, styles, title, description } = props;
  return sstyled(styles)(
    <SHeader render={Box}>
      {title && <FullscreenModal.Title children={title} />}
      {description && <FullscreenModal.Description children={description} />}
      <Children />
    </SHeader>,
  );
}

function Body(props) {
  const SBody = Root;
  return sstyled(props.styles)(<SBody render={Box} />);
}

function Section(props) {
  const SSection = Root;
  return sstyled(props.styles)(<SSection render={Box} tag='section' />);
}

function Footer(props) {
  const SFooter = Root;
  return sstyled(props.styles)(<SFooter render={Flex} />);
}

function Close(props) {
  const SClose = Root;
  const { getI18nText } = props;
  return sstyled(props.styles)(
    <SClose render={Button} use='tertiary' size='l' theme='muted' aria-label={getI18nText('close')}>
      <Button.Addon>
        <CloseIcon />
      </Button.Addon>
    </SClose>,
  );
}

function Title(props) {
  const STitle = Root;
  const { setHasTitle } = props;

  React.useEffect(() => setHasTitle());

  return sstyled(props.styles)(<STitle render={Text} tag='h2' />);
}

function Description(props) {
  const SDescription = Root;
  return sstyled(props.styles)(<SDescription render={Text} tag='p' size={200} use='secondary' />);
}

function Back(props) {
  const SBack = Root;
  const { Children, styles } = props;

  return sstyled(styles)(
    <SBack render={ButtonLink} use='secondary' size={200} addonLeft={ArrowLeft}>
      <ButtonLink.Text ellipsis>
        <Children />
      </ButtonLink.Text>
    </SBack>,
  );
}

/**
 * FullscreenModal
 *
 * {@link https://developer.semrush.com/intergalactic/components/fullscreen-modal/fullscreen-modal-api/|API} | {@link https://developer.semrush.com/intergalactic/components/fullscreen-modal/fullscreen-modal-code/|Examples}
 */
const FullscreenModal = createComponent(
  FullscreenModalRoot,
  {
    Header,
    Footer,
    Close,
    Back,
    Body,
    Section,
    Title,
    Description,
  },
  { parent: Modal },
);

export default FullscreenModal;
