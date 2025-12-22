import { Box, Flex } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import { getIllustrationPath } from '@semcore/illustration';
import React from 'react';

import style from './style/widget-empty.shadow.css';

export const getIconPath = (name) => getIllustrationPath(name);

class WidgetEmpty extends Component {
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

function Title(props) {
  const STitle = Root;
  const { styles } = props;
  return sstyled(styles)(<STitle render={Box} />);
}

function Description(props) {
  const SDescription = Root;
  const { styles } = props;
  return sstyled(styles)(<SDescription render={Box} />);
}

export default createComponent(WidgetEmpty, {
  Title,
  Description,
});
