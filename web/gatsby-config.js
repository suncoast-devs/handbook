module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        // defaultLayouts: {
        //   posts: require.resolve('./src/components/default-post-layout.js'),
        //   default: require.resolve('./src/components/default-page-layout.js'),
        // },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `programs`,
        path: `${__dirname}/../programs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `lessons`,
        path: `${__dirname}/../lessons`,
      },
    },
    {
      resolve: `gatsby-source-lessons`,
      options: {
        path: `${__dirname}/../lessons`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@handbook': `${__dirname}/src/components`,
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
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-stylelint`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
  ],
}