import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor, { opacity } from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import CloseXS from '@semcore/icon/lib/Close/xs';
import CloseXXS from '@semcore/icon/lib/Close/xxs';

import style from './style/tag.shadow.css';

function isCustomTheme(use, theme) {
  const type = {
    primary: ['invert', 'warning'],
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
    const { use, theme, size } = this.asProps;
    return { use, theme, size };
  }

  render() {
    const STag = Root;
    let {
      Children,
      styles,
      theme,
      use,
      interactive,
      disabled,
      addonLeft,
      addonRight,
    } = this.asProps;

    if (disabled) {
      interactive = false;
    }
    /* hack */
    if (use === 'primary' && theme === 'muted') {
      theme = 'asphalt';
    }

    const useTheme = getThemeName(use, theme);
    const colorText = theme ? resolveColor(theme) : '';
    const colorTag = opacity(colorText, 0.15);

    return sstyled(styles)(
      <STag
        render={Box}
        use:theme={useTheme}
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
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag="span" />);
}

function Close(props) {
  const SClose = Root;
  const { styles, use, theme, size } = props;

  return sstyled(styles)(
    <SClose
      render={Box}
      use:theme={getThemeName(use, theme)}
      tag={size === 'xl' ? CloseXS : CloseXXS}
    />,
  );
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
