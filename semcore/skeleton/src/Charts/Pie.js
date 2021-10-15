import React from 'react';
import Skeleton from '../Skeleton';

const PieChartSkeleton = (props) => (
  <Skeleton viewBox="0 0 180 180" width={180} height={180} {...props}>
    {({ gradientUrl }) => (
      <path
        fill={gradientUrl}
        fillRule="nonzero"
        d="M87 .05V30h3V0c27.915 0 52.862 12.71 69.37 32.657l-1.324-1.324-21.189 21.188C125.862 38.792 108.957 30 90 30c-33.137 0-60 26.863-60 60s26.863 60 60 60c18.83 0 35.634-8.674 46.634-22.244l21.29 21.29C141.425 168.011 117.113 180 90 180c-49.706 0-90-40.294-90-90C0 41.298 38.683 1.632 87 .05zm72.863 146.692l-21.262-21.263-.83.83C145.444 116.229 150 103.646 150 90a59.745 59.745 0 0 0-12.95-37.236l1.904 1.903 21.133-21.133C172.543 48.975 180 68.617 180 90c0 21.511-7.547 41.26-20.137 56.742z"
      />
    )}
  </Skeleton>
);

export default PieChartSkeleton;
