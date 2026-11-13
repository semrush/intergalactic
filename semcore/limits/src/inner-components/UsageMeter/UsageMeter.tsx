import { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled, Root } from '@semcore/core';
import { Context as I18nContext, useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
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
  const SUsageMeter = Root;
  const SUsageMeterFeature = Text;
  const SUsageMeterUsage = Text;
  const SUsageMeterHeader = Flex;
  const SUsageMeterIndicator = Flex;
  const SUsageMeterIndicatorFilled = Flex;

  const { min = MIN, max = MAX, value = MIN, state = 'normal', theme = 'default', feature, locale } = props;

  const getI18nText = useI18n(localizedMessages, locale);
  const resolvedLocale = React.useContext(I18nContext) ?? locale ?? 'en';
  const numberFormatter = React.useMemo(() => new Intl.NumberFormat(resolvedLocale), [resolvedLocale]);

  const validatedValue = value < min ? min : value > max ? max : value;
  const filledValuePercent = (100 * validatedValue) / max;

  const labelId = `igc-${useUID('limits-usage-meter')}-indicator-label`;

  // TODO: translate "used"
  return sstyled(style)(
    <SUsageMeter render={Flex} ref={ref} gap={1} direction='column' theme-value={theme}>
      <SUsageMeterHeader>
        <SUsageMeterFeature size={200} id={labelId}>
          {feature}
        </SUsageMeterFeature>
        <SUsageMeterUsage size={200}>
          <Text fontWeight='bold'>
            {numberFormatter.format(validatedValue)} {getI18nText('of')} {numberFormatter.format(max)}
          </Text>
          {' '}
          used
        </SUsageMeterUsage>
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
