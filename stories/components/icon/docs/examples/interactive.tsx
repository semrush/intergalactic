import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { ButtonLink } from '@semcore/ui/button';
import React from 'react';

const Demo = () => (
  <ButtonLink
    addonLeft={LinkExternalM}
    title='Go to our awesome article'
    color='icon-secondary-neutral'
  />
);

export default Demo;
