import React from 'react';
import TabLine from '@semcore/tab-line';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Tooltip from '@semcore/tooltip';
import Tag from '@semcore/tag';
import AllComponents from '../components/AllComponents';
import EmailsBanner from '../components/EmailsBanner';
import whale from '../static/illustration/whale.svg';
import layout from '../static/illustration/layout.svg';
import principles from '../static/illustration/principles.svg';
import style from '../static/illustration/style.svg';
import ArrowXS from '@semcore/icon/ArrowRight/m';
import { Box } from '@semcore/flex-box';
// import updatesButton from '../static/illustration/search-for-updates.svg';
import SideBarNavigation from '../components/SideBarNavigation';
import ComponentCard from '../components/ComponentCard';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import { navigationTree } from '@navigation';
import staticFiles from '@static';
import { usePageData } from '../components/routing';
import Spin from '@semcore/spin';
import Error from '../components/Error';
import styles from './Home.module.css';
import { css } from '@semcore/core';

const stylesTooltip = css`
  STooltip[theme] {
    padding: 12px;
    border: 1px solid #d1d4db;
    box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
    border-radius: 6px;
  }
`;

const mappingTableToImg = {
  principles: {
    className: `${styles.initialPrinciples} ${styles.principles}`,
    imgClassName: styles.principlesImg,
    img: principles,
    tag: 'Principles',
  },
  styles: {
    className: `${styles.initialPrinciples} ${styles.styles}`,
    imgClassName: styles.stylesImg,
    img: style,
    tag: 'Style',
  },
  layout: {
    className: `${styles.initialPrinciples} ${styles.layout}`,
    imgClassName: styles.layoutImg,
    img: layout,
    tag: 'Layout',
  },
};

const getCustomPage = (table) => (
  <div className={table.className}>
    <AllComponents
      navigation={navigationTree.filter((nav) => !nav.metadata.hide && nav.title === table.tag)}
    />
    <img className={table.imgClassName} src={table.img} alt={table.tag} />
  </div>
);

const renderSwitch = (value) => {
  switch (value) {
    case 'components':
      return getTabByTitle(['Components']);
    case 'charts':
      return getTabByTitle(['Charts']);
    case 'table':
      return getTabByTitle(['Table']);
    case 'ux':
      return getTabByTitle(['UX patterns']);
    case 'filters':
      return getTabByTitle(['Filters']);
    case 'documentation':
      return getTabByTitle(['Utils 🛠', 'Docs', 'Bugs and requests']);
    default:
      return null;
  }
};

const getTabByTitle = (titles) => {
  return (
    <div className={styles.tableOverlay}>
      {titles.length === 1 ? (
        titles[0] === 'Charts' ? (
          getChart(titles[0])
        ) : titles[0] === 'Table' ? (
          <Table titles={titles[0]} />
        ) : (
          getComponents(titles[0])
        )
      ) : (
        titles.map((title) => {
          return (
            <Box mr={3}>
              <h2>{title}</h2>
              {getComponents(title)}
            </Box>
          );
        })
      )}
    </div>
  );
};

export const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

const getTooltip = (title) => {
  const url = staticFiles[`tooltip/${getImageName(title)}.svg`];

  return url ? <img src={url} /> : undefined;
};

const getComponents = (titles) => {
  const items = navigationTree.filter((nav) => !nav.metadata.hide && titles.includes(nav.title));
  const getList = (child) => {
    if (child.elem.metadata.disabled) {
      return (
        <div className={styles.linkDisabled} key={child.elem.title}>
          {child.elem.title}
        </div>
      );
    }
    const pic = getTooltip(child.elem.title);
    return (
      <Tooltip styles={stylesTooltip} placement="left" w={'fit-content'} key={child.elem.title}>
        <Tooltip.Trigger tag={Flex} alignContent="center" className="component">
          <Link className={styles.linkStyled} to={`/${child.elem.route}/`}>
            {child.elem.title}
          </Link>
          {child.elem.metadata.beta && (
            <>
              {' '}
              <Tag size="s" theme="warning" use="primary" children="beta" />
            </>
          )}
        </Tooltip.Trigger>
        {pic && <Tooltip.Popper children={pic} />}
      </Tooltip>
    );
  };

  const listItems = items
    .map((item) =>
      item.children.map((child) => {
        return {
          elem: child,
          categoryRoute: item.route,
        };
      }),
    )
    .flat()
    .map((child) => getList(child));

  return <div className={styles.category}>{listItems}</div>;
};

