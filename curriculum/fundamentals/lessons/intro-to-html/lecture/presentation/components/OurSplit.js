import React from 'react'
import styled from '@emotion/styled'
import { width, space, color } from 'styled-system'
import {
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
} from 'styled-system'

const PaddedBox = styled.div(
  {
    flex: 'none',
    minWidth: 0,
    padding: '1rem',
  },
  width,
  space,
  color
)

export const Flex = styled(PaddedBox)(
  {
    display: 'flex',
  },
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection
)

Flex.defaultProps = {
  justifyContent: 'center',
  flexDirection: 'row',
}

const OurSplit = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children)
  return (
    <Flex
      css={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      <PaddedBox width={50 / 100}>{a}</PaddedBox>
      <PaddedBox width={50 / 100}>{rest}</PaddedBox>
    </Flex>
  )
}

export { OurSplit }
