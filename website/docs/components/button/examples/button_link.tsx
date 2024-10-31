import React from 'react';
import { ButtonLink } from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import CheckM from 'intergalactic/icon/Check/m';
import CheckL from 'intergalactic/icon/Check/l';
import CloseM from 'intergalactic/icon/Close/m';

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
