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

// TODO: Update links to actual nodes

// Skeleton bone

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-124&t=CQtTqD9cubPV2oYP-11',
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/XJYTlbnEuQzYxXGo3m1RYu/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52772-1911&t=E0zvflbaWPNVSWtu-11',
  {
    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'quadrant chart' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'chord chart' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'polar radar chart' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'radar chart' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'sankey chart' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'tag cloud' },

    example: () => <Skeleton>{/* svg path */}</Skeleton>,
  },
);

// Skeleton for hiding text

figma.connect(
  Skeleton.Text,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-270&t=CQtTqD9cubPV2oYP-11',
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

    example: () => <LineChartSkeleton />,
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '📊 bar chart' },

    example: () => <BarChartSkeleton />,
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '📊 bar chart (vertical)' },

    example: () => <BarChartSkeleton layout='vertical' />,
  },
);

figma.connect(
  HistogramChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '📊 histogram' },

    example: () => <HistogramChartSkeleton />,
  },
);

figma.connect(
  HistogramChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '📊 histogram (vertical)' },

    example: () => <HistogramChartSkeleton layout='vertical' />,
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '🍩 donut chart' },

    example: () => <DonutChartSkeleton />,
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '🍩 donut chart (halfsize)' },

    example: () => <DonutChartSkeleton halfsize />,
  },
);

figma.connect(
  ScatterPlotChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '🛁 scatter plot chart' },

    example: () => <ScatterPlotChartSkeleton />,
  },
);

figma.connect(
  BubbleChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: '🛁 bubble chart' },

    example: () => <BubbleChartSkeleton />,
  },
);

figma.connect(
  VennChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'venn chart' },

    example: () => <VennChartSkeleton />,
  },
);

figma.connect(
  RadialTreeChartSkeleton,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-129&t=CQtTqD9cubPV2oYP-11',
  {
    variant: { chart: 'radial tree chart' },

    example: () => <RadialTreeChartSkeleton />,
  },
);
