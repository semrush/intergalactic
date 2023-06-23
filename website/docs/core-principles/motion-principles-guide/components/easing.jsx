import React from 'react';
import styles from './easing.module.css';
import cx from 'classnames';

// Example of usage: <Easing props={{
//  "cssFunc": "cubic-bezier(0.37, 0, 0.63, 1)",
//  "jsFunc": " -(Math.cos(Math.PI * x) - 1) / 2",
//  "name": "ease-in-out-sine",
//  "description": "Lorem ipsum"
// }} />

const chartSize = 200;

const Easing = ({ cssFunc, jsFunc, name, description }) => {
  const pathD = React.useMemo(() => {
    const x = Array(chartSize)
      .fill(0)
      .map((_, index) => index);
    const y = x
      .map((x) => x / chartSize)
      .map(jsFunc)
      .map((y) => chartSize - y * chartSize + 1);
    const points = x.map((x, i) => ({ x, y: y[i] }));
    return `M${points.map(({ x, y }) => `${x} ${y}`).join(' L')}`;
  }, [jsFunc]);

  return (
    <div className={styles.container}>
      <svg width={chartSize} height={chartSize + 2} className={styles.chart}>
        <path d={pathD} strokeWidth={2} />
      </svg>
      <div className={styles.aside}>
        <div className={styles.details}>
          <div className={styles.title}>
            animation-timing-function: <strong>{name}</strong>
          </div>
          <div className={styles.description}>
            <div>{cssFunc}</div>
            <div>{description}</div>
          </div>
        </div>
        <div className={styles.slider}>
          <div className={styles.sliderLine} />
          <div className={styles.sliderThumb} style={{ transitionTimingFunction: name }} />
        </div>
      </div>
    </div>
  );
};

// Take easings from https://easings.net/
const EasingsDemo = () => {
  return (
    <div aria-hidden='true' className={styles.demo}>
      <Easing
        cssFunc='cubic-bezier(0.5, 0, 0.75, 0)'
        jsFunc={(x) => x * x * x * x}
        name='ease-in'
        description='moves from slow to fast.'
      />
      <Easing
        cssFunc='cubic-bezier(0.45, 0, 0.55, 1)'
        jsFunc={(x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)}
        name='ease-in-out'
        description='moves slowly on both ends.'
      />
    </div>
  );
};

export default EasingsDemo;
