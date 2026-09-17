import figma from '@figma/code-connect/react';
import { MiniChart } from '@semcore/ui/mini-chart';

figma.connect(
  MiniChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=5464-489&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <MiniChart.ScoreLine value={/* Add value here */} w='/* Add width here */' color='/* Set color if necessary */' />
    ),
  },
);

figma.connect(
  MiniChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=1480-68065&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <MiniChart.ScoreLine segments={/* Add number of segments here */} value={/* Add value here */} w='/* Add width here */' color='/* Set color if necessary */' />
    ),
  },
);

figma.connect(
  MiniChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-48231&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <MiniChart.ScoreDonut value={/* Add value here */} w='/* Add width here */' aria-hidden />
    ),
  },
);

figma.connect(
  MiniChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-48238&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <MiniChart.ScoreSemiDonut value={/* Add value here */} w='/* Add width here */' aria-hidden />
    ),
  },
);

figma.connect(
  MiniChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=1829-61647&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <MiniChart.TrendLine data={/* Add data here */} w='/* Add width here */' h='/* Add height here */' aria-hidden />
    ),
  },
);

figma.connect(
  MiniChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-48152&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <MiniChart.TrendArea data={/* Add data here */} w='/* Add width here */' h='/* Add height here */' aria-hidden />
    ),
  },
);
