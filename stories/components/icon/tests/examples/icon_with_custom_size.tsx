import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import VideoListM from '@semcore/icon/VideoList/m';
import VideoListL from '@semcore/icon/VideoList/l';
import { ButtonTrigger, LinkTrigger, FilterTrigger } from '@semcore/base-trigger';
import '@semcore/utils/lib/themes/default.css';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';
import Icon from '@semcore/icon';
import DropdownMenu from '@semcore/dropdown-menu';

const Demo = () => {
    return (
        <>
    

            <div style={{ display: 'flex', width: '100px' }}>
        <Icon width={22} height={22} viewBox='0 0 22 22' color='green'>
          <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
        </Icon>
        <p>lorem lorem lorem lorem </p>
      </div>

      <div style={{ display: 'flex', width: '100px' }}>
        <Icon width={50} height={50} viewBox='0 0 22 22' color='green'>
          <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
        </Icon>
        <p>lorem lorem lorem lorem </p>
      </div>
        </>
    );
};

export default Demo;
