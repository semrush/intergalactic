import React from 'react';
import { Text } from '@semcore/typography';
import Divider from '@semcore/divider';
import AnchorIcon from '@semcore/icon/Link/m';
import WarningIcon from '@semcore/icon/Warning/m';
import { SideBarContext } from './SideBar/SideBarWrapper';
import styles from './TypescriptDeclaration.module.css';
import scrollToHash from '../utils/scrollToHash';
import { logEvent } from '../utils/amplitude';

const PropertyName = ({ name, parentName, children, route = '' }) => {
  const id = `${parentName}.${name}`;
  const [group, page] = route.split('/');
  const handleClick = (e) => {
    logEvent('title:click', { group, page, tab: 'api', name });
    scrollToHash(id);
  };
  return (
    <div className={styles.propertyName} id={id}>
      <AnchorIcon className={styles.propertyNameAnchor} onClick={handleClick} />
      {children}
    </div>
  );
};

const TypeView = ({ typeParts, dependencies, route = '' }) => {
  const { inspectTyping } = React.useContext(SideBarContext);
  const [group, page] = route.split('/');
  return (
    <code className={styles.typeText}>
      {typeParts.map((part, index) => {
        if (typeof part === 'string') return part;
        if (typeof part === 'object') {
          return (
            <a
              // rome-ignore lint/a11y/useValidAnchor: <explanation>
              onClick={() => {
                (group || page) &&
                  logEvent('props:click', { group, page, tab: 'api', label: part.displayText });
                inspectTyping(dependencies[part.referenceTo])();
              }}
              key={`${part}_${index}`}
              className={styles.interactiveTypeReference}
            >
              {part.displayText}
            </a>
          );
        }
      })}
    </code>
  );
};

export const TypescriptDeclarationView = ({
  namePrefix,
  declaration: { entity, name, inheritance, properties, type },
  dependencies,
  route,
}) => {
  const inheritanceList = [];
  for (let i = 0; i < inheritance?.length; i++) {
    if (i !== 0) inheritanceList.push(', ');
    inheritanceList.push(
      <TypeView
        key={i}
        typeParts={inheritance.slice(i, i + 1)}
        dependencies={dependencies}
        route={route}
      />,
    );
  }
  const minimizedType = type.length === 1 && type[0] === '{...}';
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {namePrefix}
        {entity}
        <Divider orientation='vertical' hMin='20px' mx='20px' />
        <code>
          {name}
          {entity === 'interface' && inheritanceList.length > 0 && ' extends '}
          {inheritanceList}
        </code>
      </div>
      {type && !minimizedType && <TypeView typeParts={type} dependencies={dependencies} />}
      {properties.length > 0 && (
        <table cellSpacing='0' className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.propertyCell}>Property</th>
              <th className={styles.descriptionCell}>Description</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, i) => {
              const otherParams = Object.keys(property.params).filter(
                (param) =>
                  param !== 'default' &&
                  param !== 'version' &&
                  param !== 'deprecated' &&
                  param !== 'type' &&
                  param !== 'use',
              );

              return (
                <tr key={`${i}`}>
                  <td className={styles.propertyCell}>
                    <PropertyName parentName={name} name={property.name} route={route}>
                      {property.name}
                      {!property.isOptional && <span className={styles.requiredMark}>*</span>}
                    </PropertyName>
                    <div className={styles.propertyDetails}>
                      {property.type && (
                        <TypeView typeParts={property.type} dependencies={dependencies} />
                      )}
                      {property.params.default && <Text italic> = {property.params.default}</Text>}
                      {property.params.deprecated && (
                        <div>
                          <div className={styles.deprecated}>
                            <WarningIcon />
                            deprecated {property.params.deprecated}
                          </div>
                        </div>
                      )}
                      {property.params.use && (
                        <div>
                          use{' '}
                          <TypeView typeParts={property.params.use} dependencies={dependencies} />{' '}
                          instead
                        </div>
                      )}
                      {property.params.version && (
                        <small>
                          <em>v{property.params.version}</em>
                        </small>
                      )}
                      {otherParams.map((paramName) => (
                        <div key={paramName}>
                          <em>{paramName}</em> {property.params[paramName] ?? null}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className={styles.descriptionCell}>
                    {/* rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                    <span dangerouslySetInnerHTML={{ __html: property.description }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
