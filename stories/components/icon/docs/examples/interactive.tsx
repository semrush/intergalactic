import LinkExternalM from '@semcore/ui/icon/LinkExternal/m';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => (
  <Hint
    tag={LinkExternalM}
    interactive
    title='Go to our awesome article'
    color='icon-secondary-neutral'
  />
);

export default Demo;
