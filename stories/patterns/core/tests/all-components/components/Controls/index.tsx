import { Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import Divider from '@semcore/ui/divider';
import Dot from '@semcore/ui/dot';
import React from 'react';

import BulkTextarea from '../../../../../../components/bulk-textarea/docs/examples/basic-usage';
import Checkboxes from '../../../../../../components/checkbox/docs/examples/basic_usage';
import ColorPicker from '../../../../../../components/color-picker/docs/examples/predefined_palette';
import InputTags from '../../../../../../components/input-tags/docs/examples/entering_and_editing_tags';
import Radio from '../../../../../../components/radio/docs/examples/radiogroup_example';
import Slider2 from '../../../../../../components/slider/docs/examples/customized_options_view';
import Slider3 from '../../../../../../components/slider/docs/examples/numeric_slider';
import Slider1 from '../../../../../../components/slider/docs/examples/slider_with_options';
import Switch from '../../../../../../components/switch/docs/examples/basic_example';
import Textarea from '../../../../../../components/textarea/docs/examples/textarea_with_auto_height';

export function Controls() {
  return (
    <Flex mt={4} gap={4}>
      <Card w='35%'>
        <Card.Header>
          <Card.Title innerHint='Something'>Settings</Card.Title>
        </Card.Header>
        <Card.Body tag={Flex} direction='column' gap={4}>
          <Switch />
          <ColorPicker />

          <Divider />
          <Slider3 />
          <Divider />
          <InputTags size='m' />
          <Checkboxes />
          <Divider />
          <Radio />

        </Card.Body>
      </Card>

      <Card w='calc(65% - 16px)'>
        <Card.Header>
          <Dot mr={2} />
          Advanced settings
        </Card.Header>
        <Card.Body>
          <BulkTextarea />

          <Divider my={2} />
          <Slider1 />
          <Divider my={2} />
          <Slider2 />
          <Divider my={2} />

          <Textarea />
        </Card.Body>
      </Card>
    </Flex>
  );
}
