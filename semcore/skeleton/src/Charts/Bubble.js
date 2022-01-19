import React from 'react';
import Skeleton from '../Skeleton';

const BubbleChartSkeleton = (props) => (
  <Skeleton
    visible
    viewBox="0 0 460 180"
    width={460}
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
            d="M82 172C104.091 172 122 154.091 122 132C122 109.909 104.091 92 82 92C59.9086 92 42 109.909 42 132C42 154.091 59.9086 172 82 172Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M114 56C127.255 56 138 45.2548 138 32C138 18.7452 127.255 8 114 8C100.745 8 90 18.7452 90 32C90 45.2548 100.745 56 114 56Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M358.5 95C371.479 95 382 84.4787 382 71.5C382 58.5213 371.479 48 358.5 48C345.521 48 335 58.5213 335 71.5C335 84.4787 345.521 95 358.5 95Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M402 138C410.837 138 418 130.837 418 122C418 113.163 410.837 106 402 106C393.163 106 386 113.163 386 122C386 130.837 393.163 138 402 138Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M230 142C258.719 142 282 118.719 282 90C282 61.2812 258.719 38 230 38C201.281 38 178 61.2812 178 90C178 118.719 201.281 142 230 142Z"
          />
        </g>
      </>
    )}
  </Skeleton>
);

export default BubbleChartSkeleton;
