import React from 'react';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';

const Demo = () => (
  <div>
    <Text size={300} tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text tag='strong'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text tag='em'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text color='text-success'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      But I do love the taste of a <Link href='https://semrush.com'>good burger</Link>. Mm-mm-mm.
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text tag='s'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag='p' mb={2} mt={0} monospace>
      monospace text
    </Text>
    <Text size={300} tag='p' mb={2} mt={0} uppercase>
      uppercase text
    </Text>
    <Text size={300} tag='p' mb={2} mt={0} capitalize>
      capitalize text
    </Text>
    <Text size={300} tag='p' mb={2} mt={0} lowercase>
      LOWERCASE TEXT
    </Text>
  </div>
);

export default Demo;
