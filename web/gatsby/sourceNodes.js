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

  async function createLessonNode(slug) {
    const nodeId = createNodeId(`lesson-${slug}`)
    const lessonPath = path.join(APP_ROOT, 'lessons', slug)

    const index = matter(await fs.readFile(`${lessonPath}/index.md`, 'utf8'))
      .data

    const lesson = { slug, path: lessonPath, ...index }
    const content = JSON.stringify(lesson)

    nodes.push({
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Lesson`,
        content,
        contentDigest: createContentDigest(content),
      },
      ...lesson,
    })

    return lesson
  }

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

  const files = await fs.readdir(path.join(APP_ROOT, 'lessons'))
  await Promise.all(
    files.map(async (slug) => {
      const lesson = await createLessonNode(slug)
      const warnings = await validateLesson(lesson)
      warnings.forEach(createWarningNode)
    })
  )

  // All markdown documents excluding files in `meta`
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
