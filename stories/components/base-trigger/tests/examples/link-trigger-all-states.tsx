import React from 'react';
import Dropdown from '@semcore/dropdown';
import { LinkTrigger } from '@semcore/base-trigger';
import { Flex } from '@semcore/flex-box';
import CheckM from '@semcore/icon/Check/m';


const Demo = () => (
  <Flex direction="column" gap={3}>
    <Flex gap={2}>
      <LinkTrigger active data-test-id="link-trigger-active">Active</LinkTrigger>
      <LinkTrigger empty data-test-id="link-trigger-empty">Empty</LinkTrigger>
      <LinkTrigger empty placeholder="Placeholder" active data-test-id="link-trigger-active-placeholder">Active with Placeholder</LinkTrigger>
      <LinkTrigger disabled data-test-id="link-trigger-disabled">Disabled</LinkTrigger>
    </Flex>

    <Flex gap={2}>
      <LinkTrigger color="red" data-test-id="link-trigger-red">Normal state</LinkTrigger>
      <LinkTrigger color="text-success" data-test-id="link-trigger-success">Valid state (Loading)</LinkTrigger>
    </Flex>

    <Flex gap={2}>
      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
      </LinkTrigger>

      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text-addon">
        <LinkTrigger.Addon tag={CheckM} />
        <LinkTrigger.Text>Link trigger.Text</LinkTrigger.Text>
      </LinkTrigger>

      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text-addon-icon">
        <LinkTrigger.Addon>
          <CheckM />
        </LinkTrigger.Addon>
        <LinkTrigger.Text>Link trigger.Text</LinkTrigger.Text>
      </LinkTrigger>
    </Flex>

    <Flex gap={2}>
      <Dropdown>
        <Dropdown.Trigger>
          <LinkTrigger aria-label="link trigger with dropdown" data-test-id="link-trigger-dropdown">
            <LinkTrigger.Text>LinkTrigger with dropdown</LinkTrigger.Text>
          </LinkTrigger>
        </Dropdown.Trigger>
      </Dropdown>
    </Flex>
    
  </Flex>
);


export default Demo;
