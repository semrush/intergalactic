import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Flex, Box } from '@semcore/flex-box';
import Close from '@semcore/icon/Close/m';
import resolveColor from '@semcore/utils/lib/color';
import { FadeInOut } from '@semcore/animation';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

import style from './style/notice-global.shadow.css';

function isCustomTheme(theme) {
  return !['danger', 'warning', 'success', 'info', 'neutral'].includes(theme);
}

class NoticeGlobalRoot extends Component {
  static displayName = 'NoticeGlobal';
  static style = style;
  static enhance = [i18nEnhance()];
  static defaultProps = {
    theme: 'neutral',
    duration: 250,
    i18n: localizedMessages,
    locale: 'en',
  };

  getCloseIconProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
  }

  render() {
    const SNoticeGlobal = Root;
    const { Children, styles, hidden, theme, closable, onClose } = this.asProps;
    const isAssertive = theme === 'danger' || theme === 'warning';
    const color = resolveColor(theme);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    const advanceMode = isAdvanceMode(Children, [NoticeGlobal.Content.displayName]);

    return sstyled(styles)(
      <SNoticeGlobal
        render={FadeInOut}
        visible={!hidden}
        use:theme={useTheme}
        backgroundColor={color}
        role="status"
        aria-live={isAssertive ? 'assertive' : 'polite'}
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

function CloseIcon({ styles, getI18nText }) {
  const SCloseIcon = Root;
  return sstyled(styles)(
    <SCloseIcon render={Box} tag={Close} interactive aria-label={getI18nText('close')} />,
  );
}

const NoticeGlobal = createComponent(NoticeGlobalRoot, {
  Content,
  CloseIcon,
});

export default NoticeGlobal;
