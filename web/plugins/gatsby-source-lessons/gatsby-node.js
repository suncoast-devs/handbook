const fs = require('fs').promises
const path = require('path')
const globby = require('globby')
const matter = require('gray-matter')
const { createFilePath } = require('gatsby-source-filesystem')

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  const nodes = []

  async function createLessonNode(slug) {
    const nodeId = createNodeId(`lesson-${slug}`)
    const path = `${options.path}/${slug}`

    const index = matter(await fs.readFile(`${path}/index.md`, 'utf8')).data

    const lesson = { slug, path, ...index }
    const content = JSON.stringify(lesson)

    nodes.push({
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

  function createWarningNode(warning) {
    const content = JSON.stringify(warning)
    nodes.push({
      id: createNodeId(content),
      parent: null,
      children: [],
      internal: {
        type: `Warning`,
        content,
        contentDigest: createContentDigest(content),
      },
      ...warning,
    })
  }

  const files = await fs.readdir(options.path)
  await Promise.all(
    files.map(async (slug) => {
      const lesson = await createLessonNode(slug)
      const warnings = await validateLesson(lesson)
      warnings.forEach(createWarningNode)
    })
  )

  // All markdown documents excluding files in `meta`
  const allMdFilepaths = await globby([
    path.join(options.path, '..', '**/*.md{,x}'),
    '!**/meta/**',
    '!**/node_modules/**',
  ])

  await Promise.all(
    allMdFilepaths.map(async (mdFilePath) => {
      const frontmatter = matter(await fs.readFile(mdFilePath, 'utf8')).data
      if (!frontmatter.title) {
        const filePath = path.relative(
          path.join(options.path, '..'),
          mdFilePath
        )
        createWarningNode({
          type: 'file',
          filePath,
          message: `The file \`${filePath}\` is missing title frontmatter.`,
        })
      }
    })
  )

  return Promise.all(nodes.map((node) => createNode(node)))
}

exports.onCreateNode = (
  { node, actions, getNode },
  { plugins, ...options }
) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const filePath = path.relative(
      path.join(options.path, '..'),
      node.fileAbsolutePath
    )
    createNodeField({ name: 'filePath', node, value: filePath })

    if (/\/lessons\//.test(node.fileAbsolutePath)) {
      {
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
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/\\\\/lessons\\\\//" } }) {
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
      component: path.resolve(`./src/components/template/LessonTemplate.js`),
      context: { id: node.id, slug: node.fields.slug },
    })
  })
}

// TODO: Extract this logic?
async function validateLesson(meta) {
  const warnings = []

  function addWarning(message) {
    warnings.push({ type: 'lesson', slug: meta.slug, message })
  }

  async function validateFile(filePath) {
    try {
      const stats = await fs.stat(`${meta.path}/${filePath}`)
      if (stats.size < 128) {
        addWarning(
          `The file \`${filePath}\` appears to have insufficient content.`
        )
      }
    } catch (error) {
      addWarning(`The file \`${filePath}\` does not exist.`)
    }
  }

  if (!meta.title) addWarning('Title is missing from index.')

  if (!meta.assigments || meta.assignments.length === 0)
    addWarning('This lesson has no assignments.')

  await validateFile('lecture/presentation/index.md')

  await validateFile('lecture/index.md')

  return warnings
}
