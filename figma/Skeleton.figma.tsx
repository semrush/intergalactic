import figma from '@figma/code-connect';
import Skeleton, {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  VennChartSkeleton,
  ScatterPlotChartSkeleton,
  BubbleChartSkeleton,
  RadialTreeChartSkeleton,
  HistogramChartSkeleton,
  DonutChartSkeleton,
} from '@semcore/skeleton';
import React from 'react';

// Skeleton bone

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147009&t=atOv2tCpAVZguKAs-11',
  {
    props: {
      theme: figma.enum('theme', {
        dark: 'dark',
        invert: 'invert',
      }),
    },
    example: ({ theme }) => <Skeleton theme={theme} />,
  },
);

// Different skeleton shapes which are not components in the code

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'none', 'shape': 'true' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'mini chart', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'quadrant chart', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'chord chart', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'polar radar chart', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'radar chart', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'sankey chart', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { 'chart type': 'tag cloud', 'shape': 'false' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

// Skeleton for hiding text

figma.connect(
  Skeleton.Text,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-146975&t=atOv2tCpAVZguKAs-11',
  {
    props: {
      theme: figma.nestedProps('Skeleton', {
        theme: figma.enum('theme', {
          dark: 'dark',
          invert: 'invert',
        }),
      }),
    },
    example: ({ theme }) => <Skeleton theme={theme.theme}><Skeleton.Text amount={3} /></Skeleton>,
  },
);

// Chart skeletons

figma.connect(
  LineChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: '📈 line chart', shape: 'false' },

    example: () => <LineChartSkeleton />,
  },
);

figma.connect(
  LineChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: '📈 line chart (monotone)', shape: 'false' },

    example: () => <LineChartSkeleton type='monotone' />,
  },
);

figma.connect(
  AreaChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: 'area chart', shape: 'false' },

    example: () => <LineChartSkeleton />,
  },
);

figma.connect(
  AreaChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=atOv2tCpAVZguKAs-11',
  {
    variant: { chart: 'area chart (monotone)', shape: 'false' },

    example: () => <AreaChartSkeleton type='monotone' />,
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '📊 bar chart', shape: 'false' },

    example: () => <BarChartSkeleton />,
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '📊 bar chart (vertical)', shape: 'false' },

    example: () => <BarChartSkeleton layout='vertical' />,
  },
);

figma.connect(
  HistogramChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '📊 histogram', shape: 'false' },

    example: () => <HistogramChartSkeleton />,
  },
);

figma.connect(
  HistogramChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '📊 histogram (vertical)', shape: 'false' },

    example: () => <HistogramChartSkeleton layout='vertical' />,
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '🍩 donut chart', shape: 'false' },

    example: () => <DonutChartSkeleton />,
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '🍩 donut chart (halfsize)', shape: 'false' },

    example: () => <DonutChartSkeleton halfsize />,
  },
);

figma.connect(
  ScatterPlotChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '🛁 scatter plot chart', shape: 'false' },

    example: () => <ScatterPlotChartSkeleton />,
  },
);

figma.connect(
  BubbleChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: '🛁 bubble chart', shape: 'false' },

    example: () => <BubbleChartSkeleton />,
  },
);

figma.connect(
  VennChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: 'venn chart', shape: 'false' },

    example: () => <VennChartSkeleton />,
  },
);

figma.connect(
  RadialTreeChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10328-147008&t=flwnDcsdtgz9vS8Z-11',
  {
    variant: { chart: 'radial tree chart', shape: 'false' },

    example: () => <RadialTreeChartSkeleton />,
  },
);
