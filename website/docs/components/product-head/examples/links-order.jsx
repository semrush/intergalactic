import React from 'react';
import Link from '@semcore/link';
import YoutubeM from '@semcore/icon/Youtube/m';
import ChatM from '@semcore/icon/Chat/m';
import BookM from '@semcore/icon/Book/m';
import MuseumM from '@semcore/icon/Museum/m';
import MobileM from '@semcore/icon/Mobile/m';
import BracketsCodeM from '@semcore/icon/BracketsCode/m';
import MegaphoneM from '@semcore/icon/Megaphone/m';
import NewsM from '@semcore/icon/News/m';
import ChatQuestionM from '@semcore/icon/ChatQuestion/m';
import QuestionAltM from '@semcore/icon/Question/m';
import EducationM from '@semcore/icon/Education/m';
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
              <Link.Addon>
                <MuseumM />
              </Link.Addon>
              <Link.Text>Old version</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <MobileM />
              </Link.Addon>
              <Link.Text>Position Tracking App</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <BracketsCodeM />
              </Link.Addon>
              <Link.Text>API</Link.Text>
            </Link>
            {/* <Link>
              <Link.Addon tag={GobletM} />
              <Link.Text>Top 30 Advertisers & Publishers</Link.Text>
            </Link> */}
            <Link>
              <Link.Addon>
                <MegaphoneM />
              </Link.Addon>
              <Link.Text>Check out best tips</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <NewsM />
              </Link.Addon>
              <Link.Text>News</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <EducationM />
              </Link.Addon>
              <Link.Text>Semrush Academy</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <ChatQuestionM />
              </Link.Addon>
              <Link.Text>FAQ</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <QuestionAltM />
              </Link.Addon>
              <Link.Text>Product tour</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <YoutubeM />
              </Link.Addon>
              <Link.Text>Video tutorial</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <BookM />
              </Link.Addon>
              <Link.Text>User manual</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <ChatM />
              </Link.Addon>
              <Link.Text>Send feedback</Link.Text>
            </Link>
          </Header.Links>
        </HeaderRow>
      </Header>
    </>
  );
};
