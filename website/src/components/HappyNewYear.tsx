import React from 'react';
import styles from './HappyNewYear.module.css';

export const HappyNewYear: React.FC = () => {
  const [windowWidth, setWindowWidth] = React.useState(undefined);
  const lightsCount = React.useMemo(
    () => (windowWidth === undefined ? 0 : Math.floor(windowWidth / 60) + 2),
    [windowWidth],
  );
  React.useLayoutEffect(() => {
    const eventHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', eventHandler);
    return () => window.removeEventListener('resize', eventHandler);
  }, []);

  return (
    <ul className={styles.christmasLights}>
      {Array(lightsCount)
        .fill(0)
        .map((_, index) => (
          <li key={index} />
        ))}
    </ul>
  );
};
