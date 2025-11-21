export default {
  Default: [
    { category: 'Category 1', bar: 4 },
    { category: 'Category 2', bar: 8 },
    { category: 'Category 3', bar: 5 },
    { category: 'Category 4', bar: 7 },
    { category: 'Category 5', bar: 9 },
  ],
  TwoBars: [
    { category: 'Category 1', bar1: 5, bar2: 4 },
    { category: 'Category 2', bar1: 8, bar2: 2 },
    { category: 'Category 3', bar1: 4, bar2: 9 },
    { category: 'Category 4', bar1: 7, bar2: 6 },
    { category: 'Category 5', bar1: 9, bar2: 3 },
  ],
  TwoBarsNegative: [
    { category: 'Category 1', bar1: 5, bar2: -4 },
    { category: 'Category 2', bar1: 8, bar2: -2 },
    { category: 'Category 3', bar1: 4, bar2: -9 },
    { category: 'Category 4', bar1: 7, bar2: -6 },
    { category: 'Category 5', bar1: 9, bar2: -3 },
  ],
  Date: [
    { download: 100, date_chart: `${+new Date(2025, 0, 1)}` },
    { download: 120, date_chart: `${+new Date(2025, 0, 6)}` },
    { download: 140, date_chart: `${+new Date(2025, 0, 11)}` },
    { download: 160, date_chart: `${+new Date(2025, 0, 16)}` },
    { download: 180, date_chart: `${+new Date(2025, 0, 21)}` },
    { download: 200, date_chart: `${+new Date(2025, 0, 26)}` },
    { download: 220, date_chart: `${+new Date(2025, 1, 1)}` },
    { download: 240, date_chart: `${+new Date(2025, 1, 6)}` },
    { download: 260, date_chart: `${+new Date(2025, 1, 11)}` },
    { download: 280, date_chart: `${+new Date(2025, 1, 16)}` },
  ],
  WithValue: [
    {
      category: 'Schema.org (Microdata)',
      value: 0,
    },
    {
      category: 'Open graph',
      value: 9650,
    },
    {
      category: 'Twitter cards',
      value: 7650,
    },
    {
      category: 'Microformats',
      value: 14650,
    },
    {
      category: 'Schema.org (JSON-LD)',
      value: 135650,
    },
  ],
};
