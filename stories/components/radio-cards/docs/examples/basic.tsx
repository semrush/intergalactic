import ThumbUp from '@semcore/icon/ThumbUp/m';
import RadioCards from '@semcore/ui/radio-cards';
import React from 'react';

const Demo = () => {
  return (
    <RadioCards aria-label='Radio cards'>
      <RadioCards.Item value='Preset 1' text='Preset 1' textAddon='1000' description='Secondary text' disabled />
      <RadioCards.Item value='Preset 2' text='Preset 2' textAddon='~1,000,000' />
      <RadioCards.Item value='Preset 3' text='Preset 3' textAddon='4' iconAddon={<ThumbUp />} description='Secondary text' />
    </RadioCards>
  );
};

export default Demo;
