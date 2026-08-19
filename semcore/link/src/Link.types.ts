import type { NSBox, NSHint } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Icon from '@semcore/icon';
import type { NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSLink {
  type Props = NSBox.Props & NSText.BaseProps & {
  /**
   * CSS property of the display link (inline|inline-block)
   * @default false
   * @deprecated. You should use default inline-flex for all cases.
   */
    inline?: boolean;
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
  };
  type State = {
    ariaLabelledByContent: string;
  };

  namespace Text {
    type Props = NSText.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  namespace Addon {
    type Props = NSBox.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  type Component = Intergalactic.Component<'a', Props> & {
    Text: Text.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type LinkProps = NSLink.Props;
/** @deprecated It will be removed in v19. */
export type LinkComponent = NSLink.Component;

export type { NSLink };
