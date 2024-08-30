import React from 'react';
import { ButtonLink } from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import CheckM from 'intergalactic/icon/Check/m';
import CloseM from 'intergalactic/icon/Close/m';

const Demo = () => {
  return (
    <Flex direction={'column'} gap={6} alignItems={'flex-start'}>
      <ButtonLink addonLeft={CheckM}>Primary Button.Link</ButtonLink>
      <ButtonLink addonLeft={CheckM} color={'text-primary'}>
        Colored primary Button.Link
      </ButtonLink>
      <ButtonLink addonRight={CloseM} color={'text-critical'}>
        Colored primary Button.Link
      </ButtonLink>
      <ButtonLink use={'secondary'}>
        <ButtonLink.Addon>
          <CheckM />
        </ButtonLink.Addon>
        <ButtonLink.Text>Secondary Button.Link</ButtonLink.Text>
      </ButtonLink>

      <ButtonLink addonLeft={CheckM} aria-label={'Icon-only button'} />

      <ButtonLink addonLeft={CheckM} size={500}>
        Button.Link with other text size
      </ButtonLink>
    </Flex>
  );
};

export default Demo;
