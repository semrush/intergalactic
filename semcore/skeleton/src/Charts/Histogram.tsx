import React from 'react';
import Skeleton, { ISkeletonProps } from '../Skeleton';

export interface HistogramChartSkeletonProps extends ISkeletonProps {
  layout?: 'horizontal' | 'vertical';
}

const HistogramChartSkeleton: React.FunctionComponent<
  HistogramChartSkeletonProps & React.SVGAttributes<SVGElement>
> = (props) => {
  const { layout = 'horizontal' } = props;

  return (
    <Skeleton viewBox="0 0 908 166" preserveAspectRatio="xMidYMid meet" {...props}>
      {({ gradientUrl }) => {
        if (layout === 'vertical') {
          return (
            <g fill={gradientUrl}>
              <rect width="252" height="24" y="112" rx="4" />
              <rect width="360" height="24" rx="4" />
              <rect width="306" height="24" y="84" rx="4" />
              <rect width="140" height="24" y="56" rx="4" />
              <path
                fillRule="nonzero"
                d="M4 28h235a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4z"
              />
            </g>
          );
        }

        return (
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M0 0h110.9v80H0zM228.802 48h109.9v32h-109.9zM342.702 30h108.901v50h-108.9zM114.9 16h109.902v64H114.9z M454 0h109.9v80H454zM681.802 48h109.9v32h-109.9zM795.702 30h108.901v50h-108.9zM567.9 16h109.902v64H567.9z"
          />
        );
      }}
    </Skeleton>
  );
};

export default HistogramChartSkeleton;
