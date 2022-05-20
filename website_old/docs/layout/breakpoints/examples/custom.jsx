import React, { useContext } from 'react';
import { createBreakpoints } from '@semcore/breakpoints';

const MEDIA = [
  '(max-width: 300px)',
  '(max-width: 500px)',
  '(max-width: 700px)',
  '(max-width: 900px)',
  '(max-width: 1100px)',
];
const Breakpoints = createBreakpoints(MEDIA);

function Demo() {
  const index = useContext(Breakpoints.Context);

  return <div>Media matches "{MEDIA[index] || 'ZOOM WINDOW'}"</div>;
}

export default () => {
  return (
    <Breakpoints>
      <Demo />
    </Breakpoints>
  );
};
