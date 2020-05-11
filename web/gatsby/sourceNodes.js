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

  async function createLessonNode(lessonPath) {
    const slug = path.basename(lessonPath)
    const nodeId = createNodeId(`lesson-${slug}`)
    const lessonFile = await fs.readFile(`${lessonPath}/index.md`, 'utf8')

    const index = matter(lessonFile).data
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

  async function createAssignmentNode(assignmentPath) {
    const slug = path.basename(assignmentPath)
    const nodeId = createNodeId(`assignment-${slug}`)
    const assignmentFile = await fs.readFile(
      `${assignmentPath}/index.md`,
      'utf8'
    )

    const index = matter(assignmentFile).data
    const assignment = { slug, path: assignmentPath, ...index }
    const content = JSON.stringify(assignment)

    nodes.push({
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Assignment`,
        content,
        contentDigest: createContentDigest(content),
      },
      ...assignment,
    })

    return assignment
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

  // Create Lessons
  await Promise.all(
    (
      await globby([path.join(APP_ROOT, 'lessons/*'), '!.DS_Store'], {
        expandDirectories: false,
        onlyFiles: false,
      })
    ).map(async (dir) => {
      const lesson = await createLessonNode(dir)
      const warnings = await validateLesson(lesson)
      warnings.forEach(createWarningNode)
    })
  )

  // Create Assignments
  await Promise.all(
    (
      await globby([path.join(APP_ROOT, 'assignments/*'), '!.DS_Store'], {
        expandDirectories: false,
        onlyFiles: false,
      })
    ).map(async (dir) => await createAssignmentNode(dir))
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
