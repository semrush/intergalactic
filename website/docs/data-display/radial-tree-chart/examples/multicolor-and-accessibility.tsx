import React from 'react';
import { Plot, RadialTree } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/icon/Like/m';

const movies = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Mystery',
  'Romance',
  'Western',
  'Thriller',
  'Crime Thriller',
  'Disaster Thriller',
  'Psychological\nThriller',
  'Techno Thriller',
  'Horror',
  'Zombie Horror',
  'Folk Horror',
  'Body Horror',
  'Found\nFootage Horror',
].map((label, index) => ({
  label,
  color: `chart-palette-order-${index + 1}`,
}));

const Demo = () => {
  const width = 500;
  const height = 500;

  return (
    <Plot
      data={movies}
      scale={[scaleLinear(), scaleLinear()]}
      width={width}
      height={height}
      patterns
    >
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

export default Demo;
