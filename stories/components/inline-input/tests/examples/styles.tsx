import SerpM from '@semcore/icon/Serp/m';
import { Flex } from '@semcore/ui/base-components';
import InlineInput from '@semcore/ui/inline-input';
import type { InlineInputProps, InlineInputValueProps } from '@semcore/ui/inline-input';
import type { NSInputNumber } from '@semcore/ui/input-number';
import React from 'react';

type ExampleInputTagsProps = InlineInputProps & NSInputNumber.Controls.Props & InlineInputValueProps;

const Styles = (props: ExampleInputTagsProps) => {
  const { disabled, loading, state, autoFocus, defaultValue, placeholder, showControls, onBlurBehavior } = props;

  return (
    <Flex direction='row' gap={2} flexWrap>
      <Flex direction='column' gap={2} w={300} data-testid='default'>
        <label htmlFor='simple'>Default</label>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
            <InlineInput.Value id='simple' defaultValue={defaultValue} autoFocus={autoFocus} placeholder={placeholder} />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} state={state} loading={loading} disabled={disabled}>
            <InlineInput.Addon>I don't care, I punk:</InlineInput.Addon>
            <InlineInput.Value id='constant-placeholder' defaultValue={defaultValue} placeholder={placeholder} />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
            <InlineInput.Addon tag='label' htmlFor='number-example'>
              Enter score:
            </InlineInput.Addon>
            <InlineInput.NumberValue id='number-example' defaultValue={100} />
            <InlineInput.NumberControls showControls={false} />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>
      </Flex>

      <Flex direction='column' gap={2} w={300} data-testid='addons'>
        <label htmlFor='simple'>With addon</label>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Value id='simple' defaultValue={defaultValue} placeholder={placeholder} />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
            <InlineInput.Addon tag={SerpM} />
            <InlineInput.Addon>I don't care, I punk:</InlineInput.Addon>
            <InlineInput.Value id='const-placeholder' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
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
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
            <InlineInput.Value id='simple' defaultValue={defaultValue} placeholder={placeholder} />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
            <InlineInput.Addon>I don't care, I punk:</InlineInput.Addon>
            <InlineInput.Value id='const-placeholder' />
          </InlineInput>
        </Flex>

        <Flex direction='row' gap={2}>
          <InlineInput onBlurBehavior={onBlurBehavior} disabled={disabled} loading={loading} state={state}>
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

export const stylesDefaultProps: ExampleInputTagsProps = {
  disabled: false,
  loading: undefined,
  state: undefined,
  autoFocus: true,
  defaultValue: 'John Doe',
  placeholder: 'Placeholder',
  showControls: true,
  onBlurBehavior: 'none',
};

Styles.defaultProps = stylesDefaultProps;

export default Styles;
