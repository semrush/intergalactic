const { defineTest } = require('jscodeshift/src/testUtils');

defineTest(__dirname, 'index', null, 'tip-direction');
defineTest(__dirname, 'index', null, 'default-spin');