const getChart = (titles) => {
  const items = navigationTree.filter((nav) => !nav.metadata.hide && titles.includes(nav.title));
  const getList = (child) => {
    return (
      <ComponentCard
        key={child.elem.title}
        type={items[0].title.toLowerCase()}
        image={getImageName(child.elem.title)}
        disabled={!!child.elem.metadata.disabled}
        text={child.elem.title}
        href={child.elem.route}
      />
    );
  };

  const getDocs = (item) => (
    <Link to={item.route} key={item.route}>
      {item.title}
    </Link>
  );

  const listDocs = items
    .map((item) => item.children.filter((nav) => nav.metadata.docs))[0]
    .map((el) => getDocs(el));

  const listItems = items
    .map((item) =>
      item.children.map((child) => {
        return {
          elem: child,
          categoryRoute: item.route,
        };
      }),
    )
    .flat()
    .map((child) => getList(child));

  return (
    <>
      <Box mr={12}>
        <Text tag="strong">Common docs</Text>
        <div className={styles.docs}>{listDocs}</div>
      </Box>
      <Box w="100%">
        <Text tag="strong">Types</Text>
        <div className={styles.cards}>{listItems}</div>
      </Box>
    </>
  );
};

const Table = ({ titles }) => {
  const items = navigationTree.filter((nav) => !nav.metadata.hide && titles.includes(nav.title));
  const getDocs = items[0].children.map((item) => (
    <Link to={item.route} key={item.route}>
      {item.title}
    </Link>
  ));

  const tableControls = usePageData('table-group/table-controls');
  const tableStates = usePageData('table-group/table-states');

  if (tableControls.loading || tableStates.loading) {
    return <Spin />;
  }

  const error = tableControls.error || tableStates.error;
  if (error) {
    return <Error title={error.message} />;
  }

  return (
    <>
      <Box mr={12}>
        <Text tag="strong">Common docs</Text>
        <div className={styles.docs}>{getDocs}</div>
      </Box>
      <Box w="100%">
        <Text tag="strong">Controls and use cases</Text>
        <div className={styles.cards}>
          {tableControls.page.headings.map((heading) => (
            <ComponentCard
              key={heading.id}
              type="table"
              image={getImageName(heading.html)}
              text={heading.html}
              href={heading.route}
            />
          ))}
        </div>
        <Text tag="strong" inline mt={8}>
          States
        </Text>
        <div className={styles.cards}>
          {tableStates.page.headings.map((heading) => (
            <ComponentCard
              key={heading.id}
              type="table"
              image={getImageName(heading.html)}
              text={heading.html}
              href={heading.route}
            />
          ))}
        </div>
      </Box>
    </>
  );
};

function Home() {
  const [value, updateValue] = React.useState('components');

  return (
    <>
      <Helmet>
        <title>Intergalactic – Design System</title>
        <meta
          name="description"
          content="Intergalactic is a constantly developing design system of UI components, guidelines and UX patterns. With all these tools you can build your own product."
        ></meta>
        <meta
          name="keywords"
          content="Semrush design system, design system, design-system, дизайн-система, дизайн-система Semrush, дизайн система"
        ></meta>
      </Helmet>
      <div className={styles.homePage}>
        <div className={styles.sideBar}>
          <SideBarNavigation navigation={navigationTree.filter((nav) => !nav.metadata.hide)} />
        </div>
        <div className={styles.overlay}>
          <div className={styles.promoWrapper}>
            <h1 className={styles.title}>Intergalactic Design System</h1>
            <div className={styles.desc}>
              Intergalactic is a constantly developing system of UI components, guidelines and UX
              patterns. With all these tools you can build your own product.
            </div>
            <img className={styles.whaleImg} src={whale} alt="Whale" />
            <div className={styles.started}>
              Get started
              <Link to="/get-started-guide/dev-starter-guide/" rel="noopener noreferrer">
                For developers <ArrowXS />
              </Link>
              <Link to="/get-started-guide/dis-starter-guide/" rel="noopener noreferrer">
                For designers <ArrowXS />
              </Link>
              <Link to="/get-started-guide/work-figma/" rel="noopener noreferrer">
                Figma libraries <ArrowXS />
              </Link>
            </div>
            {getCustomPage(mappingTableToImg.principles)}
            {getCustomPage(mappingTableToImg.styles)}
            {getCustomPage(mappingTableToImg.layout)}
          </div>
          <div className={styles.mainWrapper}>
            <div className={styles.tabsWrapper}>
              <TabLine
                underlined={false}
                onChange={updateValue}
                className={styles.tabs}
                value={value}
                size="l"
              >
                <TabLine.Item className={styles.tab} value={'components'}>
                  Components
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'charts'}>
                  Charts
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'table'}>
                  Table
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'ux'}>
                  UX Patterns
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'filters'}>
                  Filters
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'documentation'}>
                  Developer Docs
                </TabLine.Item>
              </TabLine>
            </div>
            <div className={styles.border}>{renderSwitch(value)}</div>
          </div>
          <EmailsBanner />
          {/* <UpdateBlock /> */}
        </div>
        {/* <LinkScroll classNmae={styles.updatesButton} activeClass="active" to="updBlock" spy={true} smooth={true}>
           Updates?
           <img src={updatesButton} alt="Updates button" />
         </LinkScroll> */}
      </div>
    </>
  );
}

export default Home;
