import { Flex } from '@semcore/flex-box';
import AdsToolkit from '@semcore/icon/platform/AdsToolkit';
import AISEOToolkit from '@semcore/icon/platform/AISEOToolkit';
import AIToolkit from '@semcore/icon/platform/AIToolkit';
import AppCenter from '@semcore/icon/platform/AppCenter';
import ContentToolkit from '@semcore/icon/platform/ContentToolkit';
import EnterpriseSolutions from '@semcore/icon/platform/EnterpriseSolutions';
import HomePlatform from '@semcore/icon/platform/HomePlatform';
import LocalToolkit from '@semcore/icon/platform/LocalToolkit';
import PRToolkit from '@semcore/icon/platform/PRToolkit';
import ReportsToolkit from '@semcore/icon/platform/ReportsToolkit';
import SEOToolkit from '@semcore/icon/platform/SEOToolkit';
import SocialToolkit from '@semcore/icon/platform/SocialToolkit';
import TrafficMarketToolkit from '@semcore/icon/platform/TrafficMarketToolkit';
import { Hint } from '@semcore/tooltip';
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
