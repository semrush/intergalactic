import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Radio, { RadioGroup } from '@semcore/radio';
import Select from '@semcore/select';
import Button from '@semcore/button';
import { ScreenReaderOnly } from '@semcore/flex-box';

type FormValues = {
  export?: string;
};
const defaultValues: FormValues = {
  export: 'all',
};
const Demo = () => {
  const [selectedFirst, setSelectedFirst] = React.useState(100);
  const [message, setMessage] = React.useState('');
  const { handleSubmit, control, reset, getValues } = useForm<FormValues>({
    defaultValues,
  });
  const optionsFirst = [100, 500].map((value) => ({ value, children: value }));

  const onSubmit = (data: FormValues) => {
    if (data.export === 'first') {
      data.export = `first ${selectedFirst}`;
    }
    alert(JSON.stringify(data));
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 500);
    return () => clearTimeout(timer);
  }, [message]);

  const onChangeSelect = (value: number) => {
    setSelectedFirst(value);
    if(getValues('export') !== 'first') {
      setMessage(`Selection changed to First ${value} rows`);
      reset({ export: 'first' });
    }
  };

  return (
    <Flex
      tag='form'
      onSubmit={handleSubmit(onSubmit)}
      direction='column'
      alignItems='flex-start'
      gap={4}
    >
      <ScreenReaderOnly role='status' aria-live='polite'>
        {message}
      </ScreenReaderOnly>
      <Text size={300} id='radio-group-label' tag='label'>
        Export data
      </Text>
      <Controller
        render={({ field }) => (
          <RadioGroup {...field} size='l' gap={3} aria-labelledby='radio-group-label'>
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
