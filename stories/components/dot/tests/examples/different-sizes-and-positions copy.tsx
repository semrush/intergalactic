import React from 'react';
import { Flex } from '@semcore/flex-box';
import { LinkTrigger } from '@semcore/base-trigger';
import Dot from '@semcore/dot';

const Demo = () => {

  return (
    <Flex direction='row' gap={2}>

<LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
       Base trigger.Text
        <Dot aria-label='Our brand new button!' />
        
        
      </LinkTrigger>

      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot up aria-label='Our brand new button!' />
      </LinkTrigger>

      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot up aria-label='Value'>
          12
        </Dot>
      </LinkTrigger>

      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot aria-label='Our brand new button!'>12</Dot>
      </LinkTrigger>
      
      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot size='l' aria-label='L size' />
      </LinkTrigger>

      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot size='m' aria-label='M size' />
      </LinkTrigger>
     
      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot up size='l' aria-label='L size Up' />
      </LinkTrigger>
     
      <LinkTrigger aria-label="link trigger" data-test-id="link-trigger-text">
        <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
        <Dot up size='m' aria-label='M size Up' />
      </LinkTrigger>
     
    </Flex>
  );
};

export default Demo;
