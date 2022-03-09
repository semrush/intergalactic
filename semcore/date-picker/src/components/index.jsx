import React from 'react';
import dayjs from 'dayjs';
import { Component, Root, sstyled } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import ChevronLeft from '@semcore/icon/ChevronLeft/m';
import ChevronRight from '@semcore/icon/ChevronRight/m';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import ButtonTrigger from './ButtonTrigger';

export function Trigger() {
  return <Root render={Dropdown.Trigger} tag={ButtonTrigger} />;
}

export function Popper(props) {
  const SPopper = Root;
  return sstyled(props.styles)(
    <SPopper render={Dropdown.Popper} role="region" aria-label="calendar-container" />,
  );
}

export function Header(props) {
  const SHeader = Root;
  return sstyled(props.styles)(<SHeader render={Box} />);
}

export const Title = ({ Children, styles }) => {
  const STitle = Root;
  return sstyled(styles)(
    <STitle render={Box}>
      <Children />
    </STitle>,
  );
};

export function Prev() {
  return (
    <Root
      render={Button}
      use="tertiary"
      theme="muted"
      size="l"
      tabIndex={-1}
      aria-label="Prev period"
    />
  );
}

Prev.defaultProps = {
  children: <ChevronLeft />,
};

export function Next() {
  return (
    <Root
      render={Button}
      use="tertiary"
      theme="muted"
      size="l"
      tabIndex={-1}
      aria-label="Next period"
    />
  );
}

Next.defaultProps = {
  children: <ChevronRight />,
};

const stylesBtn = sstyled.css`
  SInner {
    justify-content: flex-start;
  }
`;

export class Period extends Component {
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
    const SPeriod = Root;
    const { styles, value, onChange, periods, onHighlightedChange, onDisplayedPeriodChange } =
      this.asProps;

    return sstyled(styles)(
      <SPeriod render={Box}>
        {periods.map(({ value: period, onClick, onMouseEnter, onMouseLeave, ...other }, i) => (
          <Button
            use="tertiary"
            theme="muted"
            styles={stylesBtn}
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
