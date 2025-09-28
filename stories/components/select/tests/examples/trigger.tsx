import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Badge from '@semcore/ui/badge';
import { LinkTrigger, ButtonTrigger } from '@semcore/ui/base-trigger';
import Dot from '@semcore/ui/dot';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='row' gap={2}>
    <Flex direction='column' gap={2}>
      <Text>Valid</Text>
      <Select state='valid'>
        <Select.Trigger data-testid='valid-m' />
      </Select>

      <Select state='valid' size='l'>
        <Select.Trigger data-testid='valid-l' />
      </Select>

      <Select state='valid'>
        <Select.Trigger data-testid='valid-m-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select size='l' state='valid'>
        <Select.Trigger data-testid='valid-l-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select state='valid'>
        <Select.Trigger data-testid='valid-m-icon'>

          <Select.Trigger.Text>Icon</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      <Select state='valid' size='l'>
        <Select.Trigger data-testid='valid-l-icon'>

          <Select.Trigger.Text>Icon</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      {/* with selected option */}
      <Select value={1} state='valid'>
        <Select.Trigger data-testid='valid-m-selected' />
      </Select>

      <Select value={1} size='l' state='valid'>
        <Select.Trigger data-testid='valid-l-selected' />
      </Select>

      <Select>
        <Select.Trigger loading state='valid' data-testid='valid-m-loading' />
      </Select>

      <Select>
        <Select.Trigger loading size='l' state='valid' data-testid='valid-l-loading' />
      </Select>

      {/* 'Trigger with selected option ellipsis text renders correctly', */}
      <Select value='English burashka gpq 1' state='valid'>
        <Select.Trigger w={100} data-testid='valid-m-ellipsis' />
      </Select>

      <Select value='English burashka gpq 1' state='valid'>
        <Select.Trigger w={100} size='l' data-testid='valid-l-ellipsis' />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} state='valid'>
        <Select.Trigger data-testid='valid-m-multiselected' />
      </Select>

      <Select multiselect value={[1, 2, 3]} size='l'>
        <Select.Trigger data-testid='valid-l-multiselected' />
      </Select>

      <Select placeholder='placeholder' state='valid'>
        <Select.Trigger data-testid='valid-m-placeholder' />
      </Select>

      <Select placeholder='placeholder' state='valid'>
        <Select.Trigger size='l' data-testid='valid-l-placeholder' />
      </Select>
    </Flex>

    <Flex direction='column' gap={2}>
      <Text>Normal</Text>
      <Select state='normal'>
        <Select.Trigger data-testid='normal-m' />
      </Select>

      <Select state='normal' size='l'>
        <Select.Trigger data-testid='normal-l' />
      </Select>

      <Select state='normal'>
        <Select.Trigger data-testid='normal-m-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select size='l' state='normal'>
        <Select.Trigger data-testid='normal-l-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select state='normal'>
        <Select.Trigger data-testid='normal-m-badge'>

          <Select.Trigger.Text>Icon</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      <Select size='l' state='normal'>
        <Select.Trigger data-testid='normal-l-badge'>

          <Select.Trigger.Text>Icon</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      {/* with selected option */}
      <Select value={1} state='normal'>
        <Select.Trigger data-testid='normal-m-selected' />
      </Select>

      <Select value={1} size='l'>
        <Select.Trigger data-testid='normal-l-selected' />
      </Select>

      <Select state='normal'>
        <Select.Trigger loading data-testid='normal-m-loading' />
      </Select>

      <Select>
        <Select.Trigger loading size='l' state='normal' data-testid='normal-l-loading' />
      </Select>

      {/* 'Trigger with selected option ellipsis text renders correctly', */}
      <Select value='English burashka gpq 1' state='normal'>
        <Select.Trigger w={100} data-testid='normal-m-ellipsis' />
      </Select>

      <Select value='English burashka gpq 1' state='normal'>
        <Select.Trigger w={100} size='l' data-testid='normal-l-ellipsis' />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} state='normal'>
        <Select.Trigger data-testid='normal-m-multiselected' />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} size='l' state='normal'>
        <Select.Trigger data-testid='normal-l-multiselected' />
      </Select>

      <Select placeholder='placeholder' state='normal'>
        <Select.Trigger data-testid='normal-m-placeholder' />
      </Select>

      <Select placeholder='placeholder' state='normal'>
        <Select.Trigger size='l' data-testid='normal-l-placeholder' />
      </Select>
    </Flex>
    <Flex direction='column' gap={2}>
      <Text>Invalid</Text>
      <Select state='invalid'>
        <Select.Trigger data-testid='invalid-m' />
      </Select>

      <Select state='invalid' size='l'>
        <Select.Trigger data-testid='invalid-l' />
      </Select>

      <Select state='invalid'>
        <Select.Trigger data-testid='invalid-m-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select size='l' state='invalid'>
        <Select.Trigger data-testid='invalid-l-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select state='invalid'>
        <Select.Trigger data-testid='invalid-m-badge'>

          <Select.Trigger.Text>Icon</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      <Select size='l' state='invalid'>
        <Select.Trigger data-testid='invalid-l-badge'>

          <Select.Trigger.Text>Icon</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      {/* with selected option */}
      <Select value={1} state='invalid'>
        <Select.Trigger data-testid='invalid-m-selected' />
      </Select>

      <Select value={1} size='l' state='invalid'>
        <Select.Trigger data-testid='invalid-l-selected' />
      </Select>

      <Select state='invalid'>
        <Select.Trigger loading data-testid='invalid-m-loading' />
      </Select>

      <Select>
        <Select.Trigger loading size='l' state='invalid' data-testid='invalid-l-loading' />
      </Select>

      {/* 'Trigger with selected option ellipsis text renders correctly', */}
      <Select value='English burashka gpq 1' state='invalid'>
        <Select.Trigger w={100} data-testid='invalid-m-ellipsis' />
      </Select>

      <Select value='English burashka gpq 1' state='invalid'>
        <Select.Trigger w={100} size='l' data-testid='invalid-l-ellipsis' />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} state='invalid'>
        <Select.Trigger data-testid='invalid-m-multiselected' />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} size='l' state='invalid'>
        <Select.Trigger data-testid='invalid-l-multiselected' />
      </Select>

      <Select placeholder='placeholder' state='invalid'>
        <Select.Trigger data-testid='invalid-m-placeholder' />
      </Select>

      <Select placeholder='placeholder' state='invalid'>
        <Select.Trigger size='l' data-testid='invalid-l-placeholder' />
      </Select>
    </Flex>

    <Flex direction='column' gap={2}>
      <Text>Disabled</Text>
      <Select disabled>
        <Select.Trigger />
      </Select>

      <Select disabled size='l' data-testid='disabled-l'>
        <Select.Trigger data-testid='disabled-m' />
      </Select>

      <Select disabled>
        <Select.Trigger data-testid='disabled-m-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select size='l' disabled>
        <Select.Trigger data-testid='disabled-l-addon'>
          <Select.Trigger.Addon>
            <LinkExternalM />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>Icon</Select.Trigger.Text>
        </Select.Trigger>
      </Select>

      <Select disabled>
        <Select.Trigger data-testid='disabled-m-badge'>

          <Select.Trigger.Text>Badge</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      <Select size='l' disabled>
        <Select.Trigger data-testid='disabled-l-badge'>

          <Select.Trigger.Text>Badge</Select.Trigger.Text>
          <Select.Trigger.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Select.Trigger.Addon>
        </Select.Trigger>

      </Select>

      {/* with selected option */}
      <Select value={1} disabled>
        <Select.Trigger data-testid='disabled-m-selected' />
      </Select>

      <Select value={1} size='l' disabled>
        <Select.Trigger data-testid='disabled-l-selected' />
      </Select>

      <Select disabled>
        <Select.Trigger loading data-testid='disabled-m-loading' />
      </Select>

      <Select>
        <Select.Trigger loading size='l' disabled data-testid='disabled-l-loading' />
      </Select>

      {/* 'Trigger with selected option ellipsis text renders correctly', */}
      <Select value='English burashka gpq 1' disabled>
        <Select.Trigger w={100} data-testid='disabled-m-ellipsis' />
      </Select>

      <Select value='English burashka gpq 1' disabled>
        <Select.Trigger w={100} size='l' data-testid='disabled-l-ellipsis' />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} disabled data-testid='disabled-m-multiselected'>
        <Select.Trigger />
      </Select>

      {/* 'MultiSelect trigger with selected options renders correctly', */}
      <Select multiselect value={[1, 2, 3]} size='l' disabled>
        <Select.Trigger data-testid='disabled-l-multiselected' />
      </Select>

      <Select placeholder='placeholder' disabled>
        <Select.Trigger data-testid='disabled-m-placeholder' />
      </Select>

      <Select placeholder='placeholder' disabled>
        <Select.Trigger size='l' data-testid='disabled-l-placeholder' />
      </Select>
    </Flex>

  </Flex>
);

export default Demo;
