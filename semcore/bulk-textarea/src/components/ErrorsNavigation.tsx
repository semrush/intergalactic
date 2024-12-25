import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ChevronUpM from '@semcore/icon/ChevronUp/m';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import { useI18n } from '@semcore/utils/lib/enhances/WithI18n';

export type ErrorsNavigationProps = {
  errorIndex: number;
  onPrevError: () => void;
  onNextError: () => void;
  errorsCount: number;
  size: 'm' | 'l';
  showErrors: boolean;
  getI18nText: ReturnType<typeof useI18n>;
};

export function ErrorsNavigation(props: ErrorsNavigationProps) {
  const { errorIndex, errorsCount, onPrevError, onNextError, size, showErrors, getI18nText } =
    props;
  const currentIndex = errorIndex + 1;
  const nextIndex = currentIndex === errorsCount || errorIndex === -1 ? 1 : currentIndex + 1;
  const prevIndex = currentIndex === 1 || errorIndex === -1 ? errorsCount : currentIndex - 1;
  return (
    <Flex alignItems='center'>
      {errorsCount > 0 && showErrors && (
        <>
          <Button
            onClick={onNextError}
            addonLeft={ChevronDownM}
            use={'tertiary'}
            theme={'muted'}
            aria-label={getI18nText('BulkTextarea.ErrorsNavigation.nextError:aria-label', {
              index: nextIndex,
            })}
            hintPlacement={'bottom'}
          />
          <Button
            onClick={onPrevError}
            addonLeft={ChevronUpM}
            use={'tertiary'}
            theme={'muted'}
            aria-label={getI18nText('BulkTextarea.ErrorsNavigation.nextError:aria-label', {
              index: prevIndex,
            })}
            hintPlacement={'bottom'}
          />
          <Text size={size === 'l' ? 300 : 200} color='text-critical' ml={1}>
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
