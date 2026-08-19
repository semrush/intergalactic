import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSInput } from '@semcore/input';

declare namespace NSInputMask {
  type Props = NSInput.Props;
  type Ctx = {
    getInputProps: PropGetterFn;
    getValueProps: PropGetterFn;
  };

  namespace Value {
    type Props = NSInput.Value.Props & {
      /**
       * Mask for entering text
       */
      mask?: string | boolean | ((rawValue?: string) => string | RegExp[]);
      /**
       * The property for visibility of the mask
       * @default false
       */
      hideMask?: boolean;
      /**
       * This function allows you to change the input value before it is displayed on the screen.
       */
      pipe?: (
        conformedValue: string,
        config: {
          rawValue: string;
        },
      ) => string | false | { value: string; indexesOfPipedChars: number[] };
      /** Internal */
      keepCharPositions?: boolean;
      /**
       * The aliases object for the mask values. The key is the symbol used in the mask,
       * and the value is the regular expression that this symbol must match
       * @default {'9': /\d/, 'a': /[a-zA-Zа-яА-Я]/, '*': /[\da-zA-Zа-яА-Я]/}
       */
      aliases?: {
        [s: string]: RegExp;
      };
      /**
       * Event that is called when the input value fully matches the mask
       */
      onSuccess?: (value: string) => void;
      /**
       * A field that explains the mask for blind users
       * */
      title?: string;

      /** Specifies which props to pass to input element */
      includeInputProps?: string[];

      /**
       * Field for describe which symbols will use as mask
       * @default `{_: true}`
       */
      maskOnlySymbols?: Record<string, boolean>;

      /**
       * Overrids width of the input field
       */
      inputW?: string | number;

      /**
       * Aria role for input
       */
      inputRole?: string;
    };
    type DefaultProps = {
      includeInputProps: Array<string>;
      defaultValue: '';
      hideMask: false;
      keepCharPositions: false;
      aliases: {
        '9': RegExp;
        'a': RegExp;
        '*': RegExp;
      };
      maskOnlySymbols: {
        _: boolean;
      };
    };
    type Handlers = {
      value: Array<(value?: string) => string>;
    };
    type State = {
      lastConformed:
        | {
          all: string;
          userInput: string;
          maskOnly: string;
        }
        | undefined;
      maskWidth: number | undefined;
    };

    type Component = Intergalactic.Component<'input', Props>;
  }

  namespace Addon {
    type Component = NSInput.Addon.Component;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Value: Value.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type InputMaskValueProps = NSInputMask.Value.Props;
/** @deprecated It will be removed in v19. */
export type InputMaskAliases = {
  [s: string]: RegExp;
};
/** @deprecated It will be removed in v19. */
export type IInputMaskAsFn = (rawValue?: string) => string | RegExp[];

export type { NSInputMask };
