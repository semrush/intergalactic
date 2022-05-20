import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Radio, { RadioGroup } from '@semcore/radio';
import Checkbox from '@semcore/checkbox';
import Select from '@semcore/select';
import { ButtonTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';

const Demo = () => {
  const [selected, updateSelected] = React.useState(false);
  const [selectedValue, updateSelectedValue] = React.useState([]);
  const [selectedFirst, updateSelectedFirst] = React.useState(0);
  const defaultValues = {
    export: 'all',
  };
  const { handleSubmit, control, reset, errors, setError } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    if (data.export === 'first') {
      if (!selectedFirst) {
        setError('export', { message: 'Require enter value' });
        return;
      } else {
        data.export = 'first ' + selectedFirst;
      }
    }
    if (data.export === 'selected') {
      if (!selectedValue.length) {
        setError('export', { message: 'Require chouse value' });
        return;
      } else {
        data.export = 'selected [' + selectedValue.join(',') + ']';
      }
    }
    reset(defaultValues);
    updateSelected(false);
    updateSelectedValue([]);
    updateSelectedFirst(0);
    alert(JSON.stringify(data));
  };

  const optionsFirst = [100, 500].map((value) => ({ value, children: value }));
  const onChangeSelect = (value) => {
    reset({ export: 'first' });
    updateSelectedFirst(value);
  };
  const onChangCheckbox = (checked, e) => {
    const { value } = e.target;
    const tmpArray = checked ? [...selectedValue, value] : selectedValue.filter((v) => v !== value);
    tmpArray.length && reset({ export: 'selected' });
    updateSelectedValue(tmpArray);
  };
  const onSelectedRadio = () => {
    updateSelected(!selected);
  };

  return (
    <Flex tag="form" onSubmit={handleSubmit(onSubmit)} direction="column" alignItems="flex-start">
      <Flex direction="column" mb={4}>
        <Text size={200} tag="label" mb={4}>
          Export data
        </Text>
        <Controller
          render={({ value, ...props }) => (
            <RadioGroup {...props} value={value} size="l">
              <Radio mb={3}>
                <Radio.Value value="all" />
                <Radio.Text>All</Radio.Text>
              </Radio>
              <Radio mb={3}>
                <Radio.Value value="selected" onChange={onSelectedRadio} />
                <Radio.Text>Selected</Radio.Text>
                {selected &&
                  [100, 500].map((v) => (
                    <Checkbox
                      size="l"
                      ml={2}
                      key={v}
                      state={value.includes('selected') && errors['export'] ? 'invalid' : 'normal'}
                    >
                      <Checkbox.Value value={v} onChange={onChangCheckbox} />
                      <Checkbox.Text children={v} />
                    </Checkbox>
                  ))}
              </Radio>
              <Radio style={{ alignItems: 'center' }}>
                <Radio.Value value="first" />
                <Radio.Text>First</Radio.Text>
                <Select
                  size="l"
                  ml={2}
                  state={value.includes('first') && errors['export'] ? 'invalid' : 'normal'}
                  tag={ButtonTrigger}
                  options={optionsFirst}
                  onChange={onChangeSelect}
                />
              </Radio>
            </RadioGroup>
          )}
          control={control}
          name="export"
        />
      </Flex>

      <Button type="submit" use="primary" theme="info" size="l">
        Excel
      </Button>
    </Flex>
  );
};

export default Demo;
