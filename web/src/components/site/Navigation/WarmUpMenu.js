import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useUIContext } from '../../../context/UIContext'
import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { LinkItem as Item } from './Item'

export function WarmUpMenu() {
  const {
    allMdx: { nodes: warmUps },
  } = useStaticQuery(graphql`
    query WarmUpMenuQuery {
      allMdx(
        filter: { fields: { type: { eq: "warm-up" } } }
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          id
          frontmatter {
            title
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
        <SubHeading>Warm Ups</SubHeading>
        <div className="pl-3">
          {warmUps.map((warmUp) => {
            return (
              <Item key={warmUp.id} to={null}>
                {warmUp.frontmatter.title}
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
