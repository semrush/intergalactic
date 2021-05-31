import React, { useState } from 'react';
import Select from '@semcore/select';
import { I18nProvider } from '@semcore/utils/lib/enhances/WithI18n';
import { NoData } from '@semcore/widget-empty';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';

const options = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh', 'ko', 'vi'].map((o) => ({
  value: o,
  children: o,
}));

export default () => {
  const [lang, setLang] = useState('en');

  return (
    <div>
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5} pt={4}>
          <Text size={400}>Line chart</Text>
          <NoData type="line-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Area chart</Text>
          <NoData type="area-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Stacked area chart</Text>
          <NoData type="stacked-area-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Funnel chart</Text>
          <NoData type="funnel-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Pie chart</Text>
          <NoData type="pie-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Donut chart</Text>
          <NoData type="donut-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Vertical bar chart</Text>
          <NoData type="vertical-bar-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Horizontal bar chart</Text>
          <NoData type="horizontal-bar-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Scatter plot chart</Text>
          <NoData type="scatter-plot-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Venn chart</Text>
          <NoData type="venn-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Radar chart</Text>
          <NoData type="radar-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Lollipop chart</Text>
          <NoData type="lollipop-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Choropleth map chart</Text>
          <NoData type="choropleth-map-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Combined chart</Text>
          <NoData type="combined-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Sankey chart</Text>
          <NoData type="sankey-chart" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Table</Text>
          <NoData type="table" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Text links etc</Text>
          <NoData type="text-links-etc" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Other data</Text>
          <NoData type="other-data" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Deleted page</Text>
          <NoData type="deleted-page" description="Some text about deleted page ¯\_(ツ)_/¯" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Congrats</Text>
          <NoData type="congrats" description="Wow! You are doing great! Nothing to fix here." />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Good</Text>
          <NoData type="good" description="Wow! You are doing great!" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Duplicates</Text>
          <NoData type="duplicates" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Nexttime</Text>
          <NoData type="nexttime" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Nothing found</Text>
          <NoData type="nothing-found" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Processing</Text>
          <NoData type="processing" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Suggestions</Text>
          <NoData type="suggestions" />
        </Card>
        <Card my={5} pt={4}>
          <Text size={400}>Tag cloud</Text>
          <NoData type="tag-cloud" />
        </Card>
      </I18nProvider>
    </div>
  );
};
