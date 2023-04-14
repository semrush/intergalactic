import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Modal from '@semcore/modal';
import { Flex, Box } from '@semcore/flex-box';
import CloseIcon from '@semcore/icon/Close/l';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import { Text } from '@semcore/typography';
import fire from '@semcore/utils/lib/fire';

import style from './style/fullscreen-modal.shadow.css';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

class FullscreenModalRoot extends Component {
  static displayName = 'FullscreenModal';
  static style = style;

  bindHandlerClose = (trigger) => (e) => {
    fire(this, 'onClose', trigger, e);
  };

  getCloseProps() {
    return {
      onClick: this.bindHandlerClose('onCloseClick'),
    };
  }

  getBackProps() {
    return {
      onClick: this.bindHandlerClose('onBackClick'),
    };
  }

  render() {
    const SFullscreenModal = Root;
    const { styles, Children, onClose, visible, closable, duration, disablePortal } = this.asProps;
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
          <SFullscreenModal render={Modal.Window}>
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
  return sstyled(props.styles)(<SSection render={Box} />);
}

function Footer(props) {
  const SFooter = Root;
  return sstyled(props.styles)(<SFooter render={Flex} />);
}

function Close(props) {
  const SClose = Root;
  return sstyled(props.styles)(<SClose render={CloseIcon} interactive />);
}

function Title(props) {
  const STitle = Root;
  return sstyled(props.styles)(<STitle render={Text} tag="h2" />);
}

function Description(props) {
  const SDescription = Root;
  return sstyled(props.styles)(<SDescription render={Text} />);
}

function Back(props) {
  const SBack = Root;
  const SBackText = Text;
  const { Children, styles } = props;

  return sstyled(styles)(
    <SBack render={Box} tag="button">
      <ArrowLeft />
      <SBackText>
        <Children />
      </SBackText>
    </SBack>,
  );
}
Back.enhance = [keyboardFocusEnhance()];

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
