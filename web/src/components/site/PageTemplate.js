import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import { Layout } from './Layout'
import { Markdown } from './Markdown'
import CodePen from '../content/CodePen'
import { GithubCommitViewer } from '../content/GithubCommitViewer'
import { CodeBlock } from '../content/CodeBlock'

const components = {
  Link,
  CodePen,
  GithubCommitViewer,
  code: CodeBlock,
}

export default function PageTemplate({
  data: {
    mdx,
    lecture,
    reading: { nodes: reading },
    allWarning: { nodes: warnings },
  },
}) {
  console.log({ mdx, lecture, reading })
  return (
    <Layout
      title={mdx.frontmatter.title}
      relativePath={mdx.fields.filePath}
      absolutePath={mdx.fileAbsolutePath}
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
                to={lecture.fields.path}
              >
                <i className="far fa-projector"></i>
              </Link>
            )}
          </div>
          <nav className="py-2 px-3 flex flex-col">
            {reading.map(({ fields: { path }, frontmatter: { title } }) => (
              <Link
                key={path}
                className="mt-1 group px-2 py-1 text-sm leading-tight font-medium text-gray-600 hover:text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
                activeClassName="bg-gray-200"
                to={path}
              >
                {title || 'MISSING TITLE'}
              </Link>
            ))}
          </nav>
        </div>
      )}
      <MDXProvider components={components}>
        <div className="markdown">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String, $slug: String) {
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
    lecture: mdx(fields: { type: { eq: "lecture" }, slug: { eq: $slug } }) {
      id
      fields {
        path
      }
    }
    reading: allMdx(
      filter: {
        fields: { slug: { eq: $slug }, type: { in: ["lesson", "reading"] } }
      }
      sort: {
        fields: [fields___type, frontmatter___order, fileAbsolutePath]
        order: ASC
      }
    ) {
      nodes {
        id
        fields {
          path
        }
        frontmatter {
          title
        }
      }
    }
    allWarning(filter: { slug: { eq: $slug }, type: { eq: "lesson" } }) {
      nodes {
        id
        message
      }
    }
  }
`
