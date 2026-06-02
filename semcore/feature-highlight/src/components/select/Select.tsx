import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Root, Component } from '@semcore/core';
import Select from '@semcore/select';
import React from 'react';

import { ButtonTriggerFH } from '../../inner-components/button-trigger/ButtonTrigger';

class SelectFHRoot extends Component {
  static displayName = 'SelectFH';

  render() {
    return (
      <Root render={Select} />
    );
  }
}

function Trigger(props: IRootComponentProps) {
  const { Children, children: hasChildren } = props;

  return (
    <Root render={Select.Trigger} tag={ButtonTriggerFH}>
      {hasChildren
        ? <Children />
        : (
            <>
              <SelectFH.Trigger.Addon />
              <SelectFH.Trigger.Text />
            </>
          )}
    </Root>
  );
}

/**
 * Select FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#select|Docs}
 */
export const SelectFH: typeof Select = createComponent<
  typeof Select,
  typeof SelectFHRoot
>(SelectFHRoot, {
  Trigger: [Trigger, {
    Text: ButtonTriggerFH.Text,
    Addon: ButtonTriggerFH.Addon,
  }],
  Popper: Select.Popper,
  Menu: Select.Menu,
  Option: Select.Option,
  List: Select.List,
});
