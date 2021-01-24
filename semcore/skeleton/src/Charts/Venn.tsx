import React from 'react';
import Skeleton, { ISkeletonProps } from '../Skeleton';

const VennChartSkeleton: React.FunctionComponent<
  ISkeletonProps & React.SVGAttributes<SVGElement>
> = (props) => (
  <Skeleton
    visible
    viewBox="0 0 200 123"
    width={180}
    height={180}
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    {({ gradientUrl }) => (
      <>
        <g>
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            id="a"
            d="M100 13.968c-13.572 11.21-22.222 28.166-22.222 47.143s8.65 35.934 22.222 47.143c-10.566 8.726-24.115 13.968-38.889 13.968C27.361 122.222 0 94.862 0 61.112 0 27.36 27.36 0 61.111 0 75.885 0 89.434 5.242 100 13.968zm0 94.286c13.572-11.209 22.222-28.166 22.222-47.143S113.572 25.177 100 13.968C110.566 5.242 124.115 0 138.889 0 172.639 0 200 27.36 200 61.111c0 33.75-27.36 61.111-61.111 61.111-14.774 0-28.323-5.242-38.889-13.968z"
          />
          <path
            fill="#E7E7E7"
            stroke="#FFF"
            strokeWidth="4"
            d="M100 13.968c13.572 11.21 22.222 28.166 22.222 47.143s-8.65 35.934-22.222 47.143C86.428 97.045 77.778 80.088 77.778 61.11S86.428 25.177 100 13.968z"
          />
        </g>
      </>
    )}
  </Skeleton>
);

export default VennChartSkeleton;
