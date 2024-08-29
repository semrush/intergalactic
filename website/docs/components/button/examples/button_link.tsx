import React from 'react';
import { ButtonLink } from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import CheckM from 'intergalactic/icon/Check/m';
import CloseM from 'intergalactic/icon/Close/m';

const Demo = () => {
  return (
    <Flex direction={'column'} gap={6} alignItems={'flex-start'}>
      <ButtonLink addonLeft={CheckM}>Button Link primary</ButtonLink>
      <ButtonLink use={'secondary'}>
        <ButtonLink.Addon>
          <CheckM />
        </ButtonLink.Addon>
        <ButtonLink.Text>Button Link secondary</ButtonLink.Text>
      </ButtonLink>
      <ButtonLink addonRight={CloseM} color={'text-critical'}>
        Close
      </ButtonLink>

      <ButtonLink addonLeft={CheckM} aria-label={'Confirm'} />

      <ButtonLink addonLeft={CheckM} size={500}>
        Large size
      </ButtonLink>
    </Flex>
  );
};

export default Demo;
