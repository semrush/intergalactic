import React, { Component } from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import TooltipUI from '@semcore/tooltip';
import Checkbox from '@semcore/checkbox';
import TabLine from '@semcore/tab-line';
import Dropdown from '@semcore/dropdown';
import Switch from '@semcore/switch';
import InfoXS from '@semcore/icon/lib/Info/xs';
import SettingsS from '@semcore/icon/lib/Settings/s';
import { colors } from '@semcore/chart';

class Demo extends Component {
  render() {
    return (
      <Box my={6} pt={5} pb={6} px={6} style={{ border: '1px solid #cccccc', borderRadius: '2px' }}>
        <Box>
          <Flex mb={2} alignItems="center">
            <Text size={400}>Chart heading</Text>
            <TooltipUI title="This is just an example of line chart">
              <InfoXS ml={1} color="stone" cursor="help" />
            </TooltipUI>
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger tag={SettingsS} ml="auto" color="stone" interactive />
              <Dropdown.Popper>
                <Box p={3}>
                  <Text size={100} bold mb={3}>
                    Chart appearance
                  </Text>
                  <Flex py={1} alignItems="center">
                    <Box size={100} mr="3">
                      Smooth line
                    </Box>
                    <Box ml="auto">
                      <Switch size="m" theme="success">
                        <Switch.Value />
                      </Switch>
                    </Box>
                  </Flex>
                  <Flex py={1} alignItems="center">
                    <Box size={100} mr="3">
                      Dots
                    </Box>
                    <Box ml="auto">
                      <Switch size="m" theme="success">
                        <Switch.Value />
                      </Switch>
                    </Box>
                  </Flex>
                </Box>
              </Dropdown.Popper>
            </Dropdown>
          </Flex>
          <Text size={200} color="gray60" mb={3} tag="div">
            Subinfo about data represented on the chart (optional)
          </Text>
          <Flex mt={3} mb={6} alignItems="center" justifyContent="space-between">
            <Flex>
              <Box mr={4}>
                <Checkbox theme={colors['yellow-01']} size="m">
                  <Checkbox.Value />
                  <Checkbox.Text>Organic traffic</Checkbox.Text>
                </Checkbox>
              </Box>
              <Box mr={4}>
                <Checkbox theme={colors['violet-01']} size="m">
                  <Checkbox.Value />
                  <Checkbox.Text>Paid traffic</Checkbox.Text>
                </Checkbox>
              </Box>
            </Flex>
            <div>
              <TabLine value={'1'} underlined={false}>
                <TabLine.Item value="1" mx={2}>
                  <Box pb={1}>1M</Box>
                </TabLine.Item>
                <TabLine.Item value="3" mx={2}>
                  <Box pb={1}>3M</Box>
                </TabLine.Item>
                <TabLine.Item value="6" mx={2}>
                  <Box pb={1}>6M</Box>
                </TabLine.Item>
                <TabLine.Item value="12" mx={2}>
                  <Box pb={1}>1Y</Box>
                </TabLine.Item>
                <TabLine.Item value="all" mx={2}>
                  <Box pb={1}>All time</Box>
                </TabLine.Item>
              </TabLine>
            </div>
          </Flex>
        </Box>
        {/* CHARTS */}
      </Box>
    );
  }
}

export default Demo;
