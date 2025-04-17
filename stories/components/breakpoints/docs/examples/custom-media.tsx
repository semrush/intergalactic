import React from 'react';
import { createBreakpoints } from '@semcore/breakpoints';

const MEDIA = [
  '(max-width: 300px)',
  '(max-width: 500px)',
  '(max-width: 700px)',
  '(max-width: 900px)',
  '(max-width: 1100px)',
];
const Breakpoints = createBreakpoints(MEDIA);

const Example = () => {
  const index = React.useContext(Breakpoints.Context);

  return <div>Media matches "{(index !== undefined && MEDIA[index]) || 'ZOOM WINDOW'}"</div>;
};

const Demo = () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};

export default Demo;
