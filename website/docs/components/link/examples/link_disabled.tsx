import React from 'react';
import Link from 'intergalactic/link';
import ChevronRightM from 'intergalactic/icon/ChevronRight/m';
import FormatText from 'intergalactic/format-text';

const Demo = () => {
  return (
    <FormatText size={'l'}>
      <Link ml={4} href='#' size={300} disabled>
        <Link.Text>Disabled link</Link.Text>
        <Link.Addon>
          <ChevronRightM />
        </Link.Addon>
      </Link>
    </FormatText>
  );
};

export default Demo;
