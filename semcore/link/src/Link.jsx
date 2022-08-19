import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import reactToText from '@semcore/utils/lib/reactToText';
import logger from '@semcore/utils/lib/logger';

import style from './style/link.shadow.css';

class RootLink extends Component {
  static displayName = 'Link';
  static defaultProps = {
    noWrap: true,
  };
  static style = style;
  static enhance = [keyboardFocusEnhance()];

  render() {
    const SLink = Root;
    const {
      Children,
      styles,
      noWrap,
      addonLeft,
      addonRight,
      color,
      disabled,
      'aria-label': ariaLabel,
    } = this.asProps;
    const colorHoverText = shade(resolveColor(color), -0.12);
    const linkText = reactToText(Children);

    logger.warn(
      linkText === '' && ariaLabel === undefined,
      'aria-label is required',
      this.asProps['data-ui-name'] || Link.displayName,
    );

    return sstyled(styles)(
      <SLink
        role="link"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={!!disabled}
        render={Text}
        tag="a"
        colorHoverText={colorHoverText}
        noWrapText={noWrap}
        use:noWrap={false}
      >
        {addonLeft ? <Link.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Link.Text, Link.Addon)}
        {addonRight ? <Link.Addon tag={addonRight} /> : null}
      </SLink>,
    );
  }
}

function LinkText(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag="span" />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} />);
}

const Link = createComponent(RootLink, {
  Text: LinkText,
  Addon,
});

export default Link;
