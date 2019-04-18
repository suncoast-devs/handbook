import React from 'react'

const Split = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children)
  return (
    <Flex
      css={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box width={45 / 100}>{a}</Box>
      <Box width={45 / 100}>{rest}</Box>
    </Flex>
  )
}

export default Split
