/* eslint-disable */
import React from 'react';
import canUseDOM from '../canUseDOM';

const useEnhancedEffect = canUseDOM() ? React.useLayoutEffect : React.useEffect;

export default useEnhancedEffect;
