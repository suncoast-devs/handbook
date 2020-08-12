import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from './Layout'

export default function ModuleTemplate({
  pageContext: { program, module },
  data,
}) {
  const currentModule = data.programsYaml.modules.find((m) => m.slug === module)
  const lessons = data.allMdx.nodes.reduce((l, n) => {
    l[n.fields.slug] = n.frontmatter.title
    return l
  }, {})
  return (
    <Layout title={currentModule.title} program={program} module={module}>
      <h2 className="-mt-4 font-normal">{data.programsYaml.title}</h2>
      {currentModule.description && (
        <div className="my-3 p-3 text-sm leading-tight tracking-light text-gray-700 bg-gray-300 rounded">
          {currentModule.description}
        </div>
      )}
      <p className="mt-8">Lessons in this module:</p>
      <ul>
        {currentModule.lessons.map((slug) => (
          <li>
            <Link
              to={`/${program}/${module}/${slug}`}
              className="text-blue-600 hover:text-blue-400 hover:cursor-pointer"
            >
              {lessons[slug]}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ModuleTemplateQuery($program: String) {
    programsYaml(slug: { eq: $program }) {
      title
      modules {
        slug
        title
        lessons
        description
      }
    }
    allMdx(filter: { fields: { type: { eq: "lesson" } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
