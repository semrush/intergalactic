import React from 'react';
import { ButtonLink } from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import CheckM from '@semcore/icon/Check/m';
import CheckL from '@semcore/icon/Check/l';
import CloseM from '@semcore/icon/Close/m';

const Demo = () => {
  return (
    <Flex direction={'column'} gap={6} alignItems={'flex-start'}>
      <ButtonLink addonLeft={CheckM}>Primary ButtonLink</ButtonLink>
      <ButtonLink addonRight={CloseM} color={'text-critical'}>
        Colored primary ButtonLink
      </ButtonLink>
      <ButtonLink use={'secondary'}>
        <ButtonLink.Addon>
          <CheckM />
        </ButtonLink.Addon>
        <ButtonLink.Text>Secondary ButtonLink</ButtonLink.Text>
      </ButtonLink>
      <ButtonLink use={'secondary'} addonLeft={CheckM} disabled>
        Disabled secondary ButtonLink
      </ButtonLink>
      <ButtonLink addonLeft={CheckM} aria-label={'Icon-only button'} />
      <ButtonLink addonLeft={CheckL} size={500}>
        ButtonLink with another text size
      </ButtonLink>
    </Flex>
  );
};

export default Demo;
