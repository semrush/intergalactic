import { Box, Flex } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled, type Intergalactic } from '@semcore/core';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './dropdown-content.shadow.css';
import type { NSLimitsDropdownContent } from './DropdownContent.type';
import TrustLine from '../../../inner-components/TrustLine/TrustLine';
import UsageMeter from '../../../inner-components/UsageMeter/UsageMeter';

class DropdownContentRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsDropdownContent.Component>
> {
  static style = style;
  static displayName = 'Limits.PopperContent';

  render() {
    const SDropdownContent = Root;
    const SDropdownContentHeader = Box;
    const SDropdownContentBody = Flex;
    const SDropdownContentContent = Flex;
    const SDropdownContentTitle = Text;
    const SDropdownContentText = Text;
    const SDropdownContentUsageList = Flex;
    const SDropdownContentFooter = Flex;
    const SDropdownContentActions = Flex;

    const {
      title,
      text,
      primaryCta,
      secondaryCta,
      trustLine,
      usage,
      locale,
      styles,
    } = this.asProps;

    const usageList = Array.isArray(usage) ? usage : undefined;
    const usageHeader = usage && !Array.isArray(usage) ? usage : undefined;

    return sstyled(styles)(
      <SDropdownContent render={Flex} __excludeProps={['title']}>
        <SDropdownContentBody>
          {usageHeader && (
            <SDropdownContentHeader>
              <UsageMeter locale={locale} {...usageHeader} />
            </SDropdownContentHeader>
          )}
          <SDropdownContentContent>
            <SDropdownContentTitle tag='div' size={200} fontWeight='bold'>
              {title}
            </SDropdownContentTitle>
            <SDropdownContentText tag='div' size={200}>
              {text}
            </SDropdownContentText>
            {usageList && usageList.length > 0 && (
              <SDropdownContentUsageList>
                {usageList.map((usageProps, index) => (
                  <UsageMeter key={index} locale={locale} {...usageProps} />
                ))}
              </SDropdownContentUsageList>
            )}
          </SDropdownContentContent>
        </SDropdownContentBody>
        <SDropdownContentFooter>
          <SDropdownContentActions>
            {primaryCta}
            {secondaryCta}
          </SDropdownContentActions>
          {trustLine && <TrustLine locale={locale} {...(typeof trustLine === 'object' ? trustLine : {})} />}
        </SDropdownContentFooter>
      </SDropdownContent>,
    );
  }
}

const DropdownContent = createComponent<NSLimitsDropdownContent.Component, typeof DropdownContentRoot>(DropdownContentRoot);

export default DropdownContent;
