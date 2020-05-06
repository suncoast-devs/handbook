import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import { Layout } from '../site/Layout'
import { Markdown } from '../site/Markdown'
import CodePen from '../content/CodePen'

const shortcodes = { Link, CodePen }

export default function LessonTemplate({
  data: {
    mdx,
    index,
    reading: { nodes: reading },
    allWarning: { nodes: warnings },
  },
}) {
  return (
    <Layout title={mdx.frontmatter.title} filePath={mdx.fields.filePath}>
      {warnings.length > 0 && process.env.NODE_ENV === 'development' && (
        <div class="rounded-md bg-yellow-50 p-4 mb-4 shadow text-yellow-800">
          <div class="flex">
            <div class="flex-shrink-0 leading-5 ">
              <Link to="/warnings">
                <i className="fad fa-exclamation-triangle"></i>
              </Link>
            </div>
            <div class="ml-3">
              <h3 class="text-sm leading-5 font-medium">
                The following attention is needed:
              </h3>
              <div class="mt-2 text-sm leading-5 text-yellow-700">
                <ul class="list-disc pl-5">
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
      <div className="bg-white overflow-hidden shadow rounded-lg lg:float-right lg:max-w-sm w-full lg:ml-6 mb-6">
        <div className="border-b bg-gray-50 border-gray-200 py-2 px-5 flex items-center justify-between">
          <h4 className="font-bold">Reading</h4>
          <Link className="uppercase text-gray-500" to={index.fields.path}>
            <i className="far fa-house"></i>
          </Link>
        </div>
        <nav className="py-2 px-3 flex flex-col">
          {reading.map(({ fields: { path }, frontmatter: { title } }) => (
            <Link
              className="mt-1 group px-2 py-1 text-sm leading-tight font-medium text-gray-600 hover:text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
              activeClassName="bg-gray-200"
              to={path}
            >
              {title || 'MISSING TITLE'}
            </Link>
          ))}
        </nav>
      </div>
      <MDXProvider components={shortcodes}>
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
      fields {
        type
        filePath
      }
      frontmatter {
        title
      }
    }
    index: mdx(fields: { slug: { eq: $slug }, type: { eq: "index" } }) {
      fields {
        path
      }
      frontmatter {
        title
      }
    }
    reading: allMdx(
      filter: { fields: { slug: { eq: $slug }, type: { eq: "reading" } } }
      sort: { fields: fileAbsolutePath, order: ASC }
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
