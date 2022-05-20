/* eslint-disable no-console */
const express = require('express');
const app = express();

const port = 3001;

app.get('/ping', function (req, res) {
  console.info('received ping request');
  res.send('pong');
  res.statusCode = 200;
  res.end();
});

app.get('*', function (req, res) {
  res.status(404);
});

app.listen(port).on('listening', () => {
  console.info(`api server started on port ${port}`);
});
