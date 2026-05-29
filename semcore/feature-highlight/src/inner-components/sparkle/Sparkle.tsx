import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, Root, sstyled } from '@semcore/core';
import type { Ref } from 'react';
import React from 'react';

import styles from './style/sparkle.shadow.css';

type SparkleProps = {
  index: number;
  num: number;
  curve?: number;
  top?: string;
  left?: string;
};

function SvgSparkle(props: SparkleProps, ref: Ref<SVGSVGElement>) {
  const SSparkle = Root;
  const { num, index, curve, left } = props;
  const rand = Math.floor(Math.random() * 50);
  const angle = (360 / num) * index + rand;
  const sin = Math.sin((Math.PI * angle) / 180);
  const x = curve ? Math.trunc(sin * -1 * curve) : 0;
  const odd = index % 2;
  const scale = 1 - odd * 0.3;
  const animationDuration = `${0.6 - odd * 0.2}s`;

  return sstyled(styles)(
    <SSparkle
      ref={ref}
      aria-hidden={true}
      render='svg'
      use:left={x ? `${x + 14}px` : left}
      scale={scale}
      duration={animationDuration}
      angle={angle}
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.371.269a.39.39 0 0 0-.742 0L3.704 3.08a.977.977 0 0 1-.623.623L.27 4.629a.39.39 0 0 0 0 .742l2.812.925a.977.977 0 0 1 .623.623l.925 2.812a.39.39 0 0 0 .742 0l.925-2.812a.977.977 0 0 1 .623-.623l2.812-.925a.39.39 0 0 0 0-.742L6.92 3.704a.977.977 0 0 1-.623-.623L5.371.27Z' />
    </SSparkle>,
  );
}

type SparkleComponent = Intergalactic.Component<'svg', SparkleProps>;

export default createBaseComponent<SparkleComponent>(SvgSparkle);
