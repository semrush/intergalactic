import styled from 'styled-components';

const FormatText = styled.div`
  font-size: 16px;
  line-height: 1.5em;
  color: #171a22;
  font-weight: normal;
  word-wrap: break-word;
  overflow: auto;
  text-rendering: optimizeLegibility;
  a {
    color: #0070cc;
    text-decoration: none;
    &:hover {
      color: #0070cc;
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    padding: 0;
    margin: 0 0 1.5rem;
    cursor: pointer;
    &[alt$='#center'] {
      display: block;
      margin: auto;
    }
    &[alt$='#nomargin'] {
      margin: 0;
    }
  }

  h1 {
    padding: 0;
    margin: 0 0 1rem;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.25rem;
  }

  h2 {
    padding: 0;
    margin: 2rem 0 1rem;
    font-weight: 500;
    font-size: 1.5625rem;
    line-height: 2.25rem;
  }

  h3 {
    padding: 0;
    margin: 0 0 1rem;
    font-weight: 500;
    font-size: 1.17rem;
    line-height: 2.4rem;
  }

  h4 {
    padding: 0;
    margin: 0 0 0.5rem;
    font-weight: bold;
    font-size: 1rem;
    line-height: 2rem;
  }

  h5 {
    padding: 0;
    margin: 0 0 0.5rem;
    font-weight: bold;
    font-size: 0.83rem;
    line-height: 1.5rem;
  }

  h6 {
    padding: 0;
    margin: 0 0 0.5rem;
    font-weight: bold;
    font-size: 0.67rem;
    line-height: 1.5rem;
  }

  hgroup {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  ul {
    padding: 0;
    margin: 0 0 1.5rem 1.5rem;
    list-style-position: outside;
    list-style-image: none;
  }

  ol {
    padding: 0;
    margin: 0 0 1.5rem 1.5rem;
    list-style-position: outside;
    list-style-image: none;
  }

  dl {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  dd {
    padding: 0;
    margin: 0 0 0.5rem;
  }

  p {
    padding: 0;
    margin: 0 0 1rem;
    img:last-child:first-child {
      margin-bottom: 0;
    }
  }

  figure {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  pre {
    margin: 0 0 1.5rem;
  }

  pre:not([class]) {
    font-size: 0.85rem;
    line-height: 1.42;
    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    overflow: auto;
    padding: 1.5rem;
  }

  table {
    padding: 0;
    margin: 0 0 1.5rem;
    border-collapse: collapse;
    width: 100%;
  }

  fieldset {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  blockquote {
    padding: 2rem;
    margin: 0 0 1.5rem 0;
    font-size: 16px;
    line-height: 1.5em;
    background-color: rgba(184, 128, 255, 0.15);
    border-left: 12px solid #b880ff;
    border-radius: 6px;

    *:last-child {
      margin-bottom: 0;
    }
  }

  form {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  noscript {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  iframe {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  hr {
    padding: 0;
    margin: 0 0 calc(1.5rem - 1px);
    background: hsla(0, 0%, 0%, 0.2);
    border: none;
    height: 1px;
  }

  address {
    padding: 0;
    margin: 0 0 1.5rem;
  }

  b {
    font-weight: bold;
  }

  strong {
    font-weight: bold;
  }

  dt {
    font-weight: bold;
  }

  th {
    font-weight: bold;
  }

  ol li {
    padding-left: 0;
  }

  ul li {
    padding-left: 0;
  }

  li > ol {
    margin-left: 1.5rem;
    margin-bottom: calc(1.5rem / 4);
    margin-top: calc(1.5rem / 4);
  }

  li > ul {
    margin-left: 1.5rem;
    margin-bottom: calc(1.5rem / 4);
    margin-top: calc(1.5rem / 4);
  }

  kbd {
    font-size: 0.85rem;
    line-height: 1.5rem;
  }

  samp {
    font-size: 0.85rem;
    line-height: 1.5rem;
  }

  abbr {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }

  acronym {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }

  abbr[title] {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
    text-decoration: none;
  }

  thead {
    text-align: left;
  }

  td,
  th {
    vertical-align: top;
    text-align: left;
    border-bottom: 1px solid #d1d4db;
    padding: 0.75rem 1rem calc(0.75rem - 1px);
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  tt,
  code {
    background-color: hsla(220, 8%, 37%, 0.1);
    border-radius: 4px;
    font-family: Consolas, 'Roboto Mono', 'Liberation Mono', Menlo, Courier, monospace;
    padding: 0 0;
  }

  pre code {
    background: none;
    line-height: 1.42;
  }

  code:before,
  code:after,
  tt:before,
  tt:after {
    letter-spacing: -0.2em;
    content: ' ';
  }

  pre code:before,
  pre code:after,
  pre tt:before,
  pre tt:after {
    content: '';
  }

  small {
    color: #575c66;
  }
`;

FormatText.displayName = 'FormatText';

export default FormatText;
