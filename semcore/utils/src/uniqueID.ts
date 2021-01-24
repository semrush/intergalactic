import { useState } from 'react';
import { register } from '@semcore/core';
import useEnhancedEffect from './use/useEnhancedEffect';

type ContextType = {
  prefix?: string;
  value: number;
};

export interface IUniqueIDProps {
  /* Unique ID */
  uid?: string;
}

const createSource = (prefix = 'ui-kit-'): ContextType => ({ value: 1, prefix });

export const useUID = (prefix?: string): string => {
  const context = register.get<ContextType>('uid-context', createSource(prefix));
  const [uid] = useState<number>(context.value++);

  useEnhancedEffect(() => {
    register.set<ContextType>('uid-context', context);
  }, [uid]);

  return context.prefix + uid;
};

export default (prefix?: string) => {
  return (props) => {
    const uid = useUID(prefix);
    return {
      uid,
      ...props,
    };
  };
};
