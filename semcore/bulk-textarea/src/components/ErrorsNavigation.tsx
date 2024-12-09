import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ChevronUpM from '@semcore/icon/ChevronUp/m';
import ChevronDownM from '@semcore/icon/ChevronDown/m';

export type ErrorsNavigationProps = {
  errorIndex: number;
  onPrevError: () => void;
  onNextError: () => void;
  errorsCount: number;
  size: 'm' | 'l';
  showErrors: boolean;
};

export function ErrorsNavigation(props: ErrorsNavigationProps) {
  const { errorIndex, errorsCount, onPrevError, onNextError, size, showErrors } = props;
  return (
    <Flex alignItems='center'>
      {errorsCount > 0 && showErrors && (
        <>
          <Button
            onClick={onNextError}
            addonLeft={ChevronDownM}
            use={'tertiary'}
            theme={'muted'}
            aria-label={'Next error'}
          />
          <Button
            onClick={onPrevError}
            addonLeft={ChevronUpM}
            use={'tertiary'}
            theme={'muted'}
            aria-label={'Previous error'}
          />
          <Text size={size === 'l' ? 300 : 200} color='text-critical'>
            {errorIndex === -1
              ? `${errorsCount} errors`
              : `${errorIndex + 1} out of ${errorsCount}`}
          </Text>
        </>
      )}
    </Flex>
  );
}
