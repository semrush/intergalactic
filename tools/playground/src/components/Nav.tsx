import React from 'react';
import { useLocationHash } from './useLocationHash';

import { playgrounds } from '@playgrounds';
import './nav.css';
import LogoImage from '../../../../website/src/static/illustration/whale.svg';

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
    <nav className='intergalactic-playground_nav'>
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className='intergalactic-playground_logo'
        style={{ backgroundImage: `url(${LogoImage})` }}
        onClick={goHome}
      />
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <h1 className='intergalactic-playground_title' onClick={goHome}>
        Intergalactic playground
      </h1>
      <ul>
        {playgroundsList.map((playgroundName) => (
          // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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
