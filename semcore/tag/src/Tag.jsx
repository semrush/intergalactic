import { Box } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';
import { setFocus } from '@semcore/core/lib/utils/focus-lock/setFocus';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import CloseM from '@semcore/icon/Close/m';
import { Text as TypographyText } from '@semcore/typography';
import React from 'react';

import style from './style/tag.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootTag extends Component {
  static displayName = 'Tag';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement(), resolveColorEnhance()];
  static defaultProps = {
    theme: 'primary',
    color: 'gray-500',
    size: 'm',
    i18n: localizedMessages,
    locale: 'en',
  };

  tagRef = React.createRef();

  getCircleProps() {
    const { size, color, resolveColor } = this.asProps;
    return { size, color, resolveColor };
  }

  getTextProps() {
    const id = this.asProps.id || `igc-${this.asProps.uid}-tag`;

    return {
      tabIndex: -1,
      id: `${id}-text`,
      role: undefined,
      tagRef: this.tagRef,
    };
  }

  handleKeyDown = (event) => {
    switch (event.key) {
      case ' ':
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
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;
    const isInteractiveView = !disabled && interactive;
    const isInteractive = !disabled && interactive;

    return sstyled(styles)(
      <>
        <STag
          render={Box}
          id={id}
          use:interactive={isInteractive}
          use:interactiveView={isInteractiveView}
          tag-color={resolveColor(color)}
          onKeyDown={this.handleKeyDown}
          use:tabIndex={isInteractive ? 0 : -1}
          role={isInteractive ? 'button' : undefined}
          ref={this.tagRef}
        >
          {addonLeft ? <Tag.Addon tag={addonLeft} /> : null}
          {addonTextChildren(Children, Tag.Text, [Tag.Addon, TagContainer.Circle])}
          {addonRight ? <Tag.Addon tag={addonRight} /> : null}
        </STag>
      </>,
    );
  }
}

class RootTagContainer extends Component {
  static displayName = 'TagContainer';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement(), resolveColorEnhance()];
  static defaultProps = {
    color: 'gray-500',
    theme: 'primary',
  };

  tagRef = React.createRef();

  componentWillUnmount() {
    const tagElement = this.tagRef.current;

    if (isFocusInside(tagElement)) {
      const nextTagElement = tagElement.nextElementSibling;
      if (nextTagElement) {
        setFocus(nextTagElement);
      } else {
        setFocus(tagElement.parentElement?.nextElementSibling);
      }
    }
  }

  getTagProps() {
    const {
      size,
      theme,
      color,
      disabled,
      uid,
      id: outerId,
      interactive,
      resolveColor,
      addonLeft,
      addonRight,
      active,
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;

    return {
      id: `${id}-text`,
      disabled,
      size,
      theme,
      color,
      tag: interactive ? 'button' : undefined,
      interactive,
      resolveColor,
      addonLeft,
      addonRight,
      active,
    };
  }

  getCircleProps() {
    const { color, resolveColor, size } = this.asProps;
    return { color, resolveColor, size };
  }

  getAddonProps() {
    const { color, resolveColor } = this.asProps;

    return { color, resolveColor };
  }

  getCloseProps() {
    const {
      size,
      theme,
      color,
      disabled,
      uid,
      id: outerId,
      getI18nText,
      resolveColor,
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;

    return {
      disabled,
      size,
      theme,
      color,
      'id': `${id}-clear`,
      'aria-labelledby': `${id}-clear ${id}-text`,
      'aria-label': getI18nText('remove'),
      resolveColor,
    };
  }

  render() {
    const STagContainer = Root;
    const { styles, Children, forcedAdvancedMode } = this.asProps;
    const advancedMode =
      forcedAdvancedMode ||
      isAdvanceMode(
        Children,
        [
          'InputTags.' + Tag.Text.displayName,
          'InputTags.' + Tag.Addon.displayName,
          'InputTags.' + Tag.Circle.displayName,
          TagContainer.Tag.displayName,
          TagContainer.Addon.displayName,
          TagContainer.Close.displayName,
          TagContainer.Circle.displayName,
        ],
        true,
      );

    return sstyled(styles)(
      <STagContainer render={Box} ref={this.tagRef}>
        {advancedMode
          ? (
              <Children />
            )
          : (
              <TagContainer.Tag>
                <Children />
              </TagContainer.Tag>
            )}
      </STagContainer>,
    );
  }
}

class RootCloseTagContainer extends Component {
  static displayName = 'CloseTagContainer';
  static style = style;

  static defaultProps = () => {
    return {
      theme: 'primary',
      color: 'gray-500',
      size: 'm',
      i18n: localizedMessages,
      locale: 'en',
      children: <CloseTagContainer.Close />,
    };
  };

  static enhance = [resolveColorEnhance()];

  handleKeyDown = (event) => {
    const { onKeyDown, onClick } = this.asProps;

    if (onKeyDown) {
      return onKeyDown(event);
    }

    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  render() {
    const STagContainerClose = Root;
    const { Children, styles, color, resolveColor } = this.asProps;

    return sstyled(styles)(
      <STagContainerClose
        render={Box}
        tag='button'
        type='button'
        interactive={true}
        interactiveView={true}
        tag-color={resolveColor(color)}
        onKeyDown={this.handleKeyDown}
      >
        <Children />
      </STagContainerClose>,
    );
  }
}

function TagContainerCircle(props) {
  const SAddon = Box;
  const SCircle = Root;
  const { styles, color, resolveColor } = props;
  return sstyled(styles)(
    <SAddon tag-color={resolveColor(color)}>
      <SCircle render={Box} />
    </SAddon>,
  );
}

function Text(props) {
  const SText = Root;
  const { styles, tagRef } = props;

  return sstyled(styles)(
    <>
      <SText
        render={TypographyText}
        hint:triggerRef={tagRef}
      />
    </>,
  );
}

function Addon(props) {
  const SAddon = Root;
  const { styles, color, resolveColor } = props;

  const tagColor = React.useMemo(() => {
    if (typeof resolveColor !== 'function') return;
    return resolveColor(color);
  }, [color, resolveColor]);

  return sstyled(styles)(<SAddon render={Box} tag='div' tag-color={tagColor} />);
}

function Circle(props) {
  const SCircle = Root;
  const { styles, color, resolveColor } = props;
  const tagColor = React.useMemo(() => {
    if (typeof resolveColor !== 'function') return;
    return resolveColor(color);
  }, [color, resolveColor]);
  return sstyled(styles)(<SCircle render={Box} tag='span' tag-color={tagColor} />);
}

const Tag = createComponent(RootTag, {
  Text,
  Addon,
  Circle,
});

const CloseTagContainer = createComponent(RootCloseTagContainer, {
  Close: CloseM,
});

export const TagContainer = createComponent(RootTagContainer, {
  Tag,
  Addon,
  Close: CloseTagContainer,
  Circle: TagContainerCircle,
});

export default Tag;
