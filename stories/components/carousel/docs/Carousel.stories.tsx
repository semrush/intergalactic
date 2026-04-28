import Carousel from '@semcore/ui/carousel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/carousel_with_default_indicators';
import WithIndicatorsExample from './examples/carousel_with_indicators_only';
import WithPreviewExample from './examples/carousel_with_preview_indicators';
import WithoutModalExample from './examples/carousel_without_modal_window';
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel/Documentation',
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof Carousel>;
export const Basic: Story = {
  render: BasicExample,
  parameters: { sourceCode: 'import { Box } from \'@semcore/ui/base-components\';\nimport Carousel from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://picsum.photos/id/1023/600/400\',\n  \'https://picsum.photos/id/1024/600/400\',\n  \'https://picsum.photos/id/1025/600/400\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = () => (\n  <Box w={width}>\n    <Carousel\n      w={width}\n      aria-label=\'Beauty of Nature\'\n      zoom={true}\n      zoomWidth={1000}\n      indicators=\'default\'\n    >\n      {images.map((url, index) => (\n        <Carousel.Item key={url} w={imageWidth}>\n          <img\n\n            role=\'button\'\n            src={url}\n            aria-label={`Open in fullscreen ${altTexts[index]}`}\n            style={{ width: \'100%\' }}\n          />\n        </Carousel.Item>\n      ))}\n    </Carousel>\n  </Box>\n);\n\nexport default Demo;\n' },
};
export const WithIndicators: Story = {
  render: WithIndicatorsExample,
  parameters: { sourceCode: 'import { Box, Flex } from \'@semcore/ui/base-components\';\nimport Carousel from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://picsum.photos/id/1023/600/400\',\n  \'https://picsum.photos/id/1024/600/400\',\n  \'https://picsum.photos/id/1025/600/400\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = () => (\n  <Carousel w={width} aria-label=\'Beauty of Nature\'>\n    <>\n      <Flex>\n        <Carousel.ContentBox>\n          <Carousel.Container>\n            {images.map((url, index) => (\n              <Carousel.Item key={url} w={imageWidth}>\n                <img\n\n                  role=\'button\'\n                  src={url}\n                  alt={altTexts[index]}\n                  aria-label={`Open in fullscreen ${altTexts[index]}`}\n                  style={{ width: \'100%\' }}\n                />\n              </Carousel.Item>\n            ))}\n          </Carousel.Container>\n        </Carousel.ContentBox>\n      </Flex>\n      <Carousel.Indicators />\n    </>\n  </Carousel>\n);\n\nexport default Demo;\n' },
};
export const WithPreview: Story = {
  render: WithPreviewExample,
  parameters: { sourceCode: 'import Carousel from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://picsum.photos/id/1023/600/400\',\n  \'https://picsum.photos/id/1024/600/400\',\n  \'https://picsum.photos/id/1025/600/400\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = () => (\n  <Carousel\n    w={width}\n    aria-label=\'Beauty of Nature\'\n    zoom={true}\n    zoomWidth={1000}\n    indicators=\'preview\'\n  >\n    {images.map((url, index) => (\n      <Carousel.Item key={url} w={imageWidth}>\n        <img\n          role=\'button\'\n          src={url}\n          alt={altTexts[index]}\n          aria-label={`Open in fullscreen ${altTexts[index]}`}\n          style={{ width: \'100%\', height: \'100%\', objectFit: \'cover\' }}\n        />\n      </Carousel.Item>\n    ))}\n  </Carousel>\n);\n\nexport default Demo;\n' },
};
export const WithoutModal: Story = {
  render: WithoutModalExample,
  parameters: { sourceCode: 'import Carousel from \'@semcore/ui/carousel\';\nimport React from \'react\';\n\nconst images = [\n  \'https://picsum.photos/id/1023/600/400\',\n  \'https://picsum.photos/id/1024/600/400\',\n  \'https://picsum.photos/id/1025/600/400\',\n];\nconst altTexts = [\n  \'A cyclist performing stunts in the forest\',\n  \'A vulture flies with its wings spread wide\',\n  \'A pug wrapped in a blanket sits on the road in the forest\',\n];\nconst width = 600;\nconst imageWidth = width - 75;\n\nconst Demo = () => (\n  <Carousel\n    w={width}\n    aria-label=\'Beauty of Nature\'\n    aria-roledescription=\'something\'\n    indicators=\'preview\'\n  >\n    {images.map((url, index) => (\n      <Carousel.Item key={url} w={imageWidth}>\n        <img\n          role=\'button\'\n          src={url}\n          alt={altTexts[index]}\n          aria-label={`Open in fullscreen ${altTexts[index]}`}\n          style={{ height: \'100%\', width: \'100%\', objectFit: \'cover\' }}\n        />\n      </Carousel.Item>\n    ))}\n  </Carousel>\n);\n\nexport default Demo;\n' },
};
