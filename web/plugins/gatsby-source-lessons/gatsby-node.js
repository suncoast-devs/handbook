const fs = require('fs').promises
const yaml = require('js-yaml')

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  async function createLessonNode(slug) {
    const nodeId = createNodeId(`handbook-lesson-${slug}`)
    const path = `${options.path}/${slug}`

    let index = null
    try {
      index = yaml.load(await fs.readFile(`${path}/index.yaml`, 'utf8'))
    } catch (error) {}

    const lesson = { slug, path, ...index }
    const content = JSON.stringify(lesson)

    await createNode({
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

  const files = await fs.readdir(options.path)
  files.forEach(async (slug) => {
    const lesson = await createLessonNode(slug)
    await validateLesson(lesson)
  })
}

async function validateLesson(meta) {
  const warnings = []

  async function validateFile(filePath) {
    try {
      const stats = await fs.stat(`${meta.path}/${filePath}`)
      if (stats.size < 128) {
        warnings.push(
          `The file ${filePath} appears to have insufficient content.`
        )
      } else {
        console.log(stats.size())
      }
    } catch (error) {
      console.log(error)
      warnings.push(`The file ${filePath} does not exist.`)
    }
  }

  if (!meta.title) warnings.push('Title is missing from index.')
  if (!meta.description) warnings.push('Description is missing from index.')
  if (!meta.assigments || meta.assignments.length === 0)
    warnings.push('No assignments.')

  await validateFile('objectives.md')
  await validateFile('lecture/presentation/index.md')
  await validateFile('lecture/index.md')

  if (warnings.length > 0) {
    console.warn(
      `The lesson ${meta.title} (${meta.slug}) has the following issues:\n` +
        warnings.map((warning) => `  - ${warning}`).join('\n')
    )
  }
}
