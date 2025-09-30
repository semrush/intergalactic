import { Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Input from '@semcore/ui/input';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const FocusStylesInAllInputs = () => {
  return (
    <Flex direction='column' gap={8} p={5}>
      <Flex direction='column' gap={2}>
        <Input size='m'>
          <Input.Value placeholder='Input with M size' />
        </Input>
        <Input size='l'>
          <Input.Value placeholder='Input with L size' />
        </Input>
        <Input size='m' state='invalid'>
          <Input.Value placeholder='Input with M size' />
        </Input>
        <Input size='l' state='invalid'>
          <Input.Value placeholder='Input with L size' />
        </Input>
        <Input size='m' state='valid'>
          <Input.Value placeholder='Input with M size' />
        </Input>
        <Input size='l' state='valid'>
          <Input.Value placeholder='Input with L size' />
        </Input>
      </Flex>

      <Flex direction='column' gap={2}>
        <Textarea size='m' placeholder='Textarea with M size' />
        <Textarea size='l' placeholder='Textarea with L size' />
        <Textarea size='m' state='invalid' placeholder='Textarea with M size' />
        <Textarea size='l' state='invalid' placeholder='Textarea with L size' />
        <Textarea size='m' state='valid' placeholder='Textarea with M size' />
        <Textarea size='l' state='valid' placeholder='Textarea with L size' />
      </Flex>

      <Flex direction='column' gap={2}>
        <BulkTextarea size='m' placeholder='BulkTextarea with M size'>
          <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
            <Text tag='label' size={200} id='bulk-m-label'>
              BulkTextarea M
            </Text>
            <BulkTextarea.Counter />
          </Flex>
          <BulkTextarea.InputField
            aria-labelledby='bulk-m-label'
            commonErrorMessage='Error message'
          />
          <Flex alignItems='center' justifyContent='space-between' mt={2}>
            <BulkTextarea.ErrorsNavigation />
            <BulkTextarea.ClearAll />
          </Flex>
        </BulkTextarea>
        <BulkTextarea size='l' placeholder='BulkTextarea with L size'>
          <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
            <Text tag='label' size={300} id='bulk-l-label'>
              BulkTextarea L
            </Text>
            <BulkTextarea.Counter />
          </Flex>
          <BulkTextarea.InputField
            aria-labelledby='bulk-l-label'
            commonErrorMessage='Error message'
          />
          <Flex alignItems='center' justifyContent='space-between' mt={2}>
            <BulkTextarea.ErrorsNavigation />
            <BulkTextarea.ClearAll />
          </Flex>
        </BulkTextarea>
      </Flex>
    </Flex>
  );
};

export default FocusStylesInAllInputs;
