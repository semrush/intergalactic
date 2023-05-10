import React from 'react';
import TabLine from '@semcore/tab-line';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Tooltip from '@semcore/tooltip';
import Tag from '@semcore/tag';
import AllComponents from '../components/AllComponents';
// import EmailsBanner from '../components/EmailsBanner';
import whale from '../static/illustration/whale.svg';
import layout from '../static/illustration/layout.svg';
import principles from '../static/illustration/principles.svg';
import style from '../static/illustration/style.svg';
import ArrowXS from '@semcore/icon/ArrowRight/m';
import { Box, Flex } from '@semcore/flex-box';
// import updatesButton from '../static/illustration/search-for-updates.svg';
import SideBarNavigation from '../components/SideBarNavigation';
import ComponentCard from '../components/ComponentCard';
import { Text } from '@semcore/typography';
import { navigationTree } from '@navigation';
import staticFiles from '@static';
import { usePageData } from '../components/routing';
import Spin from '@semcore/spin';
import WarningM from '@semcore/icon/Warning/m';
import Error from '../components/Error';
import styles from './Home.module.css';
import cx from 'classnames';
import { logEvent } from '../utils/amplitude';

const mappingTableToImg = {
  principles: {
    className: `${styles.initialPrinciples} ${styles.principles}`,
    imgClassName: styles.principlesImg,
    img: principles,
    tag: 'Principles',
    attr: {
      role: 'region',
      'aria-label': 'Principles links',
    },
  },
  styles: {
    className: `${styles.initialPrinciples} ${styles.styles}`,
    imgClassName: styles.stylesImg,
    img: style,
    tag: 'Style',
    attr: {
      role: 'region',
      'aria-label': 'Style links',
    },
  },
  layout: {
    className: `${styles.initialPrinciples} ${styles.layout}`,
    imgClassName: styles.layoutImg,
    img: layout,
    tag: 'Layout',
    attr: {
      role: 'region',
      'aria-label': 'Layout links',
    },
  },
};

const getCustomPage = (table) => (
  <section className={table.className} {...table.attr}>
    <AllComponents
      navigation={navigationTree.filter((nav) => !nav.metadata.hide && nav.title === table.tag)}
    />
    <img className={table.imgClassName} src={table.img} alt={table.tag} aria-hidden="true" />
  </section>
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
      return getTabByTitle(['UX patterns'], styles.uxPatterns);
    case 'filters':
      return getTabByTitle(['Filters'], styles.filters);
    case 'documentation':
      return getTabByTitle(['Utils 🛠', 'Docs', 'Bugs and requests'], styles.devDocs);
    default:
      return null;
  }
};

