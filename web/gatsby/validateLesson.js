const fs = require('fs').promises
const path = require('path')
const matter = require('gray-matter')

const APP_ROOT = path.normalize(path.join(__dirname, '..', '..'))

module.exports = async function (slug) {
  const warnings = []
  const lessonPath = path.join(APP_ROOT, 'lessons', slug)
  const lessonFile = await fs.readFile(`${lessonPath}/index.md`, 'utf8')
  const index = matter(lessonFile).data

  function addWarning(message) {
    warnings.push({ type: 'lesson', slug, message })
  }

  async function validateFile(filePath) {
    try {
      const stats = await fs.stat(`${lessonPath}/${filePath}`)
      if (stats.size < 128) {
        addWarning(
          `The file \`${filePath}\` appears to have insufficient content.`
        )
      }
    } catch (error) {
      addWarning(`The file \`${filePath}\` does not exist.`)
    }
  }

  if (!index.title) addWarning('Title is missing from index.')

  if (!index.assigments || meta.assignments.length === 0)
    addWarning('This lesson has no assignments.')

  await validateFile('lecture/presentation/index.md')

  await validateFile('lecture/index.md')

  return warnings
}
