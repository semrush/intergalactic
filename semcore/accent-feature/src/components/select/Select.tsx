import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Root, Component } from '@semcore/core';
import Select from '@semcore/select';
import React from 'react';

import { ButtonTriggerAF } from '../../inner-components/button-trigger/ButtonTrigger';

class SelectAFRoot extends Component {
  static displayName = 'SelectAF';

  render() {
    return (
      <Root render={Select} />
    );
  }
}

function Trigger(props: IRootComponentProps) {
  const { Children, children: hasChildren } = props;

  return (
    <Root render={Select.Trigger} tag={ButtonTriggerAF}>
      {hasChildren
        ? <Children />
        : (
            <>
              <SelectAF.Trigger.Addon />
              <SelectAF.Trigger.Text />
            </>
          )}
    </Root>
  );
}

export const SelectAF = createComponent(SelectAFRoot, {
  Trigger: [Trigger, {
    Text: ButtonTriggerAF.Text,
    Addon: ButtonTriggerAF.Addon,
  }],
  Popper: Select.Popper,
  Menu: Select.Menu,
  Option: Select.Option,
  List: Select.List,
}) as typeof Select;
