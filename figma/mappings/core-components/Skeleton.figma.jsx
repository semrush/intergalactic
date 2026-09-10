import figma from '@figma/code-connect';
import { LineChartSkeleton, AreaChartSkeleton, BarChartSkeleton, VennChartSkeleton, ScatterPlotChartSkeleton, BubbleChartSkeleton, RadialTreeChartSkeleton, HistogramChartSkeleton, DonutChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  LineChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: '📈 line chart' },

    example: () => <LineChartSkeleton />,
  },
);

figma.connect(
  LineChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: '📈 line chart (monotone)' },

    example: () => <LineChartSkeleton type='monotone' />,
  },
);

figma.connect(
  AreaChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: 'area chart' },

    example: () => <AreaChartSkeleton />,
  },
);

figma.connect(
  AreaChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: 'area chart (monotone)' },

    example: () => <AreaChartSkeleton type='monotone' />,
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '📊 bar chart' },

    example: () => <BarChartSkeleton />,
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '📊 bar chart (horizontal)' },

    example: () => <BarChartSkeleton layout='vertical' />,
  },
);

figma.connect(
  HistogramChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '📊 histogram' },

    example: () => <HistogramChartSkeleton />,
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '🍩 donut chart' },

    example: () => <DonutChartSkeleton />,
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '🍩 donut chart (halfsize)' },

    example: () => <DonutChartSkeleton halfsize />,
  },
);

figma.connect(
  ScatterPlotChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '🛁 scatter plot chart' },

    example: () => <ScatterPlotChartSkeleton />,
  },
);

figma.connect(
  BubbleChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: '🛁 bubble chart' },

    example: () => <BubbleChartSkeleton />,
  },
);

figma.connect(
  VennChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: 'venn chart' },

    example: () => <VennChartSkeleton />,
  },
);

figma.connect(
  RadialTreeChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=MuIvHlIpGrVpSu9j-11',
  {
    variant: { chart: 'radial tree chart' },

    example: () => <RadialTreeChartSkeleton />,
  },
);
