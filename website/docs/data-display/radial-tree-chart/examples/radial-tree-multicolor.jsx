import React from 'react';
import { Plot, RadialTree } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/icon/Like/m';

const movies = [
  { label: 'Action', color: '#008ff8' },
  { label: 'Comedy', color: '#008ff8' },
  { label: 'Drama', color: '#008ff8' },
  { label: 'Fantasy', color: '#008ff8' },
  { label: 'Mystery', color: '#008ff8' },
  { label: 'Romance', color: '#008ff8' },
  { label: 'Western', color: '#008ff8' },
  { label: 'Thriller', color: '#f160c3' },
  { label: 'Crime Thriller', color: '#f160c3' },
  { label: 'Disaster Thriller', color: '#f160c3' },
  { label: 'Psychological\nThriller', color: '#f160c3' },
  { label: 'Techno Thriller', color: '#f160c3' },
  { label: 'Horror', color: '#ff4953' },
  { label: 'Zombie Horror', color: '#ff4953' },
  { label: 'Folk Horror', color: '#ff4953' },
  { label: 'Body Horror', color: '#ff4953' },
  { label: 'Found\nFootage Horror', color: '#ff4953' },
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
