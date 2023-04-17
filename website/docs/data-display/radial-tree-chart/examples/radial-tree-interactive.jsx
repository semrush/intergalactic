import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const movies = [
  { label: 'Action', key: 'action', color: '#008ff8' },
  { label: 'Comedy', key: 'comedy', color: '#008ff8' },
  { label: 'Drama', key: 'drama', color: '#008ff8' },
  { label: 'Fantasy', key: 'fantasy', color: '#008ff8' },
  { label: 'Mystery', key: 'mystery', color: '#008ff8' },
  { label: 'Romance', key: 'romance', color: '#008ff8' },
  { label: 'Western', key: 'western', color: '#008ff8' },
  { label: 'Thriller', key: 'thriller', color: '#f160c3' },
  { label: 'Crime Thriller', key: 'crime_thriller', color: '#f160c3' },
  { label: 'Disaster Thriller', key: 'disaster_thriller', color: '#f160c3' },
  { label: 'Psychological\nThriller', key: 'psychological_hriller', color: '#f160c3' },
  { label: 'Techno Thriller', key: 'techo_thriller', color: '#f160c3' },
  { label: 'Horror', key: 'horror', color: '#ff4953' },
  { label: 'Zombie Horror', key: 'zoombie_orror', color: '#ff4953' },
  { label: 'Folk Horror', key: 'folk_orror', color: '#ff4953' },
  { label: 'Body Horror', key: 'body_horror', color: '#ff4953' },
  { label: 'Found\nFootage Horror', key: '\nFootage Horror', color: '#ff4953' },
];

export default () => {
  const width = 500;
  const height = 500;
  const [genre, setGenre] = React.useState(movies[0].key);

  return (
    <Flex direction="column">
      <p>Movie of what genre to pick today?</p>
      <Select
        options={movies.map(({ label, key }) => ({ value: key, children: label }))}
        value={genre}
        onChange={setGenre}
      />
      <Plot data={movies} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
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
