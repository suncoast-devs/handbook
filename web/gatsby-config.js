const queries = require('./src/utils/algolia')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteUrl: `https://handbook.suncoast.io`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `float-right group-hover:visible invisible`,
              elements: ['h1', 'h2'],
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=1]': 'group',
                'heading[depth=2]': 'group',
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    ...['assignments', 'lessons', 'programs', 'warm-ups'].map((name) => ({
      resolve: `gatsby-source-filesystem`,
      options: {
        name: name,
        path: `${__dirname}/../${name}`,
      },
    })),
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@handbook': `${__dirname}/src/components/content`,
        },
        extensions: [],
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@mdx-deck'],
      },
    },
    ...['assignments', 'lessons', 'programs', 'warm-ups'].map((name) => ({
      resolve: `gatsby-source-filesystem`,
      options: {
        name: name,
        path: `${__dirname}/../${name}`,
      },
    })),
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-stylelint`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
  ],
}
