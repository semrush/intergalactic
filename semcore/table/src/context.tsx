import React from 'react';

export interface ITableCtx {
  styles: { [key: string]: any };
  use: 'primary' | 'secondary' | false;
  self: { [key: string]: any };
}

const ContextTable = React.createContext({} as ITableCtx);
export const { Provider, Consumer } = ContextTable;

export default ContextTable;
