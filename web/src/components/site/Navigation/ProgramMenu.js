import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Heading } from './Heading'
import { Description } from './Description'
import { SubHeading } from './SubHeading'
import { ModuleItem as Item } from './Item'
import { useUIContext } from '../../../context/UIContext'

export function ProgramMenu() {
  const { navigateToTarget } = useUIContext()

  const {
    allProgramsYaml: { nodes: programs },
  } = useStaticQuery(graphql`
    query ProgramQuery {
      allProgramsYaml(sort: { fields: position, order: ASC }) {
        nodes {
          title
          modules {
            title
            description
            lessons
          }
          description
          id
        }
      }
    }
  `)

  return (
    <>
      <Heading icon="far fa-house">All Programs</Heading>
      {programs.map((program) => {
        return (
          <nav key={program.id}>
            <SubHeading>{program.title}</SubHeading>
            {program.description && (
              <Description>{program.description}</Description>
            )}

            <div className="pl-3">
              {program.modules.map((module, index) => (
                <Item key={index} module={{ program, module }}>
                  {module.title}
                </Item>
              ))}
            </div>
          </nav>
        )
      })}
      {process.env.NODE_ENV === 'development' && (
        <>
          <Heading
            icon="far fa-laptop-code"
            onClick={() => navigateToTarget({ menu: 'assignments' })}
          >
            Assignments
          </Heading>
          <Heading
            icon="far fa-dumbbell"
            onClick={() => navigateToTarget({ menu: 'warm-ups' })}
          >
            Warm Ups
          </Heading>
        </>
      )}
    </>
  )
}
