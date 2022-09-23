/* eslint-disable no-cyrillic-string/no-cyrillic-string */
import React from 'react';
import Components from './index';
import dataIllustrations from './illustrations-list';

import icons from '@illustrations';
export default () => <Components illustrations={icons} json={dataIllustrations} />;
