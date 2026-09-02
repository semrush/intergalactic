import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSRadioCards {
  type Value = string;
  type Props = NSFlex.Props & Intergalactic.RequireAtLeastOne<{
    /** Accessible name for the radio group. */
    'aria-label'?: string;
    /** References an element that labels the radio group. */
    'aria-labelledby'?: string;
  }> & {
    /** Radio cards group name. */
    name: string;
    /** Default selected radio card value. */
    defaultValue?: NSRadioCards.Value;
    /** Currently selected radio card value. */
    value?: NSRadioCards.Value;
    /** Called when the selected radio card changes. */
    onChange?: (value: NSRadioCards.Value, event?: React.SyntheticEvent<HTMLInputElement>) => void;
    /** Disables the entire radio group and all radio cards. */
    disabled?: boolean;
  };
  type DefaultProps = {
    defaultValue: NSRadioCards.Value;
  };
  type Handlers = {
    value: NSRadioCards.Value;
  };

  namespace Item {
    type Props = NSFlex.Props & {
      /** Disables radio card. */
      disabled?: boolean;
      /** Optional icon displayed before the content. */
      iconAddon?: React.ReactNode;
      /** Optional text displayed in the header. */
      text?: string;
      /** Unique value associated with the radio card. */
      value: NSRadioCards.Value;
      /** Additional text displayed in the header. */
      textAddon?: string;
      /** Description displayed below the header. */
      description?: string;
      /** Shows a dot indicator with the specified accessible label. */
      dot?: string;
      /** Shows a skeleton insted of text addon. */
      loading?: boolean;
    };

    type Component = Intergalactic.Component<'button', Props>;
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Item: Item.Component;
  };
}

export type { NSRadioCards };
