import { gql } from '@apollo/client';

export const INTERFACE_QUERY = gql`
  query getInterface($name: String!) {
    interface(name: $name) {
      name
      extends
      properties {
        name
        defaultValue
        type
        inheritedFrom
        documentation {
          contents {
            tag
            value
            level
            route
            options
          }
        }
        flags {
          isOptional
          isDeprecated
        }
      }
      documentation {
        contents {
          tag
          value
          level
          route
          options
        }
      }
    }
  }
`;
