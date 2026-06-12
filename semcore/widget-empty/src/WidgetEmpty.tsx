import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import type { TIllustrationNamesWidgetEmpty } from '@semcore/illustration';
import { getIllustrationPath } from '@semcore/illustration';
import React from 'react';

import style from './style/widget-empty.shadow.css';
import type { NSWidgetEmpty } from './WidgetEmpty.type';

export const getIconPath = (name: TIllustrationNamesWidgetEmpty) => getIllustrationPath(name);

class WidgetEmpty extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSWidgetEmpty.Component>
> {
  static displayName = 'WidgetEmpty';
  static style = style;

  render() {
    const SWidgetEmpty = Root;
    const { Children, icon, styles } = this.asProps;
    const SImage = 'div';

    return sstyled(styles)(
      <SWidgetEmpty render={Flex} role='status'>
        {isNode(icon) && (
          <SImage aria-hidden='true'>
            {typeof icon === 'string' ? <img src={icon} alt='' /> : icon}
          </SImage>
        )}
        <Children />
      </SWidgetEmpty>,
    );
  }
}

function Title(props: Intergalactic.InternalTypings.InferComponentProps<NSWidgetEmpty.Title.Component>) {
  const STitle = Root;
  const { styles } = props;
  return sstyled(styles)(<STitle render={Box} />);
}

function Description(props: Intergalactic.InternalTypings.InferComponentProps<NSWidgetEmpty.Description.Component>) {
  const SDescription = Root;
  const { styles } = props;
  return sstyled(styles)(<SDescription render={Box} />);
}

/**
 * WidgetEmpty
 *
 * {@link https://developer.semrush.com/intergalactic/components/widget-empty/widget-empty-api/|API} | {@link https://developer.semrush.com/intergalactic/components/widget-empty/widget-empty-code/|Examples}
 */
export default createComponent<NSWidgetEmpty.Component, typeof WidgetEmpty>(WidgetEmpty, {
  Title,
  Description,
});
