import React from 'react';
import { createComponent, Component, Root, sstyled, CORE_INSTANCE } from '@semcore/core';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import { Hint } from '@semcore/tooltip';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import logger from '@semcore/core/lib/utils/logger';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';

import style from './style/link.shadow.css';

class RootLink extends Component {
  static displayName = 'Link';
  static defaultProps = {
    noWrap: true,
  };
  static style = style;
  static enhance = [keyboardFocusEnhance(), resolveColorEnhance()];
  containerRef = React.createRef();

  state = {
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

  renderLink({ linkProps, children }) {
    const { styles } = this.asProps;
    const SLink = Root;

    return sstyled(styles)(
      <SLink render={Text} {...linkProps}>
        {children}
      </SLink>,
    );
  }

  renderLinkWithHint({ linkProps, children, hintProps }) {
    const { styles } = this.asProps;
    const SLink = Root;

    return sstyled(styles)(
      <SLink render={Hint} {...linkProps} {...hintProps}>
        {children}
      </SLink>,
    );
  }

  render() {
    const {
      styles,
      noWrap,
      color,
      resolveColor,
      disabled,
      href,
      children: hasChildren,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      Children,
      title,
      ['aria-label']: ariaLabel,
      hintPlacement,
    } = this.asProps;
    // @ts-ignore
    const Link = this[CORE_INSTANCE];

    const children = sstyled(styles)(
      <>
        {AddonLeft ? (
          <Link.Addon>
            <AddonLeft />
          </Link.Addon>
        ) : null}
        {addonTextChildren(Children, Link.Text, Link.Addon)}
        {AddonRight ? (
          <Link.Addon>
            <AddonRight />
          </Link.Addon>
        ) : null}
      </>,
    );

    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    const linkProps = {
      role: 'link',
      tabIndex: disabled ? -1 : 0,
      'use:href': disabled ? undefined : href,
      'visually-disabled': disabled,
      render: Text,
      'text-color': resolveColor(color),
      tag: 'a',
      noWrapText: noWrap,
      'use:noWrap': false,
      ref: this.containerRef,
      __excludeProps: ['disabled', 'aria-disabled'],
    };

    const hintProps = {
      title: hintContent,
      timeout: [250, 50],
      placement: hintPlacement,
      __excludeProps: [],
    };

    if (hasChildren === undefined || title) {
      return this.renderLinkWithHint({ linkProps, hintProps, children });
    }

    return this.renderLink({ linkProps, children });
  }
}

function LinkText(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag='span' />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

const Link = createComponent(RootLink, {
  Text: LinkText,
  Addon,
});

export default Link;
