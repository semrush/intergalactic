import { ButtonLink } from '@semcore/ui/button';
import React from 'react';

const Demo = () => {
  const w = 150;
  const sizes = [100, 200, 300, 400, 500, 600, 700, 800] as const;

  return (
    <>
      {sizes.map((size) => (
        <ButtonLink
          key={size}
          size={size}
          w={size < 600 ? w : w * 2}
          use='secondary'
        >
          The quick brown fox jumps over the lazy dog ({size})
        </ButtonLink>
      ))}
      <br />
      {sizes.map((size) => (
        <ButtonLink
          key={size}
          size={size}
          w={size < 600 ? w : w * 2}
          use='primary'
          active
        >
          The quick brown fox jumps over the lazy dog ({size})
        </ButtonLink>
      ))}
    </>
  );
};

export default Demo;
