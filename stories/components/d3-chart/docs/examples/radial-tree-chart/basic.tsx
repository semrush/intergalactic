import LikeM from '@semcore/icon/Like/m';
import { Flex } from '@semcore/ui/base-components';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import Select from '@semcore/ui/select';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadialMockData from '../../../__mocks__/radial';

const Demo = () => {
  const width = 500;
  const height = 500;
  const [genre, setGenre] = React.useState<string | null>(data[0].key);

  return (
    <Flex direction='column' gap={2}>
      <label htmlFor='genre-select'>Movie of what genre to pick today?</label>
      <Select
        id='genre-select'
        options={data.map(({ label, key }) => ({ value: key, children: label }))}
        value={genre}
        onChange={setGenre}
      />
      <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
        <RadialTree activeKey={genre} onActiveKeyChange={setGenre}>
          <RadialTree.Radian>
            <RadialTree.Radian.Label />
            <RadialTree.Radian.Line />
            <RadialTree.Radian.Cap />
            <RadialTree.Radian.Icon tag={LikeM} />
          </RadialTree.Radian>
          <RadialTree.Title>Movies</RadialTree.Title>
        </RadialTree>
      </Plot>
    </Flex>
  );
};

const data = RadialMockData.Movies;

export default Demo;
