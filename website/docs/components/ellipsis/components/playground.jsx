import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/typography';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

export default PlaygroundGeneration((preview) => {
  const { bool, radio, text } = preview('Dropdown');

  const trim = radio({
    key: 'trim',
    defaultValue: 'end',
    label: 'Trimming type',
    options: ['end', 'middle'],
  });

  const tooltip = bool({
    key: 'tooltip',
    defaultValue: true,
    label: 'Show tooltip',
  });

  const maxLine = text({
    key: 'maxLine',
    defaultValue: 1,
    label: 'Rows count in multiline mode',
  });

  return (
    <Box w={400}>
      <Ellipsis trim={trim} tooltip={tooltip} maxLine={maxLine}>
        <Text color='black'>
          Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary, planetary,
          intergalactic Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary,
          planetary, intergalactic Another dimension, another dimension Another dimension, another
          dimension Another dimension, another dimension Another dimension, another dimension
          Another dimension, another dimension Another dimension
        </Text>
      </Ellipsis>
    </Box>
  );
});
