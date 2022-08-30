import React from 'react';
import styles from './EmailsBanner.module.css';
import RouterLink from './RouterLink.jsx';
import emailImg from '../static/illustration/email-library-pic.svg';
import { Box } from '@semcore/flex-box';
import ArrowRightXS from '@semcore/icon/ArrowRight/m';

function BannerBlock() {
  return (
    <div className={styles.emailsWrapper} id="bannerBlock">
      <img className={styles.emailImg} src={emailImg} />
      <div className={styles.info}>
        <Box>
          <h3 className={styles.header}>Product emails library</h3>
        </Box>
        <Box mt={2}>
          All you need for making your product newsletter cool, consistent and adaptive.
        </Box>
        <Box mt={2} mb={8}>
          <RouterLink size={300} color="#171A22" to="/product-emails/grid-email/">
            <RouterLink.Text>Dive into examples</RouterLink.Text>
            <RouterLink.Addon>
              <ArrowRightXS color="#171A22" />
            </RouterLink.Addon>
          </RouterLink>
        </Box>
      </div>
    </div>
  );
}

export default BannerBlock;
