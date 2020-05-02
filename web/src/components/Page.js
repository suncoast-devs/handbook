import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import { Layout } from './Layout'

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({
  data: {
    mdx,
    index,
    reading: { nodes: reading },
  },
}) {
  return (
    <Layout title={mdx.frontmatter.title}>
      <div className="bg-white overflow-hidden shadow rounded-lg float-right max-w-sm w-full ml-6 mb-6">
        <div className="border-b bg-gray-50 border-gray-200 py-2 px-5 flex items-center justify-between">
          <h4 className="font-bold">Reading</h4>
          <Link
            className="uppercase text-xs font-light tracking-wider"
            to={index.fields.path}
          >
            {index.frontmatter.title}
          </Link>
        </div>
        <nav className="py-2 px-3 flex flex-col">
          {reading.map(({ fields: { path }, frontmatter: { title } }) => (
            <Link
              className="mt-1 group px-2 py-1 text-sm leading-tight font-medium text-gray-600 hover:text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
              activeClassName="bg-gray-200"
              to={path}
            >
              {title}
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
  }
`
