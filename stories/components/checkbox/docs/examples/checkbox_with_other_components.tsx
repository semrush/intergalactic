import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import InfoM from '@semcore/ui/icon/Info/m';
import Link from '@semcore/ui/link';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import React from 'react';

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
        <DescriptionTooltip.Popper aria-label='Additional info about checkbox item'>
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
