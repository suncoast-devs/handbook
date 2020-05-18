import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useUIContext } from '../../../context/UIContext'
import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { LinkItem as Item } from './Item'

export function AssignmentMenu() {
  const {
    allMdx: { nodes: assignments },
  } = useStaticQuery(graphql`
    query AssignmentMenuQuery {
      allMdx(
        filter: { fields: { type: { eq: "assignment" } } }
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            path
          }
        }
      }
    }
  `)
  const { resetNavigation, currentNavTarget } = useUIContext()
  if (currentNavTarget) {
    return (
      <>
        <Heading onClick={resetNavigation} icon="fas fa-caret-left">
          All Programs
        </Heading>
        <SubHeading>Assignments</SubHeading>
        <div className="pl-3">
          {assignments.map((assignment) => {
            return (
              <Item key={assignment.id} to={assignment.fields.path}>
                {assignment.frontmatter.title}
              </Item>
            )
          })}
        </div>
      </>
    )
  } else {
    return null
  }
}
