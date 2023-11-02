import React from 'react';
import Components from './illustrations-view';
import dataIllustrations from './illustrations-list';

import icons from '@illustrations';
export default () => <Components illustrations={icons} json={dataIllustrations} />;
