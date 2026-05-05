import { Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import Divider from '@semcore/ui/divider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import HeadingTagAccordion from '../../../../../../components/accordion/docs/examples/heading_tag';
import NonCompactAccordion from '../../../../../../components/accordion/docs/examples/non_compact';
import CarouselStory from '../../../../../../components/carousel/docs/examples/carousel_with_default_indicators';
import Checkboxes from '../../../../../../components/checkbox/docs/examples/basic_usage';
import ColorPicker from '../../../../../../components/color-picker/docs/examples/palettemanager';
import DatePickerDemo from '../../../../../../components/date-picker/docs/examples/datepicker';
import InlineNumberInput from '../../../../../../components/inline-input/docs/examples/number-only_input';
import InputClear from '../../../../../../components/input/docs/examples/input_with_the_clearing_ability';
import InputNumberDemo from '../../../../../../components/input-number/docs/examples/range_of_values';
import InputTags from '../../../../../../components/input-tags/docs/examples/entering_and_editing_tags';
import Radio from '../../../../../../components/radio/docs/examples/radiogroup_example';
import SelectBasic from '../../../../../../components/select/docs/examples/basic_usage';
import Multiselect from '../../../../../../components/select/docs/examples/multiselect';
import Slider2 from '../../../../../../components/slider/docs/examples/numeric_slider';
import Slider1 from '../../../../../../components/slider/docs/examples/slider_with_options';
import Switch from '../../../../../../components/switch/docs/examples/basic_example';
import Textarea from '../../../../../../components/textarea/docs/examples/textarea_with_auto_height';
import TimePickerDemo from '../../../../../../components/time-picker/docs/examples/expanded_access_to_all_the_components';

export function Form() {
  const columnStyle = { flex: '1 1 calc(50% - 8px)', minWidth: 0, maxWidth: 'calc(50% - 8px)' } as const;

  return (
    <Flex mt={4} gap={4} alignItems='flex-start' w='100%' flexWrap>
      <Card w='100%' style={columnStyle}>
        <Card.Header>
          <Card.Title innerHint='Something'>Form</Card.Title>
        </Card.Header>
        <Card.Body tag={Flex} direction='column' gap={6}>
          <SelectBasic />
          <Multiselect />
          <DatePickerDemo />
          <TimePickerDemo />
          <InputClear />
          <Textarea />
          <InputTags size='m' />
          <InputNumberDemo />
          <InlineNumberInput />
          <Divider my={4} />
          <Checkboxes />
          <Radio />
          <Switch />
          <ColorPicker />
          <Slider1 />
          <Slider2 />
        </Card.Body>
      </Card>

      <Flex direction='column' gap={4} style={columnStyle}>
        <Card w='100%'>
          <Card.Header>
            <Card.Title tag='h3'>FAQ</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column'>
            <NonCompactAccordion />
            <Text size={300} my={3} semibold>
              Accordion with heading tag
            </Text>
            <HeadingTagAccordion />
          </Card.Body>
        </Card>

        <Card w='100%'>
          <Card.Body tag={Flex} gap={4} alignItems='flex-start'>
            <CarouselStory />
            <Text>
              Description of carousel...
            </Text>
          </Card.Body>
        </Card>
      </Flex>
    </Flex>
  );
}
