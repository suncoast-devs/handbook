const { urlForLesson } = require('.')

module.exports = [
  {
    query: `{
      allProgramsYaml {
        nodes {
          slug
          modules {
            slug
            lessons
          }
        }
      }
      allMdx {
        nodes {
          excerpt(pruneLength: 9200)
          fields {
            baseName
            type
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }`,
    transformer: ({ data: { allProgramsYaml, allMdx } }) => {
      const pages = []
      for (const program of allProgramsYaml.nodes) {
        for (const module of program.modules) {
          for (const slug of module.lessons) {
            const lessonPath = urlForLesson(slug, module.slug, program.slug)

            const lesson = allMdx.nodes.find(
              ({ fields }) => fields.type === 'lesson' && fields.slug === slug
            )
            if (lesson) {
              const path = lessonPath
              pages.push({
                objectID: path,
                path,
                title: lesson.frontmatter.title,
                excerpt: lesson.excerpt,
              })
            }

            const lecture = allMdx.nodes.find(
              ({ fields }) => fields.type === 'lecture' && fields.slug === slug
            )
            if (lecture) {
              const path = `${lessonPath}/lecture`
              pages.push({
                objectID: path,
                path,
                title: lecture.frontmatter.title,
                excerpt: lecture.excerpt,
              })
            }

            for (const readingPage of allMdx.nodes.filter(
              ({ fields }) => fields.type === 'reading' && fields.slug === slug
            )) {
              const path = `${lessonPath}/${readingPage.fields.baseName}`
              pages.push({
                objectID: path,
                path,
                title: readingPage.frontmatter.title,
                excerpt: readingPage.excerpt,
              })
            }
          }
        }
      }
      return pages
    },
    indexName: `PAGES`,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
