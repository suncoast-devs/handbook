import React from 'react'
import Link from 'gatsby-link'

const PageRow = ({ page }) => (
  <tr>
    <td>
      <Link to={page.fields.slug}>{page.fields.slug} </Link>
    </td>
    <td>{page.frontmatter.title}</td>
  </tr>
)

const IndexPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  return (
    <table>
      <tbody>
        {edges.map(edge => <PageRow key={edge.node.id} page={edge.node} />)}
      </tbody>
    </table>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
