import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import tableCaptions from 'markdown-it-table-captions';

import { renderComponentChangelog } from './renderComponentChangelog';
import { renderIframe } from './renderIframe';
import { renderLegacyEmails } from './renderLegacyEmails';
import { renderLoomVideo } from './renderLoomVideo';
import { renderSandbox } from './renderSandbox';

export const configureMarkdownIt = (md: MarkdownIt, plainTextOnly = false) => {
  md.renderer.rules.table_open = function (tokens, idx) {
    return '<table>';
  };

  md.use(container, 'sandbox', {
    render(tokens, idx, _, state) {
      return renderSandbox(tokens, idx, 'sandbox', plainTextOnly, state);
    },
  })
    .use(container, 'react-view', {
      render(tokens, idx) {
        return renderSandbox(tokens, idx, 'react-view', plainTextOnly);
      },
    })
    .use((md) => {
      if (plainTextOnly) {
        md.renderer.rules.image = () => '';
      }
    })
    .use(container, 'changelog', {
      render(tokens, idx) {
        return renderComponentChangelog(tokens, idx);
      },
    })
    .use(tableCaptions)
    .use(container, 'loom_video', {
      render(tokens, idx) {
        return renderLoomVideo(tokens, idx);
      },
    })
    .use(container, 'legacy_emails_view', {
      render(tokens, idx) {
        return renderLegacyEmails(tokens, idx);
      },
    })
    .use(container, 'iframe', {
      render(tokens, idx) {
        return renderIframe(tokens, idx);
      },
    });
};
