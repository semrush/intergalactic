import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';
import { routes } from '@navigation';
import styles from './AllComponents.module.css';

const options = { fitWidth: true, transitionDuration: 0 };

const List = ({ navigation = [] }) => {
  const prefetch = (route) => {
    routes[route]?.loadPage();
  };
  return (
    <Masonry options={options}>
      {navigation.map((category, i) => (
        <div key={i}>
          <h2 className={styles.title}>{category.title}</h2>
          <div className={styles.categoryPageList}>
            {category.children.map((page, i) => (
              <div className={styles.categoryItem} key={i}>
                {page.metadata.disabled ? (
                  <span className={styles.linkDisabled}>{page.title}</span>
                ) : (
                  <Link
                    className={styles.linkStyled}
                    to={`/${page.route}/`}
                    onMouseEnter={() => prefetch(page.route)}
                  >
                    {page.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default List;
