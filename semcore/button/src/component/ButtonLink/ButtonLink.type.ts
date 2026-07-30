import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { LinkProps } from '@semcore/link';
import type { NSText } from '@semcore/typography';

import type { NSButton } from '../Button/Button.type';

declare namespace NSButtonLink {
  type Props = Intergalactic.InternalTypings.EfficientOmit<LinkProps, 'enableVisited'> & {
  /**
   *  Button link type
   * @default primary
   */
    use?: 'primary' | 'secondary';
  };
  type DefaultProps = {
    use: 'primary';
    size: 200;
  };

  namespace Text {
    type Props = NSText.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  namespace Addon {
    type Props = BoxProps;

    type Component = Intergalactic.Component<'span', Props>;
  }

  type Component = Intergalactic.Component<'button', Props, NSButton.Ctx> & {
    Text: Text.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type ButtonLinkProps = NSButtonLink.Props;
/** @deprecated It will be removed in v19. */
export type ButtonLinkDefaultProps = NSButtonLink.DefaultProps;
/** @deprecated It will be removed in v19. */
export type ButtonLinkTextProps = NSButtonLink.Text.Props;
/** @deprecated It will be removed in v19. */
export type ButtonLinkAddonProps = NSButtonLink.Addon.Props;
/** @deprecated It will be removed in v19. */
export type ButtonLinkComponent = NSButtonLink.Component;

export type { NSButtonLink };
