import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ChevronUpM from '@semcore/icon/ChevronUp/m';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';

export type ErrorsNavigationProps = {
  errorIndex: number;
  onPrevError: () => void;
  onNextError: () => void;
  errorsCount: number;
  size: 'm' | 'l';
  showErrors: boolean;
  getI18nText: ReturnType<typeof useI18n>;
  disabled: boolean;
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  prevButtonRef: React.RefObject<HTMLButtonElement>;
};

export function ErrorsNavigation(props: ErrorsNavigationProps) {
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
            use={'tertiary'}
            theme={'muted'}
            aria-label={getI18nText('BulkTextarea.ErrorsNavigation.nextError:aria-label')}
            hintPlacement={'bottom'}
            disabled={disabled}
            ref={nextButtonRef}
          />
          <Button
            onClick={onPrevError}
            addonLeft={ChevronUpM}
            use={'tertiary'}
            theme={'muted'}
            aria-label={getI18nText('BulkTextarea.ErrorsNavigation.previousError:aria-label')}
            hintPlacement={'bottom'}
            disabled={disabled}
            ref={prevButtonRef}
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
