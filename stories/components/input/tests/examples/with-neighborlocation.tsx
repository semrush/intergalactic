import React from 'react';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import Input from '@semcore/input';
import { Hint } from '@semcore/tooltip';
import ShowYesM from '@semcore/icon/ShowYes/m';
import ShowYesL from '@semcore/icon/ShowYes/l';
import { ButtonLink } from '@semcore/button';

const Demo = () => {
  return (
    <>
      <Flex direction='column' gap={4}>
        <NeighborLocation tag={Flex} role='group' aria-label='wrapped secondary buttons'>
          <Input w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input example' />
            <Input.Addon>
              <Hint title='Test hint' tag={ButtonLink} use='secondary' addonLeft={ShowYesM} />
            </Input.Addon>
          </Input>
          <Input w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input example' />

          </Input>
          <Input w={100}>
            <Input.Value placeholder='Placeholder' aria-label='input example2' />
          </Input>
        </NeighborLocation>

        <Flex role='group' aria-label='input with select'>
          <Input neighborLocation='right' w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input example' />
          </Input>
          <Input neighborLocation='both' w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input example' />
          </Input>
          <Input neighborLocation='left' w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input example' />
          </Input>
        </Flex>

        <NeighborLocation tag={Flex} role='group' aria-label='wrapped secondary buttons'>
          <Input w={200} size='l'>
            <Input.Value placeholder='Placeholder' aria-label='input example' />
            <Input.Addon>
              <Hint title='Test hint' tag={ButtonLink} use='secondary' addonLeft={ShowYesL} />
            </Input.Addon>
          </Input>
          <Input w={200} size='l'>
            <Input.Value placeholder='Placeholder' aria-label='input example' />

          </Input>
          <Input w={100} size='l'>
            <Input.Value placeholder='Placeholder' aria-label='input example2' />
          </Input>
        </NeighborLocation>
      </Flex>
    </>
  );
};

export default Demo;
