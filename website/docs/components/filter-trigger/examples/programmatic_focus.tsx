import React from 'react';
import { FilterTrigger } from 'intergalactic/base-trigger';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';

const Demo = () => {
  const triggerRef = React.useRef<HTMLButtonElement>();
  const [selectVisible, setSelectVisible] = React.useState(false);
  const focusTrigger = React.useCallback(() => {
    triggerRef.current?.focus();
    setSelectVisible(true);
  }, []);

  return (
    <>
      <Text tag='label' htmlFor='controlled-filter' size={200}>
        Controlled filter
      </Text>
      <Flex gap={2} mt={2}>
        <Select visible={selectVisible} onVisibleChange={setSelectVisible}>
          <Select.Trigger tag={FilterTrigger} triggerRef={triggerRef} id='controlled-filter' />
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
