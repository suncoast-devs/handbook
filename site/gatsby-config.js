module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/../content`,
        name: 'content'
      }
    },
    'gatsby-transformer-remark'
  ]
}
