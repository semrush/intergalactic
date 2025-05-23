import React from 'react';
import useEnhancedEffect from './use/useEnhancedEffect';
import { UnknownProperties } from '../core-types/UnknownProperties';
import register from '../register';

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
  const trimmedUid =
    String(uid).startsWith(':') && String(uid).endsWith(':') ? String(uid).slice(1, -1) : uid;

  useEnhancedEffect(() => {
    register.set<ContextType>('uid-context', context);
  }, [trimmedUid]);

  return (context.prefix ?? '') + trimmedUid;
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
