import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Root, AbstractComponent } from '@semcore/core';
import type { DropdownPopperAriaProps } from '@semcore/dropdown';
import type {
  DropdownMenuListProps,
  DropdownMenuMenuProps,
  DropdownMenuProps,
} from '@semcore/dropdown-menu';
import Select, {
  type SelectOptionProps,
} from '@semcore/select';
import React from 'react';

import { ButtonTriggerFH } from '../../inner-components/button-trigger/ButtonTrigger';

class SelectFHRoot extends AbstractComponent {
  static displayName = 'SelectFH';

  render() {
    const SRoot = Root();
    return (
      <SRoot render={Select} />
    );
  }
}

function Trigger(props: IRootComponentProps) {
  const { Children, children: hasChildren } = props;
  const SRoot = Root();
  return (
    <SRoot render={Select.Trigger} tag={ButtonTriggerFH}>
      {hasChildren
        ? <Children />
        : (
            <>
              <SelectFH.Trigger.Addon />
              <SelectFH.Trigger.Text />
            </>
          )}
    </SRoot>
  );
}

function Menu(props: DropdownMenuMenuProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Menu} />;
}
function Option(props: SelectOptionProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Option} />;
}
function List(props: DropdownMenuListProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.List} />;
}
function Popper(props: DropdownMenuProps & DropdownPopperAriaProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Popper} />;
}

export const SelectFH = createComponent(SelectFHRoot, {
  Trigger: [Trigger, {
    Text: ButtonTriggerFH.Text,
    Addon: ButtonTriggerFH.Addon,
  }],
  Popper,
  Menu,
  Option,
  List,
});
