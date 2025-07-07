export const renderLoomVideo = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];
    if (token.nesting === 1) {
      const title = token.info.replace('loom_video', '').trim() || 'video';
      const url = tokens[idx + 2].content;

      return `<div class="embedded-video-container"><iframe src='${url}' frameborder='0' webkitAllowFullScreen mozAllowFullScreen allowFullScreen class="embedded-video-iframe" title='${title}'>`;
    }
    return '</iframe></div>';
  };
  return renderFunc(tokenList, index);
};
