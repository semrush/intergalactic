import React  from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import BaseTrigger from './BaseTrigger';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import Dot from '@semcore/dot';
import CloseXS from '@semcore/icon/lib/Close/xs';
import ChevronDownXS from '@semcore/icon/lib/ChevronDown/xs';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import style from './style/filter-trigger.shadow.css';

class RootFilterTrigger extends Component {
  static displayName = 'FilterTrigger';
  static style = style;

  handleStopPropagation = (e) => e.stopPropagation();

  render() {
    const SWrapper = Root;
    const SFilterTrigger = BaseTrigger;
    const { Children, styles, empty, onClear, size, placeholder, active, disabled } = this.asProps;

    return sstyled(styles)(
      <SWrapper render={Box}>
        <NeighborLocation>
          <SFilterTrigger
            w='100%'
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
              tag='button'
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
  const SCounter = Root;
  return sstyled(props.styles)(<SCounter render={BaseTrigger.Addon} tag={Dot} />);
}

const FilterTrigger = createComponent(
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
