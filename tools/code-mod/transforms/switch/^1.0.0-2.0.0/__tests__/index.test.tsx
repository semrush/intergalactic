const { defineTest } = require('jscodeshift/src/testUtils');

defineTest(__dirname, 'index', null, 'sizes');
defineTest(__dirname, 'index', null, 'labelProps');
defineTest(__dirname, 'index', null, 'addons');
defineTest(__dirname, 'index', null, 'onCheckedChange');
