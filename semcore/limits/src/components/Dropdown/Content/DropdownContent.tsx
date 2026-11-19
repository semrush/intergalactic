import { Box, Flex } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled, type Intergalactic } from '@semcore/core';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './dropdown-content.shadow.css';
import type { NSLimitsPopperContent } from './DropdownContent.type';
import TrustLine from '../../../inner-components/TrustLine/TrustLine';
import UsageMeter from '../../../inner-components/UsageMeter/UsageMeter';

class PopperContentRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsPopperContent.Component>
> {
  static style = style;
  static displayName = 'Limits.PopperContent';

  render() {
    const SPopper = Root;
    const SPopperHeader = Box;
    const SPopperBody = Flex;
    const SPopperContent = Flex;
    const SPopperTitle = Text;
    const SPopperText = Text;
    const SPopperUsageList = Flex;
    const SPopperFooter = Flex;
    const SPopperActions = Flex;

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
      <SPopper render={Flex} __excludeProps={['title']}>
        <SPopperBody>
          {usageHeader && (
            <SPopperHeader>
              <UsageMeter locale={locale} {...usageHeader} />
            </SPopperHeader>
          )}
          <SPopperContent>
            <SPopperTitle tag='div' size={200} fontWeight='bold'>
              {title}
            </SPopperTitle>
            <SPopperText tag='div' size={200}>
              {text}
            </SPopperText>
            {usageList && usageList.length > 0 && (
              <SPopperUsageList>
                {usageList.map((usageProps, index) => (
                  <UsageMeter key={index} locale={locale} {...usageProps} />
                ))}
              </SPopperUsageList>
            )}
          </SPopperContent>
        </SPopperBody>
        <SPopperFooter>
          <SPopperActions>
            {primaryCta}
            {secondaryCta}
          </SPopperActions>
          {trustLine && <TrustLine locale={locale} {...(typeof trustLine === 'object' ? trustLine : {})} />}
        </SPopperFooter>
      </SPopper>,
    );
  }
}

const PopperContent = createComponent<NSLimitsPopperContent.Component, typeof PopperContentRoot>(PopperContentRoot);

export default PopperContent;
