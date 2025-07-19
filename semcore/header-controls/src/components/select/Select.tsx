import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Root, Component } from '@semcore/core';
import Select from '@semcore/select';
import React from 'react';

import { HeaderButtonTrigger } from '../../inner-components/button-trigger/ButtonTrigger';

class HeaderSelectRoot extends Component {
  static displayName = 'HeaderSelect';

  render() {
    return (
      <Root render={Select} />
    );
  }
}

function Trigger(props: IRootComponentProps) {
  return (
    <Root render={Select.Trigger} tag={HeaderButtonTrigger} />
  );
}

export const HeaderSelect = createComponent(HeaderSelectRoot, {
  Trigger,
  Popper: Select.Popper,
  Menu: Select.Menu,
  Option: Select.Option,
  List: Select.List,
}) as typeof Select;
