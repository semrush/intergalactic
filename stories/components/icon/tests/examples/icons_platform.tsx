import { Flex } from '@semcore/ui/flex-box';
import AdsToolkit from '@semcore/ui/icon/platform/AdsToolkit';
import AISEOToolkit from '@semcore/ui/icon/platform/AISEOToolkit';
import AIToolkit from '@semcore/ui/icon/platform/AIToolkit';
import AppCenter from '@semcore/ui/icon/platform/AppCenter';
import ContentToolkit from '@semcore/ui/icon/platform/ContentToolkit';
import EnterpriseSolutions from '@semcore/ui/icon/platform/EnterpriseSolutions';
import HomePlatform from '@semcore/ui/icon/platform/HomePlatform';
import LocalToolkit from '@semcore/ui/icon/platform/LocalToolkit';
import PRToolkit from '@semcore/ui/icon/platform/PRToolkit';
import ReportsToolkit from '@semcore/ui/icon/platform/ReportsToolkit';
import SEOToolkit from '@semcore/ui/icon/platform/SEOToolkit';
import SocialToolkit from '@semcore/ui/icon/platform/SocialToolkit';
import TrafficMarketToolkit from '@semcore/ui/icon/platform/TrafficMarketToolkit';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex gap={7} direction='column' m={10}>
        <Hint tag={HomePlatform} interactive title='Home' color='icon-secondary-neutral' />

        <Hint tag={SEOToolkit} interactive title='SEO Toolkit' color='icon-secondary-neutral' />

        <Hint tag={AISEOToolkit} interactive title='AI SEO Toolkit' color='icon-secondary-neutral' />

        <Hint
          tag={TrafficMarketToolkit}
          interactive
          title='Market & Traffic Toolkit'
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

        <Hint tag={AppCenter} interactive title='App Center' color='icon-secondary-neutral' />

        <Hint tag={AIToolkit} interactive title='AI Toolkit' color='icon-secondary-neutral' />

        <Flex gap={4}>
          <Hint tag={PRToolkit} interactive title='PR Toolkit' color='icon-secondary-neutral' />
          <Hint
            tag={PRToolkit}
            interactive
            title='PR Toolkit'
            color='--intergalactic-sidebar-nav-control-icon-normal'
          />
        </Flex>

        <Hint
          tag={EnterpriseSolutions}
          interactive
          title='Enterprise Solutions'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
