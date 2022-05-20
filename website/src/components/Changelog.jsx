import React from 'react';
import styled from 'styled-components';
import Tag from '@semcore/tag';
import { Text } from '@semcore/typography';

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
  width: 80px;
  flex-shrink: 0;
`;

export const getLabel = (type) => {
  switch (type) {
    case 'Added':
      return (
        <TagStyled size="l" color="green-500">
          {type}
        </TagStyled>
      );
    case 'Fixed':
      return (
        <TagStyled size="l" color="blue-500">
          {type}
        </TagStyled>
      );
    case 'Changed':
    case 'Removed':
    case 'Deprecated':
      return (
        <TagStyled size="l" color="orange-500">
          {type}
        </TagStyled>
      );
    case 'BREAK':
    case 'Security':
      return (
        <TagStyled size="l" color="red-500">
          {type}
        </TagStyled>
      );
    default:
      return <strong>{type}</strong>;
  }
};

const Changelog = ({ blocks }) => {
  return blocks.map(({ title, changes }) => (
    <React.Fragment key={title}>
      <Text tag="h3">
        <Text>{title}</Text>
      </Text>
      <List>
        {changes.map(({ type, text }) => (
          <ListItem key={`${type}-${text}`}>
            {getLabel(type)} <Text dangerouslySetInnerHTML={{ __html: text }} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  ));
};

export default Changelog;
