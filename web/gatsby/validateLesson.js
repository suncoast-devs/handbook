const fs = require('fs').promises

module.exports = async function (meta) {
  const warnings = []

  function addWarning(message) {
    warnings.push({ type: 'lesson', slug: meta.slug, message })
  }

  async function validateFile(filePath) {
    try {
      const stats = await fs.stat(`${meta.path}/${filePath}`)
      if (stats.size < 128) {
        addWarning(
          `The file \`${filePath}\` appears to have insufficient content.`
        )
      }
    } catch (error) {
      addWarning(`The file \`${filePath}\` does not exist.`)
    }
  }

  if (!meta.title) addWarning('Title is missing from index.')

  if (!meta.assigments || meta.assignments.length === 0)
    addWarning('This lesson has no assignments.')

  await validateFile('lecture/presentation/index.md')

  await validateFile('lecture/index.md')

  return warnings
}
