function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('@semcore/', true, /lib\/es6\/index\.js$/));
