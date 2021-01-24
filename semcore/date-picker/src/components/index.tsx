import React, { ComponentProps } from 'react';
import dayjs from 'dayjs';

import { Component, css, styled } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box, IBoxProps } from '@semcore/flex-box';
import Button from '@semcore/button';
import ChevronLeft from '@semcore/icon/lib/ChevronLeft/xs';
import ChevronRight from '@semcore/icon/lib/ChevronRight/xs';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import ButtonTrigger from './ButtonTrigger';
import { DateConstructorParams } from './Calendar';

export interface IDateRangePickerPeriodProps extends IBoxProps {
  /**
   * Current selected period
   * */
  value?: DateConstructorParams[];
  /**
   * To be activated by clicking the button for switching the selected period.
   * */
  onChange?: (date: Date[]) => void;
  /**
   * To be activated by hovering a cursor over the button for changing the current displayed month.
   * */
  onDisplayedPeriodChange?: (date: Date) => void;
  /**
   * To be activated by hovering a cursor over the button for selecting the dates.
   * */
  onHighlightedChange?: (date: Date[]) => void;
  /**
   * Array of periods
   * [{value: [new Date(), new Date()], children: "Today"}]
   * @default Past 2 days / Past week / Past 2 week / Past month / Past 2 month
   * */
  periods?: (ComponentProps<typeof Button> & { value: Date[] })[];
}

export function Trigger({ Root }) {
  return <Root render={Dropdown.Trigger} tag={ButtonTrigger} />;
}

export function Popper(props) {
  const { Root: SPopper, styles } = props;
  return styled(styles)(<SPopper render={Dropdown.Popper} />);
}

export function Header(props) {
  const { Root: SHeader, styles } = props;

  return styled(styles)(<SHeader render={Box} />);
}

export const Title = (props) => {
  const { Root: STitle, styles } = props;

  return styled(styles)(<STitle render={Box} />);
};

export function Prev({ Root }) {
  return <Root render={Button} use="tertiary" theme="muted" size="l" />;
}

Prev.defaultProps = {
  children: <ChevronLeft />,
};

export function Next({ Root }) {
  return <Root render={Button} use="tertiary" theme="muted" size="l" />;
}

Next.defaultProps = {
  children: <ChevronRight />,
};

export class Period extends Component<IDateRangePickerPeriodProps> {
  getActiveControl = (period = [], value) => {
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
    const SPeriod = this.Root;
    const {
      styles,
      value,
      onChange,
      periods,
      onHighlightedChange,
      onDisplayedPeriodChange,
    } = this.asProps;

    return styled(styles)(
      <SPeriod render={Box}>
        {periods.map(({ value: period, onClick, onMouseEnter, onMouseLeave, ...other }, i) => (
          <Button
            use="tertiary"
            theme="muted"
            styles={css`
              SInner {
                justify-content: flex-start;
              }
            `}
            key={i}
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
