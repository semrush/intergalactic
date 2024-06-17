import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Checkbox from 'intergalactic/checkbox';
import { Hint } from 'intergalactic/tooltip';
import InfoM from 'intergalactic/icon/Info/m';
import Link from 'intergalactic/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    {[0, 1, 2].map((item) => (
      <Flex key={item}>
        <Checkbox mb={3} label={`Option ${item + 1}`} />
        <Hint
          title='Place an additional information here!'
          placement='right'
          ml={1}
          tag={InfoM}
          color='icon-secondary-neutral'
          interactive
          aria-label='Additional info'
        />
      </Flex>
    ))}

    {[3, 4, 5].map((item) => (
      <Flex key={item}>
        <Checkbox mb={3}>
          <Checkbox.Value />
          <Checkbox.Text>
            {`Option ${item + 1}`}{' '}
            <Link href='#' onClick={noop}>
              Learn more
            </Link>
          </Checkbox.Text>
        </Checkbox>
      </Flex>
    ))}
  </>
);

export default Demo;
