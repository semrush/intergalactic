import type { UnknownProperties } from '../types/UnknownProperties';

export type StyledProps = {
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  styles?: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

/** @deprecated */
export interface IStyledProps extends StyledProps, UnknownProperties {}
/** @ts-ignore */
export { default as styled } from '@reshadow/core';
/** @ts-ignore */
export { use, css } from '@reshadow/core';
/** @ts-ignore */
export * from '@reshadow/core';

export * from './sstyled';
