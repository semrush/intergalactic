import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index, // value of the selected option
    label: `Option ${index}`, // the value displayed in the trigger when the option is selected
    children: `Option ${index}`, // option's children displayed in the dropdown
  }));

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  const handleVisibility = (visible: boolean) => {
    console.log(visible);

    setVisible(visible);
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='basic-select'>
        Basic select
      </Text>
      <Select
        visible={visible}
        onVisibleChange={handleVisibility}
        mt={2}
        mr='auto'
        options={options}
        placeholder='Select option'
        id='basic-select'
      />
    </Flex>
  );
};

export default Demo;
