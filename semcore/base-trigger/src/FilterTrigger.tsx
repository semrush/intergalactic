import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import BaseTrigger, { IBaseTriggerProps } from './BaseTrigger';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import Dot from '@semcore/dot';
import CloseXS from '@semcore/icon/lib/Close/xs';
import ChevronDownXS from '@semcore/icon/lib/ChevronDown/xs';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import style from './style/filter-trigger.shadow.css';

export interface IFilterTriggerProps extends IBaseTriggerProps {
  /** Click on the filter cleaning cross */
  onClear?: (event: React.SyntheticEvent) => void;
}

class RootFilterTrigger extends Component<IFilterTriggerProps> {
  static displayName = 'FilterTrigger';
  static style = style;

  handleStopPropagation = (e) => e.stopPropagation();

  render() {
    const SWrapper = this.Root;
    const SFilterTrigger = BaseTrigger;
    const { Children, styles, empty, onClear, size, placeholder, active, disabled } = this.asProps;

    return styled(styles)(
      <SWrapper render={Box}>
        <NeighborLocation>
          <SFilterTrigger
            w="100%"
            size={size}
            placeholder={placeholder}
            empty={empty}
            selected={!empty}
            active={active}
            disabled={disabled}
          >
            {addonTextChildren(Children, FilterTrigger.Text, [
              FilterTrigger.Addon,
              FilterTrigger.Counter,
            ])}
            {empty && <FilterTrigger.Addon tag={ChevronDownXS} />}
          </SFilterTrigger>
          {!empty && (
            <SFilterTrigger
              tag="button"
              size={size}
              empty={empty}
              selected
              onClick={callAllEventHandlers(onClear, this.handleStopPropagation)}
              onKeyDown={this.handleStopPropagation}
              disabled={disabled}
            >
              <FilterTrigger.Addon tag={CloseXS} />
            </SFilterTrigger>
          )}
        </NeighborLocation>
      </SWrapper>,
    );
  }
}

function Counter(props) {
  const { Root: SCounter, styles } = props;
  return styled(styles)(<SCounter render={BaseTrigger.Addon} tag={Dot} />);
}

const FilterTrigger = createComponent<
  Merge<IFilterTriggerProps, HTMLAttributes<HTMLDivElement>>,
  {
    Text: ComponentProps<typeof BaseTrigger.Text>;
    Addon: ComponentProps<typeof BaseTrigger.Addon>;
    Counter: ComponentProps<typeof BaseTrigger.Addon> & ComponentProps<typeof Dot>;
  }
>(
  RootFilterTrigger,
  {
    Text: BaseTrigger.Text,
    Addon: BaseTrigger.Addon,
    Counter,
  },
  {
    parent: BaseTrigger,
  },
);

export default FilterTrigger;
