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
import { Flex } from '@semcore/ui/base-components';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex gap={7} direction='column' m={10}>
        <Hint
          tag={HomePlatform}
          title='Home'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={SEOToolkit}
          title='SEO Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={AISEOToolkit}
          title='AI SEO Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={TrafficMarketToolkit}
          title='Market & Traffic Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={LocalToolkit}
          title='Local Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={SocialToolkit}
          title='Social Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={ContentToolkit}
          title='Content Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={AdsToolkit}
          title='Ads Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={ReportsToolkit}
          title='Reports Toolkit'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={AppCenter}
          title='App Center'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={AIToolkit}
          title='AI Toolkit'
          color='icon-secondary-neutral'
        />

        <Flex gap={4}>
          <Hint
            tag={PRToolkit}
            title='PR Toolkit'
            color='icon-secondary-neutral'
          />
          <Hint
            tag={PRToolkit}
            title='PR Toolkit'
            color='--intergalactic-sidebar-nav-control-icon-normal'
          />
        </Flex>

        <Hint
          tag={EnterpriseSolutions}

          title='Enterprise Solutions'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
