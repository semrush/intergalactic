import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import isNode from '@semcore/utils/lib/isNode';

import style from './style/widget-empty.shadow.css';

const version = preval`
  module.exports = require('../package.json').version
`;

export const getIconPath = (name) =>
  `//static.semrush.com/ui-kit/widget-empty/${version}/${name}.svg`;

class WidgetEmpty extends Component {
  static displayName = 'WidgetEmpty';
  static style = style;

  render() {
    const SWidgetEmpty = Root;
    const { Children, icon, styles } = this.asProps;
    const SImage = 'div';

    return sstyled(styles)(
      <SWidgetEmpty render={Flex}>
        {isNode(icon) && (
          <SImage>
            {typeof icon === 'string' ? (
              <img src={icon} alt="widget empty icon" width={100} height={72} />
            ) : (
              icon
            )}
          </SImage>
        )}
        <Children />
      </SWidgetEmpty>,
    );
  }
}

const Title = (props) => {
  const STitle = Root;
  const { styles } = props;
  return sstyled(styles)(<STitle render={Box} />);
};

const Description = (props) => {
  const SDescription = Root;
  const { styles } = props;
  return sstyled(styles)(<SDescription render={Box} />);
};

export default createComponent(WidgetEmpty, {
  Title,
  Description,
});
