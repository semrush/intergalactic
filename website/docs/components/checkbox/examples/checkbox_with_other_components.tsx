import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Checkbox from 'intergalactic/checkbox';
import { DescriptionTooltip } from 'intergalactic/tooltip';
import InfoM from 'intergalactic/icon/Info/m';
import Link from 'intergalactic/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    <Flex>
      <Checkbox mb={3} label='Option 1' />
      <DescriptionTooltip placement='right'>
        <DescriptionTooltip.Trigger
          ml={1}
          tag={InfoM}
          color='icon-secondary-neutral'
          interactive
          aria-label='Additional info'
        />
        <DescriptionTooltip.Popper aria-label={'Additional info about checkbox item'}>
          Place an additional information here!
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    </Flex>

    <Flex>
      <Checkbox mb={3}>
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
