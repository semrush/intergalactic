import SettingsM from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => (

  <Flex gap={1}>
    <Link href='/' addonRight={SettingsM} display='block'>
      Link
    </Link>
    <ButtonLink addonLeft={SettingsM}>ButtonLink</ButtonLink>
    <Link href='/' size={200}>
      Link2
    </Link>
    <ButtonLink size={200}>ButtonLink2</ButtonLink>
  </Flex>
);

export default Demo;
