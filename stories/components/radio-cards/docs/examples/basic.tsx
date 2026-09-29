import Fire from '@semcore/icon/Fire/m';
import { Box } from '@semcore/ui/base-components';
import RadioCards from '@semcore/ui/radio-cards';
import React, { useState } from 'react';

const Demo = () => {
  const [value, setValue] = useState('all');

  return (
    <Box bg='page-bg' p={4}>
      <RadioCards
        aria-label='basic radio cards'
        name='radio-cards-basic'
        value={value}
        onChange={setValue}
      >
        <RadioCards.Item value='all' text='All' textAddon='~90,000,000' />
        <RadioCards.Item
          value='best'
          text='Best'
          textAddon='300'
          description='Most valuable backlinks'
          iconAddon={<Fire />}
        />
        <RadioCards.Item
          value='top-new'
          text='Top New'
          textAddon='100'
          description='Recently acquired backlinks'
          disabled
        />
      </RadioCards>
    </Box>
  );
};

export default Demo;
