import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Flex, Box } from '@semcore/flex-box';
import Close from '@semcore/icon/Close/m';
import resolveColor from '@semcore/utils/lib/color';
import { FadeInOut } from '@semcore/animation';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';

import style from './style/notice-global.shadow.css';

function isCustomTheme(theme) {
  return !['danger', 'warning', 'success', 'info', 'neutral'].includes(theme);
}

class NoticeGlobalRoot extends Component {
  static displayName = 'NoticeGlobal';
  static style = style;
  static defaultProps = {
    theme: 'neutral',
    duration: 200,
  };

  render() {
    const SNoticeGlobal = Root;
    const { Children, styles, hidden, theme, closable, onClose } = this.asProps;
    const color = resolveColor(theme);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    const advanceMode = isAdvanceMode(Children, [NoticeGlobal.Content.displayName]);

    return sstyled(styles)(
      <SNoticeGlobal
        render={FadeInOut}
        visible={!hidden}
        use:theme={useTheme}
        backgroundColor={color}
        role="alert"
      >
        {advanceMode ? (
          <Children />
        ) : (
          <NoticeGlobal.Content>
            <Children />
          </NoticeGlobal.Content>
        )}
        {closable && <NoticeGlobal.CloseIcon onClick={onClose} />}
      </SNoticeGlobal>,
    );
  }
}

function Content({ styles }) {
  const SContent = Root;
  return sstyled(styles)(<SContent render={Flex} />);
}

function CloseIcon({ styles }) {
  const SCloseIcon = Root;
  return sstyled(styles)(
    <SCloseIcon render={Box} tag={Close} interactive aria-label="Close alert" />,
  );
}

const NoticeGlobal = createComponent(NoticeGlobalRoot, {
  Content,
  CloseIcon,
});

export default NoticeGlobal;
