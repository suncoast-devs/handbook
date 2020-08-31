const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const filePath = path.relative(
      path.join(__dirname, '..', '..'),
      node.fileAbsolutePath
    )
    const baseName = path.basename(node.fileAbsolutePath, '.md')
    const subPath = createFilePath({ node, getNode, trailingSlash: false })
    const slug = (subPath.match(/^\/([\w-]+)/) || [undefined, 1])[1]

    createNodeField({ name: 'filePath', node, value: filePath })
    createNodeField({ name: 'baseName', node, value: baseName })
    createNodeField({ name: 'slug', node, value: slug })

    const [rootDir] = filePath.split(path.sep)
    switch (rootDir) {
      case 'lessons':
        createNodeField({
          name: 'type',
          node,
          value:
            {
              index: 'lesson',
              lecture: 'lecture',
            }[baseName] || 'reading',
        })
        break
      case 'assignments':
        createNodeField({ name: 'type', node, value: 'assignment' })
        break
      case 'warm-ups':
        createNodeField({ name: 'type', node, value: 'warm-up' })
        break
      default:
        createNodeField({ name: 'type', node, value: 'page' })
    }
  }
}
