import { UnknownProperties } from '../core-types/UnknownProperties';

export type StyledProps = {
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  styles?: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

/** @deprecated */
export interface IStyledProps extends StyledProps, UnknownProperties {}

/** @ts-ignore */
export { styled, use, css } from './reshadow-core';

export { sstyled } from './sstyled';
