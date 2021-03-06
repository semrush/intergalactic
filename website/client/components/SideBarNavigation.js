import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import IF from '@semcore/utils/lib/if';
import { Text } from '@semcore/typography';
import ChevronRightXS from '@semcore/icon/lib/ChevronRight/xs';

const NavigationView = styled.div`
  padding: 32px;
  box-sizing: border-box;
  max-width: 260px;
  @media (max-width: 767px) {
    margin-right: 0;
  }
`;

const CategoryTitle = styled.div`
  color: #898d9a !important;
  cursor: pointer;
  padding: 8px 0 2px;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 1.5;
  &:hover,
  &:hover > * {
    color: #ff622d;
  }
`;

const CategoryItem = styled.a`
  padding: 2px 0 2px 24px;
  font-size: 16px;
  line-height: 1.5;
  color: #171a22;
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition: color 0.5s;
  box-shadow: ${({ highlighted }) => (highlighted ? '0 0 0 3px rgba(42, 148, 224, 0.3)' : 'none')};
  &:hover {
    color: #ff622d;
  }
  ${({ disabled }) =>
    disabled &&
    `
    cursor: default;
    pointer-events: none;
    color: #ccc;
  `} ${({ active }) =>
    active &&
    `
    color: #ff622d;
  `};
`;

const SideBarNavigation = ({ navigation = [] }) => {
  const { category, page } = useParams();
  const [collapseCategories, setCollapseCategories] = useState([category]);

  return (
    <NavigationView>
      {navigation.map((currentCategory, i) => {
        const isOpen = collapseCategories.includes(currentCategory.route);
        return (
          <React.Fragment key={i}>
            <CategoryTitle
              key={`category-${i}`}
              onClick={() => {
                if (collapseCategories.includes(currentCategory.route)) {
                  setCollapseCategories(
                    collapseCategories.filter((route) => route !== currentCategory.route),
                  );
                } else {
                  setCollapseCategories(collapseCategories.concat(currentCategory.route));
                }
              }}
            >
              <ChevronRightXS
                mr={2}
                style={{
                  transform: `rotate(${isOpen ? 90 : 0}deg)`,
                  transition: 'transform 0.25s ease-in-out',
                }}
              />
              <Text fontSize={'16px'} lineHeight={'150%'}>
                {currentCategory.title}
              </Text>
            </CategoryTitle>
            <IF condition={isOpen} key={`if-${i}`}>
              {currentCategory.children.map((p, i) => {
                return (
                  <CategoryItem
                    disabled={p.metadata.disabled}
                    href={`/${p.route}/`}
                    active={p.route === `${category}/${page}`}
                    key={`page-${i}`}
                    dangerouslySetInnerHTML={{ __html: p.title }}
                  />
                );
              })}
            </IF>
          </React.Fragment>
        );
      })}
    </NavigationView>
  );
};

export default SideBarNavigation;