const getTabByTitle = (titles, className) => {
  return (
    <div className={cx(styles.tableOverlay, className)}>
      {titles.length === 1 ? (
        titles[0] === 'Charts' ? (
          getChart(titles[0])
        ) : titles[0] === 'Table' ? (
          <Table title={titles[0]} />
        ) : (
          getComponents(titles[0])
        )
      ) : (
        titles.map((title, i) => {
          return (
            <Box mr={7.5} key={i}>
              <Text tag="h3" size={300}>
                {title}
              </Text>
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

  return url ? <img src={url} alt={title} /> : undefined;
};

const getComponents = (title) => {
  const items = navigationTree.filter((nav) => !nav.metadata.hide && title.includes(nav.title));
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
      <Tooltip placement="left" w={'fit-content'} key={child.elem.title}>
        <Tooltip.Trigger tag={Flex} alignItems="center" className={styles.component}>
          <Link
            className={styles.linkStyled}
            to={`/${child.elem.route}/`}
            onClick={() =>
              logEvent('tabs_comp:click', {
                group: 'int_main',
                tab: title,
                label: child.elem.title,
              })
            }
          >
            {child.elem.title}
          </Link>
          {child.elem.metadata.beta && (
            <Tag size="l" theme="primary" color="orange-500" children="beta" ml={1} />
          )}
          {child.elem.metadata.deprecated && <WarningM className={styles.componentDeprecated} />}
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

const getChart = (title) => {
  const items = navigationTree.filter((nav) => !nav.metadata.hide && title.includes(nav.title));
  const getList = (child) => {
    return (
      <ComponentCard
        key={child.elem.title}
        type={items[0].title.toLowerCase()}
        image={getImageName(child.elem.title)}
        disabled={!!child.elem.metadata.disabled}
        text={child.elem.title}
        href={child.elem.route}
        onClick={() =>
          logEvent('tabs_comp:click', {
            group: 'int_main',
            tab: title,
            label: child.elem.title,
          })
        }
      />
    );
  };

  const getDocs = (item) => (
    <Link
      to={item.route}
      key={item.route}
      onClick={() =>
        logEvent('tabs_comp:click', {
          group: 'int_main',
          tab: title,
          label: item.title,
        })
      }
    >
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
        <Text tag="h3" size={300}>
          Common docs
        </Text>
        <div className={cx(styles.docs, styles.cards)}>{listDocs}</div>
      </Box>
      <Box w="100%">
        <Text tag="h3" size={300}>
          Types
        </Text>
        <div className={styles.cards}>{listItems}</div>
      </Box>
    </>
  );
};

const tableDataContext = React.createContext({});

const Table = ({ title }) => {
  const items = navigationTree.filter((nav) => !nav.metadata.hide && title.includes(nav.title));
  const getDocs = items[0].children.map((item) => (
    <Flex alignItems="center">
      <Link
        to={item.route}
        key={item.route}
        onClick={() =>
          logEvent('tabs_comp:click', {
            group: 'int_main',
            tab: title,
            label: item.title,
          })
        }
      >
        {item.title}
      </Link>
      {item.metadata.deprecated && <WarningM className={styles.componentDeprecated} />}
    </Flex>
  ));

  const { tableControls, tableStates } = React.useContext(tableDataContext);

  return (
    <>
      <Box mr={12}>
        <Text tag="h3" size={300}>
          Common docs
        </Text>
        <div className={cx(styles.docs, styles.cards)}>{getDocs}</div>
      </Box>
      <Box w="100%">
        <Text tag="h3" size={300}>
          Controls and use cases
        </Text>
        <div className={styles.cards}>
          {tableControls.page.headings.map((heading) => (
            <ComponentCard
              key={heading.id}
              type="table"
              image={getImageName(heading.html)}
              text={heading.html}
              href={`${heading.route}#${heading.id}`}
              onClick={() =>
                logEvent('tabs_comp:click', {
                  group: 'int_main',
                  tab: title,
                  label: heading.html,
                })
              }
            />
          ))}
        </div>
        <Text tag="h3" size={300} inline mt={8}>
          States
        </Text>
        <div className={styles.cards}>
          {tableStates.page.headings.map((heading) => (
            <ComponentCard
              key={heading.id}
              type="table"
              image={getImageName(heading.html)}
              text={heading.html}
              href={`${heading.route}#${heading.id}`}
              onClick={() =>
                logEvent('tabs_comp:click', {
                  group: 'int_main',
                  tab: title,
                  label: heading.html,
                })
              }
            />
          ))}
        </div>
      </Box>
    </>
  );
};

function Home() {
  const [value, setValue] = React.useState('components');

  const tableControls = usePageData('table-group/table-controls');
  const tableStates = usePageData('table-group/table-states');

  const tableContext = React.useMemo(
    () => ({ tableControls, tableStates }),
    [tableControls, tableStates],
  );

  if (tableControls.loading || tableStates.loading) {
    return <Spin />;
  }

  const error = tableControls.error || tableStates.error;
  if (error) {
    return <Error title={error.message} />;
  }

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
        <main className={styles.overlay}>
          <div className={styles.promoWrapper} id="main-content">
            <h1 className={styles.title}>Intergalactic Design System</h1>
            <section className={styles.desc}>
              Intergalactic is a constantly developing system of UI components, guidelines and UX
              patterns. With all these tools you can build your own product.
            </section>
            <img className={styles.whaleImg} src={whale} alt="Whale" aria-hidden="true" />
            <section className={styles.started} role="region" aria-label="Get started links">
              <h2>Get started</h2>
              <Link
                to="/get-started-guide/dev-starter-guide/"
                rel="noopener noreferrer"
                onClick={() =>
                  logEvent('initial_principles:click', {
                    group: 'int_main',
                    block: 'Get started',
                    label: 'For developers',
                  })
                }
              >
                For developers <ArrowXS />
              </Link>
              <Link
                to="/get-started-guide/dis-starter-guide/"
                rel="noopener noreferrer"
                onClick={() =>
                  logEvent('initial_principles:click', {
                    group: 'int_main',
                    block: 'Get started',
                    label: 'For designers',
                  })
                }
              >
                For designers <ArrowXS />
              </Link>
              <Link
                to="/get-started-guide/work-figma/"
                rel="noopener noreferrer"
                onClick={() =>
                  logEvent('initial_principles:click', {
                    group: 'int_main',
                    block: 'Get started',
                    label: 'Figma libraries',
                  })
                }
              >
                Figma libraries <ArrowXS />
              </Link>
            </section>
            {getCustomPage(mappingTableToImg.principles)}
            {getCustomPage(mappingTableToImg.styles)}
            {getCustomPage(mappingTableToImg.layout)}
          </div>
          <section className={styles.mainWrapper}>
            <div className={styles.tabsWrapper}>
              <TabLine
                underlined={false}
                onChange={setValue}
                className={styles.tabs}
                value={value}
                size="l"
              >
                <TabLine.Item className={styles.tab} value={'components'}>
                  <Text size={500}>Components</Text>
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'charts'}>
                  <Text size={500}>Charts</Text>
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'table'}>
                  <Text size={500}>Table</Text>
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'ux'}>
                  <Text size={500}>UX Patterns</Text>
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'filters'}>
                  <Text size={500}>Filters</Text>
                </TabLine.Item>
                <TabLine.Item className={styles.tab} value={'documentation'}>
                  <Text size={500}>Developer Docs</Text>
                </TabLine.Item>
              </TabLine>
            </div>
            <tableDataContext.Provider value={tableContext}>
              <div className={styles.border} aria-label="Components links">
                {renderSwitch(value)}
              </div>
            </tableDataContext.Provider>
          </section>
          {/* <EmailsBanner /> */}
          {/* <UpdateBlock /> */}
        </main>
        {/* <LinkScroll className={styles.updatesButton} activeClass="active" to="updBlock" spy={true} smooth={true}>
           Updates?
           <img src={updatesButton} alt="Updates button" aria-hidden='true'/>
         </LinkScroll> */}
      </div>
    </>
  );
}

export default Home;
