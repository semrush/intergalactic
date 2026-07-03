import type { NSBox } from '@semcore/base-components';

/** TODO: revise component structure */
/** @deprecated It will be removed in v18. */
export type ItemProps = NSBox.Props & {
  /**
   * Color item in hexadecimal format.
   */
  value?: string | null;
  /**
   * Shows label `A` as text color icon inside all color items
   */
  displayLabel?: boolean;
  /**
   * Property enabling the ability to remove a color item on click
   */
  editable?: boolean;
  /**
   * Shows if color item is selected
   */
  selected?: boolean;
  /**
   * Fired with color item when user clicks on the close icon
   */
  onRemove?: React.MouseEventHandler;
};
