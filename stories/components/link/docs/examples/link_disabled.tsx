import React from 'react';
import Link from '@semcore/link';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import FormatText from '@semcore/format-text';

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
