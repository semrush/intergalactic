import React from 'react';
import { useQuery, gql } from '@apollo/client';
import LoadingPage from '../components/LoadingPage';
import Error from '../components/Error';
import ComponentCard from './ComponentCard';
import { getImageName } from '../pages/Home';
import styled from 'styled-components';

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: 12px 12px;
  width: 100%;
  margin: 0;
  margin-top: 12px;
  padding: 0;
`;

export const PAGE_QUERY = gql`
  query getPage($slug: String!) {
    headings(slug: $slug) {
      title
      route
      level
    }
  }
`;

function GetTableHeader({ slug }) {
  const { loading, error, data } = useQuery(PAGE_QUERY, {
    variables: { slug },
    pollInterval: process.env.NODE_ENV === 'production' ? 60 * 1000 : 2 * 1000,
  });

  if (loading) return <LoadingPage />;
  if (error && !data) return <Error title="Oh no! It’s 404!" />;

  const getList = (child) => {
    return (
      <ComponentCard
        key={child.title}
        image={getImageName(child.title)}
        text={child.title}
        href={child.route}
        type="table"
      />
    );
  };

  const listItems = data.headings
    .map((child) => {
      return {
        title: child.title,
        route: `${slug}/#${child.route}`,
      };
    })
    .flat()
    .map((child) => getList(child));

  return <Cards>{listItems}</Cards>;
}

export default GetTableHeader;
