/* eslint-disable no-cyrillic-string/no-cyrillic-string */
import React from 'react';
import Components from './index';
import dataIllustrations from './illustrations-list';

// TODO: need to change to illustrations
import icons from '@icons';
export default () => <Components illustrations={icons} json={dataIllustrations} />;
