import FormatText from '@semcore/format-text';
import CheckM from '@semcore/icon/Check/m';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import Link from '@semcore/link';
import React from 'react';

const Demo = () => {
  return (
    <FormatText size='l'>
      <Link ml={4} href='#' size={300}>
        <Link.Addon>
          <CheckM />
        </Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>
          <ChevronRightM />
        </Link.Addon>
      </Link>
    </FormatText>
  );
};

export default Demo;
