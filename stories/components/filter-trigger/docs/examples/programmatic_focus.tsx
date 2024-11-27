import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';

const Demo = () => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const focusTrigger = React.useCallback(() => {
    triggerRef.current?.focus();
    triggerRef.current?.click();
  }, []);

  return (
    <>
      <Text tag='label' htmlFor='controlled-filter-trigger' id='controlled-filter-label' size={200}>
        Controlled filter
      </Text>
      <Flex gap={2} mt={2}>
        <Select>
          <Select.Trigger
            tag={FilterTrigger}
            triggerRef={triggerRef}
            id='controlled-filter-trigger'
          />
          <Select.Menu aria-labelledby='controlled-filter-label'>
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
        <Button onClick={focusTrigger}>Focus the filter trigger</Button>
      </Flex>
    </>
  );
};

const options = Array(6)
  .fill(0)
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

export default Demo;
