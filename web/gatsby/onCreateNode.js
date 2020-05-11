const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const filePath = path.relative(
      path.join(__dirname, '..', '..'),
      node.fileAbsolutePath
    )
    createNodeField({ name: 'filePath', node, value: filePath })

    if (/\/lessons\//.test(node.fileAbsolutePath)) {
      {
        // Add `slug` and `path` fields to lesson MDX files for URL generation
        const subPath = createFilePath({ node, getNode, trailingSlash: false })
        createNodeField({ name: 'path', node, value: `/lessons${subPath}` })

        const slug = (subPath.match(/^\/([\w-]+)/) || [, 1])[1]
        createNodeField({ name: 'slug', node, value: slug })

        const type = (Object.entries({
          reading: /^\/[\w-]+\/reading\/[\w-]+$/,
          lecture: /^\/[\w-]+\/lecture\/[\w-]+$/,
          lesson: /^\/[\w-]+$/,
        }).find(([k, v]) => v.test(subPath)) || [])[0]
        createNodeField({ name: 'type', node, value: type })
      }
    }
  }
}
