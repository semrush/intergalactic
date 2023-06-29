import React from 'react';
import styles from './HappyNewYear.module.css';

const month = new Date().getMonth();
const day = new Date().getDate();

const newYearIsComming = month === 11 && day >= 15;
const newYearJustPassed = month === 0 && day <= 10;
const showComponent = newYearIsComming || newYearJustPassed;

export const HappyNewYear: React.FC = () => {
  if (!showComponent) return null;

  const [windowWidth, setWindowWidth] = React.useState(undefined);
  const lightsCount = React.useMemo(
    () => (windowWidth === undefined ? 0 : Math.floor(windowWidth / 60) + 3),
    [windowWidth],
  );
  React.useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
    const eventHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', eventHandler);
    return () => window.removeEventListener('resize', eventHandler);
  }, []);

  return (
    <ul className={styles.christmasLights}>
      {Array(lightsCount)
        .fill(0)
        .map((_, index) => (
          <li key={`${index}`} />
        ))}
    </ul>
  );
};
