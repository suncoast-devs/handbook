const fs = require('fs').promises
const path = require('path')
const globby = require('globby')
const matter = require('gray-matter')
const validateLesson = require('./validateLesson')

const APP_ROOT = path.normalize(path.join(__dirname, '..', '..'))

module.exports = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const nodes = []

  function createWarningNode(warning) {
    const content = JSON.stringify(warning)
    nodes.push({
      id: createNodeId(content),
      parent: null,
      children: [],
      internal: {
        type: `Warning`,
        content,
        contentDigest: createContentDigest(content),
      },
      ...warning,
    })
  }

  // Validate Lessons
  await Promise.all(
    (
      await globby([path.join(APP_ROOT, 'lessons/*'), '!.DS_Store'], {
        expandDirectories: false,
        onlyFiles: false,
      })
    ).map(async (dir) => {
      const warnings = await validateLesson(path.basename(dir))
      warnings.forEach(createWarningNode)
    })
  )

  // Ensure titles on all markdown documents excluding files in `meta`, etc.
  const allMdFilepaths = await globby([
    path.join(APP_ROOT, '**/*.md{,x}'),
    '!**/meta/**',
    '!**/node_modules/**',
  ])

  await Promise.all(
    allMdFilepaths.map(async (mdFilePath) => {
      const frontmatter = matter(await fs.readFile(mdFilePath, 'utf8')).data
      if (!frontmatter.title) {
        const filePath = path.relative(path.join(APP_ROOT), mdFilePath)
        createWarningNode({
          type: 'file',
          filePath,
          message: `The file \`${filePath}\` is missing title frontmatter.`,
        })
      }
    })
  )

  return Promise.all(nodes.map((node) => createNode(node)))
}
