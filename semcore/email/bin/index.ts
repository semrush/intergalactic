#!/usr/bin/env node

/* eslint-disable no-console */

const inky = require('inky');

function parseHtml() {
  const filename = process.argv[2];

  // Make sure we got a filename on the command line
  if (process.argv.length < 3) {
    console.log('Usage: semcore-email FILENAME');
    process.exit(1);
  }

  try {
    inky(
      {
        src: filename,
        dest: 'dist',
      },
      function () {
        console.log(`Parsing finished. You can find new file in dist/${filename}`);
      },
    );
  } catch (err) {
    console.log(err);
  }
}

parseHtml();
