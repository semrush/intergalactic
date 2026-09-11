import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
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
import type { NSTag } from './Tag.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootTag extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTag.Component>,
  typeof RootTag.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSTag.DefaultProps
> {
  static displayName = 'Tag';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement(), resolveColorEnhance()] as const;
  static defaultProps = {
    theme: 'primary',
    color: 'gray-500',
    size: 'm',
    i18n: localizedMessages,
    locale: 'en',
  } as const;

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

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
        if (this.asProps.onClick) {
          event.preventDefault();

          // TODO: Keyboard event isn't assignable to MouseEvent.
          // @ts-ignore
          this.asProps.onClick(event);
        }
        break;
    }
  };

  resolvedTheme() {
    const { theme, invert } = this.asProps;

    if (invert === true) {
      return `${theme}-invert`;
    }

    return theme;
  }

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
      theme,
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;
    const isInteractiveView = !disabled && interactive;
    const isInteractive = !disabled && interactive;

    return sstyled(styles)(
      <STag
        render={Box}
        id={id}
        use:interactive={isInteractive}
        use:interactiveView={isInteractiveView}
        use:theme={this.resolvedTheme()}
        tag-color={theme === 'primary' ? resolveColor(color) : undefined}
        onKeyDown={this.handleKeyDown}
        use:tabIndex={isInteractive ? 0 : -1}
        role={isInteractive ? 'button' : undefined}
        ref={this.tagRef}
      >
        {addonLeft ? <Tag.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Tag.Text, [Tag.Addon, TagContainer.Circle])}
        {addonRight ? <Tag.Addon tag={addonRight} /> : null}
      </STag>,
    );
  }
}

class RootTagContainer extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTag.Container.Component>,
  typeof RootTagContainer.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSTag.Container.DefaultProps
> {
  static displayName = 'TagContainer';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement(), resolveColorEnhance()] as const;
  static defaultProps = {
    color: 'gray-500',
    theme: 'primary',
  } as const;

  tagRef = React.createRef<HTMLDivElement>();

  componentWillUnmount() {
    const tagElement = this.tagRef.current;

    if (tagElement && isFocusInside(tagElement)) {
      const nextTagElement = tagElement.nextElementSibling;
      const nextParentElementSibling = tagElement.parentElement?.nextElementSibling;

      if (nextTagElement && nextTagElement instanceof HTMLElement) {
        setFocus(nextTagElement);
      } else if (nextParentElementSibling && nextParentElementSibling instanceof HTMLElement) {
        setFocus(nextParentElementSibling);
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
      invert,
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
      invert,
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
      'theme': this.resolvedTheme(),
      color,
      'id': `${id}-clear`,
      'aria-labelledby': `${id}-clear ${id}-text`,
      'aria-label': getI18nText('remove'),
      resolveColor,
    };
  }

  resolvedTheme() {
    const { theme, invert } = this.asProps;

    if (invert === true) {
      return `${theme}-invert`;
    }

    return theme;
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

class Close extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTag.Close.Component>,
  typeof Close.enhance
> {
  static displayName = 'CloseTagContainer';
  static style = style;

  static defaultProps = () => {
    return {
      theme: 'primary',
      color: 'gray-500',
      size: 'm',
      i18n: localizedMessages,
      locale: 'en',
      children: <CloseM />,
    };
  };

  static enhance = [resolveColorEnhance()] as const;

  handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const { onKeyDown, onClick } = this.asProps;

    if (onKeyDown) {
      return onKeyDown(event);
    }

    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();

      // TODO: Keyboard event isn't assignable to MouseEvent.
      // @ts-ignore
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

function TagContainerCircle(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSTag.Circle.Component, typeof RootTagContainer, 'Circle'>,
) {
  const SAddon = Box;
  const SCircle = Root;
  const { styles, color, resolveColor } = props;
  return sstyled(styles)(
    <SAddon tag-color={resolveColor(color)}>
      <SCircle render={Box} />
    </SAddon>,
  );
}

function Text(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSTag.Text.Component, typeof RootTag, 'Text'>,
) {
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

function Addon(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSTag.Addon.Component, typeof RootTagContainer, 'Addon'>,
) {
  const SAddon = Root;
  const { styles, color, resolveColor } = props;

  const tagColor = React.useMemo(() => {
    if (typeof resolveColor !== 'function') return;
    return resolveColor(color);
  }, [color, resolveColor]);

  return sstyled(styles)(<SAddon render={Box} tag='div' tag-color={tagColor} />);
}

function Circle(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSTag.Circle.Component, typeof RootTag, 'Circle'>
    & Intergalactic.InternalTypings.InferChildComponentProps<NSTag.Circle.Component, typeof RootTagContainer, 'Circle'>,
) {
  const SCircle = Root;
  const { styles, color, resolveColor } = props;
  const tagColor = React.useMemo(() => {
    if (typeof resolveColor !== 'function') return;
    return resolveColor(color);
  }, [color, resolveColor]);
  return sstyled(styles)(<SCircle render={Box} tag='span' tag-color={tagColor} />);
}

/**
 * Tag
 *
 * {@link https://developer.semrush.com/intergalactic/components/tag/tag-api/|API} | {@link https://developer.semrush.com/intergalactic/components/tag/tag-code/|Examples}
 */
const Tag = createComponent<
  NSTag.Component,
  typeof RootTag
>(RootTag, {
  Text,
  Addon,
  Circle,
});

/**
 * TagContainer
 *
 * {@link https://developer.semrush.com/intergalactic/components/tag/tag-api/|API} | {@link https://developer.semrush.com/intergalactic/components/tag/tag-code/|Examples}
 */
export const TagContainer = createComponent<
  NSTag.Container.Component,
  typeof RootTagContainer
>(RootTagContainer, {
  Tag,
  Addon,
  Close,
  Circle: TagContainerCircle,
});

export default Tag;
