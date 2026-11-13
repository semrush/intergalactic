import { Flex } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createBaseComponent } from '@semcore/core';
import { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import InfoM from '@semcore/icon/Info/m';
import { DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSLimitsTrustLine } from './TrustLine.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

const displayName = 'Limits.TrustLine';

function TrustLine(
  props: Intergalactic.InternalTypings.InferComponentProps<NSLimitsTrustLine.Component>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { description, locale } = props;
  const getI18nText = useI18n(localizedMessages, locale);

  // TODO: translate "Cancel anytime"
  // TODO: aria-labels for trigger and popper
  return (
    <Flex ref={ref} gap={1} data-ui-name={displayName}>
      <Text use='secondary' size={200}>{getI18nText('cancelAnytime')}</Text>
      {Boolean(description) && (
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            addonLeft={InfoM}
            color='icon-secondary-neutral'
            aria-label={getI18nText('cancelAnytimeDetails')}
          />
          <DescriptionTooltip.Popper aria-label={getI18nText('cancelAnytimeDetails')}>
            {description}
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      )}
    </Flex>
  );
}

export default createBaseComponent<NSLimitsTrustLine.Component>(TrustLine);
