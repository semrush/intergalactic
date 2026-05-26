import type { BoxProps } from '@semcore/base-components';
import { Box, Hint } from '@semcore/base-components';
import type { Intergalactic, IRootComponentProps } from '@semcore/core';
import { createComponent, Component, Root, sstyled, CORE_INSTANCE } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import type { NSText } from '@semcore/typography';
import { Text } from '@semcore/typography';
import React from 'react';

import type { LinkComponent, LinkProps } from './Link.types';
import style from './style/link.shadow.css';

type State = {
  ariaLabelledByContent: string;
};

class RootLink extends Component<LinkProps, typeof RootLink.enhance, never, {}, State> {
  static displayName = 'Link';

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

  getTextProps(): NSText.HintProps {
    return {
      'hint:triggerRef': this.containerRef,
    };
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
    } = this.asProps;
    // @ts-ignore
    const Link = this[CORE_INSTANCE];
    const SLink = Root;
    const SInner = Box;
    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';
    const showHint = children === undefined || title;

    const excludeProps = ['title', 'aria-disabled'];
    if (!this.asProps['use:disabled']) {
      excludeProps.push('disabled');
    }

    return sstyled(styles)(
      <>
        <SLink
          tabIndex={disabled ? -1 : 0}
          use:href={disabled ? undefined : href}
          visually-disabled={disabled}
          render={Text}
          text-color={resolveColor(color)}
          tag='a'
          ref={this.containerRef}
          __excludeProps={excludeProps}
          aria-label={showHint ? hintContent : undefined}
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
            {AddonRight
              ? (
                  <Link.Addon>
                    <AddonRight />
                  </Link.Addon>
                )
              : null}
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

const Link = createComponent<LinkComponent, typeof RootLink>(RootLink, {
  Text: LinkText,
  Addon,
});

export default Link;
