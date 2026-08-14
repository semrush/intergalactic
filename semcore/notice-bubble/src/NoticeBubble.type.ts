import type { NSPortal, NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { RefObject } from 'react';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSNoticeBubble {
  type Props = NSBox.Props & {
    /** Notice type */
    type?: 'info' | 'warning';
    /**
     * Notice display duration. Set to 0 to disable auto-close.
     */
    duration?: number;
    /**
     * Enables animation on first rendering.
     * @default false
     */
    initialAnimation?: boolean;
    /**
     * Use it for complex notices with important controls.
     * If enabled, browser focus will be locked in the notice
     * until it's closed. After close focus should return to the element
     * where it was placed before notice appear.
     *
     * @deprecated
     */
    focusLock?: boolean;
    /**
     * Notice visibility.
     */
    visible?: boolean;
    /**
     * Control under the notice children.
     * */
    action?: React.ReactNode;
    /**
     * Callback triggered by "Close" icon click.
     * */
    onClose?: (e?: React.SyntheticEvent) => void;
    /**
     * Notice content.
     * */
    children?: React.ReactNode;
    manager?: NSNoticeBubble.Manager;
    icon?: React.ReactElement;
  };
  type Item = (NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props) & {
    uid: number;
    visible: boolean;
    forwardRef: RefObject<HTMLElement>;
    onClose: () => void;
  };
  type ViewItemProps = NSNoticeBubble.Props & {
    containerNode?: HTMLElement;
    animationDuration: number;
    getI18nText: ReturnType<typeof useI18n>;
    styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> | undefined;
  };
  type Meta = {
    uid: number;
    update: (props: Info.Props | Warning.Props) => Promise<NSNoticeBubble.Meta>;
    remove: () => boolean;
    ref: RefObject<HTMLElement>;
  };
  type Manager = {
    /**
     * Creates and shows a notice.
     * */
    add: (props: NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props) => NSNoticeBubble.Meta;
    /**
     * Removes notice by uid.
     * */
    remove: (uid: number) => boolean;
    /**
     * Replace notice by uid.
     */
    replace: (uid: number, props: NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props) => void;
    /**
     * Replace last notice (if it is existing)
     */
    replaceLast: (props: NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props) => void;
    /** Add change listener */
    addListener: (fn: (items: NSNoticeBubble.Item[]) => void) => () => void;
  };

  namespace Container {
    type Props = NSBox.Props &
      NSPortal.Props & {
        /** Ref to mount bubbles in. You should use element form window.sm2.getNoticeBubbleContainer() */
        containerNode?: HTMLElement | null;
        /** Manager copy */
        manager?: NSNoticeBubble.Manager;
        /** Specifies the locale for i18n support */
        locale?: string;
      };
    type DefaultProps = {
      manager: NSNoticeBubble.Manager;
      i18n: LocalizedMessages;
      locale: 'en';
    };
    type State = {
      notices: NSNoticeBubble.Item[];
      infos: NSNoticeBubble.Item[];
      warnings: NSNoticeBubble.Item[];
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Info {
    type Props = NSNoticeBubble.Props & {
      readonly type?: 'info';
    };
  }

  namespace Warning {
    type Props = NSNoticeBubble.Props & {
      readonly type?: 'warning';
    };
  }
}

/**
 * @deprecated. Pass noticeBubbleContainer property from window.sm2.getNoticeBubbleContainer().
 */
export type NoticeBubbleContainerPortalProps = NSPortal.Props;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleContainerProps = NSNoticeBubble.Container.Props;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleContainerDefaultProps = NSNoticeBubble.Container.DefaultProps;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleViewItemProps = NSNoticeBubble.ViewItemProps;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleProps = NSNoticeBubble.Props;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleInfoProps = NSNoticeBubble.Info.Props;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleWarningProps = NSNoticeBubble.Warning.Props;
/** @deprecated It will be removed in v19. */
export type AddedNoticeMeta = NSNoticeBubble.Meta;
/** @deprecated It will be removed in v19. */
export type NoticeBubbleManagerClass = NSNoticeBubble.Manager;

export type { NSNoticeBubble };
