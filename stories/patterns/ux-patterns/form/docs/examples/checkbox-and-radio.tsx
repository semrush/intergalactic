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
  const [selectedValue, setSelectedValue] = React.useState<string[]>([]);
  const [selectedFirst, setSelectedFirst] = React.useState(0);
  const [selectInFocus, setSelectInFocus] = React.useState(false);
  const defaultValues = {
    export: 'all',
  };
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data: typeof defaultValues) => {
    if (data.export === 'first') {
      if (!selectedFirst) {
        setError('export', { message: 'Require enter value' });
        return;
      } else {
        data.export = `first ${selectedFirst}`;
      }
    }
    if (data.export === 'selected') {
      if (!selectedValue.length) {
        setError('export', { message: 'Require choose value' });
        return;
      } else {
        data.export = `selected [${selectedValue.join(',')}]`;
      }
    }
    reset(defaultValues);
    setSelectedValue([]);
    setSelectedFirst(0);
    alert(JSON.stringify(data));
  };

  const optionsFirst = [100, 500].map((value) => ({ value, children: value }));
  const onChangeSelect = (value: number) => {
    reset({ export: 'first' });
    setSelectedFirst(value);
  };
  const onChangeCheckbox = (
    checked: boolean,
    e?: React.SyntheticEvent<HTMLInputElement, Event>,
  ) => {
    const value = e?.currentTarget.value;

    const currentSelectedValue = [...selectedValue];
    if (value !== undefined) {
      currentSelectedValue.push(value);
    }

    const tmpArray = checked
      ? currentSelectedValue
      : currentSelectedValue.filter((v) => v !== value);

    tmpArray.length && reset({ export: 'selected' });
    setSelectedValue(tmpArray);
  };

  return (
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start'>
      <Flex direction='column' mb={4}>
        <Text size={300} tag='label' mb={4}>
          Export data
        </Text>
        <Controller
          render={({ field: { value, onChange }, ...props }) => {
            return (
              <RadioGroup {...props} value={value} onChange={(_v, e) => onChange(e)} size='l'>
                <Radio mb={3}>
                  <Radio.Value value='all' />
                  <Radio.Text>All</Radio.Text>
                </Radio>
                <Radio mb={3}>
                  <Radio.Value value='selected' />
                  <Radio.Text>Selected</Radio.Text>
                  {value === 'selected' &&
                    [100, 500].map((v) => (
                      <Checkbox
                        size='l'
                        ml={2}
                        key={v}
                        state={
                          value.includes('selected') && errors['export'] ? 'invalid' : 'normal'
                        }
                      >
                        <Checkbox.Value value={v} onChange={onChangeCheckbox} />
                        <Checkbox.Text children={v} />
                      </Checkbox>
                    ))}
                </Radio>
                <Radio style={{ alignItems: 'center' }}>
                  <Radio.Value value='first' />
                  <Radio.Text>First</Radio.Text>

                  <Select
                    size='l'
                    ml={2}
                    state={value.includes('first') && errors['export'] ? 'invalid' : 'normal'}
                    tag={ButtonTrigger}
                    options={optionsFirst}
                    onChange={onChangeSelect}
                  />
                </Radio>
              </RadioGroup>
            );
          }}
          control={control}
          name='export'
        />
      </Flex>

      <Button type='submit' use='primary' theme='info' size='l'>
        Excel
      </Button>
    </Flex>
  );
};

export default Demo;
