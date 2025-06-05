import { Blockquote, List, Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <div>
    <Blockquote author='Roy Batty' my={4.5}>
      I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.
      I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost
      in time, like tears in rain. Time to die.
    </Blockquote>

    <Blockquote>
      I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.
      I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost
      in time, like tears in rain. Time to die.
    </Blockquote>
  </div>
);

export default Demo;
