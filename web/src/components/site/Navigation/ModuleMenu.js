import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Heading } from './Heading'
import { Description } from './Description'
import { SubHeading } from './SubHeading'
import { LinkItem as Item } from './Item'

export function ModuleMenu({ program, module }) {
  const { allMdx, allProgramsYaml } = useStaticQuery(graphql`
    query ModuleMenuQuery {
      allProgramsYaml {
        nodes {
          title
          slug
          modules {
            slug
            title
            lessons
            description
          }
        }
      }
      allMdx(filter: { fields: { type: { eq: "lesson" } } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `)

  const currentProgram = allProgramsYaml.nodes.find((n) => n.slug === program)
  const currentModule = currentProgram.modules.find((m) => m.slug === module)
  const lessons = allMdx.nodes.reduce((l, n) => {
    l[n.fields.slug] = n.frontmatter.title
    return l
  }, {})

  return (
    <>
      <Heading icon="fas fa-caret-left">
        <Link to="/">{currentProgram.title}</Link>
      </Heading>
      <SubHeading>{currentModule.title}</SubHeading>
      {currentModule.description && (
        <Description>{currentModule.description}</Description>
      )}
      <Heading>Lessons</Heading>
      <div className="pl-3">
        {currentModule.lessons.map((slug) => {
          const lesson = lessons[slug]
          return lesson ? (
            <Item key={slug} to={`/${program}/${module}/${slug}`}>
              {lesson}
            </Item>
          ) : (
            <Item key={slug}>
              <span className="text-red-400">MISSING LESSON: {slug}</span>
            </Item>
          )
        })}
      </div>
    </>
  )
}
