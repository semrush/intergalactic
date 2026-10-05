import { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, sstyled, Component, createComponent } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import logger from '@semcore/core/lib/utils/logger';
import DiffDown from '@semcore/icon/DiffDown/m';
import DiffUp from '@semcore/icon/DiffUp/m';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSMetric } from './Metric.type';

class MetricRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSMetric.Component>
> {
  static displayName = 'Metric';

  getDiffColor() {
    const { diffUse } = this.asProps;

    switch (diffUse) {
      case 'good': {
        return 'var(--intergalactic-text-success)';
      }
      case 'bad': {
        return 'var(--intergalactic-text-critical)';
      }
      default: {
        return 'var(--intergalactic-text-secondary)';
      }
    }
  }

  render(): React.ReactNode {
    const SMetric = Root;
    const { styles, value, diffValue, href, diffIcon: DiffIcon } = this.asProps;

    return sstyled(styles)(
      <SMetric render={Flex} gap={1} alignItems='baseline' __excludeProps={['value', 'href']}>
        {href
          ? (<Link href={href}><Link.Text size={500} bold>{value}</Link.Text></Link>)
          : (<Text size={500} bold>{value}</Text>)}
        <Text size={100} color={this.getDiffColor()}>
          {DiffIcon && <DiffIcon height='8px' />}
          {diffValue}
        </Text>
      </SMetric>,
    );
  }
}

/**
 * Metric
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/chart-legend/chart-legend-code}
 */
const Metric = createComponent<
  NSMetric.Component,
  typeof MetricRoot
>(MetricRoot);

export default Metric;
