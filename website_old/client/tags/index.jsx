import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useRouteMatch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Box } from '@semcore/flex-box';
import Accordion from '@semcore/accordion';
import FormatText from '../components/FormatText';
import HeadingLink from '../components/HeadingLink';
import ChangelogByComponent from '../components/ChangelogByComponent';
import Changelog from '../components/Changelog';
import Example from '../components/Example';
import Interface, { InterfaceHeader } from '../components/Interface';
import Link from '@semcore/link';
import { Link as ScrollLink } from 'react-scroll';
import { useQuery } from '@apollo/client';
import { INTERFACE_QUERY } from './interfaceQuery';

const emailCSS = require(`!!raw-loader!@semcore/email/lib/core/index.css`).default;

const Loading = (props) => {
  if (props.error) {
    console.error(props.error, props.value);
    return (
      <p>
        ☠️ We are trying our best to load the example for "{props.value}". Try to reload the page.
      </p>
    );
  } else if (props.pastDelay) {
    return <p>Loading...</p>;
  } else {
    return null;
  }
};

export const tags = {
  page: () => {
    return () => null;
  },
  text: ({ value, ...other }) => {
    return (props) => (
      <FormatText {...props} {...other} dangerouslySetInnerHTML={{ __html: value }} />
    );
  },
  link: ({ value }) => {
    return () => (
      <p>
        Property copy{' '}
        <Link to={value} smooth={true} duration={100} tag={ScrollLink}>
          {value}
        </Link>
      </p>
    );
  },
  heading: ({ value, ...other }) => {
    return (props) => (
      <HeadingLink {...props} {...other}>
        {value}
      </HeadingLink>
    );
  },
  email_html: ({ value, ...other }) => {
    const [componentName, htmlName = 'index'] = value.split('-');
    return (props) => {
      const match = useRouteMatch();
      const Component = Loadable.Map({
        delay: 0,
        loader: {
          CompileHtml: () =>
            import(
              `!!raw-loader!@docs/${match.params.category}/${match.params.page}/examples/${value}.html`
            ),
          Raw: () =>
            import(`!!raw-loader!@semcore/email/src/${componentName}/examples/${htmlName}.html`),
        },
        loading: (props) => <Loading value={value} {...props} />,
        render(loaded, props) {
          const ExampleComponent = loaded.Raw.default;
          const CompileHtml = loaded.CompileHtml.default;

          return (
            <>
              <style>{'* {font-family: inherit;}'}</style>
              <Example raw={{ code: ExampleComponent }} {...props}>
                <style>{emailCSS}</style>
                <div dangerouslySetInnerHTML={{ __html: CompileHtml }} {...other} />
              </Example>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Item.Toggle tag={Link}>
                    <Link.Addon tag={Accordion.Item.Chevron} mr={2} />
                    <Link.Text size={300}>Compiled example</Link.Text>
                  </Accordion.Item.Toggle>
                  <Accordion.Item.Collapse>
                    <Example raw={{ code: CompileHtml }} />
                  </Accordion.Item.Collapse>
                </Accordion.Item>
              </Accordion>
            </>
          );
        },
      });

      return <Component {...props} />;
    };
  },
  example: ({ value, ...other }, asyncCallback) => {
    const resolve = asyncCallback();
    return (props) => {
      const match = useRouteMatch();
      const examplePath = `${match.params.category}/${match.params.page}/examples/${value}.jsx`;
      const Component = Loadable.Map({
        delay: 0,
        loader: {
          Example: () => import(`@docs/${examplePath}`),
          Raw: () => import(`!!raw-loader!@docs/${examplePath}`),
        },
        loading: (props) => <Loading value={value} {...props} />,
        render(loaded, props) {
          const ExampleComponent = loaded.Example.default;
          const ExampleRawComponent = loaded.Raw.default;
          return React.createElement(() => {
            useEffect(() => resolve(loaded), []);
            const handleClick = useCallback(
              (e) => {
                e.stopPropagation();
              },
              [1],
            );
            return (
              <div onClick={handleClick}>
                <Example raw={{ code: ExampleRawComponent, path: examplePath }} {...props}>
                  <ExampleComponent {...other} />
                </Example>
              </div>
            );
          });
        },
      });
      return <Component {...props} />;
    };
  },
  import: ({ value, ...other }, asyncCallback) => {
    const resolve = asyncCallback();
    return (props) => {
      const match = useRouteMatch();
      const Component = Loadable({
        delay: 0,
        loader: () =>
          import(`@docs/${match.params.category}/${match.params.page}/components/${value}.jsx`),
        loading: (props) => <Loading value={value} {...props} />,
        render(loaded, props) {
          const Component = loaded.default;
          return React.createElement(() => {
            useEffect(() => resolve(loaded), []);
            return <Component {...props} {...other} />;
          });
        },
      });
      return <Component {...props} />;
    };
  },
  changelog: ({ value, ...other }, asyncCallback) => {
    const resolve = asyncCallback();
    const isRelease = value === 'release';
    return Loadable({
      delay: 0,
      loader: () =>
        isRelease
          ? import('../../../semcore/ui/CHANGELOG.md')
          : import(`@semcore/${value}/CHANGELOG.md`),
      loading: (props) => <Loading value={value} {...props} />,
      render(loaded, props) {
        return React.createElement(() => {
          useEffect(() => resolve(loaded), []);
          return (
            <FormatText>
              {isRelease ? (
                <Changelog {...props} {...other}>
                  {loaded.default}
                </Changelog>
              ) : (
                <ChangelogByComponent {...props} {...other}>
                  {loaded.default}
                </ChangelogByComponent>
              )}
            </FormatText>
          );
        });
      },
    });
  },
  interface: ({ value, ...other }, asyncCallback) => {
    const resolve = asyncCallback();
    return (props) => {
      const { loading, error, data } = useQuery(INTERFACE_QUERY, {
        variables: { name: value },
        // prod = 1 min; dev = 2 sec
        pollInterval: process.env.NODE_ENV === 'production' ? 60 * 1000 : 2 * 1000,
      });
      if (loading || error) {
        return <Loading error={error} pastDelay={loading} value={value} />;
      } else {
        return React.createElement(() => {
          useEffect(() => resolve(data), []);
          return (
            <Box my={10}>
              <InterfaceHeader {...data.interface} />
              <Interface data={data.interface} {...props} {...other} />
            </Box>
          );
        });
      }
    };
  },
};

export default function RenderTags({ content, onRender = () => {} }) {
  const defers = [];
  const children = content.map(({ tag, options, ...other }, i) => {
    try {
      const renderer = tags[tag];
      if (renderer === undefined) {
        throw new Error(`Unknown @tag: ${tag}`);
      }

      const Tag = renderer(
        {
          ...(options ? JSON.parse(options) : {}),
          ...other,
        },
        () => {
          let resolve;
          defers.push(new Promise((r) => (resolve = r)));
          return resolve;
        },
      );
      return React.createElement(Tag, { key: i });
    } catch (ex) {
      console.error(ex.message);
      return (
        <h3 key={`__error-${i}`}>
          <code>{ex.message}</code>
        </h3>
      );
    }
  });
  Promise.all(defers).then(onRender);
  return children;
}
