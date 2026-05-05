import { Box, Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';
import Divider from '@semcore/ui/divider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import HeadingTagAccordion from '../../../../../components/accordion/docs/examples/heading_tag';
import NonCompactAccordion from '../../../../../components/accordion/docs/examples/non_compact';
import BadgeMainTypesExample from '../../../../../components/badge/docs/examples/badge_main_types';
import BreadcrumbsUsageExample from '../../../../../components/breadcrumbs/docs/examples/usage_example';
import ButtonAllButtons from '../../../../../components/button/advanced/examples/all-buttons';
import CardWithHoverExample from '../../../../../components/card/advanced/examples/card-with-hover';
import Checkboxes from '../../../../../components/checkbox/docs/examples/basic_usage';
import ColorPicker from '../../../../../components/color-picker/docs/examples/palettemanager';
import CounterAllThemesExample from '../../../../../components/counter/advanced/examples/all-themes';
import CounterInFiltersExample from '../../../../../components/counter/docs/examples/counter_in_filters';
import DatePickerDemo from '../../../../../components/date-picker/docs/examples/datepicker';
import DividerAllThemesExample from '../../../../../components/divider/advanced/examples/all-themes';
import DotAllDotsExample from '../../../../../components/dot/advanced/examples/all-dots';
import InlineNumberInput from '../../../../../components/inline-input/docs/examples/number-only_input';
import InputClear from '../../../../../components/input/docs/examples/input_with_the_clearing_ability';
import InputNumberDemo from '../../../../../components/input-number/docs/examples/range_of_values';
import InputTags from '../../../../../components/input-tags/docs/examples/entering_and_editing_tags';
import LinkColorLinksExample from '../../../../../components/link/docs/examples/color_links';
import BasicNoticeExample from '../../../../../components/notice/docs/examples/basic_notice';
import PillsBasicExample, {
  defaultProps as pillsBasicExampleDefaultProps,
} from '../../../../../components/pills/docs/examples/basic_example';
import ProgressBarAllThemesExample from '../../../../../components/progress-bar/advanced/examples/all_themes';
import Radio from '../../../../../components/radio/docs/examples/radiogroup_example';
import SelectBasic from '../../../../../components/select/docs/examples/basic_usage';
import Multiselect from '../../../../../components/select/docs/examples/multiselect';
import SkeletonAllSkeletonExample from '../../../../../components/skeleton/advanced/examples/all-skeleton';
import Slider2 from '../../../../../components/slider/docs/examples/numeric_slider';
import Slider1 from '../../../../../components/slider/docs/examples/slider_with_options';
import SpinAllSizesExample from '../../../../../components/spin/advanced/examples/all-sizes';
import Switch from '../../../../../components/switch/docs/examples/basic_example';
import TagAllTagsExample from '../../../../../components/tag/advanced/examples/all-tags';
import Textarea from '../../../../../components/textarea/docs/examples/textarea_with_auto_height';
import TimePickerDemo from '../../../../../components/time-picker/docs/examples/expanded_access_to_all_the_components';
import WidgetEmpty from '../../../../../components/widget-empty/docs/examples/nodata_example';

export function Components() {
  return (
    <Flex mt={4} gap={4} alignItems='flex-start' w='100%'>
      <Flex direction='column' gap={4} w='35%'>
        <Card w='100%'>
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
            <InputTags />
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

        <Card w='100%'>
          <Card.Header>
            <Card.Title>Controls</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column' gap={8}>
            <ButtonAllButtons />
            <LinkColorLinksExample />
            <BreadcrumbsUsageExample />
            <PillsBasicExample {...pillsBasicExampleDefaultProps} />
          </Card.Body>
        </Card>
      </Flex>

      <Flex direction='column' gap={4} w='calc(65% - 16px)'>
        <Card w='100%'>
          <Card.Header>
            <Card.Title>Status</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column' gap={8}>
            <DotAllDotsExample />
            <BadgeMainTypesExample />
            <CounterAllThemesExample />
            <Flex w='fit-content'>
              <CounterInFiltersExample />
            </Flex>
            <TagAllTagsExample />
            <SkeletonAllSkeletonExample />
            <ProgressBarAllThemesExample />
            <SpinAllSizesExample />
            <DividerAllThemesExample />
          </Card.Body>
        </Card>

        <Flex direction='column' px={4} gap={6} w='100%' aria-labelledby='components-surface-heading'>
          <Text tag='h3' size={400} id='components-surface-heading'>
            Surface
          </Text>
          <CardWithHoverExample />
          <BasicNoticeExample />
        </Flex>

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

        <Box mt={4} w='100%'>
          <WidgetEmpty />
        </Box>
      </Flex>
    </Flex>
  );
}
