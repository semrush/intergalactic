import type {
  AbstractButtonAddonProps,
  AbstractButtonTextProps,
  AbstractButtonProps,
} from '../AbstractButton/AbstractButton.type';

/**
 *  Button link size
 */
export type ButtonLinkSize = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
/**
 *  Button link type
 * @default primary
 */
type Use = 'primary' | 'secondary';

export type ButtonLinkProps = AbstractButtonProps<ButtonLinkSize, Use, never>;

export type ButtonLinkTextProps = AbstractButtonTextProps<ButtonLinkSize>;

export type ButtonLinkAddonProps = AbstractButtonAddonProps<ButtonLinkSize>;
