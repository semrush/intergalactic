import { Blockquote } from '@semcore/ui/typography';
import type { NSBlockquote } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: NSBlockquote.Props) => (
  <div>
    <Blockquote author={props.author} my={4.5}>
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

export const defaultProps: NSBlockquote.Props = {
  author: 'Roy Batty',
};

Demo.defaultProps = defaultProps;

export default Demo;
