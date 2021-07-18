const queries = require('./src/utils/algolia')
require('dotenv').config()

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://handbook.suncoast.io',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = (isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL) || 'https://handbook.suncoast.io'

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
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
