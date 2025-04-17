import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, sstyled } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import ChevronLeft from '@semcore/icon/ChevronLeft/m';
import ChevronRight from '@semcore/icon/ChevronRight/m';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import ButtonTrigger from './ButtonTrigger';
import InputTriggerBase from './InputTrigger';

/** @deprecated `DatePicker.ButtonTrigger` is deprecated, consider migrating to `DatePicker.Trigger` instead */
export function Trigger() {
  return <Root render={Dropdown.Trigger} tag={ButtonTrigger} />;
}

export function InputTrigger() {
  return (
    <Root
      render={Dropdown.Trigger}
      tag={InputTriggerBase}
      __excludeProps={['role', 'aria-haspopup', 'aria-expanded', 'onChange', 'value', 'id']}
    />
  );
}
InputTrigger.Indicator = InputTriggerBase.Indicator;
InputTrigger.MaskedInput = InputTriggerBase.MaskedInput;
InputTrigger.Addon = InputTriggerBase.Addon;
InputTrigger.SingleDateInput = InputTriggerBase.SingleDateInput;
InputTrigger.DateRange = InputTriggerBase.DateRange;
InputTrigger.DateRangeFromInput = InputTriggerBase.DateRangeFromInput;
InputTrigger.DateRangeToInput = InputTriggerBase.DateRangeToInput;

export function Popper(props) {
  const SPopper = Root;
  return sstyled(props.styles)(<SPopper render={Dropdown.Popper} role='dialog' />);
}

export function Header(props) {
  const SHeader = Root;
  return sstyled(props.styles)(<SHeader render={Box} />);
}

export const Title = ({ Children, styles }) => {
  const STitle = Root;
  return sstyled(styles)(
    <STitle render={Box} aria-live='polite'>
      <Children />
    </STitle>,
  );
};

export function Prev({ getI18nText, children, Children }) {
  return (
    <Root render={Button} use='tertiary' theme='muted' size='l'>
      {children ? (
        <Children />
      ) : (
        <Button.Addon>
          <ChevronLeft />
        </Button.Addon>
      )}
    </Root>
  );
}

export function Next({ getI18nText, children, Children }) {
  return (
    <Root render={Button} use='tertiary' theme='muted' size='l'>
      {children ? (
        <Children />
      ) : (
        <Button.Addon>
          <ChevronRight />
        </Button.Addon>
      )}
    </Root>
  );
}

export class Period extends Component {
  getActiveControl = (period = [], value = undefined) => {
    function compareMonth(monthOne, monthTwo) {
      return dayjs(monthOne).isSame(dayjs(monthTwo), 'date');
    }

    if (!period || !value) return false;
    if (Array.isArray(value) && period.length !== value.length) return false;
    if (Array.isArray(value)) {
      return compareMonth(period[0], value[0]) && compareMonth(period[1], value[1]);
    }

    return compareMonth(period[0], value);
  };

  render() {
    const SPeriod = Root;
    const { styles, value, onChange, periods, onHighlightedChange, onDisplayedPeriodChange } =
      this.asProps;

    return sstyled(styles)(
      <SPeriod render={Box}>
        {periods.map(({ value: period, onClick, onMouseEnter, onMouseLeave, ...other }, i) => (
          <Button
            key={i}
            use='tertiary'
            theme='muted'
            role='option'
            styles={styles}
            active={this.getActiveControl(period, value)}
            onClick={callAllEventHandlers(onClick, () => onChange(period))}
            onMouseEnter={callAllEventHandlers(onMouseEnter, () => {
              onHighlightedChange(period);
              onDisplayedPeriodChange(dayjs(period[0]).toDate());
            })}
            onMouseLeave={callAllEventHandlers(onMouseLeave, () => {
              onHighlightedChange([]);
              onDisplayedPeriodChange(value[0] ? dayjs(value[0]).toDate() : new Date());
            })}
            {...other}
          />
        ))}
      </SPeriod>,
    );
  }
}
