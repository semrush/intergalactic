import { UnknownProperties } from '..';

export type StyledProps = {
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  styles?: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

/** @deprecated */
export interface IStyledProps extends StyledProps, UnknownProperties {}
export { default as styled } from '@reshadow/core';
export { use, css } from '@reshadow/core';
export * from '@reshadow/core';

export * from './sstyled';
