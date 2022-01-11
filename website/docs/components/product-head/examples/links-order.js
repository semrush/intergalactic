import React from 'react';
import Link from '@semcore/link';
import YoutubeXS from '@semcore/icon/lib/Youtube/m';
import ChatXS from '@semcore/icon/lib/Chat/m';
import BookXS from '@semcore/icon/lib/Book/m';
import MuseumXS from '@semcore/icon/lib/Museum/m';
import MobileXS from '@semcore/icon/lib/Mobile/m';
import BracketsCodeXS from '@semcore/icon/lib/BracketsCode/m';
import MegaphoneXS from '@semcore/icon/lib/Megaphone/m';
import NewsXS from '@semcore/icon/lib/News/m';
import ChatQuestionXS from '@semcore/icon/lib/ChatQuestion/m';
import QuestionAltXS from '@semcore/icon/lib/Question/m';
import styled from 'styled-components';

import Header from '@semcore/product-head';

const HeaderRow = styled(Header.Row)`
  overflow: auto;
`;

export default () => {
  return (
    <>
      <Header>
        <HeaderRow>
          <Header.Links>
            <Link>
              <Link.Addon tag={MuseumXS} />
              <Link.Text>Old version</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={MobileXS} />
              <Link.Text>Position Tracking App</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={BracketsCodeXS} />
              <Link.Text>API</Link.Text>
            </Link>
            {/* <Link>
              <Link.Addon tag={GobletXS} />
              <Link.Text>Top 30 Advertisers & Publishers</Link.Text>
            </Link> */}
            <Link>
              <Link.Addon tag={MegaphoneXS} />
              <Link.Text>Check out best tips</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={NewsXS} />
              <Link.Text>News</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={ChatQuestionXS} />
              <Link.Text>FAQ</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={QuestionAltXS} />
              <Link.Text>Product tour</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={YoutubeXS} />
              <Link.Text>Video tutorial</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={BookXS} />
              <Link.Text>User manual</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={ChatXS} />
              <Link.Text>Send feedback</Link.Text>
            </Link>
          </Header.Links>
        </HeaderRow>
      </Header>
    </>
  );
};
