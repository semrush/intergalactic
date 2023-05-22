import React, { useContext } from 'react';
import { createBreakpoints } from '@semcore/ui/breakpoints';

const MEDIA = [
  '(max-width: 300px)',
  '(max-width: 500px)',
  '(max-width: 700px)',
  '(max-width: 900px)',
  '(max-width: 1100px)',
];
const Breakpoints = createBreakpoints(MEDIA);

const Demo = () => {
  const index = useContext(Breakpoints.Context);

  return <div>Media matches "{MEDIA[index] || 'ZOOM WINDOW'}"</div>;
};

export default () => {
  return (
    <Breakpoints>
      <Demo />
    </Breakpoints>
  );
};
