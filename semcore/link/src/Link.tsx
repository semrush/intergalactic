import { Box, Hint, ScreenReaderOnly } from '@semcore/base-components';
import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Component, Root, sstyled, CORE_INSTANCE, INHERITED_NAME } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { findAllComponents } from '@semcore/core/lib/utils/findComponent';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import LinkExternalAltM from '@semcore/icon/LinkExternalAlt/m';
import type { NSText } from '@semcore/typography';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSLink } from './Link.types';
import style from './style/link.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootLink extends Component<NSLink.Props, typeof RootLink.enhance, never, {}, NSLink.State, NSLink.DefaultProps> {
  static displayName = 'Link';

  static style = style;
  static enhance = [
    resolveColorEnhance(),
    i18nEnhance(localizedMessages),
    uniqueIDEnhancement(),
  ] as const;

  static defaultProps = {
    use: 'primary',
  } as const;

  containerRef = React.createRef<HTMLElement | null>();

  state: NSLink.State = {
    ariaLabelledByContent: '',
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      logger.warn(
        this.containerRef.current && !hasLabels(this.containerRef.current),
        `'title' or 'aria-label' or 'aria-labelledby' are required props for links without text content`,
        this.asProps['data-ui-name'] || RootLink.displayName,
      );
    }

    if (this.asProps['aria-labelledby']) {
      setTimeout(() => {
        this.setState({
          ariaLabelledByContent:
            document.getElementById(this.asProps['aria-labelledby'])?.textContent ?? '',
        });
      }, 0);
    }
  }

  getTextProps(): NSText.Props {
    const { addonLeft, addonRight, size = 300, Children } = this.asProps;
    const Component = this[CORE_INSTANCE];

    const addons = findAllComponents(Children, [Component.Addon.displayName]);
    const addonWidth = size === undefined || size < 600 ? 20 : 28;

    let addonsCount = addons.reduce((acc, addon) => {
      if (addon.props.tag?.__IS_ICON || addon.props.children?.type?.__IS_ICON || addon.props.children?.type?.[INHERITED_NAME]?.includes('Spin')) {
        acc++;
      }
      return acc;
    }, 0);

    if (addonLeft && typeof addonLeft === 'object' && '__IS_ICON' in addonLeft) {
      addonsCount++;
    }
    if (addonRight && typeof addonRight === 'object' && '__IS_ICON' in addonRight) {
      addonsCount++;
    }

    const width = this.isExternalLink()
      ? `calc(100% - ${addonWidth * addonsCount + 2 + this.externalIconSizeMap[size]}px)`
      : `calc(100% - ${addonWidth * addonsCount}px)`;

    return {
      'hint:triggerRef': this.containerRef,
      'w': width,
    };
  }

  private get externalIconSizeMap(): Record<Exclude<NSLink.Props['size'], undefined>, number> {
    // this is 0.6em for sizes
    return {
      100: 7,
      200: 8,
      300: 10,
      350: 11,
      400: 12,
      500: 14,
      600: 19,
      700: 22,
      800: 29,
    };
  }

  private isExternalLink() {
    const { children, href, isExternal } = this.asProps;

    if (isExternal !== undefined) return isExternal;

    const link = typeof children === 'string' && children.startsWith('http') ? children : href;

    if (!link?.startsWith('http')) {
      return false;
    }

    if (canUseDOM()) {
      const linkUrl = new URL(link, window.location.origin);

      return linkUrl.host !== window.location.host;
    }

    return false;
  }

  render() {
    const {
      styles,
      color,
      resolveColor,
      disabled,
      href,
      children,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      Children,
      title,
      'aria-label': ariaLabel,
      hintPlacement,
      uid,
      getI18nText,
      size = 300,
    } = this.asProps;

    const Link = this[CORE_INSTANCE];
    const SLink = Root;
    const SInner = Box;
    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';
    const showHint = children === undefined || title;

    const isExternal = this.isExternalLink();

    const excludeProps = ['title', 'aria-disabled'];
    if (!this.asProps['use:disabled']) {
      excludeProps.push('disabled');
    }

    const describedByExternalId = `igc-${uid}-external-link-describedby`;

    return sstyled(styles)(
      <>
        <SLink
          tabIndex={disabled ? -1 : 0}
          use:href={disabled ? undefined : href}
          visually-disabled={disabled}
          render={Text}
          text-color={resolveColor(color)}
          tag='a'
          target={isExternal ? '_blank' : undefined}
          ref={this.containerRef}
          __excludeProps={excludeProps}
          aria-label={showHint ? hintContent : undefined}
          isExternal={isExternal}
          aria-describedby={isExternal ? describedByExternalId : undefined}
        >
          <SInner
            tag='span'
            data-ui-name={`${this.asProps['data-ui-name']}.InnerWrapper`}
          >
            {AddonLeft
              ? (
                  <Link.Addon>
                    <AddonLeft />
                  </Link.Addon>
                )
              : null}
            {addonTextChildren(Children, Link.Text, Link.Addon)}
            {(isExternal && Children.origin && (typeof Children.origin === 'string' ? !Children.origin.startsWith('http') : true)) && (
              <LinkExternalAltM width={this.externalIconSizeMap[size]} height={this.externalIconSizeMap[size]} ml='2px' />
            )}
            {AddonRight
              ? (
                  <Link.Addon>
                    <AddonRight />
                  </Link.Addon>
                )
              : null}
            {isExternal && (
              <ScreenReaderOnly aria-hidden={true} id={describedByExternalId}>
                {getI18nText('Link.external:aria-describedby')}
              </ScreenReaderOnly>
            )}
          </SInner>
        </SLink>
        {showHint && (
          <Hint
            triggerRef={this.containerRef}
            timeout={[250, 50]}
            placement={hintPlacement}
          >
            {hintContent}
          </Hint>
        )}
      </>,
    );
  }
}

function LinkText(props: IRootComponentProps) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Text} />);
}

function Addon(props: IRootComponentProps) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

/**
 * Link
 *
 * {@link https://developer.semrush.com/intergalactic/components/link/link-api/|API} | {@link https://developer.semrush.com/intergalactic/components/link/link-code/|Examples}
 */
const Link = createComponent<NSLink.Component, typeof RootLink>(RootLink, {
  Text: LinkText,
  Addon,
});

export default Link;
