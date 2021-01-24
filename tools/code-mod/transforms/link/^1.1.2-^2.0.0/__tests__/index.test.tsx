const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'index', null, 'link-addons');
defineTest(__dirname, 'index', null, 'link-size');
defineTest(__dirname, 'index', null, 'link-theme');
defineTest(__dirname, 'index', null, 'link-use-hint-to-hint');
defineTest(__dirname, 'index', null, 'link-core-to-link');
defineTest(__dirname, 'index', null, 'link-core-and-link-to-link');
