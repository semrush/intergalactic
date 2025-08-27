import { useEllipsis, Box, Hint } from '@semcore/base-components';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // useEllipsis returns a boolean that indicates
  // whether the text is cropped
  const showHint = useEllipsis(ref, { trim: 'middle', maxLine: 1 });

  const text = 'Some long text to test ellipsis';

  return (
    <>
      <Box ref={ref} w='100px'>{text}</Box>
      {showHint && <Hint triggerRef={ref}>{text}</Hint> }
    </>
  );
};

export default Demo;
