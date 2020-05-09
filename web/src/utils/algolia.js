module.exports = [
  {
    query: `{
      allMdx(filter: {fields: { type: {in: ["lesson", "reading"]}}}) {
        edges {
          node {
          objectID: id
          fields {
            type
            path
          }
          frontmatter {
            title
          }
          excerpt(pruneLength: 9200)
          }
        }
      }
    }`,
    transformer: ({ data }) => data.allMdx.edges.map(({ node: { fields, frontmatter, ...rest } }) => ({
      ...fields,
      ...frontmatter,
      ...rest,
    })),
    indexName: `PAGES`,
    settings: { attributesToSnippet: [`excerpt:20`] }
  }
]