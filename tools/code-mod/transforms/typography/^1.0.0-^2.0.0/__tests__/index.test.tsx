const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'index', null, 'text');
defineTest(__dirname, 'index', null, 'paragraph');
defineTest(__dirname, 'index', null, 'headings');
defineTest(__dirname, 'index', null, 'heading-text');
