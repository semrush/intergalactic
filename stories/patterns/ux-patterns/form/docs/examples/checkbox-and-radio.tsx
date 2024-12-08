import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Radio, { RadioGroup } from '@semcore/radio';
import Select from '@semcore/select';
import Button from '@semcore/button';

const Demo = () => {
  const [selectedFirst, setSelectedFirst] = React.useState(100);
  const defaultValues = {
    export: 'all',
  };
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });
  const optionsFirst = [100, 500].map((value) => ({ value, children: value }));

  const onSubmit = (data: typeof defaultValues) => {
    if (data.export === 'first') {
      data.export = `first ${selectedFirst}`;
    }
    alert(JSON.stringify(data));
  };

  const onChangeSelect = (value: number) => {
    reset({ export: 'first' });
    setSelectedFirst(value);
  };

  return (
    <Flex
      tag='form'
      onSubmit={handleSubmit(onSubmit)}
      direction='column'
      alignItems='flex-start'
      gap={4}
    >
      <Text size={300} id='radio-group-label' tag='label'>
        Export data
      </Text>
      <Controller
        render={({ field: { value }, ...props }) => (
          <RadioGroup {...props} value={value} size='l' gap={3} aria-labelledby='radio-group-label'>
            <Radio mb={2} value='all' label='All' />
            <Radio>
              <Radio.Value value='selected' />
              <Radio.Text>
                Selected <Text use='secondary'>(3)</Text>
              </Radio.Text>
            </Radio>
            <Radio style={{ alignItems: 'center' }}>
              <Radio.Value value='first' />
              <Radio.Text>First</Radio.Text>
              <Select
                size='l'
                ml={2}
                options={optionsFirst}
                onChange={onChangeSelect}
                defaultValue={100}
                aria-label='Rows'
              />
            </Radio>
          </RadioGroup>
        )}
        control={control}
        name='export'
      />

      <Button type='submit' use='primary' theme='info' size='l' mt={2}>
        Export
      </Button>
    </Flex>
  );
};

export default Demo;
