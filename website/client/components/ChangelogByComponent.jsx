import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Text } from '@semcore/typography';
import { List, renderListItem } from './Changelog';

class ChangelogByComponent extends React.Component {
  renderers() {
    let section;
    return {
      list: (props) => <List {...props} />,
      listItem: function ({ children }) {
        if (!section) return null;
        return renderListItem({ labelText: section.props.children, text: children });
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
