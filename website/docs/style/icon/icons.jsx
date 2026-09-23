import icons from '@icons';
import React from 'react';

import dataIcons from './icons-list';
import Components from './icons-view';

export const flatIconList = () => icons;

export default () => <Components icons={icons} json={dataIcons} />;
