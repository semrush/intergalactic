import React from 'react';
import Button from '@semcore/button';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/tooltip';
import SearchM from '@semcore/icon/Search/m';
import SearchL from '@semcore/icon/Search/l';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction={'row'} gap={6} alignItems={'flex-start'}>
      <Button addonLeft={SearchM} title='Button secondary Addon' />
      <Hint tag={Button} addonLeft={SearchM} title='Hint Button secondary Addon' />
      <Tooltip tag={Button} addonLeft={SearchM} title='Tooltip Button secondary Addon' />

      <Button addonLeft={SearchL} use={'primary'} title='Button primary Addon' />
      <Hint tag={Button} addonLeft={SearchL} use={'primary'} title='Hint Button primary Addon' />
      <Tooltip
        tag={Button}
        addonLeft={SearchM}
        use={'primary'}
        title='Tooltip Button secondary Addon'
      />

      <Button addonLeft={SearchM} use={'tertiary'} title='Button tertiary Addon' />
      <Hint tag={Button} addonLeft={SearchM} use={'tertiary'} title='Hint Button tertiary Addon' />
      <Tooltip
        tag={Button}
        addonLeft={SearchM}
        use={'tertiary'}
        title='Tooltip Button tertiary Addon'
      />
    </Flex>
  );
};

export default Demo;
