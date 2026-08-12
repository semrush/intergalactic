import type { NSAnimation, NSBox } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSInlineEdit {
  type Props = NSBox.Props & {
    /**
   * Determines which children should be displayed
   */
    editable?: boolean;
    /** Callback for editable states changes */
    onEditableChange?: (editable: boolean, event?: React.SyntheticEvent) => void;
    /**
   * Default value if `editable` property is not provided
   * @default false
   */
    defaultEditable?: boolean;
    /**
   * Fired when user clicks on view children, expects `editable` property be switched to `true` value.
   * Note: there not pair callback that expects switch to edit mode, you should be handled by yourself
   */
    onEdit?: () => void;
    /** Specifies the locale for i18n support */
    locale?: string;
  };
  type DefaultProps = {
    defaultEditable: false;
    i18n: LocalizedMessages;
    locale: 'en';
  };
  type Ctx = {
    getViewProps: PropGetterFn;
    getEditProps: PropGetterFn;
  };
  type Handlers = {
    editable: null;
  };

  namespace View {
    type Props = NSBox.Props & NSAnimation.FadeInOut.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Edit {
    type Props = NSBox.Props & NSAnimation.FadeInOut.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    View: View.Component;
    Edit: Edit.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type InlineEditProps = NSInlineEdit.Props;
/** @deprecated It will be removed in v19. */
export type InlineEditViewProps = NSInlineEdit.View.Props;
/** @deprecated It will be removed in v19. */
export type InlineEditEditProps = NSInlineEdit.Edit.Props;

export type { NSInlineEdit };
