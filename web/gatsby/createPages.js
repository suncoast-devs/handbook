const path = require('path')

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/\\\\/lessons\\\\//" } }) {
        nodes {
          id
          fields {
            path
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create handbook pages.
  const { nodes } = result.data.allMdx
  nodes.forEach((node) => {
    createPage({
      path: node.fields.path,
      component: path.resolve(`./src/components/template/LessonTemplate.js`),
      context: { id: node.id, slug: node.fields.slug },
    })
  })
}
