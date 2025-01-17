import React from 'react';
import { Flex } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import { DescriptionTooltip } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';
import Link from '@semcore/link';
import { ButtonLink } from '@semcore/button';

function noop(e: React.SyntheticEvent) {
  e.preventDefault();
}

const Demo = () => (
  <>
    <Flex mb={3}>
      <Checkbox label='Option 1' />
      <DescriptionTooltip placement='right'>
        <DescriptionTooltip.Trigger
          ml={1}
          tag={ButtonLink}
          addonLeft={InfoM}
          color='icon-secondary-neutral'
          aria-label='Additional info'
        />
        <DescriptionTooltip.Popper aria-label={'Additional info about checkbox item'}>
          Place an additional information here!
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    </Flex>

    <Flex mb={3}>
      <Checkbox>
        <Checkbox.Value />
        <Checkbox.Text>
          Option 2
          <Link ml={2} href='#' onClick={noop}>
            Learn more
          </Link>
        </Checkbox.Text>
      </Checkbox>
    </Flex>
  </>
);

export default Demo;
