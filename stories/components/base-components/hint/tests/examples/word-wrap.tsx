import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Text size={300}>
      <Link href='#'>
        <Link.Text w={100} ellipsis>
          Normally words shouldn't break even when text wraps to the next line.
        </Link.Text>
      </Link>
      <br />
      <Link href='#'>
        <Link.Text w={100} ellipsis>
          ButVeryVeryLongWordsWithoutSpacesCanBreak.
        </Link.Text>
      </Link>
      <br />
      <Link href='#'>
        <Link.Text w={100} ellipsis>
          Short hint width is short.
        </Link.Text>
      </Link>
    </Text>
  );
};

export default Demo;
