import React from 'react';
import { Hint } from '@semcore/tooltip';
import HomePlatform from '@semcore/icon/platform/HomePlatform';
import SEOToolkit from '@semcore/icon/platform/SEOToolkit';
import TrafficMarketToolkit from '@semcore/icon/platform/TrafficMarketToolkit';
import LocalToolkit from '@semcore/icon/platform/LocalToolkit';
import SocialToolkit from '@semcore/icon/platform/SocialToolkit';
import ContentToolkit from '@semcore/icon/platform/ContentToolkit';
import AdsToolkit from '@semcore/icon/platform/AdsToolkit';
import ReportsToolkit from '@semcore/icon/platform/ReportsToolkit';
import AppCenter from '@semcore/icon/platform/AppCenter';
import AIToolkit from '@semcore/icon/platform/AIToolkit';
import PRToolkit from '@semcore/icon/platform/PRToolkit';
import EnterpriseSolutions from '@semcore/icon/platform/EnterpriseSolutions';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <>
      <Flex gap={7} direction='column' m={10}>
        <Hint tag={HomePlatform} interactive title='Home' color='icon-secondary-neutral' />

        <Hint tag={SEOToolkit} interactive title='SEO Toolkit' color='icon-secondary-neutral' />

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
