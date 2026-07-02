import type { Intergalactic } from '@semcore/core';

declare namespace NSOutsideClick {
  type Props = {
    /**
     * Function called on click outside the component from excludeRefs
     * @default () => {}
     */
    onOutsideClick?: (e?: React.SyntheticEvent) => void;

    /**
     * List of refs that will not trigger `onOutsideClick` when clicked
     * @default []
     */
    excludeRefs?: Array<React.RefObject<HTMLElement>>;

    /** Root element
     * @default document
     *  */
    root?: React.RefObject<HTMLElement>;
  };

  type Component = Intergalactic.Component<Intergalactic.Tag, Props>;
}

/** @deprecated It will be removed in v18. */
export type OutsideClickProps = NSOutsideClick.Props;

export type { NSOutsideClick };
