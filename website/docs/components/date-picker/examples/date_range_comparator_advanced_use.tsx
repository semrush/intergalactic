import React from 'react';
import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/ui/date-picker';
import { Flex } from '@semcore/ui/flex-box';
import Notice from '@semcore/ui/notice';
import WarningIcon from '@semcore/ui/icon/Warning/m';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  return (
    <Flex flexWrap>
      <DateRangeComparator>
        <DateRangeComparator.Trigger />
        <DateRangeComparator.Popper>
          <DateRangeComparator.Header>
            <DateRangeComparator.ValueDateRange />
            <DateRangeComparator.CompareToggle />
            <DateRangeComparator.CompareDateRange />
          </DateRangeComparator.Header>
          <DateRangeComparator.Body>
            <DateRangeComparator.RangeCalendar />
            <DateRangeComparator.Periods>
              <DateRangeComparator.Periods.Divider />
              <DateRangeComparator.Periods.Column>
                <DateRangeComparator.Periods.Options />
                <DateRangeComparator.Periods.Controls>
                  <DateRangeComparator.Apply />
                  <DateRangeComparator.Reset />
                </DateRangeComparator.Periods.Controls>
              </DateRangeComparator.Periods.Column>
            </DateRangeComparator.Periods>
          </DateRangeComparator.Body>
          <DateRangeComparator.Footer>
            Place for a hint, useful message or controls.
          </DateRangeComparator.Footer>
          <Notice theme='warning' style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <Notice.Content>
              <Flex mb={1}>
                <Notice.Label>
                  <WarningIcon />
                </Notice.Label>
                <Text bold>Notice heading</Text>
              </Flex>
              If you change your location, all previously collected data for this article will be
              lost.
            </Notice.Content>
          </Notice>
        </DateRangeComparator.Popper>
      </DateRangeComparator>
    </Flex>
  );
};

export default Demo;
