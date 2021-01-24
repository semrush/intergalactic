import React from 'react';
import Skeleton, { ISkeletonProps } from '../Skeleton';

export interface AreaChartSkeletonProps extends ISkeletonProps {
  type?: 'linear' | 'monotone';
}

const AreaChartSkeleton: React.FunctionComponent<
  AreaChartSkeletonProps & React.SVGAttributes<SVGElement>
> = (props) => {
  const { type = 'linear' } = props;
  const getDraw = (type) => {
    switch (type) {
      case 'monotone':
        return [
          'M2 2c75.665 0 75.665 80 151.329 80 75.665 0 75.665-80 151.33-80 75.667 0 75.667 80 151.333 80S531.658 2' +
            ' 607.323 2c75.669 0 75.669 80 151.339 80C834.331 82 834.331 2 910 2v164H2V2z',
          'M2 2c75.665 0 75.665 80 151.329 80 75.665 0 75.665-80 151.33-80 75.667 0 75.667 80 151.333 80S531.658 2 607.323 2c75.669 0 75.669 80 151.339 80C834.331 82 834.331 2 910 2',
        ];
      default:
        return [
          'M2 2l151.329 80 151.33-80 151.333 80L607.323 2l151.339 80L910 2v164H2z',
          'M2 2l151.329 80 151.33-80 151.333 80L607.323 2l151.339 80L910 2',
        ];
    }
  };

  const [drawLine, drawFill] = getDraw(type);
  return (
    <Skeleton viewBox="0 0 908 166" preserveAspectRatio="xMidYMid meet" {...props}>
      {({ gradientUrl }) => (
        <g fill="none" fillRule="nonzero">
          <path fill={gradientUrl} fillOpacity=".4" d={drawLine} />
          <path
            stroke={gradientUrl}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d={drawFill}
          />
        </g>
      )}
    </Skeleton>
  );
};

export default AreaChartSkeleton;
