import { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { sstyled, Root, Component, createComponent } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './overlay-content.shadow.css';
import type { NSLimitsOverlayContent } from './OverlayContent.type';
import UsageMeter from '../UsageMeter/UsageMeter';

class OverlayContentRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsOverlayContent.Component>,
  typeof OverlayContentRoot.enhance
> {
  static style = style;
  static enhance = [uniqueIDEnhancement()] as const;

  static displayName = 'Limits.OverlayContent';

  render() {
    const { locale, usage, title, description, headingLevel = 3, uid, styles, children } = this.asProps;

    const titleId = `igc-${uid}-title`;

    const SOverlayContent = Root;
    const SOverlayContentUsageMeter = UsageMeter;
    const SOverlayContentHeader = Flex;
    const SOverlayContentTitle = Text;
    const SOverlayContentDescription = Text;

    return sstyled(styles)(
      <SOverlayContent
        render={Flex}
        __excludeProps={['title']}
        role='region'
        aria-labelledby={titleId}
      >
        {usage && <SOverlayContentUsageMeter locale={locale} {...usage} />}
        <SOverlayContentHeader>
          <SOverlayContentTitle tag={`h${headingLevel}`} id={titleId} size={400} semibold>
            {title}
          </SOverlayContentTitle>
          <SOverlayContentDescription size={300}>{description}</SOverlayContentDescription>
        </SOverlayContentHeader>
        {children}
      </SOverlayContent>,
    );
  }
}

const OverlayContent = createComponent<NSLimitsOverlayContent.Component, typeof OverlayContentRoot>(OverlayContentRoot);

export default OverlayContent;
