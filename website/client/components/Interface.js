import React from 'react';
import classNames from 'classnames';
import { isTag } from 'documentalist/dist/client';
import Tag from '@semcore/tag';
import { Text } from '@semcore/typography';
import { Link as ScrollLink } from 'react-scroll';
import Link from '@semcore/link';
import Divider from '@semcore/divider';
import Tooltip from '@semcore/tooltip';
import styled from 'styled-components';
import { Box, Flex } from '@semcore/flex-box';
import { InterfaceLink } from './SideBar';
import RenderTags from '../tags';
import { useQuery } from '@apollo/client';
import { TYPE_QUERY } from '../tags/typeQuery';
import AnchorIcon from '@semcore/icon/lib/Link/m';
import WarningIcon from '@semcore/icon/lib/Warning/m';
import { css } from '@semcore/core';

const LINK_REG = /{@link(.*?)}/g;

const AnchorLink = styled(AnchorIcon)`
  position: absolute;
  top: 50%;
  left: -20px;
  padding-right: 4px;
  opacity: 0;
  transform: translateY(-50%);
  transition: opacity 0.2s ease-in;
  cursor: pointer;
  color: #a6b0b3;

  &:hover {
    color: #333333;
  }
`;

const styles = css`
  STag {
    background: rgba(247, 25, 57, 0.15) !important;
    color: #f71939 !important;
    border-color: #f71939 !important;
  }
`;

const WarningLink = styled(WarningIcon)`
  color: #f71939;
`;

const PropertyNameWrap = styled(Text)`
  position: relative;
  display: block;
  &:hover ${AnchorLink} {
    opacity: 1;
  }
`;

const PropertyName = ({ name, children, ...other }) => {
  const handleClick = () => {
    window.location.hash = name;
  };
  return (
    <PropertyNameWrap {...other}>
      <AnchorLink onClick={handleClick} />
      {children}
    </PropertyNameWrap>
  );
};

function sortPropsByRequired(props) {
  return props.sort((a, b) => {
    const isOptionalA = a.flags ? a.flags.isOptional : false;
    const isOptionalB = b.flags ? b.flags.isOptional : false;
    if (!isOptionalA && isOptionalB) return -1;
    if (isOptionalA && !isOptionalB) return 1;
    return 0;
  });
}

function sortPropsByDefault(props) {
  return props.sort((a, b) => {
    if (!a.hasOwnProperty('defaultValue') && b.hasOwnProperty('defaultValue')) return 1;
    if (a.hasOwnProperty('defaultValue') && !b.hasOwnProperty('defaultValue')) return -1;
    return 0;
  });
}

function markdownCode(text) {
  return {
    __html: text
      .replace('<', '&lt;')
      .replace(/```([^`]+)```/g, (_, code) => `<pre>${code}</pre>`)
      .replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`),
  };
}

function isEmpty(children) {
  const array = React.Children.toArray(children);
  return array.length === 0 || array.filter((item) => !!item).length === 0;
}

function renderEmptyState(message = 'There is nothing here yet ¯_(ツ)_/¯') {
  return (
    <Tr>
      <td colSpan={2}>
        <Box my={3}>
          <em>{message}</em>
        </Box>
      </td>
    </Tr>
  );
}

const Table = styled.table`
  border-collapse: collapse;
`;
const Tr = styled.tr`
  border-bottom: 1px solid #ccc;
  vertical-align: top;
`;

const ModifierTable = function({ children, emptyMessage }) {
  return (
    <div className="docs-modifiers-table">
      <Table>
        <thead>
          <Tr>
            <Text tag="th" size={300} bold p="16px 8px 12px 0">
              Property
            </Text>
            <Text tag="th" size={300} bold p="16px 8px 12px 0">
              Description
            </Text>
          </Tr>
        </thead>
        <tbody>{isEmpty(children) ? renderEmptyState(emptyMessage) : children}</tbody>
      </Table>
    </div>
  );
};

