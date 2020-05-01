import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useUIContext } from '../UIContext'
import { Heading } from './Heading'
import { Description } from './Description'
import { SubHeading } from './SubHeading'
import { LessonItem as Item } from './Item'

export function ModuleMenu() {
  const {
    allLesson: { nodes: lessons },
  } = useStaticQuery(graphql`
    query LessonQuery {
      allLesson {
        nodes {
          id
          slug
          title
        }
      }
    }
  `)
  const { resetNavigation, currentNavModule } = useUIContext()
  if (currentNavModule) {
    const { program, module } = currentNavModule
    return (
      <>
        <Heading onClick={resetNavigation} icon="fas fa-caret-left">
          {program.title}
        </Heading>
        <SubHeading>{module.title}</SubHeading>
        {module.description && <Description>{module.description}</Description>}
        {lessons && (
          <>
            <Heading>Lessons</Heading>
            <ul className="pl-3">
              {module.lessons.map((slug) => {
                const lesson = lessons.find((lesson) => lesson.slug === slug)
                return (
                  <Item key={slug} lesson={`/lessons/${slug}`}>
                    {lesson ? lesson.title : slug}
                  </Item>
                )
              })}
            </ul>
          </>
        )}
      </>
    )
  } else {
    return null
  }
}
