import React from 'react';
import Skeleton from '../Skeleton';

const BarChartSkeleton = (props) => {
  const { layout = 'horizontal' } = props;

  return (
    <Skeleton viewBox="0 0 908 166" preserveAspectRatio="xMidYMid meet" {...props}>
      {({ gradientUrl }) => {
        if (layout === 'vertical') {
          return (
            <g fill={gradientUrl}>
              <rect width="252" height="15" y="124" rx="4" />
              <rect width="360" height="15" rx="4" />
              <rect width="306" height="15" y="93" rx="4" />
              <rect width="252" height="15" y="31" rx="4" />
              <rect width="144" height="15" y="62" rx="4" />
              <path
                fillRule="nonzero"
                d="M18 62h112.5c9.941 0 18 1.79 18 4v7c0 2.21-8.059 4-18 4H18c-9.941 0-18-1.79-18-4v-7c0-2.21 8.059-4 18-4zm0-31h216c9.941 0 18 1.79 18 4v7c0 2.21-8.059 4-18 4H18c-9.941 0-18-1.79-18-4v-7c0-2.21 8.059-4 18-4zm0 62h270c9.941 0 18 1.79 18 4v7c0 2.21-8.059 4-18 4H18c-9.941 0-18-1.79-18-4v-7c0-2.21 8.059-4 18-4zm0-93h324c9.941 0 18 1.79 18 4v7c0 2.21-8.059 4-18 4H18c-9.941 0-18-1.79-18-4V4c0-2.21 8.059-4 18-4zm0 124h216c9.941 0 18 1.79 18 4v7c0 2.21-8.059 4-18 4H18c-9.941 0-18-1.79-18-4v-7c0-2.21 8.059-4 18-4z"
              />
            </g>
          );
        }

        return (
          <path
            fill={gradientUrl}
            fillRule="nonzero"
            d="M4 0h7a4 4 0 0 1 4 4v76H0V4a4 4 0 0 1 4-4zm78 48h7a4 4 0 0 1 4 4v28H78V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zM43 16h7a4 4 0 0 1 4 4v60H39V20a4 4 0 0 1 4-4zm156 0h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4zm39-16h7a4 4 0 0 1 4 4v76h-15V4a4 4 0 0 1 4-4zm78 48h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zM277 16h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4zm156 0h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4zM706 0h7a4 4 0 0 1 4 4v76h-15V4a4 4 0 0 1 4-4zm78 48h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zM745 16h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4zm156 0h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4zM472 0h7a4 4 0 0 1 4 4v76h-15V4a4 4 0 0 1 4-4zm78 48h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zm39 0h7a4 4 0 0 1 4 4v28h-15V52a4 4 0 0 1 4-4zM511 16h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4zm156 0h7a4 4 0 0 1 4 4v60h-15V20a4 4 0 0 1 4-4z"
          />
        );
      }}
    </Skeleton>
  );
};

export default BarChartSkeleton;
