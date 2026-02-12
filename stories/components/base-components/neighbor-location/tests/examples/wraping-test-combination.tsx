import ShowYesM from '@semcore/icon/ShowYes/m';
import { Flex, NeighborLocation } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import React from 'react';

const Demo = () => {
  return (
    <>
      <NeighborLocation tag={Flex} mb={4} role='group' aria-label='wrapped primary buttons'>
        <Button use='primary'>First</Button>
        <Button use='primary'>Middle</Button>
        <Button use='primary'>Last</Button>
      </NeighborLocation>

      <NeighborLocation tag={Flex} role='group' aria-label='wrapped secondary buttons'>
        <Button>First</Button>
        <Input w={200}>
          <Input.Value placeholder='Placeholder' aria-label='input example' />
          <Input.Addon>
            <ButtonLink title='Test hint' use='secondary' addonLeft={ShowYesM} />
          </Input.Addon>
        </Input>
        <Button>Middle</Button>
        <Select
          w={100}
          aria-label='select example'
          neighborLocation='both'
          options={[
            { value: 'Option 1', children: 'Option 1' },
            { value: 'Option 2', children: 'Option 2' },
          ]}
        />
        <Button>Last</Button>
        <Input w={100}>
          <Input.Value placeholder='Placeholder' aria-label='input example2' />
        </Input>
      </NeighborLocation>
    </>
  );
};

export default Demo;
