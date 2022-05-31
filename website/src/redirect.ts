if (globalThis.location?.origin === 'https://i.semrush.com') {
  let pathname = location.pathname;
  if (!pathname.startsWith('/intergalactic')) {
    pathname = '/intergalactic' + pathname;
  }
  if (location.hash) {
    pathname += location.hash;
  }
  location.replace('https://developer.semrush.com' + pathname);
}
