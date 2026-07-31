import type { NSScrollArea } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSInput } from '@semcore/input';
import type { NSTag } from '@semcore/tag';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSInputTags {
    type Size = 'l' | 'm';
    type Props = Omit<NSInput.Props, 'size'> &
      NSScrollArea.Props & {
        /**
         * Component size
         * @default m
         */
        size?: NSInputTags.Size;
        /** Event is called when tags need to be added */
        onAppend?: (values: string[], event: React.KeyboardEvent | React.ClipboardEvent) => void;
        /** Event is called when tags need to be removed  */
        onRemove?: (event: React.KeyboardEvent | React.MouseEvent) => void;
        /** List delimiter of tags. Don't forget to add 'Enter' and 'Tab' to hande corresponding hotkeys.
         * @default [',', ';', '|', 'Enter', 'Tab']
         * */
        delimiters?: string[];
        /** Specifies the locale for i18n support */
        locale?: string;
      };
    type DefaultProps = {
      size: 'm';
      delimiters: NSInputTags.Props['delimiters'];
      i18n: LocalizedMessages;
      locale: 'en';
    };
    type Ctx = {
      getValueProps: PropGetterFn;
      getTagProps: PropGetterFn;
    };

    namespace Value {
        type Props = NSInput.Value.Props;

        type Component = NSInput.Value.Component;
    }

    namespace TagsContainer {
        type Component = Intergalactic.Component<'ul'>;
    }

    namespace Tag {
        type Props = NSTag.Props & {
          /** Property enabling the ability to remove a tag on click */
          editable?: boolean;
        };

        namespace Text {
            type Props = NSTag.Props;
            type Ctx = NSTag.Ctx;

            namespace Content {
                type Props = NSTag.Text.Props;

                type Component = Intergalactic.Component<'div', Props>;
            }

            type Component = Intergalactic.Component<'div', Props, Ctx> & {
              Content: Content.Component;
            };
        }

        namespace Close {
            type Component = NSTag.Close.Component;
        }

        namespace Addon {
            type Component = NSTag.Addon.Component;
        }

        namespace Circle {
            type Component = NSTag.Circle.Component;
        }

        type Component = Intergalactic.Component<'div', Props> & {
          Text: Text.Component;
          Close: Close.Component;
          Addon: Addon.Component;
          Circle: Circle.Component;
        };
    }

    type Component = Intergalactic.Component<'div', Props, Ctx> & {
      Value: Value.Component;
      TagsContainer: TagsContainer.Component;
      Tag: Tag.Component;
    };
}

/** @deprecated It will be removed in v19. */
export type InputTagsSize = NSInputTags.Size;
/** @deprecated It will be removed in v19. */
export type InputTagsProps = NSInputTags.Props;
/** @deprecated It will be removed in v19. */
export type InputTagsDefaultProps = NSInput.DefaultProps;
/** @deprecated It will be removed in v19. */
export type InputTagsContext = NSInputTags.Ctx;
/** @deprecated It will be removed in v19. */
export type InputTagsTagProps = NSInputTags.Tag.Props;
/** @deprecated It will be removed in v19. */
export type InputTagsComponent = NSInputTags.Component;
/** @deprecated It will be removed in v19. */
export type InputTagsValueProps = NSInputTags.Value.Props;

export type { NSInputTags };
