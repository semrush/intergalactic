import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { DataTableGroupProps, GroupPropsInner } from './Group.type';

export class Group extends Component<DataTableGroupProps, {}, {}, [], GroupPropsInner> {
  static displayName = 'Group';
  static style = style;

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    this.forceUpdate();
  }

  render() {
    const SGroupContainer = Box;
    const SGroup = Root;
    const { styles, Children, title } = this.asProps;

    return sstyled(styles)(
      <SGroupContainer display={'contents'}>
        {this.mounted && <SGroup render={Box}>{title}</SGroup>}
        <Children />
      </SGroupContainer>,
    );
  }
}
