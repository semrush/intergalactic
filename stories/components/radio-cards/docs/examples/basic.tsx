import Fire from '@semcore/icon/Fire/m';
import RadioCards from '@semcore/ui/radio-cards';
import React, { useState } from 'react';

const Demo = () => {
  const [value, setValue] = useState('all');

  return (
    <RadioCards aria-label='Radio cards' name='radio-cards' value={value} onChange={setValue}>
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
      <RadioCards.Item
        value='lost-and-vital'
        text='Lost and Vital'
        textAddon='24'
        description='Restore these backlinks first'
      />
    </RadioCards>
  );
};

export default Demo;
