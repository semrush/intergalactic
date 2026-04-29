import { Box, Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import Divider from '@semcore/ui/divider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import BadgeMainTypesExample from '../../../../../../components/badge/docs/examples/badge_main_types';
import BreadcrumbsUsageExample from '../../../../../../components/breadcrumbs/docs/examples/usage_example';
import ButtonAllButtons from '../../../../../../components/button/tests/examples/all-buttons';
import CardWithHoverExample from '../../../../../../components/card/tests/examples/card_with_hover';
import Checkboxes from '../../../../../../components/checkbox/docs/examples/basic_usage';
import ColorPicker from '../../../../../../components/color-picker/docs/examples/palettemanager';
import CounterInFiltersExample from '../../../../../../components/counter/docs/examples/counter_in_filters';
import CounterAllThemesExample from '../../../../../../components/counter/tests/examples/all-themes';
import DatePickerDemo from '../../../../../../components/date-picker/docs/examples/datepicker';
import ComponentsSectionDividerExample from '../../../../../../components/divider/tests/examples/components_section';
import DotAllDotsExample from '../../../../../../components/dot/tests/examples/all-dots';
import InlineNumberInput from '../../../../../../components/inline-input/docs/examples/number-only_input';
import InputClear from '../../../../../../components/input/docs/examples/input_with_the_clearing_ability';
import InputNumberDemo from '../../../../../../components/input-number/docs/examples/range_of_values';
import InputTags from '../../../../../../components/input-tags/docs/examples/entering_and_editing_tags';
import LinkColorLinksExample from '../../../../../../components/link/docs/examples/color_links';
import BasicNoticeExample from '../../../../../../components/notice/docs/examples/basic_notice';
import PillsBasicExample, {
  defaultProps as pillsBasicExampleDefaultProps,
} from '../../../../../../components/pills/docs/examples/basic_example';
import ProgressBarAllThemesExample from '../../../../../../components/progress-bar/tests/examples/all-themes';
import Radio from '../../../../../../components/radio/docs/examples/radiogroup_example';
import SelectBasic from '../../../../../../components/select/docs/examples/basic_usage';
import Multiselect from '../../../../../../components/select/docs/examples/multiselect';
import SkeletonAllSkeletonExample from '../../../../../../components/skeleton/tests/examples/all-skeleton';
import Slider2 from '../../../../../../components/slider/docs/examples/numeric_slider';
import Slider1 from '../../../../../../components/slider/docs/examples/slider_with_options';
import SpinAllSizesExample from '../../../../../../components/spin/tests/examples/all-sizes';
import Switch from '../../../../../../components/switch/docs/examples/basic_example';
import TabPanelAutomaticTabActivationExample from '../../../../../../components/tab-panel/docs/examples/automatic_tab_activation';
import TagAllTagsExample from '../../../../../../components/tag/tests/examples/all-tags';
import Textarea from '../../../../../../components/textarea/docs/examples/textarea_with_auto_height';
import TimePickerDemo from '../../../../../../components/time-picker/docs/examples/expanded_access_to_all_the_components';

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

        <Card w='100%'>
          <Card.Header>
            <Card.Title>Controls</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column' gap={8}>
            <ButtonAllButtons />
            <LinkColorLinksExample />
            <BreadcrumbsUsageExample />
            <PillsBasicExample {...pillsBasicExampleDefaultProps} />
            <TabPanelAutomaticTabActivationExample />
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
            <Box w='fit-content' alignSelf='flex-start'>
              <CounterInFiltersExample />
            </Box>
            <TagAllTagsExample />
            <SkeletonAllSkeletonExample />
            <ProgressBarAllThemesExample />
            <SpinAllSizesExample />
            <ComponentsSectionDividerExample />
          </Card.Body>
        </Card>

        <Flex direction='column' px={4} gap={6} w='100%' aria-labelledby='components-surface-heading'>
          <Text tag='h3' size={400} id='components-surface-heading'>
            Surface
          </Text>
          <CardWithHoverExample />
          <BasicNoticeExample />
        </Flex>
      </Flex>
    </Flex>
  );
}
