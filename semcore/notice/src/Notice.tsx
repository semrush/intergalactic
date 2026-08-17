import { FadeInOut, Box } from '@semcore/base-components';
import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import logger from '@semcore/core/lib/utils/logger';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import CloseIconM from '@semcore/icon/Close/m';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSNotice } from './Notice.type';
import style from './style/notice.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

function isCustomTheme(theme: string) {
  return !['danger', 'warning', 'success', 'info', 'muted'].includes(theme);
}

class RootNotice extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSNotice.Component>,
  typeof RootNotice.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSNotice.DefaultProps
> {
  static displayName = 'Notice';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    cssVariableEnhance({
      variable: '--intergalactic-duration-popper',
      fallback: '200',
      // TODO: Types are incompatible. For some reason string type isn't recognized as a valid value.
      // Leave it with ts-ignore annotation.
      // @ts-ignore
      map: Number.parseInt,
      prop: 'duration',
    }),
    resolveColorEnhance(),
  ] as const;

  static defaultProps = {
    theme: 'info',
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (
      this.ref.current &&
      process.env.NODE_ENV !== 'production' &&
      !['muted', 'danger'].includes(this.props.theme ?? '')
    ) {
      const hasTitle = (node: HTMLDivElement) => {
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
    const SIcon = Box;
    const SIllustration = Box;
    const { Children, styles, hidden, theme, resolveColor, getI18nText, icon, illustration } = this.asProps;
    const color = resolveColor(theme);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    let ariaLabel: string | undefined = getI18nText(theme === 'danger' ? 'criticalNotification' : 'notification');

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
        __excludeProps={['icon', 'illustration']}
      >
        {icon !== undefined && (
          // @ts-expect-error we use theme in css-only
          <SIcon theme={useTheme}>{icon}</SIcon>
        )}
        {illustration !== undefined && (<SIllustration>{illustration}</SIllustration>)}
        <Children />
      </SNotice>,
    );
  }
}

function Label(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSNotice.Label.Component, typeof RootNotice, 'Label'>,
) {
  const { styles, theme, resolveColor } = props;
  const SLabel = Root;
  const useTheme = isCustomTheme(theme) ? 'custom' : theme;
  const color = resolveColor(theme);
  return sstyled(styles)(<SLabel render={Box} use:theme={useTheme} color={color} />);
}

function Title(
  props: Intergalactic.InternalTypings.InferComponentProps<NSNotice.Title.Component>,
) {
  const { styles } = props;
  const STitle = Root;
  return sstyled(styles)(<STitle render={Text} tag='div' size={300} fontWeight='bold' />);
}

function NoticeText(
  props: Intergalactic.InternalTypings.InferComponentProps<NSNotice.Text.Component>,
) {
  const { styles } = props;
  const SText = Root;
  return sstyled(styles)(<SText render={Text} tag='div' />);
}

function Actions(
  props: Intergalactic.InternalTypings.InferComponentProps<NSNotice.Actions.Component>,
) {
  const { styles } = props;
  const SActions = Root;
  return sstyled(styles)(<SActions render={Box} />);
}

function Content(
  props: Intergalactic.InternalTypings.InferComponentProps<NSNotice.Content.Component>,
) {
  const { styles } = props;
  const SContent = Root;
  return sstyled(styles)(<SContent render={Box} />);
}

function Close(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSNotice.Close.Component, typeof RootNotice, 'Close'>,
) {
  const { styles, getI18nText } = props;
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

/**
 * Notice
 *
 * {@link https://developer.semrush.com/intergalactic/components/notice/notice-api/|API} | {@link https://developer.semrush.com/intergalactic/components/notice/notice-code/|Examples}
 */
const Notice = createComponent<
  NSNotice.Component,
  typeof RootNotice
>(RootNotice, {
  Label,
  Title: Title,
  Text: NoticeText,
  Actions,
  Content,
  Close,
});

export default Notice;
