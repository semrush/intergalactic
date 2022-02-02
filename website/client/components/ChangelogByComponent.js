import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Tag from '@semcore/tag';
import { Link } from 'react-router-dom';
import { Text } from '@semcore/typography';

const List = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0 0 20px 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 10px;
  }
`;

const TagStyled = styled(Tag)`
  margin-right: 16px;
  margin-top: 4px;
  width: 80px;
  flex-shrink: 0;
`;

class ChangelogByComponent extends React.Component {
  renderers() {
    let section;
    return {
      list: (props) => <List {...props} />,
      listItem: function ({ children }) {
        let label = null;
        if (!section) return null;
        switch (section.props.children) {
          case 'Added':
            label = (
              <TagStyled size="l" theme="#9ef2c9" color="#007c65">
                {section}
              </TagStyled>
            );
            break;
          case 'Fixed':
            label = (
              <TagStyled size="l" theme="#c4e5fe" color="#006dca">
                {section}
              </TagStyled>
            );
            break;
          case 'Changed':
          case 'Removed':
          case 'Deprecated':
            label = (
              <TagStyled size="l" theme="#ffdca2" color="#c33909">
                {section}
              </TagStyled>
            );
            break;
          case 'BREAK':
          case 'Security':
            label = (
              <TagStyled size="l" theme="#ffd7df" color="#d1002f">
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
  }
  render() {
    return <ReactMarkdown source={String(this.props.children)} renderers={this.renderers()} />;
  }
}

export default ChangelogByComponent;
