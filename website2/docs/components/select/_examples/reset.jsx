import React from 'react';
import Select from '@semcore/select';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import DropdownMenu from '@semcore/dropdown-menu';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    value: `Option ${idx}`,
    title: `Awesome option ${idx}`,
    smallText: `this is the small text for option ${idx}`,
  }));

const Demo = () => (
  <Flex p={10} alignItems="center" justifyContent="center">
    <Select multiselect placeholder="Select value">
      <Select.Trigger />
      <Select.Menu>
        {({ value }, action) => {
          const resetAndClose = () => {
            action.value([]);
            action.visible(false);
          };

          return (
            <React.Fragment>
              {!!value.length && (
                <DropdownMenu.Item onClick={resetAndClose}>
                  <Text color="denim-blue">Reset all</Text>
                </DropdownMenu.Item>
              )}

              {options.map((option, idx) => {
                const { value, title, smallText } = option;
                return (
                  <Select.OptionCheckbox value={value} key={idx}>
                    <div>
                      <Box mb={1}>{title}</Box>
                      <Box>
                        <Text tag="small" size={100} color="gray60">
                          {smallText}
                        </Text>
                      </Box>
                    </div>
                  </Select.OptionCheckbox>
                );
              })}
            </React.Fragment>
          );
        }}
      </Select.Menu>
    </Select>
  </Flex>
);

export default Demo;
