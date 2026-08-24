import type { NSBox, NSHint } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Icon from '@semcore/icon';
import type { NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSLink {
  type Theme = 'default' | 'light' | 'accent' | 'invert';
  type Props = NSBox.Props & Intergalactic.InternalTypings.EfficientOmit<NSText.BaseProps, 'use'> & {

    /**
     * @deprecated. Use `theme` instead.
     */
    use?: 'primary' | 'secondary';

    /**
     * Type of Link.
     *
     * Primary. The vast majority of links. Tables with URLs and keywords, metrics in the summary.
     *
     * Secondary. Links such as 'Learn more', 'Show more', secondary information, opening hints.
     *
     * Accent. Use ONLY for action links within the texts. Limits, prompts indicating what to do, and options in the controls.
     *
     * Invert. Use on dark backgrounds.
     *
     * @default 'primary'.
     */
    theme?: Theme;
    /**
   * Sets the link to the disabled state
   */
    disabled?: boolean;
    /**
   * Sets the link to the active state
   */
    active?: boolean;
    /** This flag enables highlighting of the visited link
   */
    enableVisited?: boolean;
    /** The text will not be moved to a new line
   * @default false
   */
    noWrap?: boolean;
    /** Left addon tag */
    addonLeft?: typeof Icon | React.ElementType;
    /** Right addon tag */
    addonRight?: typeof Icon | React.ElementType;
    /**
   * The position of the popper relative to the trigger that called it.
   * @default top
   */
    hintPlacement?: NSHint.Props['placement'];
    /** Flag to mark a link as external. Use it in SSR.
     * Or manually disable the external icon after the link.
     */
    isExternal?: boolean;
  };
  type State = {
    ariaLabelledByContent: string;
  };

  type DefaultProps = {
    theme: 'default';
  };

  namespace Text {
    type Props = Intergalactic.InternalTypings.EfficientOmit<NSText.BaseProps, 'use'> & {
      /**
       * @deprecated. Use `theme` on the root level.
       */
      use?: 'primary' | 'secondary';
    };

    type Component = Intergalactic.Component<'span', Props>;
  }

  namespace Addon {
    type Props = NSBox.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  type Component = Intergalactic.Component<'a', Props> & {
    Text: Text.Component;
    Addon: Addon.Component;
    ExternalIcon: typeof Icon;
  };
}

/** @deprecated It will be removed in v19. */
export type LinkProps = NSLink.Props;
/** @deprecated It will be removed in v19. */
export type LinkComponent = NSLink.Component;

export type { NSLink };
