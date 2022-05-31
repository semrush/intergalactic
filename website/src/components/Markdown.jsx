import React from 'react';
import Accordion from '@semcore/accordion';
import Spin from '@semcore/spin';
import FormatText from './FormatText';
import HeadingLink from './HeadingLink';
import ChangelogByComponent from './ChangelogByComponent';
import Changelog from './Changelog';
import Example from './Example';
import { TypescriptDeclarationView } from './TypescriptDeclaration';
import Link from '@semcore/link';
import { usePromise } from '../utils/usePromise';

import emailCSS from '!!raw-loader!@semcore/email/lib/core/index.css';

const tokenHandlers = {
  text: ({ html }) => {
    return <FormatText html={html} />;
  },
  heading: ({ html, level, id }) => {
    return (
      <HeadingLink level={level} id={id}>
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </HeadingLink>
    );
  },
  example: ({ load, raw, relativePath }) => {
    const { data: runtimeModule, error, loading } = usePromise(load);

    if (loading) return <Spin />;
    if (error)
      return <Example raw={{ code: raw, path: relativePath }}>Failed to load runtime</Example>;

    const Component = runtimeModule.default;

    return (
      <Example raw={{ code: raw, path: relativePath }}>
        <Component />
      </Example>
    );
  },
  import: ({ load, props }) => {
    const { data: runtimeModule, error, loading } = usePromise(load);

    if (loading) return <Spin />;
    if (error) return <>Failed to load playground. Details are in developer console.</>;

    const Component = runtimeModule.default;

    if (!Component) {
      // eslint-disable-next-line no-console
      console.error(
        `Loaded invalid runtime module. Expected it to have .default property but it is undefined. Whole module object: `,
        runtimeModule,
      );
      return <>Failed to load playground. Details are in developer console</>;
    }

    return <Component {...(props || {})} />;
  },
  changelog: ({ blocks }) => {
    return <Changelog blocks={blocks} />;
  },
  changelogByComponent: ({ blocks }) => {
    return <ChangelogByComponent blocks={blocks} />;
  },
  email_html: ({ raw, compiled }) => {
    return (
      <>
        <style>{'* {font-family: inherit;}'}</style>
        <Example raw={{ code: raw }}>
          <style>{emailCSS}</style>
          <div dangerouslySetInnerHTML={{ __html: compiled }} />
        </Example>
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Toggle>
              <Link>
                <Link.Addon mr={2}>
                  <Accordion.Item.Chevron />
                </Link.Addon>
                <Link.Text size={300}>Compiled example</Link.Text>
              </Link>
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse>
              <Example raw={{ code: compiled }} />
            </Accordion.Item.Collapse>
          </Accordion.Item>
        </Accordion>
      </>
    );
  },
  typescriptDeclaration: ({ declaration, dependencies }) => {
    return <TypescriptDeclarationView declaration={declaration} dependencies={dependencies} />;
  },
};

export const RenderMarkdown = ({ tokens }) => {
  return tokens.map((token, index) => {
    const Renderer = tokenHandlers[token.type];
    if (Renderer === undefined) {
      throw new Error(`Unknown @tag: ${token.type}`);
    }

    return (
      <React.Fragment key={`${token.type}_${index}`}>
        <Renderer {...token} />
      </React.Fragment>
    );
  });
};
