import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Close from '@semcore/icon/Close/m';
import resolveColor from '@semcore/utils/lib/color';
import { FadeInOut } from '@semcore/animation';
import logger from '@semcore/utils/lib/logger';
import NoticeGlobal from '@semcore/notice-global';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';

import style from './style/notice.shadow.css';

function isCustomTheme(theme) {
  return !['danger', 'warning', 'success', 'info'].includes(theme);
}

class RootNotice extends Component {
  static displayName = 'Notice';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    cssVariableEnhance({
      variable: '--intergalactic-duration-popper',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
  ];
  static defaultProps = {
    theme: 'info',
    i18n: localizedMessages,
    locale: 'en',
  };

  getLabelProps() {
    const { theme } = this.asProps;

    return { theme };
  }

  getCloseIconProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
  }

  render() {
    const SNotice = Root;
    const { Children, styles, hidden, theme, use } = this.asProps;
    const isAssertive = theme === 'danger' || theme === 'warning';
    const color = resolveColor(theme);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    if (use === 'primary') {
      logger.warn(
        true,
        `Deprecated property-value pair "use=primary", use component <NoticeGlobal/> instead`,
        RootNotice.displayName,
      );
      return <NoticeGlobal {...this.asProps} />;
    }

    return sstyled(styles)(
      <SNotice
        render={FadeInOut}
        visible={!hidden}
        use:theme={useTheme}
        backgroundColor={color}
        role='status'
        aria-live={isAssertive ? 'assertive' : 'polite'}
      >
        <Children />
      </SNotice>,
    );
  }
}

function Label({ styles, theme }) {
  const SLabel = Root;
  const useTheme = isCustomTheme(theme) ? 'custom' : theme;
  const color = resolveColor(theme);
  return sstyled(styles)(<SLabel render={Box} use:theme={useTheme} color={color} />);
}

function Actions({ styles }) {
  const SActions = Root;
  return sstyled(styles)(<SActions render={Box} />);
}

function Content({ styles }) {
  const SContent = Root;
  return sstyled(styles)(<SContent render={Box} />);
}

function CloseIcon({ styles, getI18nText }) {
  const SCloseIcon = Root;
  return sstyled(styles)(
    <SCloseIcon render={Box} tag={Close} interactive aria-label={getI18nText('close')} />,
  );
}

export default createComponent(RootNotice, {
  Label,
  Actions,
  Content,
  CloseIcon,
});
