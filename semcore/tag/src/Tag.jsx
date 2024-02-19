import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';
import CloseM from '@semcore/icon/Close/m';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/tag.shadow.css';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

const legacyThemeRecommendedMigration = {
  primary: {
    muted: 'gray-500',
    info: 'blue-500',
    success: 'green-500',
    warning: 'orange-500',
    danger: 'red-500',
  },
  secondary: {
    muted: 'gray-50',
  },
};

class RootTag extends Component {
  static displayName = 'Tag';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    uniqueIDEnhancement(),
    resolveColorEnhance(),
    keyboardFocusEnhance(),
  ];
  static defaultProps = {
    theme: 'primary',
    color: 'gray-500',
    size: 'm',
    i18n: localizedMessages,
    locale: 'en',
  };

  constructor(props) {
    super(props);

    logger.warn(
      props.use,
      `Property 'use' is deprecated, replace property to "theme='${props.use}' color='${
        legacyThemeRecommendedMigration[props.use]?.[props.theme]
      }'"`,
      props['data-ui-name'] || Tag.displayName,
    );
  }

  getCircleProps() {
    const { size } = this.asProps;
    return { size };
  }

  getCloseProps() {
    const { getI18nText, id, uid } = this.asProps;

    return { getI18nText, tagId: id || `igc-${uid}-tag`, uid };
  }

  handleKeyDown = (event) => {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        if (this.asProps.onClick) {
          event.preventDefault();
          this.asProps.onClick(event);
        }
        break;
    }
  };

  render() {
    const STag = Root;
    const {
      Children,
      styles,
      color,
      interactive,
      disabled,
      addonLeft,
      addonRight,
      resolveColor,
      id: outerId,
      uid,
      onKeyDown,
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;

    return sstyled(styles)(
      <STag
        render={Box}
        id={id}
        use:interactive={!disabled && interactive}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        tag-color={resolveColor(color)}
        onKeyDown={callAllEventHandlers(onKeyDown, this.handleKeyDown)}
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
  return sstyled(styles)(<SText render={Box} tag='span' />);
}

function Close(props) {
  const SClose = Root;
  const { styles, getI18nText, tagId, uid } = props;

  function onKeyDown(event) {
    if (props.onKeyDown) {
      return props.onKeyDown(event);
    }

    if (props.onClick && (event.code === 'Enter' || event.code === 'Space')) {
      event.preventDefault();
      props.onClick(event);
    }
  }

  return sstyled(styles)(
    <SClose
      render={Box}
      tag={CloseM}
      interactive
      id={`igc-${uid}-tag-clear`}
      aria-labelledby={`igc-${uid}-tag-clear ${tagId}`}
      aria-label={getI18nText('remove')}
      onKeyDown={onKeyDown}
    />,
  );
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

function Circle(props) {
  const SCircle = Root;
  const { styles } = props;
  return sstyled(styles)(<SCircle render={Box} tag='span' />);
}

const Tag = createComponent(RootTag, {
  Text,
  Addon,
  Close,
  Circle,
});

export default Tag;
