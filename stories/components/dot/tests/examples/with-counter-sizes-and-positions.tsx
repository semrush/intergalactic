import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Dot from '@semcore/ui/dot';
import type { DotProps } from '@semcore/ui/dot';
import Link from '@semcore/ui/link';
import Pills from '@semcore/ui/pills';
import React from 'react';

const Demo = (props: DotProps) => {
  return (
    <Flex direction='row' gap={2} alignItems='center'>

      <Dot
        size={props.size}
        up={props.up}
        aria-label='Dot only'
        data-test-id='dot'
      >
        12
      </Dot>

      <Button>
        Button Dot
        <Dot
          size={props.size}
          up={props.up}
          aria-label='Our brand new button!'
        >
          100
        </Dot>
      </Button>

      <Link>
        Link Dot
        <Dot
          size={props.size}
          up={props.up}
          aria-label='Our brand new link!'
        >
          1
        </Dot>
      </Link>

      <LinkTrigger aria-label='link trigger' data-test-id='link-trigger-text'>
        <LinkTrigger.Text>BLink trigger</LinkTrigger.Text>
        <Dot
          size={props.size}
          up={props.up}
          aria-label='Our brand new link trigger!'
        >
          999
        </Dot>
      </LinkTrigger>

      <Pills mt={2} aria-labelledby='pills-basic-usage'>
        <Pills.Item value='like'>
          <Pills.Item.Text>Like</Pills.Item.Text>
          <Dot
            size={props.size}
            up={props.up}
            aria-label='Our brand new Pill!'
          >
            1000
          </Dot>
        </Pills.Item>
      </Pills>
    </Flex>
  );
};

export const defaultCounterDotProps: DotProps = {
  size: 'm',
  up: undefined,
};

Demo.defaultProps = defaultCounterDotProps;
export default Demo;
