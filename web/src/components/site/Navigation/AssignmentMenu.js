import React from 'react'
import cx from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import { useUIContext } from '../../../context/UIContext'
import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { LinkItem as Item } from './Item'

export function AssignmentMenu() {
  const {
    resetNavigation,
    currentNavTarget,
    assignmentTags,
    toggleAssignmentTag,
  } = useUIContext()
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
            tags
          }
          fields {
            path
          }
        }
      }
    }
  `)

  if (currentNavTarget) {
    return (
      <>
        <Heading onClick={resetNavigation} icon="fas fa-caret-left">
          All Programs
        </Heading>
        <SubHeading>Assignments</SubHeading>
        <nav className="px-5">
          {assignments
            .map((assignment) => assignment.frontmatter.tags)
            .flat()
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort()
            .map((tag) => (
              <button
                onClick={() => toggleAssignmentTag(tag)}
                key={tag}
                className={cx(
                  'inline-flex items-center mx-1 px-2.5 py-0.5 rounded-full text-xs font-medium leading-4',
                  assignmentTags.includes(tag)
                    ? 'bg-blue-300 text-gray-200'
                    : 'bg-gray-300 text-gray-700'
                )}
              >
                {tag}
              </button>
            ))}
        </nav>
        <div className="pl-3">
          {assignments
            .filter(
              (assignment) =>
                assignmentTags.length === 0 ||
                assignment.frontmatter.tags.some((c) =>
                  assignmentTags.includes(c)
                )
            )
            .map((assignment) => {
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
