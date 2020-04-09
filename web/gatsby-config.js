module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `programs`,
        path: `${__dirname}/../programs`,
      },
    },
    {
      resolve: `gatsby-source-lessons`,
      options: {
        path: `${__dirname}/../lessons`,
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
