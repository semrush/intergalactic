import React from 'react';
// @ts-ignore
import { UnknownProperties, register } from '@semcore/core';
import useEnhancedEffect from './use/useEnhancedEffect';

type ContextType = {
  prefix?: string;
  value: number;
};

/** @deprecated */
export interface IUniqueIDProps extends UniqueIDProps, UnknownProperties {}
export type UniqueIDProps = {
  /* Unique ID */
  uid?: string;
};

const createSource = (prefix = 'ui-kit-'): ContextType => ({ value: 1, prefix });

export const useUID = (prefix?: string): string => {
  const context = register.get<ContextType>('uid-context', createSource(prefix));
  const [uid] = React.useId ? [React.useId()] : React.useState<number>(context.value++);

  useEnhancedEffect(() => {
    register.set<ContextType>('uid-context', context);
  }, [uid]);

  return (context.prefix ?? '') + uid;
};

export default (prefix?: string) => {
  return (props: any): { uid: ReturnType<typeof useUID> } => {
    const uid = useUID(prefix);
    return {
      uid,
      ...props,
    };
  };
};
