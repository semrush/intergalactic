import InfoM from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import Link from '@semcore/ui/link';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import React from 'react';

function noop(e: React.SyntheticEvent) {
  e.preventDefault();
}

const Demo = () => (
  <>
    <Flex mb={3}>
      <Checkbox>
        <Checkbox.Value />
        <Checkbox.Text size={200} display='flex'>
          Option 1
          <DescriptionTooltip placement='right'>
            <DescriptionTooltip.Trigger
              ml={1}
              mt='-2px'
              tag={ButtonLink}
              addonLeft={InfoM}
              color='icon-secondary-neutral'
              aria-label='Additional info'
            />
            <DescriptionTooltip.Popper aria-label='Additional info about checkbox item'>
              Place an additional information here!
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>
        </Checkbox.Text>
      </Checkbox>
    </Flex>

    <Flex mb={3}>
      <Checkbox>
        <Checkbox.Value />
        <Checkbox.Text size={200}>
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
