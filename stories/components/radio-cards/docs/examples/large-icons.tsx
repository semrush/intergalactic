import { Box } from '@semcore/base-components';
import { Flex } from '@semcore/ui/base-components';
import RadioCards from '@semcore/ui/radio-cards';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ItemContentProps = {
  primaryText: string;
  secondaryText: string;
  count: number;
};

const ItemContent = (props: ItemContentProps) => {
  const { primaryText, secondaryText, count } = props;
  return (
    <>
      <Flex
        alignItems='center'
        gap='var(--intergalactic-spacing-content-gap-xxlarge)'
      >
        <Flex
          w={40}
          h={40}
          style={{
            borderRadius: 'var(--intergalactic-addon-rounded)',
            background: 'var(--intergalactic-bg-primary-muted)',
            flexShrink: 0,
          }}
        />
        <Flex
          direction='column'
          gap='var(--intergalactic-spacing-content-gap-small)'
        >
          <Text size={300}>
            {primaryText}
            <Text
              use='secondary'
              ml='var(--intergalactic-spacing-content-gap-medium)'
            >
              {count}
            </Text>
          </Text>
          <Text size={200} use='secondary'>{secondaryText}</Text>
        </Flex>
      </Flex>
    </>
  );
};

const Demo = () => {
  return (
    <Box bg='page-bg' p={4}>
      <RadioCards
        aria-label='radio cards with large addon'
        name='radio-cards-large-addon'
      >
        <RadioCards.Item value='custom-layout-1' loading>
          <ItemContent
            primaryText='Preset 1'
            secondaryText='Secondary text'
            count={24}
          />
        </RadioCards.Item>
        <RadioCards.Item value='custom-layout-2'>
          <ItemContent
            primaryText='Preset 2'
            secondaryText='Secondary text'
            count={10}
          />
        </RadioCards.Item>
      </RadioCards>
    </Box>
  );
};

export default Demo;
