import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useApolloPrefetch from '../useApolloPrefetch';

const CategoryPageList = styled.ul`
  display: flex;
  flex-flow: wrap column;
  max-height: 405px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const CategoryItem = styled.li`
  margin: 0 38px 8px 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Category = styled.div``;

const Title = styled.div`
  font-family: FactorA-Bold, sans-serif;
  font-size: 24px;
  margin-bottom: 8px;
`;

const LinkStyled = styled(Link)`
  font-size: 18px;
  line-height: 1.25;
  color: #171a22;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  &:hover {
    text-decoration: underline;
    transition: all 0.5s;
  }
`;

const LinkDisabled = styled.span`
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  line-height: 1.25;
  color: #ccc;
  text-decoration: none;
  cursor: default;
  pointer-events: none;
`;

const options = { fitWidth: true, transitionDuration: 0 };

const List = ({ navigation = [] }) => {
  const { prefetch } = useApolloPrefetch();
  return (
    <Masonry options={options}>
      {navigation.map((category, i) => (
        <Category key={i}>
          <Title>{category.title}</Title>
          <CategoryPageList>
            {category.children.map((page, i) => (
              <CategoryItem key={i}>
                {page.metadata.disabled ? (
                  <LinkDisabled>{page.title}</LinkDisabled>
                ) : (
                  <LinkStyled
                    to={`/${page.route}/`}
                    onMouseEnter={() => prefetch(category.route, page.route)}
                  >
                    {page.title}
                  </LinkStyled>
                )}
              </CategoryItem>
            ))}
          </CategoryPageList>
        </Category>
      ))}
    </Masonry>
  );
};

export default List;
