import React from 'react';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Hint } from '@semcore/tooltip';

const Demo = () => (
  <Hint
    tag={LinkExternalM}
    interactive
    title='Go to our awesome article'
    color='icon-secondary-neutral'
  />
);

export default Demo;