function InterfaceHeader(props) {
  const { name, extends: ext } = props;

  const renderInheritance = () => {
    const extendsList = ext ? ext.filter((int) => int.startsWith('I')) : [];
    if (!extendsList.length) return null;
    return (
      <>
        extends{' '}
        {extendsList.map((name, idx, arr) => (
          <React.Fragment key={idx}>
            <InterfaceLink name={name} />
            {idx < arr.length - 1 ? ', ' : ''}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <Text size={300} tag="div">
      <Flex alignItems="center">
        <span>interface</span>
        <Divider orientation="vertical" h="20px" mx="20px" />
        <code>
          {name} {renderInheritance()}
        </code>
      </Flex>
      {props.children}
    </Text>
  );
}

const EntryType = ({ name }) => {
  const { loading, data, error } = useQuery(TYPE_QUERY, {
    variables: { name },
  });

  if (loading || error) {
    return name;
  }

  const { type } = data;

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Link>{type.name}</Link>
      </Tooltip.Trigger>
      <Tooltip.Popper wMax="420px">
        <Text italic size={300}>
          {type.type}
        </Text>
      </Tooltip.Popper>
    </Tooltip>
  );
};

class Interface extends React.PureComponent {
  static defaultProps = {
    title: 'Props',
  };

  SCROLL_DUR = 200;

  constructor(props) {
    super(props);
    this.state = {
      inheritedRowsHidden: Boolean(
        props.data.properties.filter((prop) => !prop.inheritedFrom).length,
      ),
    };
  }

  render() {
    const { data, title } = this.props;

    const selfProps = sortPropsByRequired(
      sortPropsByDefault(data.properties.filter((prop) => !prop.inheritedFrom)),
    );
    const selfPropRows = selfProps.map((prop) => this.renderPropRow(prop, data.name));
    return (
      <Box>
        {!!data.documentation && <RenderTags content={data.documentation.contents} />}
        <ModifierTable
          emptyMessage="There is nothing here yet. Your princess is in another castle."
          title={title}
        >
          {selfPropRows}
        </ModifierTable>
      </Box>
    );
  }

  renderType(type) {
    const parts = type.split('|');
    return (
      <Text tag="code" color="#F71939">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <EntryType name={part.trim()} key={part} />
            {i < parts.length - 1 && ' | '}
          </React.Fragment>
        ))}
      </Text>
    );
  }

  renderDeprecation(isDeprecated) {
    const [version, linkTemplate] = isDeprecated.split(LINK_REG);
    const link = linkTemplate?.replace(LINK_REG, (_, url) => url).trim();

    return (
      <Box my={2}>
        <Tag styles={styles}>
          <WarningLink mt={'5px'} /> deprecated: {version}
        </Tag>
        {link && (
          <Box my={2}>
            <Text>
              Use{' '}
              <Link to={link} smooth={true} duration={this.SCROLL_DUR} tag={ScrollLink}>
                {link}
              </Link>{' '}
              instead
            </Text>
          </Box>
        )}
      </Box>
    );
  }

  renderPropRow = (entry, interfaceName) => {
    const { name, documentation, flags = {} } = entry;
    const { isOptional, isDeprecated } = flags;
    let version, type;

    if (!documentation) {
      return null;
    }
    const contents = documentation.contents.filter((val) => {
      if (isTag(val)) {
        if (val.tag === 'version') {
          version = val.value;
          return false;
        }
        if (val.tag === 'type') {
          type = val.value;
          return false;
        }
      }
      return true;
    });

    const defaultValue = entry.defaultValue ? (
      <em className={classNames('docs-prop-default')}>"{entry.defaultValue}"</em>
    ) : (
      ''
    );
    return (
      <Tr key={name} name={`${interfaceName}.${name}`}>
        <Text tag="td" size={300} fontWeight={400} p="12px 8px 12px 0">
          <PropertyName name={`${interfaceName}.${name}`}>
            {name}
            {!isOptional && <Text color="#F71939">*</Text>}
          </PropertyName>
          {isDeprecated && this.renderDeprecation(isDeprecated)}
          {this.renderType(type || entry.type)}
          <Text italic>
            {defaultValue ? ' = ' : ''}
            {defaultValue}
          </Text>
          {version && (
            <small>
              <i> v{version}</i>
            </small>
          )}
        </Text>
        <Text tag="td" size={300} p="12px 8px 12px 0">
          <RenderTags content={contents} />
          <div className="docs-prop-tags">{this.renderTags(entry)}</div>
        </Text>
      </Tr>
    );
  };

  renderTags(entry) {
    const { inheritedFrom } = entry;
    return inheritedFrom && <Tag>Inherited from {inheritedFrom}</Tag>;
  }
}

export default Interface;
export { InterfaceHeader };
