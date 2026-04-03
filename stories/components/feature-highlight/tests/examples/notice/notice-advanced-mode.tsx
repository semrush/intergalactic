import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { ButtonFH, NoticeFH } from '@semcore/ui/feature-highlight';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={6}>

      <Box>
        <Text size={400} tag='h3' mb={2}>
          Smart Mode (Simple Props)
        </Text>
        <NoticeFH
          closable
          aria-label='Smart mode notice'
          label={<SummaryAI />}
          title={<Text>New Feature Available</Text>}
          actions={<ButtonFH use='primary'>Try it now</ButtonFH>}
          text="We've added AI-powered optimization to help you improve your domain performance."
        />
      </Box>

      <Box>
        <Text size={400} tag='h3' mb={2}>
          Advanced Mode (Subcomponents)
        </Text>
        <NoticeFH closable aria-label='Advanced mode notice'>
          <NoticeFH.Label mr={3}>
            <SummaryAI />
          </NoticeFH.Label>
          <NoticeFH.Content>
            <NoticeFH.Title>
              <Text>New Feature Available</Text>
            </NoticeFH.Title>
            <NoticeFH.Text>
              We've added AI-powered optimization to help you improve your domain performance.
            </NoticeFH.Text>
            <NoticeFH.Actions mt={3}>
              <ButtonFH use='primary'>Try it now</ButtonFH>
            </NoticeFH.Actions>
          </NoticeFH.Content>
          <NoticeFH.Close />
        </NoticeFH>
      </Box>
    </Flex>
  );
};

export default Demo;
