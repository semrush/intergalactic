import React from 'react';
import { useLocationHash } from './useLocationHash';
// eslint-disable-next-line import/no-unresolved
import { playgrounds } from '@playgrounds';
import './nav.css';
import LogoImage from '../../../../website/client/static/illustration/whale.svg';

export const Nav: React.FC = () => {
  const [currentPlayground, setPlayground] = useLocationHash();
  const handlePlaygroundNameClick = React.useCallback(
    (name: string) => () => setPlayground(name),
    [setPlayground],
  );
  const goHome = React.useCallback(() => setPlayground(''), [setPlayground]);
  const playgroundsList = Object.keys(playgrounds).filter(
    (playgroundName) => playgroundName !== 'index.tsx',
  );

  return (
    <nav className="intergalactic-playground_nav">
      <div
        className="intergalactic-playground_logo"
        style={{ backgroundImage: LogoImage }}
        onClick={goHome}
      />
      <h1 className="intergalactic-playground_title" onClick={goHome}>
        Intergalactic playground
      </h1>
      <ul>
        {playgroundsList.map((playgroundName) => (
          <li
            onClick={handlePlaygroundNameClick(playgroundName)}
            key={playgroundName}
            className={currentPlayground === playgroundName ? 'picked' : ''}
          >
            {playgroundName}
          </li>
        ))}
      </ul>
    </nav>
  );
};
