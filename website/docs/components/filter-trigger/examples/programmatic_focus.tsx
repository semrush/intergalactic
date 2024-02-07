import React from 'react';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

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
      <Text tag='label' htmlFor='another-filter-trigger' size={300}>
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
