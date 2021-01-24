import { gql } from '@apollo/client';

export const TYPE_QUERY = gql`
  query getType($name: String!) {
    type(name: $name) {
      name
      type
    }
  }
`;
