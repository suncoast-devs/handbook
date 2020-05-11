const path = require('path')
const LessonTemplate = path.resolve(
  `./src/components/template/LessonTemplate.js`
)
const AssignmentTemplate = path.resolve(
  `./src/components/template/AssignmentTemplate.js`
)

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/\\\\/lessons|assignments\\\\//" }
        }
      ) {
        nodes {
          id
          fields {
            path
            slug
            type
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
      component:
        {
          lesson: LessonTemplate,
          assignment: AssignmentTemplate,
        }[node.fields.type] || LessonTemplate,
      context: { id: node.id, slug: node.fields.slug },
    })
  })
}
