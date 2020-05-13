const path = require('path')

exports.sourceNodes = require('./gatsby/sourceNodes')

exports.onCreateNode = require('./gatsby/onCreateNode')

exports.createPages = require('./gatsby/createPages')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(__dirname, 'src/components'),
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
      ],
    },
  })
}
