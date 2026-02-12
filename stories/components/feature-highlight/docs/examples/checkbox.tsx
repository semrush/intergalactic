import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import { CheckboxFH, BadgeFH } from '@semcore/ui/feature-highlight';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={6}>

    <fieldset style={{ border: 'none' }}>
      <Text tag='legend' size={200} mb={3}>
        List with a highlighted checkbox
      </Text>
      <List marker='' m={0} p={0}>
        <List.Item p={0} mb={2}>
          <CheckboxFH aria-describedby='checkbox-aria-desc'>
            <CheckboxFH.Value />
            <CheckboxFH.AnimatedSparkles count={5} />
            <CheckboxFH.Text>
              First option
              <Box
                tag={SummaryAI}
                color='--intergalactic-icon-primary-feature-highlight'
                ml={2}
                style={{ verticalAlign: -3 }}
              />
            </CheckboxFH.Text>
          </CheckboxFH>
          <ScreenReaderOnly id='checkbox-aria-desc'>
            Powered by AI
          </ScreenReaderOnly>
        </List.Item>
        <List.Item p={0}>
          <Checkbox label='Second option' />
        </List.Item>
      </List>
    </fieldset>

    <fieldset style={{ border: 'none' }}>
      <Text tag='legend' size={300} mb={3}>
        Large list with a highlighted checkbox
      </Text>
      <List marker='' m={0} p={0}>
        <List.Item p={0} mb={2}>
          <CheckboxFH size='l' defaultChecked>
            <CheckboxFH.Value />
            <CheckboxFH.AnimatedSparkles count={5} />
            <CheckboxFH.Text>
              First option
              <BadgeFH ml={2}>AI-powered</BadgeFH>
            </CheckboxFH.Text>
          </CheckboxFH>
        </List.Item>
        <List.Item p={0}>
          <Checkbox size='l' label='Second option' />
        </List.Item>
      </List>
    </fieldset>

  </Flex>
);

export default Demo;
