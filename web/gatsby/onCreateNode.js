const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const filePath = path.relative(
      path.join(__dirname, '..', '..'),
      node.fileAbsolutePath
    )
    const [rootDir] = filePath.split(path.sep)
    const subPath = createFilePath({ node, getNode, trailingSlash: false })
    const slug = (subPath.match(/^\/([\w-]+)/) || [, 1])[1]

    createNodeField({ name: 'filePath', node, value: filePath })
    createNodeField({ name: 'path', node, value: `/${rootDir}${subPath}` })
    createNodeField({ name: 'slug', node, value: slug })

    switch (rootDir) {
      case 'lessons':
        createNodeField({
          name: 'type',
          node,
          value: (Object.entries({
            // TODO: This should be better...
            lesson: /index\.md/,
            lecture: /lecture\.md/,
            reading: /^/,
          }).find(([_, v]) => v.test(filePath)) || [])[0],
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
