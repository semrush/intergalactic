import React from 'react';
import { FilterTrigger } from 'intergalactic/base-trigger';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';

const options = Array(6)
  .fill(0)
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

const Demo = () => {
  const triggerRef = React.useRef<HTMLButtonElement>();
  const [selectVisible, setSelectVisible] = React.useState(false);
  const focusTrigger = React.useCallback(() => {
    triggerRef.current?.focus();
    setSelectVisible(true);
  }, []);

  return (
    <>
      <Text tag='label' htmlFor='another-filter-trigger' size={200}>
        Filter trigger with options
      </Text>
      <Box mt={2}>
        <Select visible={selectVisible} onVisibleChange={setSelectVisible}>
          <Select.Trigger tag={FilterTrigger} triggerRef={triggerRef} id='another-filter-trigger' />
          <Select.Menu>
            {options.map((option, idx) => {
              const { title } = option;
              return (
                <Select.Option value={title} key={idx}>
                  {title}
                </Select.Option>
              );
            })}
          </Select.Menu>
        </Select>
      </Box>
      <Button mt={4} onClick={focusTrigger}>
        Focus on filter trigger
      </Button>
    </>
  );
};

export default Demo;
