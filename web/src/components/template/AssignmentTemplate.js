import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import { Layout } from '../site/Layout'
import { Markdown } from '../site/Markdown'
import CodePen from '../content/CodePen'
import { CodeBlock } from '../content/CodeBlock'

const components = {
  Link,
  CodePen,
  code: CodeBlock,
}

export default function LessonTemplate({
  data: {
    mdx,
    allWarning: { nodes: warnings },
  },
}) {
  return (
    <Layout title={mdx.frontmatter.title} filePath={mdx.fields.filePath}>
      {warnings.length > 0 && process.env.NODE_ENV === 'development' && (
        <div className="rounded-md bg-yellow-50 p-4 mb-4 shadow text-yellow-800">
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
      <MDXProvider components={components}>
        <div className="markdown">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AssignmentQuery($id: String, $slug: String) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        filePath
      }
      frontmatter {
        title
      }
    }
    allWarning(filter: { slug: { eq: $slug }, type: { eq: "assignment" } }) {
      nodes {
        id
        message
      }
    }
  }
`
