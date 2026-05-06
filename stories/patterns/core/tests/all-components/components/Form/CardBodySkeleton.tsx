import Skeleton from '@semcore/ui/skeleton';
import React from 'react';

type CardBodySkeletonProps = {
  contentReady: boolean;
  h: number;
  children: React.ReactNode;
};

function CardBodySkeletonMaskRects() {
  return (
    <>
      <rect height='40' rx='4' ry='4' width='40%' x='0' y='0' />
      <rect height='8' rx='4' ry='4' width='60%' x='0' y='50' />
      <rect height='40' rx='4' ry='4' width='100%' x='0' y='70' />
    </>
  );
}

export function CardBodySkeleton({
  contentReady,
  h,
  children,
}: CardBodySkeletonProps) {
  if (!contentReady) {
    return (
      <Skeleton w='100%' h={h}>
        <CardBodySkeletonMaskRects />
      </Skeleton>
    );
  }

  return <>{children}</>;
}
