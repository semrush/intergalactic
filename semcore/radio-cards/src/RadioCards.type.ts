import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';

declare namespace NSRadioCards {
  type Value = string;
  type Props = NSFlex.Props & Intergalactic.RequireAtLeastOne<{
    'aria-label'?: string;
    'aria-labelledby'?: string;
  }> & {
    value?: NSRadioCards.Value;
    onChange?: (value: NSRadioCards.Value, event?: React.SyntheticEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
  };
  type DefaultProps = {
    defaultValue: '';
  };
  type Handlers = {
    value: NSRadioCards.Value;
  };

  namespace Item {
    type Props = NSFlex.Props & {
      disabled?: boolean;
      iconAddon?: React.ReactNode;
      value: NSRadioCards.Value;
      textAddon?: string;
      description?: string;
    };

    namespace Header {
      namespace LeftAddon {
        type Component = NSFlex.Component;
      }

      namespace Text {
        type Component = NSText.Component;
      }

      namespace RightAddon {
        type Component = NSFlex.Component;
      }

      type Component = NSFlex.Component & {
        LeftAddon: LeftAddon.Component;
        Text: Text.Component;
        RightAddon: RightAddon.Component;
      };
    }

    namespace Description {
      type Component = NSText.Component;
    }

    type Component = Intergalactic.Component<'div', Props> & {
      Header: Header.Component;
      Description: Description.Component;
    };
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Item: Item.Component;
  };
}

export type { NSRadioCards };
