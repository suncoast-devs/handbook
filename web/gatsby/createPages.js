const path = require('path')

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const allProgramsResult = await graphql(`
    query {
      allProgramsYaml {
        nodes {
          slug
          modules {
            slug
            lessons
          }
        }
      }
    }
  `)

  if (allProgramsResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allProgramsYaml" query')
  }

  const { nodes: programs } = allProgramsResult.data.allProgramsYaml
  programs.forEach((program) => {
    program.modules.forEach((module) => {
      module.lessons.forEach((lessonSlug) => {})
    })
  })

  for (const program of programs) {
    for (const module of program.modules) {
      await createPage({
        path: `/${program.slug}/${module.slug}`,
        component: path.resolve(`./src/components/site/ModuleTemplate.js`),
        context: { module: module.slug, program: program.slug },
      })

      for (const slug of module.lessons) {
        const mdxResults = await graphql(
          `
            query($slug: String) {
              lesson: mdx(
                fields: { slug: { eq: $slug }, type: { eq: "lesson" } }
              ) {
                id
              }
              lecture: mdx(
                fields: { slug: { eq: $slug }, type: { eq: "lecture" } }
              ) {
                id
              }
              reading: allMdx(
                filter: {
                  fields: { slug: { eq: $slug }, type: { eq: "reading" } }
                }
              ) {
                nodes {
                  id
                  fields {
                    baseName
                  }
                }
              }
            }
          `,
          { slug }
        )

        if (mdxResults.errors) {
          reporter.panicOnBuild(
            `🚨  ERROR: Loading lesson MDX query for: ${lessonSlug}`
          )
        }

        const { lesson, lecture, reading } = mdxResults.data

        const lessonContext = {
          module: module.slug,
          program: program.slug,
          slug,
        }

        if (lesson) {
          await createPage({
            path: `/${program.slug}/${module.slug}/${slug}`,
            component: path.resolve(`./src/components/site/LessonTemplate.js`),
            context: {
              id: lesson.id,
              ...lessonContext,
            },
          })
        }

        if (lecture) {
          await createPage({
            path: `/${program.slug}/${module.slug}/${slug}/lecture`,
            component: path.resolve(`./src/components/site/LessonTemplate.js`),
            context: {
              id: lecture.id,
              ...lessonContext,
            },
          })
        }

        for (const readingPage of reading.nodes) {
          await createPage({
            path: `/${program.slug}/${module.slug}/${slug}/${readingPage.fields.baseName}`,
            component: path.resolve(`./src/components/site/LessonTemplate.js`),
            context: {
              id: readingPage.id,
              ...lessonContext,
            },
          })
        }
      }
    }
  }
}
