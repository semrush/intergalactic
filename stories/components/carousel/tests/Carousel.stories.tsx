import Carousel from '@semcore/ui/carousel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import WithIndicatorsExample from './examples/carousel_with_indicators_only';
import PrevNextExample from './examples/carousel_with_prev_next';
import BasicExample, { defaultProps as basicProps } from './examples/carousel_with_props';
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel/Tests',
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof Carousel>;
export const PrevNext: Story = {
  render: PrevNextExample,
  parameters: { sourceCode: 'import { Flex } from \'@semcore/ui/base-components\';\nimport Carousel from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+1\',\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+2\',\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+3\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = () => (\n  <>\n\n    <Carousel w={width}>\n      <Carousel.Container>\n\n        {images.map((url, index) => (\n          <Carousel.Item key={url} w={imageWidth}>\n            <img\n\n              role=\'button\'\n              src={url}\n              alt={altTexts[index]}\n              aria-label={`Open in fullscreen ${altTexts[index]}`}\n              style={{ height: \'100%\', width: \'100%\', objectFit: \'cover\' }}\n            />\n          </Carousel.Item>\n        ))}\n      </Carousel.Container>\n      <Flex direction=\'row\'>\n        <Carousel.Indicators />\n        <Carousel.Prev data-testid=\'prev\' />\n\n        <Carousel.Next data-testid=\'prev\' />\n\n      </Flex>\n    </Carousel>\n  </>\n);\n\nexport default Demo;\n' },
};
export const Basic: StoryObj<typeof basicProps> = {
  render: BasicExample,
  argTypes: {
    bounded: {
      control: { type: 'boolean' },
    },
    zoom: {
      control: { type: 'boolean' },
    },
    zoomWidth: {
      control: { type: 'number' },
    },
    defaultIndex: {
      control: { type: 'number' },
    },
    index: {
      control: { type: 'number' },
    },
    duration: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    indicators: {
      control: { type: 'select' },
      options: ['default', 'hide', 'preview'],
    },
  },
  args: basicProps,
  parameters: { sourceCode: 'import { Box } from \'@semcore/ui/base-components\';\nimport Carousel from \'@semcore/ui/carousel\';\nimport type { CarouselProps } from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+1\',\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+2\',\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+3\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = (props: CarouselProps) => (\n  <Box w={width}>\n    <Carousel\n      w={width}\n      aria-label=\'Beauty of Nature\'\n      zoom={props.zoom}\n      zoomWidth={props.zoomWidth}\n      indicators={props.indicators}\n      bounded={props.bounded}\n      duration={props.duration}\n      step={props.step}\n      defaultIndex={props.defaultIndex}\n      index={props.index}\n    >\n      {images.map((url, index) => (\n        <Carousel.Item key={url} w={imageWidth}>\n          <img\n\n            role=\'button\'\n            src={url}\n            aria-label={`Open in fullscreen ${altTexts[index]}`}\n            style={{ height: \'100%\', width: \'100%\', objectFit: \'cover\' }}\n          />\n        </Carousel.Item>\n      ))}\n    </Carousel>\n  </Box>\n);\nexport const defaultProps: CarouselProps = {\n  bounded: undefined,\n  zoom: true,\n  zoomWidth: 1000,\n  indicators: \'default\',\n  duration: undefined,\n  step: undefined,\n  defaultIndex: undefined,\n  index: undefined,\n};\n\nDemo.defaultProps = defaultProps;\n\nexport default Demo;\n' },
};
export const WithIndicators: Story = {
  render: WithIndicatorsExample,
  parameters: { sourceCode: 'import { Box, Flex } from \'@semcore/ui/base-components\';\nimport Carousel from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+1\',\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+2\',\n  \'https://placehold.co/600x400/8000FF/FFFF00?text=Image+3\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = () => (\n  <Carousel w={width} aria-label=\'Beauty of Nature\'>\n    <>\n      <Flex>\n        <Carousel.ContentBox>\n          <Carousel.Container>\n            {images.map((url, index) => (\n              <Carousel.Item key={url} w={imageWidth}>\n                <img\n\n                  role=\'button\'\n                  src={url}\n                  alt={altTexts[index]}\n                  aria-label={`Open in fullscreen ${altTexts[index]}`}\n                  style={{ width: \'100%\' }}\n                />\n              </Carousel.Item>\n            ))}\n          </Carousel.Container>\n        </Carousel.ContentBox>\n      </Flex>\n      <Carousel.Indicators />\n    </>\n  </Carousel>\n);\n\nexport default Demo;\n' },
};
