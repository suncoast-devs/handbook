function urlForLesson(lesson, module, program) {
  return `/${program}/${module}/${lesson}`
}

module.exports = { urlForLesson }
