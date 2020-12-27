const { default: pluginTester } = require('babel-plugin-tester');

const plugin = require('../src');

const path = require('path');

// TODO - test multiple returns 

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    // babelrc: true,
  },
});
