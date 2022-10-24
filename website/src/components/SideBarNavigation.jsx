import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import IF from '@semcore/utils/lib/if';
import { Text } from '@semcore/typography';
import ChevronRightXS from '@semcore/icon/ChevronRight/m';
import cx from 'classnames';
import styles from './SideBarNavigation.module.css';

const SideBarNavigation = ({ navigation = [], onNavigate, className }) => {
  const { category, page } = useParams();
  const [collapseCategories, setCollapseCategories] = useState([category]);
  const handleClick = (currentCategory) => {
    if (collapseCategories.includes(currentCategory.route)) {
      setCollapseCategories(collapseCategories.filter((route) => route !== currentCategory.route));
    } else {
      setCollapseCategories(collapseCategories.concat(currentCategory.route));
    }
  };

  return (
    <nav className={cx(styles.navigationView, className)} aria-label="Main links">
      {navigation.map((currentCategory, i) => {
        const isOpen = collapseCategories.includes(currentCategory.route);
        return (
          <React.Fragment key={i}>
            <div
              className={styles.categoryTitle}
              key={`category-${i}`}
              tabIndex={0}
              onClick={() => handleClick(currentCategory)}
              onKeyDown={() => {
                if (event.code === 'Enter' || event.code === 'Space') {
                  handleClick(currentCategory);
                }
              }}
            >
              <ChevronRightXS
                mr={2}
                color="#898D9A"
                style={{
                  transform: `rotate(${isOpen ? 90 : 0}deg)`,
                  transition: 'transform 0.25s ease-in-out',
                }}
              />
              <Text fontSize={'16px'} lineHeight={'150%'}>
                {currentCategory.title}
              </Text>
            </div>
            <IF condition={isOpen} key={`if-${i}`}>
              {currentCategory.children.map((p, i) => {
                return (
                  <Link
                    className={cx(
                      styles.categoryItem,
                      p.metadata.disabled && styles.categoryItemDisabled,
                      p.route === `${category}/${page}` && styles.categoryItemActive,
                    )}
                    onClick={onNavigate}
                    to={`/${p.route}/`}
                    key={`page-${i}`}
                    aria-disabled={!!p.metadata.disabled}
                    dangerouslySetInnerHTML={{ __html: p.title }}
                  />
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
