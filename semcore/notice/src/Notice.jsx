import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import CloseIconM from '@semcore/icon/Close/m';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { FadeInOut } from '@semcore/animation';
import logger from '@semcore/core/lib/utils/logger';
import NoticeGlobal from '@semcore/notice-global';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import { Text } from '@semcore/typography';

import style from './style/notice.shadow.css';

function isCustomTheme(theme) {
  return !['danger', 'warning', 'success', 'info', 'muted'].includes(theme);
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
    resolveColorEnhance(),
  ];
  static defaultProps = {
    theme: 'info',
    i18n: localizedMessages,
    locale: 'en',
  };

  ref = React.createRef();

  componentDidMount() {
    if (
      this.ref.current &&
      process.env.NODE_ENV !== 'production' &&
      !['muted', 'danger'].includes(this.props.theme)
    ) {
      const hasTitle = (node) => {
        if (node.hasAttribute('aria-label')) return true;
        if (node.hasAttribute('aria-labelledby')) return true;
        if (node.hasAttribute('title')) return true;

        return false;
      };

      logger.warn(
        !hasTitle(this.ref.current),
        `Provide unique 'title' or 'aria-label' or 'aria-labelledby' to help identify the type and importance of notification`,
        this.props['data-ui-name'] || RootNotice.displayName,
      );
    }
  }

  getLabelProps() {
    const { theme, resolveColor } = this.asProps;

    return { theme, resolveColor };
  }

  getCloseIconProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
  }

  getCloseProps() {
    const { getI18nText } = this.asProps;

    return { getI18nText };
  }

  render() {
    const SNotice = Root;
    const { Children, styles, hidden, theme, use, resolveColor, getI18nText } = this.asProps;
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

    let ariaLabel = getI18nText(theme === 'danger' ? 'criticalNotification' : 'notification');

    if (theme === 'muted') {
      ariaLabel = undefined;
    }

    const role = theme === 'muted' ? undefined : 'region';

    return sstyled(styles)(
      <SNotice
        render={FadeInOut}
        visible={!hidden}
        use:theme={useTheme}
        backgroundColor={color}
        role={role}
        aria-label={ariaLabel}
        ref={this.ref}
      >
        <Children />
      </SNotice>,
    );
  }
}

function Label({ styles, theme, resolveColor }) {
  const SLabel = Root;
  const useTheme = isCustomTheme(theme) ? 'custom' : theme;
  const color = resolveColor(theme);
  return sstyled(styles)(<SLabel render={Box} use:theme={useTheme} color={color} />);
}

function Title({ styles }) {
  const STitle = Root;
  return sstyled(styles)(<STitle render={Text} tag='div' size={300} fontWeight={'bold'} />);
}

function NoticeText({ styles }) {
  const SText = Root;
  return sstyled(styles)(<SText render={Text} tag='div' />);
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
    <SCloseIcon render={Box} tag={CloseIconM} interactive aria-label={getI18nText('close')} />,
  );
}

function Close({ styles, getI18nText }) {
  const SCloseIcon = Root;
  return sstyled(styles)(
    <SCloseIcon
      render={Button}
      addonLeft={CloseIconM}
      use='tertiary'
      theme='muted'
      aria-label={getI18nText('close')}
    />,
  );
}

const Notice = createComponent(RootNotice, {
  Label,
  Title: Title,
  Text: NoticeText,
  Actions,
  Content,
  CloseIcon,
  Close,
});

export default Notice;
