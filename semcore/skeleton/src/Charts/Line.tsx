import React from 'react';
import Skeleton, { ISkeletonProps } from '../Skeleton';

export interface LineChartSkeletonSkeletonProps extends ISkeletonProps {
  type?: 'linear' | 'monotone';
}

const LineChartSkeleton: React.FunctionComponent<
  LineChartSkeletonSkeletonProps & React.SVGAttributes<SVGElement>
> = (props) => {
  const { type = 'linear' } = props;

  const getDraw = (type) => {
    switch (type) {
      case 'monotone':
        return 'M1.991 2c75.333 0 75.333 80 150.666 80S227.99 2 303.323 2c75.335 0 75.335 80 150.669 80 75.334 0 75.334-80 150.667-80 75.337 0 75.337 80 150.676 80 75.337 0 75.337-80 150.674-80';
      default:
        return 'M1.991 2l150.666 80L303.323 2l150.669 80L604.659 2l150.676 80L906.009 2';
    }
  };

  return (
    <Skeleton viewBox="0 0 904 90" preserveAspectRatio="xMidYMid meet" {...props}>
      {({ gradientUrl }) => (
        <path
          fill="none"
          stroke={gradientUrl}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d={getDraw(type)}
        />
      )}
    </Skeleton>
  );
};

export default LineChartSkeleton;
