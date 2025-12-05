import { hideScrollBarsFromScreenReadersContext } from '@semcore/scroll-area';
import React from 'react';

export const ListBoxContextProvider = ({ children }: React.PropsWithChildren) => (
  <hideScrollBarsFromScreenReadersContext.Provider value={true}>
    {children}
  </hideScrollBarsFromScreenReadersContext.Provider>
);
