const fs = require('fs').promises
const path = require('path')
const matter = require('gray-matter')
const { createFilePath } = require('gatsby-source-filesystem')

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  async function createLessonNode(slug) {
    const nodeId = createNodeId(`lesson-${slug}`)
    const path = `${options.path}/${slug}`

    const index = matter(await fs.readFile(`${path}/index.md`, 'utf8')).data

    const lesson = { slug, path, ...index }
    const content = JSON.stringify(lesson)

    await createNode({
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Lesson`,
        content,
        contentDigest: createContentDigest(content),
      },
      ...lesson,
    })

    return lesson
  }

  const files = await fs.readdir(options.path)
  return Promise.all(
    files.map(async (slug) => {
      const lesson = await createLessonNode(slug)
      return validateLesson(lesson)
    })
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx' && /\/lessons/.test(node.fileAbsolutePath)) {
    // Add `slug` and `path` fields to lesson MDX files for URL generation
    const subPath = createFilePath({ node, getNode, trailingSlash: false })
    createNodeField({ name: 'path', node, value: `/lessons${subPath}` })

    const slug = (subPath.match(/^\/([\w-]+)/) || [, 1])[1]
    createNodeField({ name: 'slug', node, value: slug })

    const type = (Object.entries({
      reading: /^\/[\w-]+\/reading\/[\w-]+$/,
      lecture: /^\/[\w-]+\/lecture\/[\w-]+$/,
      index: /^\/[\w-]+$/,
    }).find(([k, v]) => v.test(subPath)) || [])[0]
    createNodeField({ name: 'type', node, value: type })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "//lessons/" } }) {
        nodes {
          id
          fields {
            path
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create handbook pages.
  const { nodes } = result.data.allMdx
  nodes.forEach((node) => {
    createPage({
      path: node.fields.path,
      component: path.resolve(`./src/components/Page.js`),
      context: { id: node.id, slug: node.fields.slug },
    })
  })
}

// TODO: Extract this logic?
async function validateLesson(meta) {
  const warnings = []

  async function validateFile(filePath) {
    try {
      const stats = await fs.stat(`${meta.path}/${filePath}`)
      if (stats.size < 128) {
        warnings.push(
          `The file ${filePath} appears to have insufficient content.`
        )
      }
    } catch (error) {
      warnings.push(`The file ${filePath} does not exist.`)
    }
  }

  if (!meta.title) warnings.push('Title is missing from index.')
  if (!meta.description) warnings.push('Description is missing from index.')
  if (!meta.assigments || meta.assignments.length === 0)
    warnings.push('No assignments.')

  await validateFile('lecture/presentation/index.md')
  await validateFile('lecture/index.md')

  if (warnings.length > 0) {
    console.warn(
      `The lesson ${meta.title} (${meta.slug}) has the following issues:\n` +
        warnings.map((warning) => `  - ${warning}`).join('\n')
    )
  }
}
