import React from 'react';
import { Hint } from '@semcore/tooltip';
import HomeNav from '@semcore/ui/icon/toolkit/HomeNav';
import SEOToolkit from '@semcore/ui/icon/toolkit/SEOToolkit';
import TrendsToolkit from '@semcore/ui/icon/toolkit/TrendsToolkit';
import LocalToolkit from '@semcore/ui/icon/toolkit/LocalToolkit';
import SocialToolkit from '@semcore/ui/icon/toolkit/SocialToolkit';
import ContentToolkit from '@semcore/ui/icon/toolkit/ContentToolkit';
import AdsToolkit from '@semcore/ui/icon/toolkit/AdsToolkit';
import ReportsToolkit from '@semcore/ui/icon/toolkit/ReportsToolkit';
import AppsNav from '@semcore/ui/icon/toolkit/AppsNav';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <>
      <Flex gap={7} direction='column' px={5} pt={3}>
        <Hint tag={HomeNav} interactive title='Home' color='icon-secondary-neutral' />

        <Hint tag={SEOToolkit} interactive title='SEO Toolkit' color='icon-secondary-neutral' />

        <Hint
          tag={TrendsToolkit}
          interactive
          title='Trends Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint tag={LocalToolkit} interactive title='Local Toolkit' color='icon-secondary-neutral' />

        <Hint
          tag={SocialToolkit}
          interactive
          title='Social Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={ContentToolkit}
          interactive
          title='Content Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint tag={AdsToolkit} interactive title='Ads Toolkit' color='icon-secondary-neutral' />
        <Hint
          tag={ReportsToolkit}
          interactive
          title='Reports Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint tag={AppsNav} interactive title='Apps' color='icon-secondary-neutral' />
      </Flex>
    </>
  );
};

export default Demo;
