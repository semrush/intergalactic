import { hideScrollBarsFromScreenReadersContext } from '@semcore/base-components';
import React from 'react';

export const ListBoxContextProvider = ({ children }: React.PropsWithChildren) => (
  <hideScrollBarsFromScreenReadersContext.Provider value={true}>
    {children}
  </hideScrollBarsFromScreenReadersContext.Provider>
);
