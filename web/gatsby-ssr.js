const React = require('react')
const { UIContextProvider } = require('./src/components/UIContext')

exports.wrapRootElement = ({ element, props }) => (
  <UIContextProvider {...props}>{element}</UIContextProvider>
)
