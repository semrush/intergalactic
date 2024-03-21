import React from 'react';
import Select from 'intergalactic/select';
import { I18nProvider } from 'intergalactic/utils/lib/enhances/WithI18n';
import { NoData } from 'intergalactic/widget-empty';
import Card from 'intergalactic/card';
import { Text } from 'intergalactic/typography';
import Divider from 'intergalactic/divider';

const options = [
  'de',
  'en',
  'es',
  'fr',
  'it',
  'ja',
  'pt',
  'ru',
  'zh',
  'ko',
  'nl',
  'vi',
  'pl',
  'sv',
].map((o) => ({
  value: o,
  children: o,
}));

const Demo = () => {
  const [lang, setLang] = React.useState('en');

  return (
    <div>
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Line chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='line-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Area chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='area-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Stacked area chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='stacked-area-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Funnel chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='funnel-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Pie chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='pie-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Donut chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='donut-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Vertical bar chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='vertical-bar-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Horizontal bar chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='horizontal-bar-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Scatter plot chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='scatter-plot-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Venn chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='venn-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Radar chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='radar-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Lollipop chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='lollipop-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Choropleth map chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='choropleth-map-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Combined chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='combined-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Sankey chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='sankey-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Radial Tree chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='radial-tree-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Table
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='table' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Text links etc
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='text-links-etc' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Other data
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='other-data' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Suggestions
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='suggestions' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Duplicates
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='duplicates' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Tag cloud
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='tag-cloud' />
        </Card>
      </I18nProvider>
    </div>
  );
};

export default Demo;
