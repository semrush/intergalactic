#!/usr/bin/env node
const { upload, uploadFilesInFolders } = require('../index');
const { _: files } = require('minimist')(process.argv.slice(2));
upload(files);
// uploadFilesInFolders(files);
