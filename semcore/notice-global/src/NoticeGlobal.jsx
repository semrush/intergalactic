import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import CloseM from '@semcore/icon/Close/m';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { FadeInOut } from '@semcore/animation';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import Button from '@semcore/button';

import style from './style/notice-global.shadow.css';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';

function isCustomTheme(theme) {
  return !['danger', 'warning', 'success', 'info', 'neutral'].includes(theme);
}

class NoticeGlobalRoot extends Component {
  static displayName = 'NoticeGlobal';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    cssVariableEnhance({
      variable: '--intergalactic-duration-popper',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
    resolveColorEnhance(),
  ];
  static defaultProps = {
    theme: 'neutral',
    i18n: localizedMessages,
    locale: 'en',
  };

  getCloseIconProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
  }

  render() {
    const SNoticeGlobal = Root;
    const {
      Children,
      styles,
      hidden,
      theme,
      closable,
      onClose,
      forcedAdvancedMode,
      resolveColor,
      getI18nText,
    } = this.asProps;
    const isAssertive = theme === 'danger' || theme === 'warning';
    const color = resolveColor(theme);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    const advancedMode =
      forcedAdvancedMode || isAdvanceMode(Children, [NoticeGlobal.Content.displayName]);

    return sstyled(styles)(
      <SNoticeGlobal
        render={FadeInOut}
        visible={!hidden}
        use:theme={useTheme}
        backgroundColor={color}
        role='region'
        aria-live={isAssertive ? 'assertive' : 'polite'}
        aria-label={getI18nText(theme === 'danger' ? 'criticalNotification' : 'notification')}
      >
        {advancedMode ? (
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

function CloseIcon({ styles, children: hasChildren, Children, getI18nText }) {
  const SCloseIcon = Root;
  return sstyled(styles)(
    <SCloseIcon
      render={Button}
      aria-label={getI18nText('close')}
      use='tertiary'
      theme='invert'
      size='m'
      addonLeft={hasChildren ? undefined : CloseM}
    >
      {hasChildren ? <Children /> : null}
    </SCloseIcon>,
  );
}
CloseIcon.enhance = [keyboardFocusEnhance()];

const NoticeGlobal = createComponent(NoticeGlobalRoot, {
  Content,
  CloseIcon,
});

export default NoticeGlobal;
