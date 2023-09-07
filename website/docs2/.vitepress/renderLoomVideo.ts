export const renderLoomVideo = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];
    if (token.type === 'container_loom_video_open') {
      let url = token.info.split(' ')[2];
      if (!url) return [];

      if (url.startsWith('https://www.loom.com/share/')) {
        url = `https://www.loom.com/embed/${url.substring('https://www.loom.com/share/'.length)}`;
      }

      return `<div class="embedded-video-container"><iframe src="${url}" frameborder='0' webkitAllowFullScreen mozAllowFullScreen allowFullScreen class="embedded-video-iframe" title='video' /></div>`
      
    }
    return []
  };
  return renderFunc(tokenList, index);
};
