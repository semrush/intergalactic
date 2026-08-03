import { ButtonLink } from '@semcore/ui/button';
import React from 'react';

const Demo = () => {
  const sizes = [100, 200, 300, 350, 400, 500, 600, 700, 800] as const;
  const w = [100, 150, 250];
  // const str = 'Ẩn bộ lọc và chế độ xem';
  // const str = 'Ocultar filtros y tipo de vista';
  // const str = 'Filter verbergen und Ansicht ändern';
  const str = 'The quick brown fox jumps over the lazy dog';

  return (
    <>
      {sizes.map((size) => {
        return (
          <ButtonLink
            key={size}
            size={size}
            w={size < 400 ? w[0] : size > 500 ? w[2] : w[1]}
            use='secondary'
          >
            {`${str} (${size})`}
          </ButtonLink>
        );
      })}
      <br />
      {sizes.map((size) => {
        return (
          <ButtonLink
            key={size}
            size={size}
            w={size < 400 ? w[0] : size > 500 ? w[2] : w[1]}
            use='primary'
            active
          >
            {`${str} (${size})`}
          </ButtonLink>
        );
      })}
    </>
  );
};

export default Demo;
