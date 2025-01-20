import React from 'react';
import { useParams, Link } from 'react-router-dom';
import IF from '@semcore/core/lib/utils/if';
import { Text } from '@semcore/typography';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import WarningM from '@semcore/icon/Warning/m';
import Tooltip from '@semcore/tooltip';
import cx from 'classnames';
import { logEvent } from '../utils/amplitude';
import styles from './SideBarNavigation.module.css';

const SideBarNavigation = ({ navigation = [], onNavigate, className }) => {
  const { category, page } = useParams();
  const [collapseCategories, setCollapseCategories] = React.useState([category]);
  const handleClickCategory = (currentCategory) => {
    logEvent('left_menu:click', {
      label: currentCategory.route,
    });
    if (collapseCategories.includes(currentCategory.route)) {
      setCollapseCategories(collapseCategories.filter((route) => route !== currentCategory.route));
    } else {
      setCollapseCategories(collapseCategories.concat(currentCategory.route));
    }
  };
  const handleClickCategoryItem = (categoryItem) => {
    const [group, label] = categoryItem.route.split('/');
    onNavigate ? onNavigate() : undefined;
    logEvent('left_menu:click', {
      group,
      label,
    });
  };

  return (
    <nav className={cx(styles.navigationView, className)} aria-label='Main links'>
      {navigation.map((currentCategory, i) => {
        const isOpen = collapseCategories.includes(currentCategory.route);
        return (
          <React.Fragment key={currentCategory.route}>
            <div
              className={cx(styles.categoryContainer, styles.categoryTitle)}
              key={`category-${i}`}
              tabIndex={0}
              onClick={() => handleClickCategory(currentCategory)}
              onKeyDown={() => {
                if (event.key === 'Enter' || event.key === 'Space') {
                  handleClickCategory(currentCategory);
                }
              }}
            >
              <Text fontSize='16px' lineHeight='150%'>
                <ChevronRightM
                  mr={2}
                  color='#898D9A'
                  style={{
                    transform: `rotate(${isOpen ? 90 : 0}deg)`,
                    transition: 'transform 0.25s ease-in-out',
                  }}
                />
                {currentCategory.title}
              </Text>
              {!!currentCategory.metadata.deprecated && (
                <Tooltip title='Deprecated group'>
                  <WarningM className={styles.categoryIcon} />
                </Tooltip>
              )}
            </div>
            <IF condition={isOpen} key={`if-${i}`}>
              {currentCategory.children.map((item, i) => {
                return (
                  <div
                    className={cx(
                      styles.categoryContainer,
                      item.route === `${category}/${page}` && styles.categoryItemActive,
                    )}
                    key={`icon-container-${i}`}
                  >
                    <Link
                      className={cx(
                        styles.categoryItem,
                        item.metadata.disabled && styles.categoryItemDisabled,
                      )}
                      onClick={() => handleClickCategoryItem(item)}
                      to={`/${item.route}/`}
                      key={`page-${i}`}
                      aria-disabled={!!item.metadata.disabled}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    {!!item.metadata.deprecated && (
                      <Tooltip title='Deprecated component'>
                        <WarningM className={styles.categoryIcon} />
                      </Tooltip>
                    )}
                  </div>
                );
              })}
            </IF>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default SideBarNavigation;
