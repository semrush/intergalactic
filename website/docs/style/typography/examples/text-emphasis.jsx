import React from 'react';
import { Hint, Text } from '@semcore/typography';

export default () => (
  <div>
    <Text size={300} tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text tag="strong">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text tag="em">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text color="green">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag="p" mb={2} mt={0}>
      But I do love the taste of a <Hint>good burger</Hint>. Mm-mm-mm.
    </Text>
    <Text size={300} tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text tag="s">good burger</Text>. Mm-mm-mm.
    </Text>
  </div>
);
