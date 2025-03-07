import React from 'react';
import { Hint } from '@semcore/tooltip';
import HomePlatform from '@semcore/ui/icon/platform/HomePlatform';
import SEOToolkit from '@semcore/ui/icon/platform/SEOToolkit';
import MarketToolkit from '@semcore/ui/icon/platform/MarketToolkit';
import LocalToolkit from '@semcore/ui/icon/platform/LocalToolkit';
import SocialToolkit from '@semcore/ui/icon/platform/SocialToolkit';
import ContentToolkit from '@semcore/ui/icon/platform/ContentToolkit';
import AdsToolkit from '@semcore/ui/icon/platform/AdsToolkit';
import ReportsToolkit from '@semcore/ui/icon/platform/ReportsToolkit';
import AppCenter from '@semcore/ui/icon/platform/AppCenter';
import { Flex } from '@semcore/flex-box';


const Demo = () => {
    return (
        <>
            <Flex gap={7} direction='column' m={10}>
            <Hint
    tag={HomePlatform}
    interactive
    title='Home'
    color='icon-secondary-neutral'
  />

            <Hint
    tag={SEOToolkit}
    interactive
    title='SEO Toolkit'
    color='icon-secondary-neutral'
  />

<Hint
    tag={MarketToolkit}
    interactive
    title='Market & Traffic Toolkit'
     color='icon-secondary-neutral'
  />
  
  <Hint
    tag={LocalToolkit}
    interactive
    title='Local Toolkit'
     color='icon-secondary-neutral'
  />

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

  <Hint
    tag={AdsToolkit}
    interactive
    title='Ads Toolkit'
     color='icon-secondary-neutral'
  />
    <Hint
    tag={ReportsToolkit}
    interactive
    title='Reports Toolkit'
     color='icon-secondary-neutral'
  />

  <Hint
    tag={AppCenter}
    interactive
    title='App Center'
     color='icon-secondary-neutral'
  />
            </Flex>
        </>
    );
};

export default Demo;
