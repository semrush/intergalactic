import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor, { opacity } from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import CloseM from '@semcore/icon/Close/m';

import style from './style/tag.shadow.css';

function isCustomTheme(use, theme) {
  const type = {
    primary: ['muted', 'invert', 'warning'],
    secondary: ['muted', 'invert'],
  };
  return type[use] ? !type[use].includes(theme) : true;
}

function getThemeName(use, theme) {
  return isCustomTheme(use, theme) ? 'custom' : `${use}-${theme}`;
}

class RootTag extends Component {
  static displayName = 'Tag';
  static style = style;
  static defaultProps = {
    use: 'secondary',
    theme: 'muted',
    size: 'm',
  };

  getCloseProps() {
    const { use, theme } = this.asProps;
    return { use, theme };
  }

  render() {
    const STag = Root;
    let { Children, styles, theme, use, color, interactive, disabled, addonLeft, addonRight } =
      this.asProps;

    if (disabled) {
      interactive = false;
    }

    const colorTag = theme ? opacity(resolveColor(theme), 0.5) : '';
    const colorText = color ? resolveColor(color) : resolveColor(theme);

    return sstyled(styles)(
      <STag
        render={Box}
        use:theme={getThemeName(use, theme)}
        use:interactive={interactive}
        colorText={colorText}
        colorTag={colorTag}
      >
        {addonLeft ? <Tag.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Tag.Text, Tag.Addon)}
        {addonRight ? <Tag.Addon tag={addonRight} /> : null}
      </STag>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const STagInner = 'div';
  const { styles } = props;
  return sstyled(styles)(
    <STagInner>
      <SText render={Box} tag="span" />
    </STagInner>,
  );
}

function Close(props) {
  const SClose = Root;
  const { styles, use, theme } = props;

  return sstyled(styles)(<SClose render={Box} use:theme={getThemeName(use, theme)} tag={CloseM} />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag="span" />);
}

function Circle(props) {
  const SCircle = Root;
  const { styles } = props;
  return sstyled(styles)(<SCircle render={Box} tag="span" />);
}

const Tag = createComponent(RootTag, {
  Text,
  Addon,
  Close,
  Circle,
});

export default Tag;
