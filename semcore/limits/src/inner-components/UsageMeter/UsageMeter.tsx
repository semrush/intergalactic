import { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import { useUID } from '@semcore/core/lib/utils/uniqueID';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './usage-meter.shadow.css';
import type { NSUsageMeter } from './UsageMeter.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

export const MIN = 0;
export const MAX = 100;

function UsageMeter(
  props: Intergalactic.InternalTypings.InferComponentProps<NSUsageMeter.Component>,
  ref: React.Ref<HTMLDivElement>,
) {
  const SUsageMeter = Flex;
  const SUsageMeterText = Text;
  const SUsageMeterHeader = Flex;
  const SUsageMeterIndicator = Flex;
  const SUsageMeterIndicatorFilled = Flex;
  const { min = MIN, max = MAX, value = MIN, state = 'normal', theme = 'default', feature, locale } = props;
  const getI18nText = useI18n(localizedMessages, locale);

  const validatedValue = value < min ? min : value > max ? max : value;
  const filledValuePercent = (100 * validatedValue) / max;

  const labelId = `igc-${useUID('limits-usage-meter')}-indicator-label`;

  // TODO: translate "used"
  return sstyled(style)(
    <SUsageMeter ref={ref} gap={1} direction='column' theme-value={theme}>
      <SUsageMeterHeader justifyContent='space-between'>
        <SUsageMeterText size={200} id={labelId}>
          {feature}
        </SUsageMeterText>
        <SUsageMeterText size={200}>
          <SUsageMeterText fontWeight='bold'>
            {validatedValue} {getI18nText('of')} {max}
          </SUsageMeterText>
          {' '}
          used
        </SUsageMeterText>
      </SUsageMeterHeader>
      <SUsageMeterIndicator
        role='meter'
        aria-labelledby={labelId}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={validatedValue}
      >
        <SUsageMeterIndicatorFilled state-value={state} filled-value={filledValuePercent} />
      </SUsageMeterIndicator>
    </SUsageMeter>,
  );
}

export default createBaseComponent<NSUsageMeter.Component>(UsageMeter);
