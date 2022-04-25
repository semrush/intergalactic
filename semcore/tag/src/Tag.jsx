import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor, { opacity } from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';
import CloseM from '@semcore/icon/Close/m';

import style from './style/tag.shadow.css';

function getPrimaryColors(color) {
  const TEXT_BG_PRIMARY_MAP = {
    'gray-500': 'gray-100',
    'blue-500': 'blue-100',
    'green-500': 'green-100',
    'salad-500': 'salad-100',
    'orange-500': 'orange-100',
    'yellow-500': 'yellow-100',
    'red-500': 'red-100',
    'pink-500': 'pink-100',
    'violet-500': 'violet-100',
  };

  return {
    colorBg: opacity(resolveColor(TEXT_BG_PRIMARY_MAP[color]), 0.5),
    colorBgHover: resolveColor(TEXT_BG_PRIMARY_MAP[color]),
    colorText: resolveColor(color),
  };
}

function getSecondaryColors(color) {
  const TEXT_BG_HOVER_SECONDARY_MAP = {
    'gray-500': 'gray-50',
    'blue-500': 'blue-50',
    'green-500': 'green-50',
    'salad-500': 'salad-50',
    'orange-500': 'orange-50',
    'yellow-500': 'yellow-50',
    'red-500': 'red-50',
    'pink-500': 'pink-50',
    'violet-500': 'violet-50',
  };
  const TEXT_BORDER_SECONDARY_MAP = {
    'gray-500': 'gray-200',
    'blue-500': 'blue-200',
    'green-500': 'green-200',
    'salad-500': 'salad-200',
    'orange-500': 'orange-200',
    'yellow-500': 'yellow-200',
    'red-500': 'red-200',
    'pink-500': 'pink-200',
    'violet-500': 'violet-200',
  };
  return {
    colorBg: resolveColor('white'),
    colorBgHover: resolveColor(TEXT_BG_HOVER_SECONDARY_MAP[color]),
    colorText: resolveColor(color),
    colorBorder: resolveColor(TEXT_BORDER_SECONDARY_MAP[color]),
  };
}

class RootTag extends Component {
  static displayName = 'Tag';
  static style = style;
  static defaultProps = {
    theme: 'secondary',
    color: 'gray-500',
    size: 'm',
  };

  constructor(props) {
    super(props);

    logger.warn(
      props.use,
      `Property 'use' is deprecated, replace property to "theme='${props.use}-${props.theme}'"`,
      props['data-ui-name'] || Tag.displayName,
    );
  }

  getCircleProps() {
    const { size } = this.asProps;
    return { size };
  }

  render() {
    const STag = Root;
    const { Children, styles, theme, color, interactive, disabled, addonLeft, addonRight } =
      this.asProps;

    let colors = {};
    if (theme === 'primary') {
      colors = getPrimaryColors(color);
    }
    if (theme === 'secondary') {
      colors = getSecondaryColors(color);
    }

    return sstyled(styles)(
      <STag
        render={Box}
        use:interactive={!disabled && interactive}
        colorBg={colors.colorBg}
        colorBgHover={colors.colorBgHover}
        colorText={colors.colorText}
        colorBorder={colors.colorBorder}
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
  const { styles } = props;

  return sstyled(styles)(<SClose render={Box} tag={CloseM} interactive />);
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
