import type { UnknownProperties } from '../core-types/UnknownProperties';

export type StyledProps = {
  styles?: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

/** @deprecated */
export interface IStyledProps extends StyledProps, UnknownProperties {}

/** @ts-ignore */
export { styled, use, css } from './reshadow-core';

export { sstyled } from './sstyled';
