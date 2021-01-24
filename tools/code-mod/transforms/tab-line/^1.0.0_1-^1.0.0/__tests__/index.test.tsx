const { defineTest } = require('jscodeshift/src/testUtils');

defineTest(__dirname, 'index', null, 'theme-to-underline');
defineTest(__dirname, 'index', null, 'sizes');
defineTest(__dirname, 'index', null, 'styled-tabline');
