import container from 'markdown-it-container';
import MarkdownIt from 'markdown-it';
import { renderSandbox } from './renderSandbox';
import { renderLoomVideo } from './renderLoomVideo';

import tableCaptions from 'markdown-it-table-captions';
import { renderComponentChangelog } from './renderComponentChangelog';

export const configureMarkdownIt = (md: MarkdownIt, plainTextOnly = false) => {
  md.use(container, 'sandbox', {
    render(tokens, idx) {
      return renderSandbox(tokens, idx, 'sandbox', plainTextOnly);
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
    });
};
