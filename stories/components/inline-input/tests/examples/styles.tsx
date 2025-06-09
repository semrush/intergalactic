import InlineInput from '@semcore/inline-input';
import React from 'react';
import SerpM from '@semcore/icon/Serp/m';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Example = () => {
  return (
    <Flex direction='row' gap={2}>
      <Flex direction='column' gap={2} w={300} data-testid='default'>
        <label htmlFor='simple'>Default</label>

        <Flex direction='row' gap={2}>
          <Text htmlFor='simple' size={300} w={150}>Simple</Text>
          <InlineInput onBlurBehavior='cancel' placeholder='Placeholder'>
            <InlineInput.Value id='simple' autoFocus defaultValue='Default value' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid' size={300} w={150}>Invalid</Text>
          <InlineInput onBlurBehavior='confirm' state='invalid'>
            <InlineInput.Value id='invalid' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid' size={300} w={150}>Valid</Text>
          <InlineInput onBlurBehavior='none' state='valid'>
            <InlineInput.Value id='valid' loading />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='loading' size={300} w={250}>Simple loading</Text>
          <InlineInput onBlurBehavior='cancel' loading placeholder='Placeholder'>
            <InlineInput.Value id='loading' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid-loading' size={300} w={250}>Invalid loading</Text>
          <InlineInput onBlurBehavior='cancel' loading state='invalid'>
            <InlineInput.Value id='invalid-loading' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid-loading' size={300} w={250}>Valid loading</Text>
          <InlineInput onBlurBehavior='cancel' loading state='valid'>
            <InlineInput.Value id='valid-loading' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='disabled' size={300} w={250}>Value disabled</Text>
          <InlineInput onBlurBehavior='cancel'>
            <InlineInput.Value id='disabled' disabled />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid-disabled' size={300} w={250}>Invalid disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled state='invalid'>
            <InlineInput.Value id='invalid-disabled' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid-disabled' size={300} w={250}>Valid disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled state='valid'>
            <InlineInput.Value id='valid-disabled' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <label htmlFor='primitive'>Primitve</label>
          <br />
          <InlineInput>
            <InlineInput.Value id='primitive' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
          <br />
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='const-placeholder' size={300} w={150}>Constant placeholder</Text>
          <InlineInput w={100}>
            <InlineInput.Addon>I don't care, I punk:</InlineInput.Addon>
            <InlineInput.Value id='const-placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput>
            <InlineInput.Addon tag='label' htmlFor='number-example'>
              Enter score:
            </InlineInput.Addon>
            <InlineInput.NumberValue id='number-example' defaultValue={100} />
            <InlineInput.NumberControls showControls />
          </InlineInput>
        </Flex>
      </Flex>

      <Flex direction='column' gap={2} w={300} data-testid='addons'>
        <label htmlFor='simple'>With addon</label>

        <Flex direction='row' gap={2}>
          <Text htmlFor='simple' size={300} w={150}>Simple</Text>
          <InlineInput onBlurBehavior='cancel'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='simple' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid' size={300} w={150}>Invalid</Text>
          <InlineInput onBlurBehavior='cancel' state='invalid'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='invalid' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid' size={300} w={150}>Valid</Text>
          <InlineInput onBlurBehavior='cancel' state='valid'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='valid' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='loading' size={300} w={250}>Simple loading</Text>
          <InlineInput onBlurBehavior='cancel' loading>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='loading' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid-loading' size={300} w={250}>Invalid loading</Text>
          <InlineInput onBlurBehavior='cancel' loading state='invalid'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='invalid-loading' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid-loading' size={300} w={250}>Valid loading</Text>
          <InlineInput onBlurBehavior='cancel' loading state='valid'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='valid-loading' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='disabled' size={300} w={250}>Simple disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='disabled' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid-disabled' size={300} w={250}>Invalid disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled state='invalid'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='invalid-disabled' placeholder='Placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid-disabled' size={300} w={250}>Valid disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled state='valid'>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='valid-disabled' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <label htmlFor='primitive'>Primitve</label>
          <br />
          <InlineInput>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='primitive' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
          <br />
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='const-placeholder' size={300} w={150}>Constant placeholder</Text>
          <InlineInput w={100}>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Addon>I don't care, I punk:</InlineInput.Addon>
            <InlineInput.Value id='const-placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Addon tag='label' htmlFor='number-example'>
              Enter score:
            </InlineInput.Addon>
            <InlineInput.NumberValue id='number-example' defaultValue={100} />
            <InlineInput.NumberControls showControls />
          </InlineInput>
        </Flex>
      </Flex>

      <Flex direction='column' gap={2} w={300} data-testid='no-controls'>
        <label htmlFor='simple'>No controls</label>

        <Flex direction='row' gap={2}>
          <Text htmlFor='simple' size={300} w={150}>Simple</Text>
          <InlineInput onBlurBehavior='cancel'>
            <InlineInput.Value id='simple' placeholder='Placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid' size={300} w={150}>Invalid</Text>
          <InlineInput onBlurBehavior='cancel' state='invalid'>
            <InlineInput.Value id='invalid' placeholder='Placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid' size={300} w={150}>Valid</Text>
          <InlineInput onBlurBehavior='cancel' state='valid'>
            <InlineInput.Value id='valid' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='loading' size={300} w={250}>Simple loading</Text>
          <InlineInput onBlurBehavior='cancel' loading>
            <InlineInput.Value id='loading' placeholder='Placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid-loading' size={300} w={250}>Invalid loading</Text>
          <InlineInput onBlurBehavior='cancel' loading state='invalid'>
            <InlineInput.Value id='invalid-loading' placeholder='Placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid-loading' size={300} w={250}>Valid loading</Text>
          <InlineInput onBlurBehavior='cancel' loading state='valid'>
            <InlineInput.Value id='valid-loading' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='disabled' size={300} w={250}>Simple disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled>
            <InlineInput.Value id='disabled' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='invalid-disabled' size={300} w={250}>Invalid disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled state='invalid'>
            <InlineInput.Value id='invalid-disabled' placeholder='Placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <Text htmlFor='valid-disabled' size={300} w={250}>Valid disabled</Text>
          <InlineInput onBlurBehavior='cancel' disabled state='valid'>
            <InlineInput.Value id='valid-disabled' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <label htmlFor='primitive'>Primitve</label>
          <br />
          <InlineInput>
            <InlineInput.Value id='primitive' />
          </InlineInput>
          <br />
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Addon tag='label' htmlFor='number-example'>
              Enter score:
            </InlineInput.Addon>
            <InlineInput.NumberValue id='number-example' defaultValue={100} />
          </InlineInput>
        </Flex>
      </Flex>

    </Flex>
  );
};

const Demo = Example;

export default Demo;
