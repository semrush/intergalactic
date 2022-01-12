import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from '@semcore/select';
import NeighborLocation from '@semcore/neighbor-location';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Input from '@semcore/input';
import Tooltip from '@semcore/tooltip';
import CloseXS from '@semcore/icon/Close/m';
import CalendarM from '@semcore/icon/Calendar/m';
import Flag, { iso2Name } from '@semcore/flags';
import InputMask, { getAfterPositionValue } from '@semcore/input-mask';
import TimePicker from '@semcore/time-picker';
import InputTags from '@semcore/input-tags';
import Radio, { RadioGroup } from '@semcore/radio';
import Checkbox from '@semcore/checkbox';
import Textarea from '@semcore/textarea';
import Button from '@semcore/button';
import dayjs from 'dayjs';

const CountryCodes = {
  RU: { name: 'Russia', dial_code: '+7', code: 'RU' },
  US: { name: 'United States', dial_code: '+1', code: 'US' },
};

const selectOptions = ['Option 1', 'Option 2'];

const listActuallyCountryCodes = Object.keys(CountryCodes)
  .filter((iso2) => iso2Name[iso2])
  .reduce((acc, iso2) => {
    return { ...acc, [CountryCodes[iso2].name]: CountryCodes[iso2] };
  }, {});

export default function App() {
  const { register, handleSubmit, control, errors } = useForm({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const inputMaskRef = useRef(null);
  const [filter, updateFilterValue] = useState('');
  const [option, updateOption] = useState(listActuallyCountryCodes['Russia']);
  const [value, updateValue] = useState(option.dial_code);
  const [valueMask, updateValueMask] = useState(`${option.dial_code} (___)___-____`);
  const [valueInput, setValueInput] = useState('');
  const [valueBigInput, setValueBigInput] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [valueTime, setValueTime] = useState('');
  const [tags, updateTags] = useState(['vk', 'fk', 'twitter', 'instagram']);
  const [valueTag, updateValueTag] = useState('');
  const [valueSelect, setValueSelect] = useState(null);
  const [valueRadio, setValueRadio] = useState('');
  const [checked, setChecked] = useState(false);

  let country;

  const options = selectOptions.map((option) => ({
    value: option,
    children: option,
  }));

  useEffect(() => {
    updateValueMask(`${option.dial_code} (___)___-____`);
  }, [option]);

  useEffect(() => {
    if (value === valueMask) {
      const position = getAfterPositionValue(value);
      inputMaskRef?.current.setSelectionRange(position, position);
    }
  }, [value, valueMask]);

  const handleAddTag = (value) => {
    updateTags((tags) => [...tags, value]);
    updateValueTag('');
  };
  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    updateTags(tags.slice(0, -1));
    updateValueTag(tags.slice(-1)[0] + ` ${valueTag}`);
  };
  const handleCloseTag = (e) => {
    const { dataset } = e.currentTarget;
    updateTags(tags.filter((tag, ind) => ind !== Number(dataset.id)));
  };

  const isDateInvalid = useCallback(
    (date) => {
      return dayjs(date).isValid();
    },
    [valueTime],
  );

  const onSubmit = (data) => {
    confirm(`Will be send ${JSON.stringify(data)}`);
  };

  return (
    <div>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit"*/}
      <Box tag="form" w={390} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Flex direction="column" mb={4}>
          <Text size={100}>Label</Text>
          <Tooltip
            interaction={errors['inputControl'] ? 'focus' : 'none'}
            placement="right"
            theme="warning"
            title="You need to feel this useless field"
          >
            <Controller
              as={
                <Input mr={4} mt={1} w={390} state={errors['inputControl'] ? 'invalid' : 'normal'}>
                  <Input.Value
                    value={valueInput}
                    onChange={setValueInput}
                    placeholder="placeholder"
                  />
                </Input>
              }
              control={control}
              rules={{ required: true, validate: (value) => value !== '' }}
              name="inputControl"
              defaultValue=""
            />
          </Tooltip>
        </Flex>

        <Flex direction="column" mb={4}>
          <Text size={100}>Label</Text>
          <Tooltip
            interaction={errors['inputBig'] ? 'focus' : 'none'}
            placement="right"
            theme="warning"
            title="You need to feel this useless field"
          >
            <Textarea
              w={390}
              minRows={4}
              maxRows={10}
              ref={register({ required: true, validate: (value) => value !== '' })}
              placeholder="placeholder"
              value={valueBigInput}
              onChange={setValueBigInput}
              name="inputBig"
              state={errors['inputBig'] ? 'invalid' : 'normal'}
            />
          </Tooltip>
        </Flex>

        <Flex direction="column" mb={4}>
          <Text size={100}>Date</Text>
          <Tooltip
            interaction={errors['inputDate'] ? 'focus' : 'none'}
            placement="right"
            theme="warning"
            title="You need to feel this useless field"
          >
            <InputMask mr={4} mt={1} w={390} state={errors['inputDate'] ? 'invalid' : 'normal'}>
              <Input.Addon tag={CalendarM} />
              <InputMask.Value
                name="inputDate"
                ref={register({ required: true, validate: (value) => isDateInvalid(value) })}
                mask="99.99.9999"
                value={valueDate}
                onChange={setValueDate}
                placeholder="dd.mm.yyyy"
                onSuccess={isDateInvalid}
              />
            </InputMask>
          </Tooltip>
        </Flex>

        <Tooltip
          interaction={errors['timepicker'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title="You need to choose the time"
        >
          <Controller
            as={
              <TimePicker
                value={valueTime}
                onChange={setValueTime}
                state={errors['timepicker'] ? 'invalid' : 'normal'}
                w={120}
                mb={4}
              >
                <TimePicker.Hours />
                <TimePicker.Separator />
                <TimePicker.Minutes />
                <TimePicker.Format
                  style={
                    errors['timepicker'] ? { borderColor: '#ff7f00' } : { borderColor: '#a6b0b3' }
                  }
                />
              </TimePicker>
            }
            control={control}
            rules={{ required: true, validate: (value) => value !== '' }}
            name="timepicker"
            defaultValue=""
          />
        </Tooltip>
        <br />

        <Tooltip
          interaction={errors['inputPhone'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title="You need to enter the phone number"
        >
          <NeighborLocation controlsLength={2}>
            <Select
              value={option}
              state={errors['inputPhone'] ? 'invalid' : 'normal'}
              onChange={(value) => {
                country = listActuallyCountryCodes[value];
                updateOption(country);
                updateValue(country.dial_code);
                inputMaskRef?.current.focus();
              }}
            >
              <Select.Trigger>
                <Flag iso2={option.code} />
              </Select.Trigger>
              <Select.Popper>
                <>
                  <Select.InputSearch
                    cleared
                    placeholder="Search"
                    value={filter}
                    onChange={updateFilterValue}
                  />
                  <Select.List hMax="240px" w="232px">
                    {Object.keys(listActuallyCountryCodes)
                      .filter((countryName) => countryName.toLowerCase().includes(filter))
                      .map((countryName) => (
                        <Select.Option key={countryName} value={countryName}>
                          <Text size={200} mr={2} style={{ flexShrink: 0 }}>
                            <Flag iso2={listActuallyCountryCodes[countryName].code} />
                          </Text>
                          <Text size={200} mr={2}>
                            {countryName}
                          </Text>
                          <Text size={200} color="gray60">
                            {listActuallyCountryCodes[countryName].dial_code}
                          </Text>
                        </Select.Option>
                      ))}
                  </Select.List>
                </>
              </Select.Popper>
            </Select>
            <Controller
              as={
                <InputMask w={180} state={errors['inputPhone'] ? 'invalid' : 'normal'}>
                  <InputMask.Value
                    ref={inputMaskRef}
                    value={value}
                    onChange={updateValue}
                    mask={valueMask.replace(/_/g, '9')}
                  />
                  {value !== valueMask && (
                    <Input.Addon
                      interactive
                      tag={CloseXS}
                      onClick={() => {
                        updateValue(valueMask);
                      }}
                    />
                  )}
                </InputMask>
              }
              control={control}
              rules={{ required: true, validate: (value) => !/_/i.test(value) }}
              name="inputPhone"
              defaultValue={null}
            />
          </NeighborLocation>
        </Tooltip>
        <br />

        <Tooltip
          interaction={errors['inputTag'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title="You need to feel this useless field"
        >
          <Controller
            as={
              <InputTags
                my={4}
                h={80}
                w={390}
                size="l"
                state={errors['inputTag'] ? 'invalid' : 'normal'}
                onAdd={handleAddTag}
                onRemove={handleRemoveTag}
              >
                {tags.map((tag, idx) => (
                  <Tooltip key={idx}>
                    <Tooltip.Trigger tag={InputTags.Tag} use="primary" theme="asphalt" editable>
                      <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                      <InputTags.Tag.Close data-id={idx} onClick={handleCloseTag} />
                    </Tooltip.Trigger>
                    <Tooltip.Popper>tag</Tooltip.Popper>
                  </Tooltip>
                ))}
                <InputTags.Value value={valueTag} onChange={updateValueTag} />
              </InputTags>
            }
            control={control}
            name="inputTag"
            rules={{ required: true, validate: (value) => value !== [] }}
            defaultValue={tags === [] ? null : tags}
          />
        </Tooltip>

        <Flex direction="column" mb={4}>
          <Text size={100}>Label</Text>
          <Tooltip
            interaction={errors['select'] ? 'focus' : 'none'}
            placement="right"
            theme="warning"
            title="You need to choose something"
          >
            <Controller
              as={
                <Select
                  mr={4}
                  mt={1}
                  w={390}
                  value={valueSelect}
                  onChange={setValueSelect}
                  state={errors['select'] ? 'invalid' : 'normal'}
                  options={options}
                  placeholder="Select"
                />
              }
              control={control}
              rules={{ required: true, validate: (value) => value !== '' }}
              name="select"
              defaultValue={null}
            />
          </Tooltip>
        </Flex>

        <Tooltip
          interaction={errors['radioButton'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title="Please choose something from the list"
        >
          <Controller
            as={
              <RadioGroup
                mb={4}
                name="radio"
                state={errors['radioButton'] ? 'invalid' : 'normal'}
                value={valueRadio}
                onChange={setValueRadio}
              >
                <Radio mr={2}>
                  <Radio.Value value="1" />
                  <Radio.Text>Option 1</Radio.Text>
                </Radio>
                <Radio mr={2} mt={2}>
                  <Radio.Value value="2" />
                  <Radio.Text>Option 2</Radio.Text>
                </Radio>
              </RadioGroup>
            }
            control={control}
            name="radioButton"
            rules={{ required: true }}
            defaultValue={null}
          />
        </Tooltip>
        <br />

        <Tooltip
          interaction={errors['checkbox'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title="Please check this field"
        >
          <Checkbox mb={4} mt={4} state={errors['checkbox'] ? 'invalid' : 'normal'}>
            <Checkbox.Value
              checked={checked}
              name="checkbox"
              ref={register({ required: true })}
              onChange={setChecked}
            />
            <Checkbox.Text>label</Checkbox.Text>
          </Checkbox>
        </Tooltip>
        <br />

        <Button type="submit">Submit</Button>
      </Box>
    </div>
  );
}
