import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Modal from '@semcore/modal';
import { Box } from '@semcore/flex-box';
import CloseIcon from '@semcore/icon/Close/l';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import { Text } from '@semcore/typography';
import fire from '@semcore/utils/lib/fire';
import logger from '@semcore/utils/lib/logger';

import style from './style/fullscreen-modal.shadow.css';

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
    const {
      styles,
      hidden,
      Children,
      onClose,
      visible: visibleProps,
      closable,
      duration,
      disablePortal,
    } = this.asProps;
    const SFullscreenOverlay = Modal.Overlay;

    logger.warn(
      hidden !== undefined,
      "The 'hidden' property is deprecated, use 'visible'",
      this.asProps['data-ui-name'] || FullscreenModalRoot.displayName,
    );

    const visible = visibleProps === undefined ? !hidden : visibleProps;

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
  const SHeaderDivider = 'div';
  const { Children, styles, title, description } = props;
  return sstyled(styles)(
    <SHeader render={Box}>
      {title && <FullscreenModal.Title children={title} />}
      {description && (
        <>
          <SHeaderDivider />
          <FullscreenModal.Description children={description} />
        </>
      )}
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
  return sstyled(props.styles)(<SFooter render={Box} />);
}

function Close(props) {
  const SClose = Root;
  return sstyled(props.styles)(<SClose render={CloseIcon} />);
}

function Title(props) {
  const STitle = Root;
  return sstyled(props.styles)(<STitle render={Text} tag="h4" />);
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
    <SBack render={Box}>
      <ArrowLeft />
      <SBackText>
        <Children />
      </SBackText>
    </SBack>,
  );
}

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
