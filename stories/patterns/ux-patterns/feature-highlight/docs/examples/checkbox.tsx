import { CheckboxAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Text, List } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={6}>

    <fieldset style={{ border: 'none' }}>
      <Text tag='legend' size={200} mb={3}>
        List with a highlighted checkbox
      </Text>
      <List marker='' m={0} p={0}>
        <List.Item p={0} mb={2}>
          <CheckboxAF>
            <CheckboxAF.Value />
            <CheckboxAF.AnimatedSparkles count={5} />
            <CheckboxAF.Text>
              First option
              <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
            </CheckboxAF.Text>
          </CheckboxAF>
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
          <CheckboxAF size='l'>
            <CheckboxAF.Value checked />
            <CheckboxAF.AnimatedSparkles count={5} />
            <CheckboxAF.Text>
              First option
              <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -2 }} />
            </CheckboxAF.Text>
          </CheckboxAF>
        </List.Item>
        <List.Item p={0}>
          <Checkbox size='l' label='Second option' />
        </List.Item>
      </List>
    </fieldset>

  </Flex>
);

export default Demo;
