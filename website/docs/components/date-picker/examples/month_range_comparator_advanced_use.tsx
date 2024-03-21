import React from 'react';
import { MonthDateRangeComparator } from 'intergalactic/date-picker';
import { Flex } from 'intergalactic/flex-box';
import Notice from 'intergalactic/notice';
import WarningIcon from 'intergalactic/icon/Warning/m';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  return (
    <Flex flexWrap>
      <MonthDateRangeComparator>
        <MonthDateRangeComparator.Trigger />
        <MonthDateRangeComparator.Popper>
          <MonthDateRangeComparator.Header>
            <MonthDateRangeComparator.ValueDateRange />
            <MonthDateRangeComparator.CompareToggle />
            <MonthDateRangeComparator.CompareDateRange />
          </MonthDateRangeComparator.Header>
          <MonthDateRangeComparator.Body>
            <MonthDateRangeComparator.RangeCalendar />
            <MonthDateRangeComparator.Periods>
              <MonthDateRangeComparator.Periods.Divider />
              <MonthDateRangeComparator.Periods.Column>
                <MonthDateRangeComparator.Periods.Options />
                <MonthDateRangeComparator.Periods.Controls>
                  <MonthDateRangeComparator.Apply />
                  <MonthDateRangeComparator.Reset />
                </MonthDateRangeComparator.Periods.Controls>
              </MonthDateRangeComparator.Periods.Column>
            </MonthDateRangeComparator.Periods>
          </MonthDateRangeComparator.Body>
          <MonthDateRangeComparator.Footer>
            Place for a hint, useful message or controls.
          </MonthDateRangeComparator.Footer>
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
        </MonthDateRangeComparator.Popper>
      </MonthDateRangeComparator>
    </Flex>
  );
};

export default Demo;
