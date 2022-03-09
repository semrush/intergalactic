import React from 'react';
import Skeleton from '../Skeleton';

const ScatterPlotChartSkeleton = (props) => (
  <Skeleton visible viewBox="0 0 680 200" preserveAspectRatio="xMidYMid meet" {...props}>
    {({ gradientUrl }) => (
      <>
        <g>
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M162 140C167.523 140 172 135.523 172 130C172 124.477 167.523 120 162 120C156.477 120 152 124.477 152 130C152 135.523 156.477 140 162 140Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M281 102C286.523 102 291 97.5228 291 92C291 86.4772 286.523 82 281 82C275.477 82 271 86.4772 271 92C271 97.5228 275.477 102 281 102Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M340 126C345.523 126 350 121.523 350 116C350 110.477 345.523 106 340 106C334.477 106 330 110.477 330 116C330 121.523 334.477 126 340 126Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M518 50C523.523 50 528 45.5228 528 40C528 34.4772 523.523 30 518 30C512.477 30 508 34.4772 508 40C508 45.5228 512.477 50 518 50Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M222 84C227.523 84 232 79.5228 232 74C232 68.4772 227.523 64 222 64C216.477 64 212 68.4772 212 74C212 79.5228 216.477 84 222 84Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M399 92C404.523 92 409 87.5228 409 82C409 76.4772 404.523 72 399 72C393.477 72 389 76.4772 389 82C389 87.5228 393.477 92 399 92Z"
          />
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M458 100C463.523 100 468 95.5228 468 90C468 84.4772 463.523 80 458 80C452.477 80 448 84.4772 448 90C448 95.5228 452.477 100 458 100Z"
          />
        </g>
      </>
    )}
  </Skeleton>
);

export default ScatterPlotChartSkeleton;
