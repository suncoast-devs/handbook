import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import { Layout } from './Layout'
import { Markdown } from './Markdown'
import CodePen from '../content/CodePen'
import { CodeBlock } from '../content/CodeBlock'
import { urlForLesson } from '../../utils'

const LessonContext = React.createContext({
  program: null,
  module: null,
  lesson: null,
  programMap: {},
})

// TODO: If this ends up getting used elsewhere, refactor lesson Link to it's own component, or make urlForLesson
//  context aware so everything can just be urlForLesson(slug).
function AutoLink({ href, children, ...props }) {
  const [, linkedLesson] = href.match(/^lesson:\/\/(.+)/) || []
  if (linkedLesson) {
    return (
      <LessonContext.Consumer>
        {({ program, module, programMap }) => {
          let linkedProgram = program
          let linkedModule = module
          const currentModuleLessons = programMap[program][module]
          // This lesson is not in the current program and module.
          if (!currentModuleLessons.includes(linkedLesson)) {
            // Look for the first module in this program that includes this lesson.
            const [otherModule] =
              Object.entries(programMap[program]).find(([, l]) => {
                return l.includes(linkedLesson)
              }) || []
            if (otherModule) {
              linkedModule = otherModule
            } else {
              // Otherwise look for the first program that contain this lesson in a module.
              loop: for (const [program, modules] of Object.entries(
                programMap
              )) {
                for (const [module, lessons] of Object.entries(modules)) {
                  if (lessons.includes(linkedLesson)) {
                    linkedProgram = program
                    linkedModule = module
                    break loop
                  }
                }
              }
            }
          }
          return (
            <Link
              to={urlForLesson(linkedLesson, linkedModule, linkedProgram)}
              {...props}
            >
              {children}
            </Link>
          )
        }}
      </LessonContext.Consumer>
    )
  } else {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
}

const components = {
  CodePen,
  a: AutoLink,
  code: CodeBlock,
}

export default function LessonTemplate({
  pageContext: { program, module, slug },
  data: {
    mdx,
    lecture,
    lesson,
    reading: { nodes: reading },
    allWarning: { nodes: warnings },
    allProgramsYaml: { nodes: programs },
  },
}) {
  const programMap = programs.reduce((programs, program) => {
    programs[program.slug] = program.modules.reduce((modules, module) => {
      modules[module.slug] = module.lessons
      return modules
    }, {})
    return programs
  }, {})

  return (
    <LessonContext.Provider
      value={{ program, module, lesson: slug, programMap }}
    >
      <Layout
        title={mdx.frontmatter.title}
        relativePath={mdx.fields.filePath}
        absolutePath={mdx.fileAbsolutePath}
        program={program}
        module={module}
      >
        {warnings.length > 0 && process.env.NODE_ENV === 'development' && (
          <div className="rounded-md bg-yellow-50 p-4 mb-4 shadow text-yellow-800 print:hidden">
            <div className="flex">
              <div className="flex-shrink-0 leading-5 ">
                <Link to="/warnings">
                  <i className="fad fa-exclamation-triangle"></i>
                </Link>
              </div>
              <div className="ml-3">
                <h3 className="text-sm leading-5 font-medium">
                  The following attention is needed:
                </h3>
                <div className="mt-2 text-sm leading-5 text-yellow-700">
                  <ul className="list-disc pl-5">
                    {warnings.map(({ id, message }) => (
                      <li key={id}>
                        <Markdown>{message}</Markdown>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* TODO: Make this panel nav responsive */}
        {['lesson', 'reading'].includes(mdx.fields.type) && (
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6 print:hidden">
            <div className="border-b bg-gray-50 border-gray-200 py-2 px-5 flex items-center justify-between">
              <h4 className="font-bold">Reading</h4>
              {lecture && (
                <Link
                  className="uppercase text-gray-500"
                  to={`${urlForLesson(slug, module, program)}/lecture`}
                >
                  <i className="far fa-projector"></i>
                </Link>
              )}
            </div>
            <nav className="py-2 px-3 flex flex-col">
              {lesson && (
                <Link
                  key={lesson.id}
                  className="mt-1 group px-2 py-1 text-sm leading-tight font-medium text-gray-600 hover:text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
                  activeClassName="bg-gray-200"
                  to={urlForLesson(slug, module, program)}
                >
                  {lesson.frontmatter.title || 'MISSING TITLE'}
                </Link>
              )}
              {reading.map(
                ({ id, fields: { baseName }, frontmatter: { title } }) => (
                  <Link
                    key={id}
                    className="mt-1 group px-2 py-1 text-sm leading-tight font-medium text-gray-600 hover:text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
                    activeClassName="bg-gray-200"
                    to={`${urlForLesson(slug, module, program)}/${baseName}`}
                  >
                    {title || 'MISSING TITLE'}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
        <MDXProvider components={components}>
          <div className="markdown">
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </div>
        </MDXProvider>
      </Layout>
    </LessonContext.Provider>
  )
}

export const pageQuery = graphql`
  query LessonTemplateQuery($id: String, $slug: String) {
    mdx(id: { eq: $id }) {
      id
      body
      fileAbsolutePath
      fields {
        slug
        type
        filePath
      }
      frontmatter {
        title
      }
    }
    lecture: mdx(fields: { slug: { eq: $slug }, type: { eq: "lecture" } }) {
      id
    }
    lesson: mdx(fields: { slug: { eq: $slug }, type: { eq: "lesson" } }) {
      id
      frontmatter {
        title
      }
    }
    reading: allMdx(
      filter: { fields: { slug: { eq: $slug }, type: { eq: "reading" } } }
      sort: { fields: [frontmatter___order, fileAbsolutePath], order: ASC }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          baseName
        }
      }
    }
    allWarning(filter: { slug: { eq: $slug }, type: { eq: "lesson" } }) {
      nodes {
        id
        message
      }
    }
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
`
