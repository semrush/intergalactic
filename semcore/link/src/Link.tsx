import type { BoxProps } from '@semcore/base-components';
import { Flex, Box, Hint } from '@semcore/base-components';
import type { Intergalactic, IRootComponentProps } from '@semcore/core';
import { createComponent, Component, Root, sstyled, CORE_INSTANCE } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import type { TextProps } from '@semcore/typography';
import { Text } from '@semcore/typography';
import React from 'react';

import type { LinkProps } from './Link.types';
import style from './style/link.shadow.css';

type State = {
  ariaLabelledByContent: string;
};

class RootLink extends Component<LinkProps, typeof RootLink.enhance, never, { noWrap: boolean }, State> {
  static displayName = 'Link';
  static defaultProps = {
    noWrap: true,
  };

  static style = style;
  static enhance = [resolveColorEnhance()] as const;
  containerRef = React.createRef<HTMLElement | null>();

  state: State = {
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

  render() {
    const {
      styles,
      noWrap,
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
    } = this.asProps;
    // @ts-ignore
    const Link = this[CORE_INSTANCE];
    const SLink = Root;
    const SInner = Flex;
    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    return sstyled(styles)(
      <>
        <SLink
          role='link'
          tabIndex={disabled ? -1 : 0}
          use:href={disabled ? undefined : href}
          visually-disabled={disabled}
          render={Text}
          text-color={resolveColor(color)}
          tag='a'
          noWrapText={noWrap}
          use:noWrap={false}
          ref={this.containerRef}
          __excludeProps={['disabled', 'aria-disabled']}
          aria-label={children === undefined ? hintContent : undefined}
        >
          <SInner inline={true} alignItems='center'>
            {AddonLeft
              ? (
                  <Link.Addon>
                    <AddonLeft />
                  </Link.Addon>
                )
              : null}
            {addonTextChildren(Children, Link.Text, Link.Addon)}
            {AddonRight
              ? (
                  <Link.Addon>
                    <AddonRight />
                  </Link.Addon>
                )
              : null}
          </SInner>
        </SLink>
        {(children === undefined || title) && (
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
  return sstyled(styles)(<SText render={Text} tag='span' />);
}

function Addon(props: IRootComponentProps) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

const Link = createComponent(RootLink, {
  Text: LinkText,
  Addon,
}) as Intergalactic.Component<'a', LinkProps, {}, typeof RootLink.enhance> & {
  Text: Intergalactic.Component<'span', TextProps>;
  Addon: Intergalactic.Component<'span', BoxProps>;
};

export default Link;
