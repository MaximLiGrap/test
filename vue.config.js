const { defineConfig } = require('@vue/cli-service');
var path = require('path');

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        'ag-grid-community/styles': path.resolve(
          __dirname,
          'node_modules/ag-grid-community/styles'
        ),
        'ag-grid-community': path.resolve(
          __dirname,
          'node_modules/ag-grid-community/dist/ag-grid-community.cjs.js'
        ),
        'ag-grid-enterprise': path.resolve(
          __dirname,
          'node_modules/ag-grid-enterprise/dist/ag-grid-enterprise.cjs.js'
        ),
      },
    },
  },
});
