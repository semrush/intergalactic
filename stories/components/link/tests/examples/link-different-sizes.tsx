import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const w = 150;
  const sizes = [100, 200, 300, 400, 500, 600, 700, 800] as const;

  return (
    <>
      {sizes.map((size) => (
        <Text key={size} tag='div' size={size}>
          <Link
            active
            href='#'
            mr={4}
          >
            <Link.Text w={size < 600 ? w : w * 2} ellipsis>
              ({size}) The quick brown fox jumps over the lazy dog
            </Link.Text>
          </Link>

        </Text>
      ))}
    </>
  );
};

export default Demo;
