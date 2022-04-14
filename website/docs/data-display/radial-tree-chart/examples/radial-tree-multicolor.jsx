import React from 'react';
import { Plot, RadialTree } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/icon/Like/m';

const movies = [
  { label: 'Action', color: '#00b0ed' },
  { label: 'Comedy', color: '#00b0ed' },
  { label: 'Drama', color: '#00b0ed' },
  { label: 'Fantasy', color: '#00b0ed' },
  { label: 'Mystery', color: '#00b0ed' },
  { label: 'Romance', color: '#00b0ed' },
  { label: 'Western', color: '#00b0ed' },
  { label: 'Thriller', color: '#f160c3' },
  { label: 'Crime Thriller', color: '#f160c3' },
  { label: 'Disaster Thriller', color: '#f160c3' },
  { label: 'Psychological\nThriller', color: '#f160c3' },
  { label: 'Techno Thriller', color: '#f160c3' },
  { label: 'Horror', color: '#ed2d2d' },
  { label: 'Zombie Horror', color: '#ed2d2d' },
  { label: 'Folk Horror', color: '#ed2d2d' },
  { label: 'Body Horror', color: '#ed2d2d' },
  { label: 'Found\nFootage Horror', color: '#ed2d2d' },
];

export default () => {
  const width = 500;
  const height = 500;

  return (
    <Plot data={movies} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon tag={LikeM} />
        </RadialTree.Radian>
        <RadialTree.Title>Movies</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};
