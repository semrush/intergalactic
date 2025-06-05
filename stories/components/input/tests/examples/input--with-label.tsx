import React, { useState } from "react";
import Input from "@semcore/input";
import { Text } from "@semcore/typography";
import { Flex, Box } from "@semcore/flex-box";
import Counter from '@semcore/counter';
import Select from '@semcore/select';
import {  LinkTrigger } from '@semcore/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => {

  return (
    <Flex direction='row' gap={2}>
      <Flex direction='column' gap={2} mb={3} data-testid='Default'>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Text size={200} tag='label' htmlFor='limited-text-field'>
                Project description
              </Text>
              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='m' w={350}>
            <Input.Value
              autoFocus
              placeholder='m-size'
              aria-labelledby='m-size'
              id='m-example'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Text size={300} tag='label' htmlFor='limited-text-field'>
                Project description
              </Text>
              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='l' w={350}>
            <Input.Value
              autoFocus
              placeholder='l-size'
              aria-labelledby='l-size'
              id='l-example'
            />
          </Input>
        </Flex>


        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Text size={200} tag='label' htmlFor='limited-text-field'>
                Project description
              </Text>
              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='m' w={350} state='valid'>
            <Input.Value
              autoFocus
              placeholder='m-valid'
              aria-labelledby='m-valid'
              id='m-valid'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Text size={300} tag='label' htmlFor='limited-text-field'>
                Project description
              </Text>
              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='l' w={350} state='valid'>
            <Input.Value

              placeholder='l-valid'
              aria-labelledby='l-valid'
              id='l-valid'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Text size={200} tag='label' htmlFor='limited-text-field'>
                Project description
              </Text>
              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='m' w={350} state='invalid'>
            <Input.Value

              placeholder='m-invalid'
              aria-labelledby='m-invalid'
              id='m-invalid'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Text size={300} tag='label' htmlFor='limited-text-field'>
                Project description
              </Text>
              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='l' w={350} state='invalid'>
            <Input.Value

              placeholder='l-invalid'
              aria-labelledby='l-invalid'
              id='i-invalid'
            />
          </Input>
        </Flex>

      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Default'>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='m' w={350}>
            <Input.Value
              autoFocus
              placeholder='m-size'
              aria-labelledby='m-size'
              id='m-example'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='l' w={350}>
            <Input.Value
              autoFocus
              placeholder='l-size'
              aria-labelledby='l-size'
              id='l-example'
            />
          </Input>
        </Flex>


        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='m' w={350} state='valid'>
            <Input.Value
              autoFocus
              placeholder='m-valid'
              aria-labelledby='m-valid'
              id='m-valid'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='l' w={350} state='valid'>
            <Input.Value

              placeholder='l-valid'
              aria-labelledby='l-valid'
              id='l-valid'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='m' w={350} state='invalid'>
            <Input.Value

              placeholder='m-invalid'
              aria-labelledby='m-invalid'
              id='m-invalid'
            />
          </Input>
        </Flex>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems={'center'}>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id={'counter-for-textarea'}>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
              optional
            </Text>
          </Flex>
          <Input size='l' w={350} state='invalid'>
            <Input.Value

              placeholder='l-invalid'
              aria-labelledby='l-invalid'
              id='i-invalid'
            />
          </Input>
        </Flex>

      </Flex>
    </Flex>
  );
};

export default Demo;
