import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import ChevronUpM from '@semcore/icon/ChevronUp/m';
import { Text } from '@semcore/typography';
import React from 'react';

import type { BulkTextareaRootType } from '../BulkTextarea';
import type { NSBulktextarea } from '../BulkTextarea.types';

export function ErrorsNavigation(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSBulktextarea.ErrorsNavigation.Component,
    BulkTextareaRootType,
    'ErrorsNavigation'
  >,
) {
  const {
    errorIndex,
    errorsCount,
    onPrevError,
    onNextError,
    size,
    showErrors,
    getI18nText,
    disabled,
    nextButtonRef,
    prevButtonRef,
  } = props;
  return (
    <Flex alignItems='center'>
      {errorsCount > 0 && showErrors && (
        <>
          <Button
            onClick={onNextError}
            addonLeft={ChevronDownM}
            use='tertiary'
            theme='muted'
            aria-label={getI18nText('BulkTextarea.ErrorsNavigation.nextError:aria-label')}
            hintPlacement='bottom'
            disabled={disabled}
            ref={nextButtonRef}
            size={size}
          />
          <Button
            onClick={onPrevError}
            addonLeft={ChevronUpM}
            use='tertiary'
            theme='muted'
            aria-label={getI18nText('BulkTextarea.ErrorsNavigation.previousError:aria-label')}
            hintPlacement='bottom'
            disabled={disabled}
            ref={prevButtonRef}
            size={size}
          />
          <Text size={size === 'l' ? 300 : 200} color='text-critical' ml={1} disabled={disabled}>
            {errorIndex === -1
              ? getI18nText('BulkTextarea.ErrorsNavigation.totalErrors', { errorsCount })
              : getI18nText('BulkTextarea.ErrorsNavigation.selectedError', {
                  errorIndex: errorIndex + 1,
                  errorsCount,
                })}
          </Text>
        </>
      )}
    </Flex>
  );
}
