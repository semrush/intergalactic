import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Tag from '@semcore/tag';
import { Link } from 'react-router-dom';
import { Text } from '@semcore/typography';
import { getLabel } from './Changelog';

const ComponentTitle = styled.span`
  text-transform: capitalize;
  margin-right: 10px;
  small {
    color: gray;
  }
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0 0 0 20px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 10px;
  }
  p {
    margin: 0;
  }
`;

const TagStyled = styled(Tag)`
  margin-right: 16px;
  margin-top: 4px;
  width: 80px;
  flex-shrink: 0;
`;

const ChangelogByComponent = ({ blocks }) => {
  return blocks.map(({ title, components }) => (
    <React.Fragment key={title}>
      <Text tag="h3">
        <Text>{title}</Text>
      </Text>
      {components.map(({ title, component, changes }) => (
        <div key={component}>
          <Text tag="h4">
            <ComponentTitle>{title}</ComponentTitle>
            <small>({component})</small>
          </Text>
          <List>
            {changes.map(({ type, text }) => (
              <ListItem key={`${type}-${text}`}>
                {getLabel(type)} <Text dangerouslySetInnerHTML={{ __html: text }} />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </React.Fragment>
  ));
  let section;
  return {
    list: (props) => <List {...props} />,
    listItem: function ({ children }) {
      let label = null;
      if (!section) return null;
      switch (section.props.children) {
        case 'Added':
          label = (
            <TagStyled size="l" color="green-500">
              {section}
            </TagStyled>
          );
          break;
        case 'Fixed':
          label = (
            <TagStyled size="l" color="blue-500">
              {section}
            </TagStyled>
          );
          break;
        case 'Changed':
        case 'Removed':
        case 'Deprecated':
          label = (
            <TagStyled size="l" color="orange-500">
              {section}
            </TagStyled>
          );
          break;
        case 'BREAK':
        case 'Security':
          label = (
            <TagStyled size="l" color="red-500">
              {section}
            </TagStyled>
          );
      }
      return (
        <ListItem>
          {label}
          <div>{children}</div>
        </ListItem>
      );
    },
    heading: function ({ level, children }) {
      if (level === 2) {
        const version = children[0]?.props?.children;
        return (
          <Text tag="h3">
            <Text>{version}</Text>
            <small>{children[1]}</small>
          </Text>
        );
      }
      if (level === 3) {
        section = children[0];
      }
      return null;
    },
    link: ({ href, ...props }) => {
      if (href.startsWith('/')) {
        return <Link to={href} {...props} />;
      } else {
        return <a href={href} {...props} />;
      }
    },
    paragraph: () => null,
  };
};

export default ChangelogByComponent;
